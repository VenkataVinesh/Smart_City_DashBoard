const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { fetchCityData } = require('./services/dataFetcher');

dotenv.config();

// Connect to Database
if (process.env.MONGODB_URI) {
    connectDB();
} else {
    console.warn('MONGODB_URI not found. Skipping DB connection.');
}

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Smart City Dashboard API is running...');
});

// City Data Route (Historical/Latest)
app.get('/api/cities', async (req, res) => {
    try {
        const { CityData } = require('./models/CityData');
        // Get latest record for each city
        const cities = ['Mumbai', 'Hyderabad', 'Bangalore', 'New Delhi', 'Kolkata', 'New York', 'London', 'Tokyo', 'Singapore'];
        const latestData = await Promise.all(cities.map(name => 
            require('./models/CityData').findOne({ cityName: name }).sort({ timestamp: -1 })
        ));
        res.json(latestData.filter(d => d !== null));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Socket.io Connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  
  // Send initial data immediately
  fetchCityData().then(data => {
      socket.emit('city_update', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Background Data Fetching Loop (Every 10 seconds as requested)
setInterval(async () => {
    console.log('Fetching fresh city data...');
    const result = await fetchCityData();
    if (result) {
        if (result.cityData.length > 0) io.emit('city_update', result.cityData);
        if (result.alerts.length > 0) io.emit('alert_notification', result.alerts);
    }
}, 10000);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server, io };
