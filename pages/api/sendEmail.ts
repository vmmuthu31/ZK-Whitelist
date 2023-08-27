import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';
import User from '../../models/User';

// Database Connection
async function dbConnect() {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect("mongodb+srv://admin:admin@cluster0.rxnpu.mongodb.net/Zk-whitelist");
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Allow only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Connect to MongoDB
  await dbConnect();

  // Destructure request body
  const { name, mobilenumber, email } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  // Insert data into MongoDB using Mongoose
  try {
    const user = await User.create({ name, mobilenumber, email });
    res.status(201).json({ success: true, data: user });

    // Send Welcome Email
    const mailOptions = {
      from: 'zkconnectt@gmail.com',
      to: email,
      subject: 'Welcome to Zk Connect',
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h1>Hi ${name} 👋,</h1>
      <p>Welcome to Zk Connect! Your registration is successful. 🎉</p>
      <p>You took the first big step to land your dream job! LFG🚀</p>
      <p>Unlock tech talent with ZkConnect, the AI-driven platform that simplifies tech talent acquisition. 🌟</p>
      <p>Join our waiting list for early access and be part of the future of recruitment. ⏳</p>
      <p><strong>Stay ahead in hiring with Zk Connect! 💼</strong></p>
      <img src="https://blogger.googleusercontent.com/img/a/AVvXsEh1yDPOUhd0sGwyjF6QoqWAV_O4AalN3w32_5i3Uzx4qSd-NgiIv0NbS367PpB8g0RfozgSaEZA31QyDxul6XLGQ_hadH1ppbC5Z7YYsxDpdimNzuAtAI-UMICowCGgDGmDDrBSUzrPba_Ro6DFMxAEYeHRaForQC7wTueuqp59FbulOyhSeV4TE8d85T8" alt="Hiring Image" width="400">
      <p>If you have any questions, feel free to reach out to us at support@zkconnect.com. 📧</p>
      <p>Best regards,<br>The Zk Connect Team 👥</p>
      <hr>
      <footer style="font-size: 0.8em; color: grey;">
        <p>This is an automated message. Please do not reply.</p>
      </footer>
    </div>
      `,
    };

    
// Nodemailer Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'zkconnectt@gmail.com',
    pass: 'yslzyadcmvewlmmn',
  },
});

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

