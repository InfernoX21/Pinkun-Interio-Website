// server.js
import express from "express";
import nodemailer from "nodemailer";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5001"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


// ===== DATABASE SETUP =====
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.log("❌ MongoDB error:", err));

// Schema for storing messages
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  date: { type: Date, default: Date.now }
});
const Message = mongoose.model("Message", messageSchema);

// ===== EMAIL SETUP =====
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,  
    pass: process.env.EMAIL_PASS   
  }
});

// ===== ROUTE =====
app.post("/contact", async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    // 1️⃣ Save to MongoDB
    const newMessage = new Message({ name, phone, email, message });
    await newMessage.save();

    // 2️⃣ Try sending email
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // owner email
        subject: "📩 New Contact Form Submission",
        text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${message}`,
      });
      console.log("✅ Email sent successfully");
    } catch (emailErr) {
      console.error("⚠️ Email sending failed:", emailErr.message);
      // Don’t crash, just continue
    }

    // 3️⃣ Always tell frontend success
    res.status(200).json({ success: true, message: "Message received. Thank you!" });

  } catch (err) {
    console.error("❌ Contact form error:", err.message);
    res.status(500).json({ success: false, message: "Server error, please try again later." });
  }
});


// ===== START SERVER =====
const PORT = process.env.PORT || 5000;

// Add detailed startup logging
console.log("🔄 Starting server...");
console.log("📋 Checking environment variables:");
console.log("   PORT:", process.env.PORT);
console.log("   MONGO_URI:", process.env.MONGO_URI ? "✓ Set" : "✗ Not set");
console.log("   EMAIL_USER:", process.env.EMAIL_USER ? "✓ Set" : "✗ Not set");

app.listen(PORT, () => {
  console.log(`✅ Server successfully started on http://localhost:${PORT}`);
  console.log("✅ Ready to accept requests!");
}).on('error', (err) => {
  console.error("❌ Server failed to start!");
  console.error("Error:", err.message);
  if (err.code === 'EADDRINUSE') {
    console.error(`💡 Port ${PORT} is already in use by another application.`);
    console.error("   Try: kill -9 $(lsof -t -i:5000)  // to free the port");
    console.error("   Or: change PORT to 5001 in your .env file");
  }
});