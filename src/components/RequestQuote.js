import React, { useState , useEffect } from 'react';
import { Check } from 'lucide-react';

const QuoteSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    distance: 10,
    freightType: '',
    load: '0'
  });


  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({
        duration: 1000, // Animation duration in milliseconds
        once: false, // Animation should happen only once while scrolling down
      });
    }
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const skills = [
    { name: 'Intermodal Shipping', percentage: 56 },
    { name: 'Warehousing', percentage: 98 },
    { name: 'International Shipping', percentage: 87 }
  ];

  return (
    <div className="h-auto bg-gray-50 p-16" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Section */}
          <div className="space-y-8">
            {/* Decorative Arrows */}
            <div className="flex gap-2">
              <div className="w-8 h-12">
                <svg viewBox="0 0 24 36" className="w-full h-full fill-orange-500">
                  <path d="M12 0L24 12H0L12 0ZM12 12L24 24H0L12 12ZM12 24L24 36H0L12 24Z" />
                </svg>
              </div>
              <div className="w-8 h-12">
                <svg viewBox="0 0 24 36" className="w-full h-full fill-teal-600">
                  <path d="M12 0L24 12H0L12 0ZM12 12L24 24H0L12 12ZM12 24L24 36H0L12 24Z" />
                </svg>
              </div>
            </div>

            <div>
              <span className="inline-block px-4 py-1 bg-orange-500 text-white rounded-full text-sm mb-4">
                OUR SKILLS
              </span>
              <h2 className="text-4xl font-bold text-teal-900 mb-4">
                Why we are considered the<br />best in business
              </h2>
              <p className="text-gray-600 mb-8">
                Loraic Air freight service deliver the knowledge & opportunity to optimize every
              </p>
            </div>

            {/* Skills Progress Bars */}
            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-teal-900 font-medium">{skill.name}</span>
                    <span className="text-teal-900 font-medium">{skill.percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-teal-600 rounded-full"
                      style={{ width: `${skill.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Quote Form */}
          <div className="bg-orange-500 rounded-3xl p-8 relative">
            {/* Decorative dots */}
            <div className="absolute right-4 bottom-4">
              <div className="grid grid-cols-3 gap-1">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-white/20 rounded-full" />
                ))}
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mb-6">Request Quote Form</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-white mb-4">Personal Information</h3>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white rounded-xl px-4 py-3"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white rounded-xl px-4 py-3"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <div className="flex justify-between text-white mb-2">
                  <span>Distance (Km)</span>
                  <span>{formData.distance}</span>
                </div>
                <input
                  type="range"
                  name="distance"
                  min="0"
                  max="100"
                  value={formData.distance}
                  onChange={handleChange}
                  className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white text-sm mb-2 block">Freight Type</label>
                  <select
                    name="freightType"
                    value={formData.freightType}
                    onChange={handleChange}
                    className="w-full bg-white rounded-xl px-4 py-3"
                  >
                    <option value="">Incoterms</option>
                    <option value="FOB">FOB</option>
                    <option value="CIF">CIF</option>
                    <option value="EXW">EXW</option>
                  </select>
                </div>

                <div>
                  <label className="text-white text-sm mb-2 block">Load</label>
                  <select
                    name="load"
                    value={formData.load}
                    onChange={handleChange}
                    className="w-full bg-white rounded-xl px-4 py-3"
                  >
                    <option value="0">0</option>
                    <option value="1">1-100 kg</option>
                    <option value="2">101-500 kg</option>
                    <option value="3">501+ kg</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-800 hover:bg-teal-700 text-white rounded-xl py-3 flex items-center justify-between px-6"
              >
                <span>Get A Quote</span>
                <Check className="w-5 h-5" />
              </button>
            </form>

            <div className="mt-6 text-center text-white">
              <p className="text-xl font-semibold">Or Give us a call + 098 765 4321</p>
              <p className="text-sm mt-2">The Support Centre Is Available 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteSection;