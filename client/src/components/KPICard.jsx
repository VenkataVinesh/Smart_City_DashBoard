import React from 'react';
import { motion } from 'framer-motion';

const KPICard = ({ title, value, unit, icon: Icon, color, trend }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass p-6 rounded-3xl flex flex-col justify-between h-40"
    >
      <div className="flex justify-between items-start">
        <div className={`p-2 rounded-xl bg-opacity-10 ${color}`}>
          <Icon className={color.replace('bg-', 'text-')} size={20} />
        </div>
        {trend && (
          <span className={`text-xs font-medium ${trend > 0 ? 'text-red-500' : 'text-green-500'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <div>
        <p className="text-secondary text-xs font-semibold uppercase tracking-wider">{title}</p>
        <div className="flex items-baseline space-x-1">
          <h3 className="text-2xl font-bold">{value}</h3>
          <span className="text-secondary text-sm">{unit}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default KPICard;
