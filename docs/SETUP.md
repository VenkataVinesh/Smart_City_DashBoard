# Local Setup Guide

## Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB)
- API Keys:
  - [OpenWeatherMap](https://openweathermap.org/api)
  - [TomTom Developers](https://developer.tomtom.com/)
  - [Mapbox](https://www.mapbox.com/)

## Step 1: Clone and Install
```bash
git clone <repo-url>
cd smart-city-dashboard
cd server && npm install
cd ../client && npm install
```

## Step 2: Environment Configuration
Create a `.env` file in the `server` directory based on `.env.example`:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
OPENWEATHER_API_KEY=your_key
TOMTOM_API_KEY=your_key
```

Update `client/src/components/MapModule.jsx` with your Mapbox Token.

## Step 3: Run the Application
**Start Backend:**
```bash
cd server
npm run dev
```

**Start Frontend:**
```bash
cd client
npm run dev
```

The dashboard will be available at `http://localhost:5173`.
