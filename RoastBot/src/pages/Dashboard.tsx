import React from 'react';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { ActiveRoast } from '../components/ActiveRoast';
import { MOCK_ROASTS } from '../data/mockRoasts';

export function Dashboard() {
  const activeRoast = MOCK_ROASTS[0]; // Using the first roast as the active one

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800">
      <AnimatedBackground />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <ActiveRoast roast={activeRoast} />
        </div>
      </div>
    </div>
  );
}