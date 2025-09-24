const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  key: { type: String, required: true, unique: true },
  class: { type: String, default: 'sections' }
});

module.exports = mongoose.model('Section', SectionSchema);
