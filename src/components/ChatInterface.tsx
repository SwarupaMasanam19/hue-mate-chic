
import React, { useRef, useEffect } from 'react';
import MessageItem, { MessageType } from './MessageItem';
import ActionButton from './ActionButton';
import { Send } from 'lucide-react';

interface ChatInterfaceProps {
  messages: MessageType[];
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  onActionClick: (action: string) => void;
  awaitingCameraCapture: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  capturePhoto: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  awaitingBudgetInput: boolean;
  awaitingThemeInput: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  inputValue,
  setInputValue,
  handleSendMessage,
  onActionClick,
  awaitingCameraCapture,
  videoRef,
  canvasRef,
  capturePhoto,
  messagesEndRef,
  awaitingBudgetInput,
  awaitingThemeInput
}) => {
  // Effect to scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full chat-container">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
            onActionClick={onActionClick}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-huemate-gold/20">
        {awaitingCameraCapture && (
          <div className="mb-4">
            <div className="relative w-full rounded-xl overflow-hidden bg-black">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-64 object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <button
                  onClick={capturePhoto}
                  className="p-3 bg-white rounded-full shadow-lg"
                >
                  <div className="w-6 h-6 bg-huemate-dark rounded-full"></div>
                </button>
              </div>
              <p className="absolute top-2 left-0 right-0 text-center text-white text-xs bg-black/50 py-1">
                Don't worry! Your picture is not stored or misused.
              </p>
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={awaitingBudgetInput ? "Enter your budget (e.g., ₹3500)" : 
                        awaitingThemeInput ? "Enter the occasion (e.g., Birthday Party)" : 
                        "Type your message..."}
            className="flex-1 px-4 py-2 rounded-full border border-huemate-gold/30 focus:outline-none focus:border-huemate-gold/50 focus:ring-1 focus:ring-huemate-gold/30 bg-white/80"
          />
          <ActionButton
            variant="primary"
            onClick={handleSendMessage}
            className="rounded-full p-2 h-10 w-10 flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
