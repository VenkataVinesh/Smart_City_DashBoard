import React, { useState, useEffect, useMemo } from 'react';
import { Wind, Thermometer, Car, Zap, Bell, RefreshCcw } from 'lucide-react';
import KPICard from '../components/KPICard';
import TrendsChart from '../components/TrendsChart';
import MapModule from '../components/MapModule';
import AlertsPanel from '../components/AlertsPanel';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchLatestCityData, initSocket } from '../services/api';

const Dashboard = () => {
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [cityData, setCityData] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const cities = ['Mumbai', 'Hyderabad', 'Bangalore', 'New Delhi', 'Kolkata', 'New York', 'London', 'Tokyo', 'Singapore'];

  useEffect(() => {
    fetchLatestCityData().then(data => {
      const initialMap = {};
      data.forEach(d => {
        initialMap[d.cityName] = [d];
      });
      setCityData(initialMap);
      setLoading(false);
    });

    const socket = initSocket((updates) => {
      setCityData(prev => {
        const next = { ...prev };
        updates.forEach(d => {
          const history = next[d.cityName] || [];
          next[d.cityName] = [...history, d].slice(-10);
        });
        return next;
      });
    });

    socket.on('alert_notification', (newAlerts) => {
      setAlerts(prev => [...newAlerts, ...prev].slice(0, 20));
    });

    return () => socket.disconnect();
  }, []);

  const currentData = useMemo(() => {
    const history = cityData[selectedCity] || [];
    return history[history.length - 1] || null;
  }, [cityData, selectedCity]);

  const chartData = useMemo(() => {
    const history = cityData[selectedCity] || [];
    return history.map(h => ({
      time: new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      aqi: h.aqi.index * 20, // Scale 1-5 to 0-100 for visual consistency
      temp: h.weather.temp,
      traffic: h.traffic.congestionLevel
    }));
  }, [cityData, selectedCity]);

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <RefreshCcw className="animate-spin text-primary w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-secondary text-sm font-semibold uppercase tracking-widest">Real-time Overview</h2>
          <h1 className="text-4xl font-bold tracking-tight mt-1">{selectedCity} Intelligence</h1>
        </div>
        
        <div className="flex bg-accent p-1 rounded-2xl overflow-x-auto no-scrollbar">
          {cities.map(city => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCity === city 
                ? 'bg-background shadow-sm text-foreground' 
                : 'text-secondary hover:text-foreground'
              }`}
            >
              {city.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedCity}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <KPICard 
            title="Air Quality Index" 
            value={currentData?.aqi?.index || '--'} 
            unit={currentData?.aqi?.description || ''} 
            icon={Wind} 
            color="bg-green-500"
          />
          <KPICard 
            title="Temperature" 
            value={currentData?.weather?.temp || '--'} 
            unit="°C" 
            icon={Thermometer} 
            color="bg-orange-500"
          />
          <KPICard 
            title="Traffic Congestion" 
            value={currentData?.traffic?.congestionLevel || '--'} 
            unit="%" 
            icon={Car} 
            color="bg-blue-500"
          />
          <KPICard 
            title="Energy Usage" 
            value={Math.floor(Math.random() * 200) + 700} 
            unit="kWh" 
            icon={Zap} 
            color="bg-yellow-500"
          />
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[450px]">
          <MapModule 
            cities={cityData} 
            onCitySelect={setSelectedCity} 
            selectedCity={selectedCity} 
          />
        </div>
        <div className="h-[450px]">
          <AlertsPanel alerts={alerts} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-3xl p-8 h-80">
          <TrendsChart 
            data={chartData} 
            dataKey="aqi" 
            color="#10b981" 
            title="AQI Status"
          />
        </div>
        <div className="glass rounded-3xl p-8 h-80">
          <TrendsChart 
            data={chartData} 
            dataKey="traffic" 
            color="#3b82f6" 
            title="Traffic Density"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
