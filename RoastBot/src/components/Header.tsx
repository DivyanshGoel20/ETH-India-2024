import React from 'react';
import { Flame } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { WalletDefault } from '@coinbase/onchainkit/wallet';

export function Header() {
  const location = useLocation();
  
  return (
    <header className="bg-transparent text-white z-10 relative">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Flame size={32} className="text-red-500" />
            <span className="text-2xl font-bold">BlameFlame</span>
          </Link>
          <div className="flex items-center space-x-6">
            <nav className="space-x-6">
              <Link 
                to="/" 
                className={`hover:text-red-400 transition ${
                  location.pathname === '/' ? 'text-red-400' : ''
                }`}
              >
                Home
              </Link>
              <Link 
                to="/dashboard" 
                className={`hover:text-red-400 transition ${
                  location.pathname === '/dashboard' ? 'text-red-400' : ''
                }`}
              >
                Dashboard
              </Link>
            </nav>
            <WalletDefault />
          </div>
        </div>
      </div>
    </header>
  );
}