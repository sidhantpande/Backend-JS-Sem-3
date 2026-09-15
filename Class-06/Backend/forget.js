const express = require('express')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const User = require('./db/db.js')
const router = express.Router()

const mailer = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD?.replace(/\s/g, ''),
  },
})

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) return res.status(400).json({ error: 'Email is required' })
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'No account found for this email' });
    }

  
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; 
    await user.save();


    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
    const resetUrl = `${frontendUrl}/?resetToken=${resetToken}`
    await mailer.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Reset your Vedam password',
      text: `Open this link to reset your password (valid for one hour): ${resetUrl}`,
    })

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Password reset email failed:', error.message)
    res.status(500).json({ error: 'Could not send password reset email' });
  }s
});
module.exports=router