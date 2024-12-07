import React from 'react';
import { RoastCard } from '../components/RoastCard';
import { MOCK_ROASTS } from '../data/mockRoasts';

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Latest Roasts</h2>
          <p className="text-gray-600">Watch the burns unfold in real-time!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_ROASTS.map((roast) => (
            <RoastCard key={roast.id} roast={roast} />
          ))}
        </div>
      </div>
    </div>
  );
}