import React from 'react';
import { Flame } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();
  
  return (
    <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Flame size={32} className="text-yellow-300" />
            <span className="text-2xl font-bold">RoastBot</span>
          </Link>
          <nav className="space-x-6">
            <Link 
              to="/" 
              className={`hover:text-yellow-300 transition ${
                location.pathname === '/' ? 'text-yellow-300' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              className={`hover:text-yellow-300 transition ${
                location.pathname === '/dashboard' ? 'text-yellow-300' : ''
              }`}
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}