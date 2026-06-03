import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../features/Home/components/Navbar';

export const MainLayout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
