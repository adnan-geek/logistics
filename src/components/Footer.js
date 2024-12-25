import React from 'react';
import { Facebook, Twitter, Globe, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#333] text-gray-400 py-8">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
          <h2 className="text-3xl md:text-4xl text-white font-bold max-w-md mb-4 md:mb-0">
            We Understand The Importance Approaching Each Work!
          </h2>
          <a href="tel:+12126839756" className="text-orange-500 text-2xl font-bold hover:text-orange-400">
            + 1 212-683-9756
          </a>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Column */}
          <div>
            <h3 className="text-white font-bold mb-4">COMPANY</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Company</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press & Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Open Hour Column */}
          <div>
            <h3 className="text-white font-bold mb-4">OPEN HOUR</h3>
            <ul className="space-y-3">
              <li>Monday 11am-7pm</li>
              <li>Tuesday-Friday 11am-8pm</li>
              <li>Saturday 10am-6pm</li>
              <li>Sunday 11am-6pm</li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-white font-bold mb-4">RESOURCES</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-white transition-colors">Home Insurance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Travel Insurance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Car Insurance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Business Insurance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Heal Insurance</a></li>
            </ul>
          </div>

          {/* Logo and Description */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-500 transform -skew-x-12"></div>
              <div className="ml-2">
                <div className="text-white font-bold">LOGISTIC</div>
                <div className="text-white text-sm">EXPRESS</div>
              </div>
            </div>
            <p className="text-sm mb-4">
              The trade war currently ensuing between the US and several nations around the globe, most fiercely with.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Globe size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-sm border-t border-gray-700 pt-8">
          <p>
            Copyright ©2024 All rights reserved 
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;