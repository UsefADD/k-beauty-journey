
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RoutineProduct = () => {
  const { id } = useParams<{ id: string }>();
  
  // This would typically come from an API or database
  const productData = {
    1: { name: 'Cleanser', description: 'Gentle foam cleanser for all skin types' },
    2: { name: 'Toner', description: 'Balancing toner with hydrating properties' },
    3: { name: 'Essence', description: 'Lightweight essence for hydration and skin repair' },
    4: { name: 'Serum', description: 'Concentrated serum for targeted treatment' },
    5: { name: 'Moisturizer', description: 'Rich moisturizer to lock in hydration' },
    6: { name: 'Sunscreen', description: 'Broad-spectrum SPF 50 protection' },
    7: { name: 'Eye Cream', description: 'Rejuvenating eye cream for dark circles' },
    8: { name: 'Face Mask', description: 'Weekly treatment mask for deep nourishment' },
    9: { name: 'Night Cream', description: 'Restorative night cream for overnight repair' },
    10: { name: 'Exfoliator', description: 'Gentle exfoliator for smooth, glowing skin' },
  };
  
  const product = productData[Number(id) as keyof typeof productData];
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-knude-900 mb-4">Product Not Found</h1>
          <Link to="/shop/sets" className="text-knude-600 hover:text-knude-800 underline">
            Return to Skincare Sets
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Link to="/shop/sets" className="text-knude-600 hover:text-knude-800 mb-6 inline-block">
            ← Back to Skincare Sets
          </Link>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6 p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 flex justify-center">
                <img 
                  src="/lovable-uploads/1fce050d-7687-4a22-b079-15a6f83570c7.png" 
                  alt={product.name} 
                  className="h-48 w-auto object-contain"
                />
              </div>
              
              <div className="md:w-2/3">
                <h1 className="text-3xl font-bold text-knude-900 mb-4 font-serif">
                  {product.name}
                </h1>
                <p className="text-knude-700 mb-6">
                  {product.description}
                </p>
                
                <h2 className="text-xl font-semibold text-knude-800 mb-3">Benefits:</h2>
                <ul className="list-disc pl-5 mb-6 text-knude-700">
                  <li className="mb-2">Gentle on all skin types</li>
                  <li className="mb-2">Free from harmful chemicals</li>
                  <li className="mb-2">Formulated with natural ingredients</li>
                  <li className="mb-2">Cruelty-free and vegan</li>
                </ul>
                
                <div className="mt-6">
                  <button className="bg-knude-600 text-white px-6 py-3 rounded hover:bg-knude-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RoutineProduct;
