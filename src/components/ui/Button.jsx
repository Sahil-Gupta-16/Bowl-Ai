// Enhanced Button component with size variants
import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  className = '',
  icon,
  disabled = false,
  type = 'button'
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-emerald-500/30',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-white',
    outline: 'border-2 border-slate-700 hover:border-emerald-500 text-white hover:bg-emerald-500/10',
    ghost: 'hover:bg-slate-800 text-gray-400 hover:text-white'
  };

  const sizes = {
    sm: 'px-16 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]} 
        ${sizes[size]} 
        rounded-xl font-semibold transition-all cursor-pointer
        flex items-center gap-2 justify-center
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      {children}
      {icon && icon}
    </motion.button>
  );
};

export default Button;
