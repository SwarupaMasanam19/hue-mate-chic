
import React from 'react';
import { Male, Female, User } from 'lucide-react';

interface GenderSelectionProps {
  onSelectGender: (gender: string) => void;
}

const GenderSelection: React.FC<GenderSelectionProps> = ({ onSelectGender }) => {
  return (
    <div className="p-4 bg-white/80 rounded-lg border border-huemate-gold/30 mb-4">
      <h3 className="text-sm font-medium mb-3">Select your gender</h3>
      <div className="grid grid-cols-4 gap-3">
        <button 
          onClick={() => onSelectGender('male')} 
          className="flex flex-col items-center p-3 rounded-lg bg-white hover:bg-huemate-cream transition-colors border border-huemate-gold/20"
        >
          <Male className="w-8 h-8 text-blue-500 mb-1" />
          <span className="text-xs">Male</span>
        </button>
        
        <button 
          onClick={() => onSelectGender('female')} 
          className="flex flex-col items-center p-3 rounded-lg bg-white hover:bg-huemate-cream transition-colors border border-huemate-gold/20"
        >
          <Female className="w-8 h-8 text-pink-500 mb-1" />
          <span className="text-xs">Female</span>
        </button>
        
        <button 
          onClick={() => onSelectGender('non-binary')} 
          className="flex flex-col items-center p-3 rounded-lg bg-white hover:bg-huemate-cream transition-colors border border-huemate-gold/20"
        >
          <User className="w-8 h-8 text-purple-500 mb-1" />
          <span className="text-xs">Non-binary</span>
        </button>
        
        <button 
          onClick={() => onSelectGender('prefer-not-to-say')} 
          className="flex flex-col items-center p-3 rounded-lg bg-white hover:bg-huemate-cream transition-colors border border-huemate-gold/20"
        >
          <User className="w-8 h-8 text-gray-500 mb-1" />
          <span className="text-xs">Prefer not to say</span>
        </button>
      </div>
    </div>
  );
};

export default GenderSelection;
