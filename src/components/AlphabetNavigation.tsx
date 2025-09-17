
import React from 'react';
import { useBrands } from '../hooks/useBrands';

const AlphabetNavigation = () => {
  const { availableLetters, selectedLetter, setSelectedLetter } = useBrands();
  
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-10 p-5 bg-white rounded-2xl shadow-sm">
      {availableLetters.map((letter) => (
        <div
          key={letter}
          className={`w-11 h-11 flex items-center justify-center rounded-full cursor-pointer font-bold text-base transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:-translate-y-1 hover:shadow-lg ${
            selectedLetter === letter 
              ? 'bg-primary text-primary-foreground scale-110' 
              : 'bg-muted text-foreground'
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
