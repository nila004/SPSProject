const express = require('express');
const router = express.Router();
const Participant = require('../models/Participants');

router.post('/register', async (req, res) => {
  try {
    const newParticipant = new Participant(req.body);
    await newParticipant.save();
    res.status(201).json({ success: true, message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
});

module.exports = router;
