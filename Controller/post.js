import { validationResult } from "express-validator";
import nodemailer from "nodemailer";
import { prisma } from "../Database/db.js";
import { config } from "dotenv";

config();

// Validate ENV variables
if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
  console.error("❌ Missing Gmail credentials in .env file!");
  process.exit(1);
}

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // TLS required for port 587
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Referral API Handler
export const POST_REFER = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

  const { referrerName, referrerEmail, referredName, referredEmail, course, message } = req.body;

  try {
    // Save referral in database
    const referral = await prisma.referral.create({
      data: { referrerName, referrerEmail, referredName, referredEmail, course, message },
    });

    // Send referral email
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: referredEmail,
      subject: "You’ve been referred for an opportunity!",
      text: `Hello ${referredName},\n\n${referrerName} has referred you for ${course}.\n\nBest, Referral Team`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({ message: "Referral created successfully", referral });
  } catch (error) {
    console.error("❌ Server Error:", error);
    return res.status(500).json({ error: "Error processing referral" });
  }
};
