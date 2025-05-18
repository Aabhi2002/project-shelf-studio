import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Image, LayoutGrid, UserCircle, BarChart, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const DashboardLayout = () => {
  const location = useLocation();
  const { signOut } = useAuth();
  
  const navItems = [
    { icon: Home, label: 'Overview', path: '/dashboard' },
    { icon: LayoutGrid, label: 'Projects', path: '/dashboard/projects' },
    // { icon: Image, label: 'Media', path: '/dashboard/media' },
    { icon: BarChart, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: UserCircle, label: 'Profile', path: '/dashboard/profile' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <div className="flex min-h-screen bg-projectshelf-secondary">
      {/* Sidebar */}
      <aside className="w-64 hidden md:block bg-white border-r border-gray-200 p-4">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <div className="h-8 w-8 rounded-md bg-projectshelf-accent flex items-center justify-center">
            <span className="text-white font-bold">PS</span>
          </div>
          <span className="text-lg font-semibold text-projectshelf-primary">ProjectShelf</span>
        </Link>

        <nav className="space-y-1">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === item.path 
                  ? 'bg-projectshelf-accent/10 text-projectshelf-accent' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}

          <div className="pt-4 mt-4 border-t border-gray-200">
            <Button variant="ghost" className="w-full justify-start" onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </nav>
      </aside>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 z-10">
        <div className="flex justify-around items-center">
          {navItems.slice(0, 5).map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 px-3 py-3 text-xs font-medium ${
                location.pathname === item.path 
                  ? 'text-projectshelf-accent' 
                  : 'text-gray-600'
              }`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto pb-16 md:pb-0">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
