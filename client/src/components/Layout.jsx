import React from 'react';
import { useTheme } from '../utils/ThemeContext';
import { Moon, Sun, Activity, Shield, Map as MapIcon, BarChart2 } from 'lucide-react';

const Layout = ({ children }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <nav className="fixed top-0 w-full z-50 glass border-b border-opacity-10 py-4 px-8 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Activity className="text-primary w-6 h-6" />
          <span className="font-semibold text-lg tracking-tight">CITIZEN.ONE</span>
        </div>
        
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <a href="#" className="hover:text-primary transition-colors">DASHBOARD</a>
          <a href="#" className="text-secondary hover:text-foreground transition-colors">MAPS</a>
          <a href="#" className="text-secondary hover:text-foreground transition-colors">ANALYTICS</a>
          <a href="#" className="text-secondary hover:text-foreground transition-colors">ALERTS</a>
        </div>

        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-accent transition-colors"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </nav>

      <main className="pt-24 pb-12 px-8 max-w-7xl mx-auto">
        {children}
      </main>
      
      <footer className="py-8 px-8 border-t border-opacity-10 text-center text-secondary text-xs tracking-widest uppercase">
        © 2026 SMART CITY INTELLIGENCE OPERATIONS CENTER
      </footer>
    </div>
  );
};

export default Layout;
