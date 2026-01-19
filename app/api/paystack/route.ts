import { NextResponse } from 'next/server';

// Forces this route to be dynamic so it doesn't cache the request
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { amount, email } = body;

    // 1. Strict Validation
    if (!amount || isNaN(Number(amount))) {
      return NextResponse.json({ error: "A valid numeric amount is required" }, { status: 400 });
    }
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: "A valid customer email is required" }, { status: 400 });
    }

    // 2. Secret Key check
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      console.error("CRITICAL: PAYSTACK_SECRET_KEY is missing in Vercel Settings");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const amountInKobo = Math.round(Number(amount) * 100);

    // 3. Initialize Transaction
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amountInKobo,
        email: email,
        // UPDATED: Pointing to your current working deployment URL
        callback_url: "https://tunde-visuals-c888-ajibobos-projects.vercel.app/success", 
        metadata: {
          custom_fields: [
            {
              display_name: "Service Type",
              variable_name: "service_type",
              value: "Web3 Architecture"
            },
            {
              display_name: "Developer",
              variable_name: "developer",
              value: "Tunde"
            }
          ]
        }
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.status) {
      return NextResponse.json({ 
        error: data.message || "Paystack failed to initialize" 
      }, { status: 400 });
    }

    // Return the authorization data to the frontend
    return NextResponse.json(data.data);

  } catch (error: any) {
    console.error("Internal Crash Error:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}