import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 1. Parse and validate the incoming body
    const body = await request.json().catch(() => ({}));
    const { amount, email } = body;

    // 2. Extra strict validation to prevent 400 errors
    if (!amount || isNaN(Number(amount))) {
      return NextResponse.json({ error: "A valid numeric amount is required" }, { status: 400 });
    }
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: "A valid customer email is required" }, { status: 400 });
    }

    // 3. Secret Key check
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      console.error("CRITICAL: PAYSTACK_SECRET_KEY is missing in Vercel Settings");
      return NextResponse.json({ error: "Server configuration error - missing keys" }, { status: 500 });
    }

    // 4. Initialize Transaction with Paystack
    // Paystack expects amount in Kobo (Naira * 100) as an INTEGER
    const amountInKobo = Math.round(Number(amount) * 100);

    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amountInKobo,
        email: email,
        // Ensure this URL matches your project exactly
        callback_url: "https://visuals-by-tunde.vercel.app/success", 
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

    // 5. Handle Paystack API errors (e.g., invalid keys or declined limits)
    if (!response.ok || !data.status) {
      console.error("Paystack API Error:", data.message || "Unknown Paystack Error");
      return NextResponse.json({ 
        error: data.message || "Paystack failed to initialize" 
      }, { status: 400 });
    }

    // 6. Return the authorization_url to the frontend
    return NextResponse.json(data.data);

  } catch (error: any) {
    console.error("Internal Crash Error:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}