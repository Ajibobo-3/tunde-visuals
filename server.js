const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path'); // 1. IMPORT PATH MODULE
require('dotenv').config();

const app = express();

// 2. USE "PATH.JOIN" TO FIND THE PUBLIC FOLDER CORRECTLY
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Configure the Email Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// API Route: Handle Booking Confirmation
app.post('/api/confirm-booking', async (req, res) => {
    const { name, email, service, amount, reference } = req.body;

    console.log("Payment received:", reference);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, 
        subject: `💰 New Booking Paid: ${service}`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
                <h2 style="color: #bfa472;">New Client Booking</h2>
                <p><strong>Client Name:</strong> ${name}</p>
                <p><strong>Client Email:</strong> ${email}</p>
                <p><strong>Service:</strong> ${service}</p>
                <p><strong>Amount Paid:</strong> ₦${amount}</p>
                <p><strong>Paystack Ref:</strong> ${reference}</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error("Email Error:", error);
        res.status(500).json({ message: 'Error sending email' });
    }
});

// 3. EXPLICITLY SERVE INDEX.HTML FOR THE ROOT URL (Safeguard)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Export for Vercel
module.exports = app;

if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}