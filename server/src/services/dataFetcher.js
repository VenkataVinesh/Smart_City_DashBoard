const axios = require('axios');
const CityData = require('../models/CityData');

const CITIES = [
  { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
  { name: 'Hyderabad', lat: 17.3850, lon: 78.4867 },
  { name: 'Bangalore', lat: 12.9716, lon: 77.5946 },
  { name: 'New Delhi', lat: 28.6139, lon: 77.2090 },
  { name: 'Kolkata', lat: 22.5726, lon: 88.3639 },
  { name: 'New York', lat: 40.7128, lon: -74.0060 },
  { name: 'London', lat: 51.5074, lon: -0.1278 },
  { name: 'Tokyo', lat: 35.6895, lon: 139.6917 },
  { name: 'Singapore', lat: 1.3521, lon: 103.8198 }
];

const fetchCityData = async () => {
  const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
  const TOMTOM_API_KEY = process.env.TOMTOM_API_KEY;

  const results = await Promise.all(CITIES.map(async (city) => {
    try {
      // 1. Fetch Weather & AQI (Simulated if keys missing for demo purposes)
      let weatherData = { temp: 25, humidity: 60, condition: 'Clear', icon: '01d' };
      let aqiData = { index: 2, description: 'Fair' };
      
      if (WEATHER_API_KEY) {
        const weatherRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${WEATHER_API_KEY}&units=metric`);
        weatherData = {
          temp: weatherRes.data.main.temp,
          humidity: weatherRes.data.main.humidity,
          condition: weatherRes.data.weather[0].main,
          icon: weatherRes.data.weather[0].icon
        };
        
        const aqiRes = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${city.lat}&lon=${city.lon}&appid=${WEATHER_API_KEY}`);
        const aqiIndex = aqiRes.data.list[0].main.aqi;
        const aqiDescriptions = ['', 'Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
        aqiData = { index: aqiIndex, description: aqiDescriptions[aqiIndex] };
      }

      // 2. Fetch Traffic
      let trafficLevel = Math.floor(Math.random() * 40) + 10; // Fallback
      if (TOMTOM_API_KEY) {
        const trafficRes = await axios.get(`https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?point=${city.lat},${city.lon}&key=${TOMTOM_API_KEY}`);
        // Simplified traffic index calculation
        trafficLevel = Math.min(100, Math.max(0, 100 - (trafficRes.data.flowSegmentData.currentSpeed / trafficRes.data.flowSegmentData.freeFlowSpeed) * 100));
      }

      const cityUpdate = {
        cityName: city.name,
        coordinates: { lat: city.lat, lon: city.lon },
        weather: weatherData,
        aqi: aqiData,
        traffic: {
          congestionLevel: Math.round(trafficLevel),
          status: trafficLevel > 70 ? 'High' : trafficLevel > 40 ? 'Moderate' : 'Low'
        },
        timestamp: new Date()
      };

      // Save to DB
      await CityData.create(cityUpdate);
      
      return cityUpdate;
    } catch (error) {
      console.error(`Error fetching data for ${city.name}:`, error.message);
      return null;
    }
  }));

  return results.filter(r => r !== null);
};

module.exports = { fetchCityData };
