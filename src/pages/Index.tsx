
import React from 'react';
import ChatBot from '@/components/ChatBot';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-huemate-cream to-white flex flex-col items-center justify-center p-6 sm:p-10">
      <div className="w-full max-w-4xl mx-auto text-center">
        <div className="mb-10 animate-float">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium mb-4 text-huemate-dark">
            <span className="text-shimmer">HueMate</span>
          </h1>
          <p className="text-lg sm:text-xl text-huemate-dark/80 max-w-2xl mx-auto">
            Your Perfect Shade, Every Time
          </p>
        </div>

        <div className="glass-effect rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto animate-scale-up">
          <h2 className="text-2xl font-display font-medium mb-4 text-huemate-dark">
            Meet Your AI Fashion Stylist
          </h2>
          <p className="text-huemate-dark/80 mb-6">
            Discover your perfect colors, get personalized outfit recommendations, and elevate your style with HueMate's AI-powered fashion advice.
          </p>
          
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-huemate-gold/20">
              <h3 className="text-sm font-medium mb-2 text-huemate-dark">Color Analysis</h3>
              <p className="text-xs text-huemate-dark/70">Discover your perfect color palette based on your skin tone.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-huemate-gold/20">
              <h3 className="text-sm font-medium mb-2 text-huemate-dark">Style Match</h3>
              <p className="text-xs text-huemate-dark/70">Get outfit recommendations that complement your personal style.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-huemate-gold/20">
              <h3 className="text-sm font-medium mb-2 text-huemate-dark">Virtual Try-On</h3>
              <p className="text-xs text-huemate-dark/70">See how clothing items will look on you before purchasing.</p>
            </div>
          </div>
          
          <p className="text-center text-sm text-huemate-dark/60 italic">
            Click the chat bubble in the bottom right to start styling!
          </p>
        </div>
      </div>
      
      <ChatBot />
    </div>
  );
};

export default Index;
