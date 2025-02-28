'use client'
import Image from "next/image";
import logo from "@/public/assests/logo.png";

export default function Navbar() {

  return (
    <nav className="flex items-center justify-between lg:px-14 pt-4 bg-white text-white shadow-md">
      <div className="flex items-center space-x-2">
        <Image src={logo} alt="Logo" width={100} height={100} className="" />
      </div>
    </nav>
  );
}

