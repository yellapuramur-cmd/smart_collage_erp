import React from 'react';
import Card from './Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendUp, 
  colorVariant = 'primary' 
}) => {
  const colors = {
    primary: 'text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/30',
    success: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30',
    warning: 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30',
    danger: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30',
    info: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30',
  };

  return (
    <Card hover className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </h3>
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl ${colors[colorVariant]}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
      
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          {trendUp ? (
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
          )}
          <span className={trendUp ? 'text-green-500 font-medium' : 'text-red-500 font-medium'}>
            {trend}
          </span>
          <span className="text-gray-500 dark:text-gray-400 ml-2">
            vs last month
          </span>
        </div>
      )}
    </Card>
  );
};

export default StatCard;
