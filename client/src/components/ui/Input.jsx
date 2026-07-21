import React, { forwardRef } from 'react';

const Input = forwardRef(
  ({ label, error, icon: Icon, className = '', type = 'text', ...props }, ref) => {
    const inputStyles = `
      block w-full rounded-lg border-gray-300 shadow-sm 
      focus:border-primary-500 focus:ring-primary-500 sm:text-sm
      dark:bg-gray-800 dark:border-gray-600 dark:text-white
      transition-all duration-200
      ${error ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' : ''}
      ${Icon ? 'pl-10' : 'pl-3'}
      ${type === 'textarea' ? 'py-3' : 'py-2'}
      pr-3
    `;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        <div className="relative rounded-md shadow-sm">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
          )}
          {type === 'textarea' ? (
            <textarea
              ref={ref}
              className={`${inputStyles} ${className}`}
              {...props}
            />
          ) : (
            <input
              type={type}
              ref={ref}
              className={`${inputStyles} ${className}`}
              {...props}
            />
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400 animate-fade-in">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
