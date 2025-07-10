// routes/volunteer.js
const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');

router.post('/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    const volunteer = await Volunteer.findOne({ name });

    if (!volunteer) {
      return res.status(404).json({ success: false, message: 'Volunteer not found' });
    }

    if (volunteer.password !== password) {
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }

    res.json({ success: true, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
