import React, { useState } from 'react';
import { Plus, Minus, ArrowRight } from 'lucide-react';

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What is the LBS weight cost of goods transportation?",
      answer: "Mauris ut enim sit amet lacus ornare ullamcorper. Praesent placerat neque eu purus rhoncus, vel tincidunt odio ultrices. Sed theya arrum."
    },
    {
      question: "How much time it takes for LTL Freight transport?",
      answer: "We typically deliver LTL freight within 2-5 business days, depending on the distance and specific route. Transit times may vary based on location and current conditions."
    },
    {
      question: "What are the pick up points of logistics?",
      answer: "Our logistics pick-up points include warehouse facilities, distribution centers, and dedicated shipping terminals across major metropolitan areas. Contact us for specific location details."
    },
    {
      question: "What is the cost of goods transportation?",
      answer: "Transportation costs vary based on distance, weight, dimensions, and service level. Contact our team for a detailed quote tailored to your specific needs."
    }
  ];

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-16 md:py-24">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full -z-10 blur-3xl opacity-60" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-50 rounded-full -z-10 blur-3xl opacity-60" />
      
      {/* Main Flex Container */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        {/* Left Column - Header Section */}
        <div className="lg:w-1/3 lg:sticky lg:top-8 lg:self-start">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-400 text-white px-6 py-2 rounded-full text-sm font-medium mb-6 shadow-sm hover:shadow-md transition-shadow">
            <span>FREQUENTLY ASKED QUESTIONS</span>
            <ArrowRight className="w-4 h-4" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
            Do you have any question?
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">
              Find answer here
            </span>
          </h2>
          <p className="text-slate-600 text-lg mb-8">
            Some frequently asked questions about our cargo services
          </p>
          
          {/* Contact Info */}
          <div className="hidden lg:block p-6 bg-gradient-to-br from-teal-50 to-transparent rounded-2xl">
            <p className="text-slate-600">
              Still have questions?{' '}
              <a href="#" className="text-teal-600 font-medium hover:text-teal-700 transition-colors">
                Contact our support team
              </a>
            </p>
          </div>
        </div>

        {/* Right Column - FAQ Items */}
        <div className="lg:w-2/3">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="group border border-slate-200 rounded-2xl overflow-hidden bg-white hover:border-teal-100 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-medium text-slate-800 text-lg group-hover:text-teal-600 transition-colors">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0 ml-4 p-2 rounded-full bg-slate-50 group-hover:bg-teal-50 transition-colors">
                    {openIndex === index ? (
                      <Minus className="h-5 w-5 text-teal-600" />
                    ) : (
                      <Plus className="h-5 w-5 text-teal-600" />
                    )}
                  </span>
                </button>
                
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-6 pt-0 text-slate-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile Contact Section */}
          <div className="mt-12 pt-8 border-t border-slate-100 text-center lg:hidden">
            <p className="text-slate-600">
              Still have questions?{' '}
              <a href="#" className="text-teal-600 font-medium hover:text-teal-700 transition-colors">
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;