
import React from 'react';
import { cn } from '@/lib/utils';
import ActionButton from './ActionButton';

export type RecommendationType = {
  id: string;
  type: 'outfit' | 'top' | 'bottom' | 'accessory';
  name: string;
  description?: string;
  image: string;
  color?: string;
};

interface FashionRecommendationProps {
  recommendation: RecommendationType;
  onTryOn?: () => void;
  onBuyNow?: () => void;
}

const FashionRecommendation: React.FC<FashionRecommendationProps> = ({
  recommendation,
  onTryOn,
  onBuyNow
}) => {
  return (
    <div className="w-full rounded-xl overflow-hidden bg-white shadow-sm border border-huemate-gold/20 animate-fade-in">
      <div className="relative w-full aspect-square">
        <img 
          src={recommendation.image} 
          alt={recommendation.name}
          className="w-full h-full object-cover"
        />
        {recommendation.color && (
          <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: recommendation.color }} 
            />
            <span className="text-xs font-medium">{recommendation.color}</span>
          </div>
        )}
      </div>
      
      <div className="p-3">
        <h4 className="text-sm font-medium mb-1">{recommendation.name}</h4>
        {recommendation.description && (
          <p className="text-xs text-huemate-dark/70 mb-3">{recommendation.description}</p>
        )}
        
        <div className="flex gap-2 mt-2">
          {onTryOn && (
            <ActionButton 
              variant="outline" 
              size="sm" 
              onClick={onTryOn}
              fullWidth
            >
              Try On
            </ActionButton>
          )}
          {onBuyNow && (
            <ActionButton 
              variant="primary" 
              size="sm" 
              onClick={onBuyNow}
              fullWidth
            >
              Buy Now
            </ActionButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default FashionRecommendation;
