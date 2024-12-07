import React from 'react';
import { Flame, DollarSign } from 'lucide-react';
import type { Roast } from '../types';

interface RoastCardProps {
  roast: Roast;
}

export function RoastCard({ roast }: RoastCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-102">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={roast.roastee.avatar}
            alt={roast.roastee.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-lg">{roast.roastee.name}</h3>
            <p className="text-gray-500 text-sm">Got Roasted!</p>
          </div>
        </div>
        <div className="flex items-center text-green-600">
          <DollarSign size={20} />
          <span className="font-bold">{roast.amount}</span>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4 italic">"{roast.message}"</p>
      
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center space-x-2">
          <img
            src={roast.roaster.avatar}
            alt={roast.roaster.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm text-gray-600">Roasted by {roast.roaster.name}</span>
        </div>
        <div className="flex items-center text-orange-500">
          <Flame size={16} className="mr-1" />
          <span className="text-sm">{new Date(roast.timestamp).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}