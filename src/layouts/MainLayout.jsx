import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';

const MainLayout = () => {

  return (
    <div className="min-h-screen ">
      <Navbar />
      <div className="container mx-auto md:px-4 pt-20">
        <div className="grid grid-cols-12 gap-4">
          <LeftSidebar />
          <div className="col-span-12 lg:col-span-6">
            <main className="flex-1">
              <Outlet />
            </main>
          </div>
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default MainLayout; 