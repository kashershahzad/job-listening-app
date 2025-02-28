import React from 'react';
import {
  Facebook,
  Twitter,
  LinkedIn,
  Email,
  Phone,
  GitHub,
  LocationOn,
  Send,
  Instagram
} from '@mui/icons-material';

const Footer = () => {
  return (
    <footer className="bg-darkblue text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold tracking-wide">JobConnect</h3>
            <p className="text-gray-300 text-lg max-w-md">
              Empowering careers, connecting opportunities. Your journey to success starts here.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://github.com/kashershahzad" 
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300"
                aria-label="GitHub"
              >
                <GitHub />
              </a>
              <a 
                href="#" 
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300"
                aria-label="https://www.instagram.com/kasher_shahzad/"
              >
                <Instagram />
              </a>
              <a 
                href="https://www.linkedin.com/in/kasher-shahzad-223579288/1" 
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <LinkedIn />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-2xl font-semibold">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Email className="text-blue-400" />
                <a 
                  href="mailto:contact@jobconnect.com" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  kashershahzadprogramming@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-blue-400" />
                <a 
                  href="tel:+1234567890" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  +92 309 7962525
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Developed By Kasher Shahzad</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;