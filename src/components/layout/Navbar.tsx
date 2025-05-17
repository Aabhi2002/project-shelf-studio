
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Menu, User } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  // In a real app, we'd use a proper auth context/hook
  const isLoggedIn = false; 

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-projectshelf-accent flex items-center justify-center">
            <span className="text-white font-bold">PS</span>
          </div>
          <span className="text-lg font-semibold text-projectshelf-primary">ProjectShelf</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-600 hover:text-projectshelf-accent transition-colors">
            Explore
          </Link>
          <Link to="/pricing" className="text-gray-600 hover:text-projectshelf-accent transition-colors">
            Pricing
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-projectshelf-accent transition-colors">
            About
          </Link>

          <div className="ml-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <User size={16} />
                    Dashboard
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-projectshelf-accent hover:bg-projectshelf-accent/90">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-2 px-4 animate-fade-in">
          <div className="flex flex-col gap-3 py-2">
            <Link 
              to="/" 
              className="px-2 py-2 rounded-md hover:bg-gray-100 text-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Explore
            </Link>
            <Link 
              to="/pricing" 
              className="px-2 py-2 rounded-md hover:bg-gray-100 text-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/about" 
              className="px-2 py-2 rounded-md hover:bg-gray-100 text-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <hr className="my-2" />
            <div className="flex gap-2">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">Login</Button>
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <Button size="sm" className="w-full bg-projectshelf-accent hover:bg-projectshelf-accent/90">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
