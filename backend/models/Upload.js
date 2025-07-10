// backend/models/Upload.js
const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  filename: String,
  originalName: String,
  uploadDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Upload', uploadSchema);
