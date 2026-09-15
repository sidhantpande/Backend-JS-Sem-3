const express = require('express')
const bcryptjs = require('bcryptjs')
const User = require('./db/db.js')
const router = express.Router()
 
 router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body
  
    try {
      const user = await User.findOne({
        resetToken: token,
        resetTokenExpiry: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(400).json({ error: 'Invalid or expired token' })
      }
  
      if (!newPassword || newPassword.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' })
      }
      const hashedPassword = await bcryptjs.hash(newPassword, 10)
      user.passWord = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;
      await user.save();
  
      res.status(200).json({ message: 'Password reset successfully' })
    } catch (error) {
      res.status(500).json({ error: 'Could not reset password' })
    }
  });

  module.exports=router