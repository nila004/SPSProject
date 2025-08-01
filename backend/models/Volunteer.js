// models/Volunteer.js
const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('Volunteer', volunteerSchema);