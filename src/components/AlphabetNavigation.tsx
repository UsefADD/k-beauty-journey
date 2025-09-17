
import React from 'react';
import { useBrands } from '../hooks/useBrands';

const AlphabetNavigation = () => {
  const { availableLetters, selectedLetter, setSelectedLetter } = useBrands();
  
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-10 p-5 bg-white rounded-2xl shadow-sm">
      {availableLetters.map((letter) => (
        <div
          key={letter}
          className={`w-12 h-12 flex items-center justify-center rounded-full cursor-pointer font-bold text-lg transition-all duration-300 hover:bg-blue-500 hover:text-white hover:-translate-y-1 hover:shadow-lg ${
            selectedLetter === letter 
              ? 'bg-blue-500 text-white scale-110' 
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
