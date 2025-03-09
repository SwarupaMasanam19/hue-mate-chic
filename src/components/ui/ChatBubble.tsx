
import React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface ChatBubbleProps {
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  isOpen,
  onToggle,
  children
}) => {
  return (
    <div className="fixed bottom-12 right-12 z-50 flex flex-col items-end">
      {isOpen ? (
        <div className="w-[380px] h-[600px] bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-huemate-gold/30 animate-scale-up">
          <div className="w-full h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-huemate-gold/20">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img 
                    src="/lovable-uploads/e7c7a034-8f23-408d-89b4-7d447102a958.png" 
                    alt="HueMate" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-2">
                  <h3 className="text-lg font-display font-medium text-huemate-dark">HueMate</h3>
                  <p className="text-xs text-huemate-dark/70">Your Perfect Shade, Every Time</p>
                </div>
              </div>
              <button 
                onClick={onToggle}
                className="p-2 rounded-full hover:bg-huemate-cream transition-colors"
              >
                <X className="w-5 h-5 text-huemate-dark" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              {children}
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={onToggle}
          className="w-24 h-24 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95 overflow-hidden animate-subtle-shimmer"
        >
          <img 
            src="/lovable-uploads/e7c7a034-8f23-408d-89b4-7d447102a958.png" 
            alt="HueMate" 
            className="w-full h-full object-cover"
          />
        </button>
      )}
    </div>
  );
};

export default ChatBubble;
