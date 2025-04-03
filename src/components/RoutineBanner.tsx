
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const RoutineBanner = () => {
  const [showAll, setShowAll] = useState(true);
  
  const skincareProducts = [
    { id: 0, alt: "Pump bottle", src: "/lovable-uploads/c809b1f4-410a-4cda-b9c6-ad44592c7a0f.png" },
    { id: 1, alt: "Tube product", src: "/lovable-uploads/cc23b59f-9410-4652-9265-f17b0a71ef51.png" },
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
        
        <div className="max-w-4xl mx-auto mb-10">
          <img 
            src="/lovable-uploads/a18cda7b-9823-4d1a-86f9-4698edd0b43a.png" 
            alt="Korean Skincare Products Outline" 
            className="w-full h-auto object-contain"
          />
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {skincareProducts.slice(0, showAll ? 10 : 5).map((product) => (
            <div key={product.id} className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden shadow-md">
              <img 
                src={product.src} 
                alt={product.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link to="/shop/sets">
            <Button variant="default" size="lg" className="bg-knude-700 hover:bg-knude-800 text-white">
              Shop Routine Sets
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoutineBanner;
