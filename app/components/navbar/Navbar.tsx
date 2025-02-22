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
      {/* <button 
        onClick={() => router.push('/signup')}
        className="flex items-center px-10 py-4 text-white text-xl bg-gradient-to-r from-lightblue to-darkblue rounded-lg shadow-lg hover:from-darkblue hover:to-lightblue transition duration-300 ease-in-out transform hover:scale-105"
      >
        Get Started
      </button> */}
    </nav>
  );
}

