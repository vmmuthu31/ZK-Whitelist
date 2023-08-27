import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, mobilenumber, email } = req.body;

  // Create a transporter with your email provider details
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'zkconnectt@gmail.com',
      pass: 'yslzyadcmvewlmmn',
    },
  });

  // Email configuration
  const mailOptions = {
    from: 'zkconnectt@gmail.com',
    to: email,
    subject: 'Welcome to Zk Connect',
    html: `
    <h1>Hi ${name} 👋,</h1>
    <p>Welcome to Zk Connect! Your registration is successful. 🎉</p>
    <p>You took the first big step to land your dream job! LFG🚀</p>
    <p>Unlock tech talent with ZkConnect, the AI-driven platform that simplifies tech talent acquisition. 🌟</p>
    <p>Join our waiting list for early access and be part of the future of recruitment. ⏳</p>
    <p><strong>Stay ahead in hiring with Zk Connect! 💼</strong></p>
    <img src="https://blogger.googleusercontent.com/img/a/AVvXsEh1yDPOUhd0sGwyjF6QoqWAV_O4AalN3w32_5i3Uzx4qSd-NgiIv0NbS367PpB8g0RfozgSaEZA31QyDxul6XLGQ_hadH1ppbC5Z7YYsxDpdimNzuAtAI-UMICowCGgDGmDDrBSUzrPba_Ro6DFMxAEYeHRaForQC7wTueuqp59FbulOyhSeV4TE8d85T8" alt="Hiring Image" width="400">
    <p>If you have any questions, feel free to reach out to us at support@zkconnect.com. 📧</p>
    <p>Best regards,<br>The Zk Connect Team 👥</p>
    
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Email sending failed' });
  }
}
