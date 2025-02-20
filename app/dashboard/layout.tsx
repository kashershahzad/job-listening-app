'use client';

import React, { useState, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Toolbar, Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

interface MenuItem {
  text: string;
  icon: string;
  path: string;
}

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);

  const menuItems: MenuItem[] = [
    { text: 'Profile', icon: '👤', path: '/dashboard/profile' },
    { text: 'Create Job', icon: '➕', path: '/dashboard/create-job' },
    { text: 'Total Jobs', icon: '📋', path: '/dashboard/total-job' },
    { text: 'Posted Jobs', icon: '📋', path: '/dashboard/posted-jobs' },
    { text: 'Applied Jobs', icon: '📋', path: '/dashboard/job-Requests' },
    { text: 'Hiring Requests', icon: '📋', path: '/dashboard/posted-jobs' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <IconButton
        className="absolute top-4 left-4 z-50 md:hidden"
        onClick={() => setOpen(true)}
      >
        <MenuIcon className="text-white bg-gray-900 p-2 rounded-full" />
      </IconButton>

      {/* Sidebar */}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        variant="temporary"
        className="md:hidden"
      >
        <div className="w-64 bg-gray-900 text-white min-h-screen p-4">
          <div className="flex justify-between items-center mb-4">
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon className="text-white" />
            </IconButton>
          </div>
          {menuItems.map((item) => (
            <Link key={item.text} href={item.path} passHref>
              <div
                className={`flex items-center space-x-4 px-4 py-2 rounded-lg cursor-pointer transition-all hover:bg-gray-700 ${pathname === item.path ? 'bg-gray-600' : ''}`}
              >
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            </Link>
          ))}
        </div>
      </Drawer>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 bg-gray-900 text-white min-h-screen flex-col p-4">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
        {menuItems.map((item) => (
          <Link key={item.text} href={item.path} passHref>
            <div
              className={`flex items-center space-x-4 px-4 py-2 rounded-lg cursor-pointer transition-all hover:bg-gray-700 ${pathname === item.path ? 'bg-gray-600' : ''}`}
            >
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6">
        <Toolbar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;