import React from 'react';
import { Flame, DollarSign } from 'lucide-react';
import type { Roast } from '../types';

interface ActiveRoastProps {
  roast: Roast;
}

export function ActiveRoast({ roast }: ActiveRoastProps) {
  return (
    <div className="relative bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
        <div className="relative">
          <Flame className="w-12 h-12 text-red-500 animate-bounce" />
          <div className="absolute inset-0 text-red-500 animate-ping">
            <Flame className="w-12 h-12" />
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <h2 className="text-3xl font-bold mb-6">Active Roast</h2>
        
        <div className="flex justify-center items-center space-x-4 mb-8">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-green-400 mr-2" />
            <span className="text-4xl font-bold text-green-400">{roast.amount}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="text-center">
            <div className="relative inline-block">
              <img
                src={roast.roastee.avatar}
                alt={roast.roastee.name}
                className="w-24 h-24 rounded-full border-4 border-red-500 shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 bg-red-500 rounded-full p-2">
                <Flame className="w-4 h-4 text-white" />
              </div>
            </div>
            <h3 className="mt-4 text-xl font-semibold">{roast.roastee.name}</h3>
            <p className="text-red-400">Getting Roasted</p>
          </div>
          
          <div className="text-center">
            <div className="relative inline-block">
              <img
                src={roast.roaster.avatar}
                alt={roast.roaster.name}
                className="w-24 h-24 rounded-full border-4 border-orange-500 shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 bg-orange-500 rounded-full p-2">
                <Flame className="w-4 h-4 text-white" />
              </div>
            </div>
            <h3 className="mt-4 text-xl font-semibold">{roast.roaster.name}</h3>
            <p className="text-orange-400">Roasting</p>
          </div>
        </div>

        <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
          Watch Live Roast
        </button>
      </div>
    </div>
  );
}