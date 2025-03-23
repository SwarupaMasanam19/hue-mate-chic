
import React from 'react';

interface BodyShape {
  id: string;
  name: string;
  imageSrc: string;
}

interface BodyShapeSelectionProps {
  gender: string;
  onSelectBodyShape: (shape: string) => void;
}

const BodyShapeSelection: React.FC<BodyShapeSelectionProps> = ({ gender, onSelectBodyShape }) => {
  const femaleBodyShapes: BodyShape[] = [
    { id: 'hourglass', name: 'Hourglass', imageSrc: '/placeholder.svg' },
    { id: 'pear', name: 'Pear', imageSrc: '/placeholder.svg' },
    { id: 'apple', name: 'Apple', imageSrc: '/placeholder.svg' },
    { id: 'rectangle', name: 'Rectangle', imageSrc: '/placeholder.svg' },
  ];

  const maleBodyShapes: BodyShape[] = [
    { id: 'rectangle', name: 'Rectangle', imageSrc: '/placeholder.svg' },
    { id: 'triangle', name: 'Triangle', imageSrc: '/placeholder.svg' },
    { id: 'oval', name: 'Oval', imageSrc: '/placeholder.svg' },
    { id: 'inverted-triangle', name: 'Inverted Triangle', imageSrc: '/placeholder.svg' },
  ];

  const nonBinaryBodyShapes: BodyShape[] = [
    ...femaleBodyShapes,
    ...maleBodyShapes
  ];

  const bodyShapes = gender === 'female' ? femaleBodyShapes : 
                    gender === 'male' ? maleBodyShapes : 
                    nonBinaryBodyShapes;

  return (
    <div className="p-4 bg-white/80 rounded-lg border border-huemate-gold/30 mb-4">
      <h3 className="text-sm font-medium mb-3">Select your body shape</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {bodyShapes.map((shape) => (
          <button 
            key={shape.id}
            onClick={() => onSelectBodyShape(shape.id)} 
            className="flex flex-col items-center p-3 rounded-lg bg-white hover:bg-huemate-cream transition-colors border border-huemate-gold/20"
          >
            <div className="w-16 h-24 mb-2 bg-gray-100 rounded overflow-hidden">
              <img 
                src={shape.imageSrc} 
                alt={shape.name} 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xs">{shape.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BodyShapeSelection;
