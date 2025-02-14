/* eslint-disable react/jsx-filename-extension */
'use client'
import React from 'react';
import { motion } from 'framer-motion';
import BuildWebsite from '@/public/assests/Landingpage-hero.png';

export default function Hero() {
    return (
        <section className="hero bg-white flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 sm:px-8 lg:px-12 py-8">
            {/* Content on the left side for larger screens, top for mobile */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full lg:w-1/2 lg:pr-12 mt-8 lg:mt-0"
            >
                <h2 className="text-2xl sm:text-6xl text-lightblue font-bold leading-tight mb-5">
                    Where solution
                    <span className=""> meets Excellence</span>
                </h2>
                <p className="font-light text-xl text-theme-light-Blue leading-relaxed mb-16">
                    Welcome to Career! We ensure to make your journey interesting and memorable.
                </p>
                <button
                    className="flex items-center px-10 py-4 text-white text-xl bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg hover:from-indigo-600 hover:to-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Get Started
                    <svg
                        className="ml-2 w-6 h-6 text-white animate-bounce-x"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

            </motion.div>

            {/* Image on the right side for larger screens, top for mobile */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="flex pt-5 lg:pt-0 w-full lg:w-1/2 justify-center items-center order-first lg:order-last"
            >
                <img src={BuildWebsite.src} alt="Build Website" className="w-full max-w-md lg:max-w-lg" />
            </motion.div>
        </section>
    );
}