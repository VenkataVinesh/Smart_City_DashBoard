const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
  cityName: { type: String, required: true },
  type: { type: String, enum: ['TRAFFIC', 'AQI', 'WEATHER'], required: true },
  severity: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH'], required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Alert', AlertSchema);
