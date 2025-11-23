/**
 * Navigation Component
 * --------------------
 * Purpose: Sticky top navigation bar with theme toggle, notifications, and user profile
 * Position: Fixed at top, spans full width
 * Features: Navigation links, theme switcher, notification badge, user menu, CTA button
 */

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Sun, 
  Moon, 
  Bell, 
  User,
  ChevronDown 
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Button from '../ui/Button';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notificationCount] = useState(3); // Mock notification count

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/analysis', label: 'Analysis' },
    { path: '/history', label: 'History' }
  ];

  return (
    <nav className="bg-slate-900/50 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-screen mx-auto px-16 sm:px-6 lg:px-16">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo + Brand */}
          <div className="flex items-center gap-2">
            <motion.div 
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-purple-500 flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Activity className="w-6 h-6" />
            </motion.div>
            <span className="text-xl font-extrabold bg-gradient-to-r from-emerald-500 to-purple-500 bg-clip-text text-transparent">
              BowlAI
            </span>
          </div>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex gap-1">
            {navItems.map(item => (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`px-16 py-2 rounded-lg transition-all font-medium ${
                  location.pathname === item.path
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'text-gray-400 hover:text-white hover:bg-slate-800'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDarkMode ? (
                <Sun size={20} className="text-yellow-500" />
              ) : (
                <Moon size={20} className="text-slate-400" />
              )}
            </motion.button>

            {/* Notifications */}
            <motion.button 
              className="hidden md:block p-2 rounded-lg hover:bg-slate-800 transition-colors relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Bell size={20} className="text-gray-400" />
              {notificationCount > 0 && (
                <motion.span 
                  className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                />
              )}
            </motion.button>

            {/* User Profile with Dropdown */}
            <div className="relative hidden md:block">
              <motion.button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <User size={18} className="text-white" />
                </div>
                <ChevronDown size={16} className="text-gray-400" />
              </motion.button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <motion.div
                  className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="p-3 border-b border-slate-700">
                    <p className="text-sm font-semibold text-white">John Bowler</p>
                    <p className="text-xs text-gray-400">john@bowlai.com</p>
                  </div>
                  <button className="w-full text-left px-16 py-2 text-sm text-gray-300 hover:bg-slate-700 transition-colors">
                    Profile Settings
                  </button>
                  <button className="w-full text-left px-16 py-2 text-sm text-gray-300 hover:bg-slate-700 transition-colors">
                    My Analyses
                  </button>
                  <button className="w-full text-left px-16 py-2 text-sm text-gray-300 hover:bg-slate-700 transition-colors">
                    Billing
                  </button>
                  <div className="border-t border-slate-700">
                    <button className="w-full text-left px-16 py-2 text-sm text-red-400 hover:bg-slate-700 transition-colors">
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => navigate('/analysis')}
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Toggle (Optional) */}
            <motion.button
              className="md:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
                <span className="w-full h-0.5 bg-gray-400 rounded"></span>
                <span className="w-full h-0.5 bg-gray-400 rounded"></span>
                <span className="w-full h-0.5 bg-gray-400 rounded"></span>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className="md:hidden border-t border-slate-800 py-2">
          <div className="flex flex-col gap-1">
            {navItems.map(item => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`px-16 py-2 rounded-lg text-left transition-all ${
                  location.pathname === item.path
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'text-gray-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
