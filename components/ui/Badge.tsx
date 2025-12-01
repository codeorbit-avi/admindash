import React from 'react';
import { UserStatus } from '../../types';

interface BadgeProps {
  status: UserStatus | string;
}

export const Badge: React.FC<BadgeProps> = ({ status }) => {
  const isActive = status === UserStatus.Active;
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
      isActive 
        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
    }`}>
      <span className={`w-1.5 h-1.5 mr-1.5 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-500'}`}></span>
      {status}
    </span>
  );
};