
import React from 'react';
import { useBrands } from '../hooks/useBrands';

const AlphabetNavigation = () => {
  const { availableLetters, selectedLetter, setSelectedLetter } = useBrands();
  
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8 p-4 bg-white rounded-xl shadow-sm">
      {availableLetters.map((letter) => (
        <div
          key={letter}
          className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer font-bold transition-all duration-300 hover:bg-blue-500 hover:text-white hover:-translate-y-0.5 ${
            selectedLetter === letter 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setSelectedLetter(letter)}
        >
          {letter}
        </div>
      ))}
    </div>
  );
};

export default AlphabetNavigation;
