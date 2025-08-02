import React from 'react';

/**
 * Beautiful loading spinner component with MetLife branding
 * @param {Object} props - Component props
 * @param {string} props.size - Size of spinner (sm, md, lg, xl)
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.text - Loading text to display
 * @returns {JSX.Element} Loading spinner component
 */
const LoadingSpinner = ({ 
  size = 'md', 
  className = '', 
  text = 'Loading...' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Spinner */}
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Outer ring - Orange */}
        <div className={`absolute inset-0 rounded-full border-2 border-[#F67F36] border-t-transparent animate-spin ${sizeClasses[size]}`}></div>
        
        {/* Inner ring - Green */}
        <div className={`absolute inset-1 rounded-full border-2 border-[#A4CE4E] border-t-transparent animate-spin ${sizeClasses[size === 'sm' ? 'sm' : size === 'md' ? 'md' : 'lg']}`} style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        
        {/* Center dot */}
        <div className={`absolute inset-2 rounded-full bg-[#1362A4] animate-pulse ${size === 'sm' ? 'w-1 h-1' : size === 'md' ? 'w-1.5 h-1.5' : 'w-2 h-2'}`}></div>
      </div>
      
      {/* Loading text */}
      {text && (
        <p className="text-[#1362A4] font-medium text-sm mt-3 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

/**
 * Full screen loading overlay
 * @param {Object} props - Component props
 * @param {string} props.text - Loading text
 * @returns {JSX.Element} Full screen loading overlay
 */
export const FullScreenLoader = ({ text = 'Loading your financial journey...' }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50">
      <div className="text-center">
        <LoadingSpinner size="xl" text="" />
        <p className="text-[#1362A4] font-semibold text-lg mt-4 animate-pulse">
          {text}
        </p>
        <div className="mt-2 flex justify-center space-x-1">
          <div className="w-2 h-2 bg-[#F67F36] rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-[#A4CE4E] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-[#1362A4] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

/**
 * Inline loading spinner for buttons and small areas
 * @param {Object} props - Component props
 * @param {string} props.size - Size of spinner
 * @returns {JSX.Element} Inline loading spinner
 */
export const InlineSpinner = ({ size = 'sm' }) => {
  return (
    <div className={`inline-flex items-center ${size === 'sm' ? 'space-x-2' : 'space-x-3'}`}>
      <LoadingSpinner size={size} text="" />
      <span className={`text-[#1362A4] font-medium ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
        Processing...
      </span>
    </div>
  );
};

export default LoadingSpinner; 