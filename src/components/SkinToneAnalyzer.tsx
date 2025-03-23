
import React from 'react';

interface SkinToneAnalyzerProps {
  imageUrl: string | null;
  skinTone?: string;
}

const SkinToneAnalyzer: React.FC<SkinToneAnalyzerProps> = ({ imageUrl, skinTone = "#E6C7A0" }) => {
  if (!imageUrl) return null;
  
  return (
    <div className="p-3 rounded-lg border border-huemate-gold/30 bg-white/80 mb-4">
      <h3 className="text-sm font-medium mb-2">Skin Tone Analysis</h3>
      <div className="flex items-center space-x-3">
        <div 
          className="w-16 h-16 rounded-full border-2 border-white shadow-md" 
          style={{ backgroundColor: skinTone }}
        />
        <div>
          <p className="text-sm">This is your skin tone</p>
          <p className="text-xs text-gray-500">
            {skinTone === "#E6C7A0" ? "Warm undertones" : 
             skinTone === "#DDB6A0" ? "Neutral undertones" : 
             "Cool undertones"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkinToneAnalyzer;
