import React from 'react';
import { Bell, AlertTriangle, Wind, Car } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AlertsPanel = ({ alerts }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'TRAFFIC': return <Car size={16} />;
      case 'AQI': return <Wind size={16} />;
      default: return <AlertTriangle size={16} />;
    }
  };

  const getColor = (severity) => {
    switch (severity) {
      case 'HIGH': return 'text-red-500 bg-red-500';
      case 'MEDIUM': return 'text-orange-500 bg-orange-500';
      default: return 'text-primary bg-primary';
    }
  };

  return (
    <div className="glass rounded-3xl p-8 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold flex items-center gap-2">
          <Bell size={18} className="text-primary" />
          Intelligence Alerts
        </h3>
        <span className="bg-primary bg-opacity-10 text-primary text-[10px] font-bold px-2 py-1 rounded-full uppercase">
          {alerts.length} Active
        </span>
      </div>
      
      <div className="space-y-4 overflow-y-auto no-scrollbar flex-1">
        <AnimatePresence initial={false}>
          {alerts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
              <div className="bg-accent p-4 rounded-full mb-2">
                <Bell size={32} />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest">No Active Alerts</p>
              <p className="text-[10px] mt-1">Systems are operating within normal parameters.</p>
            </div>
          ) : (
            alerts.map((alert, i) => (
              <motion.div
                key={`${alert.cityName}-${alert.timestamp}-${i}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-4 rounded-2xl bg-accent bg-opacity-50 border border-opacity-5 space-y-2"
              >
                <div className="flex justify-between items-center">
                  <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${getColor(alert.severity)} bg-opacity-10`}>
                    {getIcon(alert.type)}
                    {alert.type}
                  </div>
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-tighter">
                    {alert.cityName}
                  </span>
                </div>
                <p className="text-sm font-medium leading-tight">{alert.message}</p>
                <p className="text-[10px] text-secondary">
                  {new Date(alert.timestamp).toLocaleTimeString()}
                </p>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AlertsPanel;
