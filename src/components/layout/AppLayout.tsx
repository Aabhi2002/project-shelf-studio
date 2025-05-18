import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const AppLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      {!isHomePage && <Navbar />}
      <main className="flex-grow">
        <Outlet />
      </main>
      {!isHomePage && <Footer />}
    </div>
  );
};

export default AppLayout;
