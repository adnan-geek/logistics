import { Truck, Users, Globe, Award, ArrowRight, CheckCircle, Package } from "lucide-react";
import React from "react";

const AboutUs = () => {
  const stats = [
    { label: "Years Experience", value: "25+", Icon: Award },
    { label: "Countries Served", value: "150+", Icon: Globe },
    { label: "Team Members", value: "1200+", Icon: Users },
    { label: "Deliveries", value: "500K+", Icon: Package }
  ];

  const features = [
    "Global logistics network with local expertise",
    "24/7 real-time shipment tracking",
    "Custom supply chain solutions",
    "Sustainable transportation practices"
  ];

  return (
    <div className="relative bg-[#333] text-white overflow-hidden">


      <div className="relative max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 text-teal-400 px-6 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <Truck className="w-4 h-4" />
              <span>ABOUT OUR COMPANY</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Leading the Way in
              <span className=" from-teal-400 to-blue-400 color">
                {" "}Global <span style={{color:"#f97316"}}>Logistics</span>
              </span>
            </h2>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              For over two decades, we have been revolutionizing the logistics industry with innovative solutions and unwavering commitment to excellence. Our global network and cutting-edge technology ensure seamless supply chain operations for businesses worldwide.
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            <button className="inline-flex items-center gap-2 bg-[#f97316] from-teal-500 to-teal-400 text-white px-6 py-3 rounded-lg font-medium hover:from-teal-600 hover:to-teal-500 transition-all duration-300 shadow-lg hover:shadow-xl">
              Learn More
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Column - Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-[#f97316] backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-colors duration-300"
              >
                <div className="bg-teal-400/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <stat.Icon className="w-6 h-6 text-teal-400" />
                </div>
                <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section - Company Timeline */}
        <div className="mt-20 grid md:grid-cols-4 gap-8 border-t border-white/10 pt-16">
          {[
            { year: "1998", text: "Company Founded" },
            { year: "2005", text: "Global Expansion" },
            { year: "2015", text: "Digital Transformation" },
            { year: "2023", text: "Sustainability Initiative" }
          ].map((item, index) => (
            <div key={index} className="relative">
              <div className="text-teal-400 text-xl font-bold mb-2">{item.year}</div>
              <div className="text-gray-300">{item.text}</div>
              {index < 3 && (
                <div className="hidden md:block absolute top-3 right-0 w-full border-t border-dashed border-white/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;