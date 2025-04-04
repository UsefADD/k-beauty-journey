import React from 'react';
const HeroSection = () => {
  return <div className="bg-gradient-to-b from-cream-50 to-cream-200 py-16 md:py-24">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
          <h1 className="text-4xl text-cream-900 mb-6 font-serif leading-tight md:text-5xl font-bold">
            THE K-BEAUTY<br />ESSENTIALS
          </h1>
          <p className="text-lg text-cream-800 mb-8 max-w-xl">
            Begin your K-Beauty journey with our curated collection of essentials, 
            including best-sellers known for their ability to hydrate, refine, and
            reveal a luminous, glass skin.
          </p>
          <button className="k-button-secondary">SHOP BEST SELLERS</button>
        </div>
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative h-[400px] w-[320px] md:h-[450px] md:w-[380px]">
            <img src="/placeholder.svg" alt="NEOGEN Sunscreen" className="absolute top-0 right-0 w-32 md:w-40 shadow-lg rounded-lg transform hover:scale-105 transition-transform z-10" />
            <img src="/placeholder.svg" alt="I'm From Rice Toner" className="absolute top-16 left-8 w-32 md:w-40 shadow-lg rounded-lg transform hover:scale-105 transition-transform z-20" />
            <img src="/placeholder.svg" alt="KLAIRS Vitamin C" className="absolute bottom-0 left-0 w-32 md:w-40 shadow-lg rounded-lg transform hover:scale-105 transition-transform z-30" />
            <img src="/placeholder.svg" alt="HANSKIN Cleansing Oil" className="absolute bottom-16 right-8 w-32 md:w-40 shadow-lg rounded-lg transform hover:scale-105 transition-transform z-40" />
          </div>
        </div>
      </div>
    </div>;
};
export default HeroSection;