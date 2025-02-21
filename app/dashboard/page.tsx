'use client'
import React from 'react';
import { useUser } from '@/context/UserContext';

const DashboardPage = () => {
  const { user} = useUser();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Good Evening Sir {user?.name}</h1>
      <p className="text-gray-600">Select an option from the sidebar to get started.</p>
    </div>
  );
};

export default DashboardPage;