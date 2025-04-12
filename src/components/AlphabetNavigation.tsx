
import React from 'react';

const AlphabetNavigation = () => {
  const alphabet = ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  
  return (
    <div className="flex flex-wrap justify-center space-x-2 text-lg mb-4">
      {alphabet.map((letter) => (
        <a 
          key={letter} 
          href={`#${letter}`} 
          className="text-pink-600 hover:text-pink-800 transition-colors"
        >
          {letter}
        </a>
      ))}
    </div>
  );
};

export default AlphabetNavigation;
