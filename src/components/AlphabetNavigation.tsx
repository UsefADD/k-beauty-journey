
import React from 'react';
import { Button } from './ui/button';
import { useBrands } from '../hooks/useBrands';

const AlphabetNavigation = () => {
  const { availableLetters, activeLetter, setActiveLetter } = useBrands();
  const alphabet = ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  
  return (
    <div className="flex flex-wrap justify-center gap-1 mb-6">
      <Button
        variant={activeLetter === '' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setActiveLetter('')}
        className="min-w-[40px]"
      >
        ALL
      </Button>
      {alphabet.map((letter) => {
        const hasLetterBrands = availableLetters.includes(letter);
        return (
          <Button
            key={letter}
            variant={activeLetter === letter ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveLetter(letter)}
            disabled={!hasLetterBrands}
            className="min-w-[40px]"
          >
            {letter}
          </Button>
        );
      })}
    </div>
  );
};

export default AlphabetNavigation;
