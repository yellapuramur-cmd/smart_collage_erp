import React from 'react';

const Card = ({ children, className = '', hover = false, gradient = false }) => {
  return (
    <div
      className={`
        bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-700
        ${hover ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1' : 'shadow-sm'}
        ${gradient ? 'bg-gradient-to-br from-white to-gray-50 dark:from-surface-dark dark:to-gray-900' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
