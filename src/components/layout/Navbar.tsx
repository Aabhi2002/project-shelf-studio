import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const NavLinks = ({ onClick }: { onClick?: () => void }) => (
  <>
    <Link to="#themes" className="text-gray-600 hover:text-projectshelf-accent transition-colors" onClick={onClick}>
      Themes
    </Link>
    <Link to="#case-studies" className="text-gray-600 hover:text-projectshelf-accent transition-colors" onClick={onClick}>
      Case Studies
    </Link>
    <Link to="#analytics" className="text-gray-600 hover:text-projectshelf-accent transition-colors" onClick={onClick}>
      Analytics
    </Link>
   
  </>
);

const AuthButtons = ({ user, signOut, onClick }: { user: any, signOut: () => void, onClick?: () => void }) => (
  <>
    {user ? (
      <Button 
        size="sm" 
        variant="outline" 
        onClick={() => { signOut(); onClick?.(); }}
        className="flex items-center gap-1 w-full md:w-auto"
      >
        <LogOut size={16} className="md:mr-2" />
       
      </Button>
    ) : (
      <div className="flex gap-2 w-full md:w-auto">
        <Link to="/login" onClick={onClick} className="flex-1 md:flex-none">
          <Button variant="outline" size="sm" className="w-full">Sign In</Button>
        </Link>
        <Link to="/signup" onClick={onClick} className="flex-1 md:flex-none">
          <Button size="sm" className="w-full bg-projectshelf-accent hover:bg-projectshelf-accent/90">
            Create Free Portfolio
          </Button>
        </Link>
      </div>
    )}
  </>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, profile, signOut } = useAuth();

  const closeMenu = () => setIsMenuOpen(false);

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
          {!user && <NavLinks />}
          <div className="ml-4 flex items-center gap-2">
            <AuthButtons user={user} signOut={signOut} />
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
            {!user && (
              <>
                 <NavLinks onClick={closeMenu} />
            <hr className="my-2" />
              </>
            )}
            <AuthButtons user={user} signOut={signOut} onClick={closeMenu} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
