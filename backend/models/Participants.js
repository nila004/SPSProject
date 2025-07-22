const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  name: String,
  college: String,
  year: String,
  membership: String,
  membershipId: String,
  food: String
});

module.exports = mongoose.model('Participant', participantSchema);
