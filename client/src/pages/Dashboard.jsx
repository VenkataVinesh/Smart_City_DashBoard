import React, { useState } from 'react';
import { Wind, Thermometer, Car, Zap, Bell } from 'lucide-react';
import KPICard from '../components/KPICard';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [selectedCity, setSelectedCity] = useState('Mumbai');

  const cities = ['Mumbai', 'Hyderabad', 'Bangalore', 'New Delhi', 'Kolkata', 'New York', 'London', 'Tokyo', 'Singapore'];

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

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <KPICard 
          title="Air Quality Index" 
          value="42" 
          unit="AQI" 
          icon={Wind} 
          color="bg-green-500"
          trend={-5}
        />
        <KPICard 
          title="Temperature" 
          value="28" 
          unit="°C" 
          icon={Thermometer} 
          color="bg-orange-500"
          trend={2}
        />
        <KPICard 
          title="Traffic Congestion" 
          value="34" 
          unit="%" 
          icon={Car} 
          color="bg-blue-500"
          trend={12}
        />
        <KPICard 
          title="Energy Usage" 
          value="842" 
          unit="kWh" 
          icon={Zap} 
          color="bg-yellow-500"
          trend={-3}
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass rounded-3xl p-8 h-80 flex items-center justify-center text-secondary">
          Chart Placeholder (Coming in Commit 6)
        </div>
        <div className="glass rounded-3xl p-8 h-80 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold flex items-center gap-2">
              <Bell size={18} className="text-primary" />
              Active Alerts
            </h3>
            <span className="bg-primary bg-opacity-10 text-primary text-[10px] font-bold px-2 py-1 rounded-full uppercase">
              2 New
            </span>
          </div>
          <div className="space-y-4 overflow-y-auto no-scrollbar">
             <div className="p-4 rounded-2xl bg-accent bg-opacity-50 border border-opacity-5 space-y-1">
                <p className="text-xs font-bold uppercase text-orange-500">Traffic Alert</p>
                <p className="text-sm font-medium">High congestion detected on Western Express Highway.</p>
                <p className="text-[10px] text-secondary">2 MINUTES AGO</p>
             </div>
             <div className="p-4 rounded-2xl bg-accent bg-opacity-50 border border-opacity-5 space-y-1">
                <p className="text-xs font-bold uppercase text-primary">Weather Update</p>
                <p className="text-sm font-medium">Sudden temperature drop expected in the next 2 hours.</p>
                <p className="text-[10px] text-secondary">15 MINUTES AGO</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
