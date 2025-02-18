'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Toolbar } from '@mui/material';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const menuItems = [
    {
      text: 'Profile',
      icon: '👤',
      path: '/dashboard/profile',
    },
    {
      text: 'Create Job',
      icon: '➕',
      path: '/dashboard/create-job',
    },
    {
      text: 'Total Jobs',
      icon: '📋',
      path: '/dashboard/total-job',
    },
    {
      text: 'Posted Jobs',
      icon: '📋',
      path: '/dashboard/posted-jobs',
    },
    {
      text: 'Applied Jobs',
      icon: '📋',
      path: '/dashboard/posted-jobs',
    },
    {
      text: 'Hiring Requests',
      icon: '📋',
      path: '/dashboard/posted-jobs',
    },
  ];

  return (
    <div className="flex">
      <div className="w-[240px] bg-gray-800 text-white min-h-screen">
        <div className="py-4 px-6">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
        </div>
        <div>
          {menuItems.map((item) => (
            <Link key={item.text} href={item.path} passHref>
              <div
                className={`flex items-center space-x-4 px-4 py-2 hover:bg-gray-700 rounded-lg cursor-pointer ${pathname === item.path ? 'bg-gray-600' : ''}`}
              >
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex-grow p-6 bg-gray-100">
        <Toolbar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
