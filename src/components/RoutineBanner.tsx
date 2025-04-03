
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RoutineBanner = () => {
  const [showAll, setShowAll] = useState(true);
  
  const skincareProducts = [
    { id: 0, alt: "Pump bottle", src: "/lovable-uploads/dfec551c-93c6-4b35-8a14-3c860a4cc0b0.png" },
    { id: 1, alt: "Skincare product 1", src: "https://storage.googleapis.com/a1aa/image/5ETxBs71ZR4gMV8PwVjGn9CY-jt2DZybsHdaZ_VYKDM.jpg" },
    { id: 2, alt: "Skincare product 2", src: "https://storage.googleapis.com/a1aa/image/WFHPbQlYTD_XgBialwamWAAi4rJnGabfnmlIbeHEHGM.jpg" },
    { id: 3, alt: "Skincare product 3", src: "https://storage.googleapis.com/a1aa/image/owJX-WuFwzGxCgkWJbuwSE4jn0mmeG_sUVsbcUSQgJ4.jpg" },
    { id: 4, alt: "Skincare product 4", src: "https://storage.googleapis.com/a1aa/image/PfIBWlMn5C9ag4fnvVtgAj4qvQoAykN5L1-XRp7XEfA.jpg" },
    { id: 5, alt: "Skincare product 5", src: "https://storage.googleapis.com/a1aa/image/fqItoSTQm7Vy7C5N1CpkimOmEv9Wcw2Dho0vsoZDA6c.jpg" },
    { id: 6, alt: "Skincare product 6", src: "https://storage.googleapis.com/a1aa/image/NS60ixinw9noq-gv1P4NA7w0MdLG-OcBiwLOVJHP65Q.jpg" },
    { id: 7, alt: "Skincare product 7", src: "https://storage.googleapis.com/a1aa/image/n4Vn5sXfU8IspWhXCWvZocGbznFQUjS6L0KGSAFWh_0.jpg" },
    { id: 8, alt: "Skincare product 8", src: "https://storage.googleapis.com/a1aa/image/9ieMsnYtlrUvieqPJqxuXXfwWyTN8PLj8wR7p-ylYF8.jpg" },
    { id: 9, alt: "Skincare product 9", src: "https://storage.googleapis.com/a1aa/image/xAHytvKx0flYW9hv9PiJi0TdDtod_krH-97fdyvieBE.jpg" },
    { id: 10, alt: "Skincare product 10", src: "https://storage.googleapis.com/a1aa/image/unuptg74CIt8JRrJmU3nZgDVtMbFCV438VSF7h6mQPM.jpg" },
  ];
  
  const show5Step = () => setShowAll(false);
  const show10Step = () => setShowAll(true);

  return (
    <div className="bg-white py-16 mt-8">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-knude-900 mb-8 font-serif leading-tight">
          Get started with our curated Korean Skincare Routine Sets!
        </h2>
        
        <div className="flex justify-center flex-wrap gap-3 mb-6 max-w-4xl mx-auto">
          {skincareProducts.map((product, index) => (
            <Link 
              key={product.id} 
              to="/shop/sets" 
              className={`transition-transform hover:scale-105 ${!showAll && index >= 5 ? 'hidden' : ''}`}
            >
              <div className={`relative ${index === 0 ? 'bg-white' : 'bg-white'} p-2 rounded-lg shadow-md overflow-hidden`}>
                <img 
                  src={product.src} 
                  alt={product.alt} 
                  className={`object-contain ${index === 0 ? 'h-24 md:h-28' : 'h-20 md:h-24'} w-auto max-w-full`}
                  loading={index < 5 ? "eager" : "lazy"}
                  draggable="false"
                  style={{ 
                    imageRendering: 'high-quality',
                    filter: 'contrast(1.05) brightness(1.02)'
                  }}
                />
              </div>
            </Link>
          ))}
        </div>
        
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
      </div>
    </div>
  );
};

export default RoutineBanner;
