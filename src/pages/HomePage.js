import React, { useState } from 'react';
import TrackerProgress from '../components/TrackerProgress.js';
import RequestQuote from '../components/RequestQuote.js';
import TestimonialSlider  from '../components/Testimonials.js';
import AboutUs from '../components/AboutUs.js';
import Faqs from '../components/Faqs.js';
import Footer  from '../components/Footer.js';
import port from '../imgs/h1_hero.jpg.webp'
import { 
  Truck,
  Twitter,
  Youtube,
  Linkedin,
  Instagram,
  Plane,
  Ship, 
  MapPin, 
  CheckCircle,
  Menu,
  X,
  Phone
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
      title: "Land Transport",
      description: "The sea freight service has grown conside rably in recent years. We spend timetting to know your processes to."
    },
    {
      icon: <Ship className="w-12 h-12" color={COLORS.orange} />,
      title: "Ship Transport",
      description: "The sea freight service has grown conside rably in recent years. We spend timetting to know your processes to."
    },
    {
      icon: <Plane className="w-12 h-12" color={COLORS.orange} />,
      title: "Air Transport",
      description: "The sea freight service has grown conside rably in recent years. We spend timetting to know your processes to."
    }
  ];

  return (
    <div className="bg-white">
      {/* banner */}
      <div className="text-white py-2 border-b border-white border-[#e3dddd3d]" style={{backgroundColor : COLORS.darkGray}}  >
            <div className="container mx-auto px-4">
                {/* Inner container with max width */}
                <div className="max-w-7xl w-full mx-auto flex justify-between items-center">
                    {/* Info Section (Phone & Email) */}
                    <div className="flex space-x-6">
                        <span className="text-sm">Phone: +99 (0) 101 0000 888</span>
                        <span className="text-sm">Email: noreply@yourdomain.com</span>
                    </div>

                    {/* Social Media Section */}
                    <div className="flex space-x-4">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs hover:underline"
                        >
                            <Instagram/>
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs hover:underline"
                        >
                            <Twitter />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs hover:underline"
                        >
                            <Linkedin/>
                            
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm hover:underline"
                        >
                            <Youtube />
                            
                        </a>
                    </div>
                </div>
            </div>
        </div>
      {/* Navigation */}
      <nav 
        className="sticky top-0 w-full z-50 py-4"
        style={{ backgroundColor: COLORS.darkGray }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">ADYO Logistics</div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            <a href="#" className="text-white hover:text-[#ff853e] transition">Home</a>
            <a href="#" className="text-white hover:text-[#ff853e] transition">Services</a>
            <a href="#" className="text-white">Track Shipments</a>
              <a href="#" className="text-white">About us</a>
            <a href="#" className="text-white hover:text-[#ff853e] transition">Contact</a>
           
          </div>
          <button 
              className="px-6 py-2 rounded-md text-white flex"
              style={{ 
                backgroundColor: COLORS.orange,
                color: COLORS.white
              }}
            >
             <Phone/> <span className='pl-2'>+340 254 3698</span>
            </button>
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
              <a href="#" className="text-white">Track Shipments</a>
              <a href="#" className="text-white">About us</a>
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
        style={{
          height :'800px',
          backgroundImage: `url(${port})`,
          backgroundSize: 'cover',        // You can use 'cover', 'contain', or specific values like '100%' etc.
          backgroundPosition: 'center',   // Use 'center', 'top', 'bottom', 'left', 'right', or custom values
          backgroundRepeat: 'no-repeat'   // 'no-repeat', 'repeat', or 'repeat-x', 'repeat-y' 
        }}
      >
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center" >
          <div>
            <h1 
              className="text-6xl font-bold mb-4"
              style={{ color: COLORS.orange }}
            >
              Reliable Logistics Solutions
            </h1>
            <p className="text-2xl mb-6">
              Streamline your shipping with our comprehensive logistics services
            </p>
            <div className="flex space-x-4">
              <button 
                className="px-6 py-3 rounded-md"
                style={{ 
                  backgroundColor: COLORS.orange,
                  color: COLORS.white
                }}
              >
                Our Services
              </button>
              <button 
                className="px-6 py-3 rounded-md border"
                style={{ 
                  borderColor: COLORS.orange,
                  color: COLORS.orange
                }}
              >
                Contact Us
              </button>
            </div>
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
           What We Can Do For You

          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="text-center  h-96 p-6 rounded-lg shadow-md relative group cursor-pointer"
                style={{ borderColor: COLORS.orange }}
              >
                        <div className="absolute bottom-0 left-0 w-full  opacity-0 group-hover:opacity-100 group-hover:h-full h-0 transition-all duration-500 ease-in-out" style={{backgroundColor:COLORS.orange}} ></div>
                <div className='relative z-4'>
                <div className="flex justify-center my-10 group-hover:stroke-black stroke-current">
                      {React.cloneElement(service.icon, {
                            className: "w-12 h-12 group-hover:stroke-white"
                          })}
                      </div>
                <h3 
                  className="text-4xl font-semibold mb-3"
                  style={{ color: COLORS.darkGray }}
                >
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-8" >{service.description}</p>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </section>
          <TrackerProgress/>
          <TestimonialSlider/>
          <RequestQuote/>
         
          <AboutUs/>
          <Faqs/>
      {/* Footer */}
        <Footer/>
    </div>
  );
};

export default LogisticsHomepage;