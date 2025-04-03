
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RoutineBanner = () => {
  const [showAll, setShowAll] = useState(true);
  
  const routineSteps = {
    fiveStep: [
      "Oil Cleanser",
      "Water-Based Cleanser",
      "Toner",
      "Serum", 
      "Moisturizer"
    ],
    tenStep: [
      "Oil Cleanser",
      "Water-Based Cleanser",
      "Exfoliator",
      "Toner",
      "Essence",
      "Treatments",
      "Sheet Masks",
      "Eye Cream",
      "Moisturizer",
      "Sunscreen (AM) / Sleeping Mask (PM)"
    ]
  };
  
  const show5Step = () => setShowAll(false);
  const show10Step = () => setShowAll(true);

  return (
    <div className="bg-white py-16 mt-8">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-knude-900 mb-8 font-serif leading-tight">
          Get started with our curated Korean Skincare Routine Sets!
        </h2>
        
        <div className="flex justify-center gap-10 mt-4 mb-8">
          <button 
            onClick={show5Step}
            className={`text-lg ${!showAll ? 'text-knude-900 font-bold' : 'text-knude-700'} hover:text-knude-900 font-medium underline`}
          >
            5 Step
          </button>
          <button 
            onClick={show10Step}
            className={`text-lg ${showAll ? 'text-knude-900 font-bold' : 'text-knude-700'} hover:text-knude-900 font-medium underline`}
          >
            10 Step
          </button>
        </div>
        
        <div className="max-w-2xl mx-auto bg-knude-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-knude-800">
            {showAll ? '10-Step Korean Skincare Routine' : '5-Step Korean Skincare Routine'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(showAll ? routineSteps.tenStep : routineSteps.fiveStep).map((step, index) => (
              <div key={index} className="flex items-center gap-2 text-left">
                <span className="bg-knude-200 text-knude-800 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <span className="text-knude-700">{step}</span>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link 
              to="/shop/sets" 
              className="k-button-primary inline-block"
            >
              SHOP ROUTINE SETS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutineBanner;
