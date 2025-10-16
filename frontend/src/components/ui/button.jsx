import React from "react";

const Button = ({ children, onClick, className = "", ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3 
        font-semibold text-white 
        bg-blue-500 
        rounded-lg 
        shadow-md 
        hover:bg-blue-600 
        focus:outline-none 
        focus:ring-2 
        focus:ring-blue-400 
        focus:ring-opacity-75 
        transition-all 
        duration-200 
        ease-in-out
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
