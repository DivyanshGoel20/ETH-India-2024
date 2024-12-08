import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, DollarSign, Repeat } from 'lucide-react';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { Feature } from '../components/Feature';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function LandingPage() {
  return (
    <div>
      <Header />
      <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white">
        <AnimatedBackground />
        <div className="z-10 text-center p-6 max-w-4xl mx-auto">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold mb-8 animate-pulse">
            Roast<span className="text-red-500">Bot</span>
          </h1>
          <p className="text-xl sm:text-2xl mb-12 leading-relaxed">
            Enter the ultimate roasting arena! Pay to roast others, but beware -
            they can pay more to shift the heat. How long can you take the burn?
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
            <Feature icon={Flame} title="Brutal Roasts" description="Our AI delivers savage burns" />
            <Feature icon={DollarSign} title="Pay to Shift" description="Outbid others to change the target" />
            <Feature icon={Repeat} title="Endless Cycle" description="Keep the roast going round and round" />
          </div>
          <Link to="/dashboard">
            <button className="bg-red-600 hover:bg-red-700 text-white text-xl px-8 py-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105">
              Enter the Roast Zone
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    </div>
  );
}