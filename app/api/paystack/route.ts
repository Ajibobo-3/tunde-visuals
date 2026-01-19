import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, email } = body;

    // 1. Validation check
    if (!amount || !email) {
      return NextResponse.json({ error: "Missing amount or email" }, { status: 400 });
    }

    // 2. Secret Key check
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      console.error("CRITICAL: PAYSTACK_SECRET_KEY is missing in Vercel Settings");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // 3. Initialize Transaction with Paystack
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Ensures it is a clean integer in Kobo
        email: email,
        // UPDATED: Points to your live Vercel domain instead of localhost
        callback_url: "https://visuals-by-tunde.vercel.app/success", 
        metadata: {
          custom_fields: [
            {
              display_name: "Service Type",
              variable_name: "service_type",
              value: "Web3 Landing Page Deployment"
            }
          ]
        }
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.status) {
      console.error("Paystack API Error:", data.message);
      return NextResponse.json({ 
        error: data.message || "Paystack initialization failed" 
      }, { status: 400 });
    }

    return NextResponse.json(data.data);

  } catch (error: any) {
    console.error("Detailed Payment Error:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}