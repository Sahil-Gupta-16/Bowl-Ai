/**
 * Sidebar Component
 * -----------------
 * Collapsible hamburger sidebar for navigation
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  BarChart2,
  Video,
  Clock,
  X,
  Menu
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/dashboard', label: 'Dashboard', icon: BarChart2 },
  { path: '/analysis', label: 'Analysis', icon: Video },
  { path: '/history', label: 'History', icon: Clock },
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-slate-900 backdrop-blur-xl border-r border-slate-800 transform transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header with Close button */}
        <div className="flex justify-between items-center px-16 py-3 border-b border-slate-800">
          <h2 className="text-xl font-extrabold text-white">Menu</h2>
          <button 
            onClick={onClose} 
            aria-label="Close sidebar"
            className="p-2 rounded-md hover:bg-slate-800 transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col mt-6 px-2">
          {navItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({isActive}) =>
                `flex items-center gap-3 px-16 py-3 rounded-lg mb-1 transition-colors ${
                  isActive
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                }`
              }
              onClick={onClose}
            >
              <Icon size={20} />
              <span className="font-medium">{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
