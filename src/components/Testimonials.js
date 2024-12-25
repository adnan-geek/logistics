import React, { useState, useEffect } from 'react';
import { Star, TrendingUp, Timer, Globe, ChevronLeft, ChevronRight, Truck } from 'lucide-react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Robert Chen",
      position: "Supply Chain Director",
      company: "Global Trade Co",
      image: "/api/placeholder/80/80",
      text: "Their logistics solutions have dramatically improved our supply chain efficiency. We've seen a 40% reduction in delivery times and significant cost savings.",
      rating: 5,
      stats: {
        efficiency: "40% faster",
        coverage: "Global",
      }
    },
    {
      name: "Sarah Martinez",
      position: "Operations Manager",
      company: "Express Retail",
      image: "/api/placeholder/80/80",
      text: "The real-time tracking and professional handling of our cargo have made a huge difference. Their dedication to timely delivery is outstanding.",
      rating: 5,
      stats: {
        satisfaction: "99.8%",
        delivery: "On-time",
      }
    },
    {
      name: "Michael Thompson",
      position: "Logistics Coordinator",
      company: "Tech Industries",
      image: "/api/placeholder/80/80",
      text: "We've been working with them for over 5 years now. Their consistency and reliability in handling our international shipments is unmatched.",
      rating: 5,
      stats: {
        experience: "5+ years",
        reach: "International",
      }
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((current) => 
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  return (
    <div className="relative  py-16 md:py-24 overflow-hidden">
 

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white text-teal-600 px-6 py-2 rounded-full text-sm font-medium mb-6 shadow-sm" style={{color:'#ff853e'}}>
            <Truck className="w-4 h-4" />
            <span >CLIENT TESTIMONIALS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" style={{color:'#333'}}>
            Trusted by Leading
            <span style={{color:'#ff853e'}}>
              {" "}Companies
            </span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            See what our clients say about our logistics and transportation services
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute inset-y-0 left-0 md:-left-12 flex items-center">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white shadow-lg hover:bg-teal-50 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-teal-600" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 md:-right-12 flex items-center">
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white shadow-lg hover:bg-teal-50 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-teal-600" />
            </button>
          </div>

          {/* Testimonial Cards */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <div className="flex items-center gap-4 mb-6">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-lg text-slate-800">
                          {testimonial.name}
                        </h3>
                        <p className="text-slate-600">
                          {testimonial.position} at {testimonial.company}
                        </p>
                      </div>
                      <div className="ml-auto flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>

                    <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                      "{testimonial.text}"
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                      {Object.entries(testimonial.stats).map(([key, value], i) => (
                        <div key={key} className="flex items-center gap-3">
                          {i === 0 ? (
                            <TrendingUp className="w-10 h-10 text-teal-600 bg-teal-50 p-2 rounded-lg" />
                          ) : (
                            <Globe className="w-10 h-10 text-teal-600 bg-teal-50 p-2 rounded-lg" />
                          )}
                          <div>
                            <p className="text-sm text-slate-500 capitalize">{key}</p>
                            <p className="font-semibold text-slate-800">{value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === index 
                    ? 'bg-teal-600 w-8' 
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;