import React from 'react';

import Navbar from '@/components/ui/Navbar';
import Sidebar from '@/components/ui/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none max-w-[17rem] bg-blue-50">
        <Sidebar />
      </div>

      <div className="flex-grow flex flex-col overflow-hidden">
        <Navbar />

        <div className="flex-grow md:overflow-y-auto overflow-x-hidden px-6">
          {children}
        </div>
      </div>
    </div>
  );
}
