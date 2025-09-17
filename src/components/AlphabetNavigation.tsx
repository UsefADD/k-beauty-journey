
import React from 'react';
import { Button } from './ui/button';
import { useBrands } from '../hooks/useBrands';

const AlphabetNavigation = () => {
  const { availableLetters, selectedLetter, setSelectedLetter } = useBrands();
  
  return (
    <div className="flex flex-wrap justify-center gap-1 mb-6">
      <Button
        variant={selectedLetter === '' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setSelectedLetter('')}
        className="min-w-[40px]"
      >
        ALL
      </Button>
      {availableLetters.map((letter) => (
        <Button
          key={letter}
          variant={selectedLetter === letter ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedLetter(letter)}
          className="min-w-[40px]"
        >
          {letter}
        </Button>
      ))}
    </div>
  );
};

export default AlphabetNavigation;
