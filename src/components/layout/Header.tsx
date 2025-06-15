
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-lg border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">SA</span>
            </div>
            <span className="font-bold text-xl text-gray-800">SkyAirlines</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              Book Flight
            </Link>
            <Link to="/loyalty" className="text-gray-600 hover:text-blue-600 transition-colors">
              Loyalty Program
            </Link>
            <Link to="/admin" className="text-gray-600 hover:text-blue-600 transition-colors">
              Admin
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <Badge variant="secondary" className="bg-gold-100 text-gold-800">
                  Gold Member
                </Badge>
                <Button
                  variant="ghost"
                  onClick={() => setIsLoggedIn(false)}
                  className="text-gray-600"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => setIsLoggedIn(true)}
                  className="text-gray-600"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => setIsLoggedIn(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Join Now
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
