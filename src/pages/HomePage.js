import React, { useState } from 'react';
import TrackerProgress from '../components/TrackerProgress.js';
import { 
  Truck, 
  Package, 
  MapPin, 
  CheckCircle,
  Menu,
  X
} from 'lucide-react';

const LogisticsHomepage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const COLORS = {
    darkGray: '#333333',
    orange: '#ff853e',
    white: '#ffffff'
  };

  const services = [
    {
      icon: <Truck className="w-12 h-12" color={COLORS.orange} />,
      title: "Transportation",
      description: "Efficient transportation solutions for your business"
    },
    {
      icon: <Package className="w-12 h-12" color={COLORS.orange} />,
      title: "Packaging",
      description: "Secure and professional packaging services"
    },
    {
      icon: <MapPin className="w-12 h-12" color={COLORS.orange} />,
      title: "Local Delivery",
      description: "Fast and reliable local delivery network"
    }
  ];

  return (
    <div className="bg-white">
      {/* Navigation */}
      <nav 
        className="fixed w-full z-50 py-4"
        style={{ backgroundColor: COLORS.darkGray }}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="text-white text-2xl font-bold">ADYO Logistics</div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            <a href="#" className="text-white hover:text-[#ff853e] transition">Home</a>
            <a href="#" className="text-white hover:text-[#ff853e] transition">Services</a>
            <a href="#" className="text-white hover:text-[#ff853e] transition">About</a>
            <a href="#" className="text-white hover:text-[#ff853e] transition">Contact</a>
            <button 
              className="px-6 py-2 rounded-full text-white"
              style={{ 
                backgroundColor: COLORS.orange,
                color: COLORS.white
              }}
            >
              Get Quote
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div 
            className="md:hidden absolute left-0 right-0 top-full"
            style={{ backgroundColor: COLORS.darkGray }}
          >
            <div className="flex flex-col space-y-4 p-4">
              <a href="#" className="text-white">Home</a>
              <a href="#" className="text-white">Services</a>
              <a href="#" className="text-white">About</a>
              <a href="#" className="text-white">Contact</a>
              <button 
                className="px-6 py-2 rounded-full text-white"
                style={{ 
                  backgroundColor: COLORS.orange,
                  color: COLORS.white
                }}
              >
                Get Quote
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header 
        className="relative pt-24 pb-16 text-white flex items-center"
        style={{ backgroundColor: COLORS.darkGray }}
      >
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 
              className="text-4xl font-bold mb-4"
              style={{ color: COLORS.orange }}
            >
              Reliable Logistics Solutions
            </h1>
            <p className="text-xl mb-6">
              Streamline your shipping with our comprehensive logistics services
            </p>
            <div className="flex space-x-4">
              <button 
                className="px-6 py-3 rounded-full"
                style={{ 
                  backgroundColor: COLORS.orange,
                  color: COLORS.white
                }}
              >
                Our Services
              </button>
              <button 
                className="px-6 py-3 rounded-full border"
                style={{ 
                  borderColor: COLORS.orange,
                  color: COLORS.orange
                }}
              >
                Contact Us
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            <Truck size={300} color={COLORS.orange} />
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 
            className="text-3xl font-bold text-center mb-12"
            style={{ color: COLORS.darkGray }}
          >
            Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="text-center p-6 rounded-lg shadow-md"
                style={{ borderColor: COLORS.orange }}
              >
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                <h3 
                  className="text-xl font-semibold mb-3"
                  style={{ color: COLORS.darkGray }}
                >
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
          <TrackerProgress/>
      {/* Footer */}
      <footer 
        className="py-12 text-white"
        style={{ backgroundColor: COLORS.darkGray }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h4 className="text-2xl font-bold mb-4">ADYO Logistics</h4>
          <p className="mb-6">
            Your trusted partner in efficient logistics and transportation
          </p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:text-[#ff853e] transition">Home</a>
            <a href="#" className="hover:text-[#ff853e] transition">Services</a>
            <a href="#" className="hover:text-[#ff853e] transition">About</a>
            <a href="#" className="hover:text-[#ff853e] transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LogisticsHomepage;