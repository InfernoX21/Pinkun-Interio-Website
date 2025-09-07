// emailTest.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function sendTestEmail() {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,  // your gmail
        pass: process.env.EMAIL_PASS   // your app password
      }
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // send to yourself for test
      subject: "✅ Test Email from Interior Website",
      text: "This is a test email to confirm Gmail App Password works."
    });

    console.log("📩 Email sent:", info.response);
  } catch (err) {
    console.error("❌ Email error:", err);
  }
}

sendTestEmail();
