'use client'
import React from 'react';
import Image from 'next/image';
import { useUser } from '@/context/UserContext';
import logo from '@/public/assests/logo.png';

const DashboardPage = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-4xl w-full border border-lightblue">
        <div className="flex items-center justify-center mb-6 bg-white">
          <Image src={logo} alt="JobConnect Logo" width={100} height={100} className="" />
        </div>
        <h1 className="lg:text-4xl font-extrabold text-gray-700 text-center mb-4 text-lg">
          Good Evening Sir, <span className="text-darkblue">{user?.name}</span>
        </h1>
        <p className="text-lg text-gray-600 text-center mb-6">
          Welcome to <span className="text-darkblue font-semibold">JobConnect</span>! Your one-stop solution to manage your career growth.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-blue-100 rounded-xl shadow-md hover:shadow-xl transition-all border border-lightblue">
            <h2 className="lg:text-2xl font-bold text-darkblue text-lg">Find New Jobs</h2>
            <p className="text-gray-600 mt-2">Browse the latest job postings tailored to your skills and preferences.</p>
          </div>
          <div className="p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-lightblue">
            <h2 className="lg:text-2xl font-bold text-darkblue text-lg">Manage Applications</h2>
            <p className="text-gray-600 mt-2">Track the status of your job applications and upcoming interviews.</p>
          </div>
        </div>
        <p className="text-center text-gray-500 mt-8">
          Select an option from the sidebar to get started, or explore the sections above.
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
