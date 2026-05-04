const mongoose = require('mongoose');

const CityDataSchema = new mongoose.Schema({
  cityName: { type: String, required: true },
  coordinates: {
    lat: Number,
    lon: Number
  },
  weather: {
    temp: Number,
    humidity: Number,
    condition: String,
    icon: String
  },
  aqi: {
    index: Number, // 1-5
    description: String
  },
  traffic: {
    congestionLevel: Number, // 0-100
    status: String
  },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CityData', CityDataSchema);
