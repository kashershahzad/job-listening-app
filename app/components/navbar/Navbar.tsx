'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@/public/assests/logo.png";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between lg:px-14 pt-4 bg-white text-white shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Image src={logo} alt="Logo" width={100} height={100} className="" />
      </div>

      {/* Button with Navigation */}
      <button 
        onClick={() => router.push('/signup')}
        className="px-10 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg hover:from-indigo-600 hover:to-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
      >
        Get Started
      </button>
    </nav>
  );
}

