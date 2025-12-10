import React from 'react';

export default function Button({ children, className = "", variant = "primary", ...props }) {
  const baseStyles = "px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center";
  const variants = {
    primary: "bg-gradient-to-r from-cyan-600 to-blue-500 text-white shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/70",
    secondary: "bg-white/10 border border-white/20 hover:bg-white/20 backdrop-blur-sm",
    outline: "border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
