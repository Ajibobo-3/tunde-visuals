import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { amount, email } = await request.json();

    // 1. Validation check
    if (!amount || !email) {
      return NextResponse.json({ error: "Missing amount or email" }, { status: 400 });
    }

    // 2. Secret Key check
    if (!process.env.PAYSTACK_SECRET_KEY) {
      console.error("PAYSTACK_SECRET_KEY is not defined in .env");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // 3. Initialize Transaction with Paystack
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount * 100, // Converts Naira to Kobo
        email: email,
        // LINKING STEP: This tells Paystack to redirect to your timer page
        callback_url: "http://localhost:3000/success", 
        metadata: {
          custom_fields: [
            {
              display_name: "Service Type",
              variable_name: "service_type",
              value: "Web3 Landing Page Deployment"
            },
            {
              display_name: "Project Source",
              variable_name: "project_source",
              value: "Tunde_Visuals_Portfolio"
            }
          ]
        }
      }),
    });

    const data = await response.json();

    // 4. Handle Paystack-specific errors
    if (!data.status) {
      return NextResponse.json({ 
        error: data.message || "Paystack initialization failed" 
      }, { status: 400 });
    }

    // 5. Return the full data (including authorization_url) to the frontend
    return NextResponse.json(data);

  } catch (error) {
    console.error("Payment Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}