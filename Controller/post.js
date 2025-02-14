import { validationResult } from "express-validator";
import nodemailer from"nodemailer";
import { prisma } from"../Database/db.js";
import {config} from 'dotenv';
config();
const transporter = nodemailer.createTransport({
  service:"gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});


 export const POST_REFER = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) return res.status(400).json({ error: error.array() });
  const {
    referrerName,
    referrerEmail,
    referredName,
    referredEmail,
    course,
    message,
  } = req.body;
 
  try {
   
    const referral = await prisma.referral.create({
     data:{
        referrerName,
        referrerEmail,
        referredName,
        referredEmail,
        course,
        message,
     }
    });
    if(!referral) 
        return res.json({mes:"problem"})
   
    //send Referral Email
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: referredEmail,
      subject: "You’ve been referred for an opportunity!",
      text: `Hello ${referredName},\n\n${referrerName} has referred you for ${course}.\n\nBest, Referral Team`,
    };

  await  transporter.sendMail(mailOptions);
    res
    .status(201)
    .json({ message: "Referral created successfully", referral });
   
   
  } catch (error) {
    res.status(500).json({error: 'Error processing referral'})
  }
};
