import React, { useState } from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  MapPin 
} from 'lucide-react';

const TrackingProgress = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [currentStage, setCurrentStage] = useState(null);

  const trackingStages = [
    { 
      name: 'Placed', 
      icon: <Package className="w-6 h-6" />,
      description: 'Order has been placed successfully'
    },
    { 
      name: 'In Progress', 
      icon: <Package className="w-6 h-6" />,
      description: 'Processing and preparing for shipment'
    },
    { 
      name: 'Transit', 
      icon: <Truck className="w-6 h-6" />,
      description: 'Shipment is on its way'
    },
    { 
      name: 'Delivered', 
      icon: <CheckCircle className="w-6 h-6" />,
      description: 'Package has been delivered'
    }
  ];

  const trackShipment = () => {
    // Simulated tracking logic
    const randomStage = trackingStages[Math.floor(Math.random() * trackingStages.length)];
    setCurrentStage(randomStage.name);
  };

  return (
    <section className="bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Track Your Shipment</h2>
        <div className="bg-gray-100 p-8 rounded-xl shadow-md">
          <div className="flex items-center space-x-4 mb-8">
            <input 
              type="text" 
              placeholder="Enter Tracking Number" 
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={trackShipment}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Track
            </button>
          </div>

          {/* Tracking Stages */}
          <div className="flex justify-between items-center relative">
            {trackingStages.map((stage, index) => (
              <div 
                key={stage.name} 
                className="flex flex-col items-center relative z-10"
              >
                <div 
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center
                    ${currentStage === stage.name 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                    }
                  `}
                >
                  {stage.icon}
                </div>
                <span 
                  className={`
                    mt-2 text-sm text-center
                    ${currentStage === stage.name ? 'font-bold' : 'text-gray-500'}
                  `}
                >
                  {stage.name}
                </span>
              </div>
            ))}
            {/* Progress Line */}
            <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 -z-10">
              <div 
                className="h-full bg-blue-500" 
                style={{
                  width: `${
                    currentStage === 'Placed' ? '25%' :
                    currentStage === 'In Progress' ? '50%' :
                    currentStage === 'Transit' ? '75%' : '100%'
                  }`
                }}
              />
            </div>
          </div>

          {/* Current Stage Description */}
          {currentStage && (
            <div className="mt-8 text-center">
              <p className="text-lg font-semibold">
                {trackingStages.find(stage => stage.name === currentStage)?.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrackingProgress;