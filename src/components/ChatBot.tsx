
import React, { useState, useRef, useEffect } from 'react';
import ChatBubble from './ui/ChatBubble';
import MessageItem, { MessageType } from './MessageItem';
import ActionButton from './ActionButton';
import { Camera, Send } from 'lucide-react';
import { getInitialMessages, getResponseForAction, getCustomBudgetResponse, getCustomThemeResponse } from '@/utils/chatMessages';
import { toast } from '@/hooks/use-toast';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>(getInitialMessages());
  const [inputValue, setInputValue] = useState('');
  const [awaitingCameraCapture, setAwaitingCameraCapture] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [awaitingBudgetInput, setAwaitingBudgetInput] = useState(false);
  const [awaitingThemeInput, setAwaitingThemeInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Effect for shimmer animation when chat opens
  useEffect(() => {
    if (isOpen) {
      const chatContainer = document.querySelector('.chat-container');
      if (chatContainer) {
        chatContainer.classList.add('animate-scale-up');
        setTimeout(() => {
          chatContainer.classList.remove('animate-scale-up');
        }, 500);
      }
    }
  }, [isOpen]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setAwaitingCameraCapture(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast({
        title: "Camera Access Error",
        description: "I couldn't access your camera. Please make sure you've given permission for camera access.",
        variant: "destructive"
      });
      
      addBotMessage({
        id: Date.now().toString(),
        content: "I couldn't access your camera. Please make sure you've given permission for camera access.",
        sender: 'bot',
        timestamp: new Date(),
        actions: [
          {
            id: 'try-again',
            label: "Try again",
            action: 'TAKE_PHOTO'
          }
        ]
      });
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to data URL
        const photoUrl = canvas.toDataURL('image/jpeg');
        setUserPhoto(photoUrl);
        
        // Stop all video streams
        const stream = video.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        video.srcObject = null;
        setAwaitingCameraCapture(false);
        
        // Add user message with the photo
        const userMessage: MessageType = {
          id: Date.now().toString(),
          content: "Here's my photo!",
          sender: 'user',
          timestamp: new Date(),
          image: photoUrl
        };
        setMessages(prev => [...prev, userMessage]);
        
        // Simulate processing time
        setTimeout(() => {
          addBotMessage(getResponseForAction('CAPTURE_PHOTO', photoUrl));
        }, 1000);
      }
    }
  };

  const handleActionClick = (action: string) => {
    // Add a slight delay to simulate processing
    setTimeout(() => {
      if (action === 'TAKE_PHOTO') {
        addBotMessage(getResponseForAction(action));
        startCamera();
      } else if (action === 'CAPTURE_PHOTO') {
        capturePhoto();
      } else if (action === 'CUSTOM_BUDGET') {
        setAwaitingBudgetInput(true);
        addBotMessage(getResponseForAction(action));
      } else if (action === 'CUSTOM_THEME') {
        setAwaitingThemeInput(true);
        addBotMessage(getResponseForAction(action));
      } else {
        // Handle all other actions
        addBotMessage(getResponseForAction(action, userPhoto || undefined));
      }
    }, 500);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessage: MessageType = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Handle special input cases
    if (awaitingBudgetInput) {
      setAwaitingBudgetInput(false);
      setTimeout(() => {
        // Format the budget if it doesn't start with ₹
        const formattedBudget = inputValue.startsWith('₹') ? inputValue : `₹${inputValue}`;
        addBotMessage(getCustomBudgetResponse(formattedBudget));
      }, 1000);
    } else if (awaitingThemeInput) {
      setAwaitingThemeInput(false);
      setTimeout(() => {
        addBotMessage(getCustomThemeResponse(inputValue));
      }, 1000);
    } else {
      // Handle regular chat messages
      const lowerCaseInput = inputValue.toLowerCase();
      
      if (lowerCaseInput.includes('blue jean') || lowerCaseInput.includes('jeans')) {
        setTimeout(() => {
          addBotMessage(getResponseForAction('HAVE_JEANS'));
        }, 1000);
      } else if (lowerCaseInput.includes('budget')) {
        setTimeout(() => {
          addBotMessage(getResponseForAction('BUDGET_STYLING'));
        }, 1000);
      } else if (lowerCaseInput.includes('wedding') || lowerCaseInput.includes('party') || 
                lowerCaseInput.includes('date') || lowerCaseInput.includes('occasion')) {
        setTimeout(() => {
          addBotMessage(getResponseForAction('THEME_BASED'));
        }, 1000);
      } else {
        // Default response
        setTimeout(() => {
          const defaultResponse: MessageType = {
            id: Date.now().toString(),
            content: "I hear you! Let me help you with that. What would you like to focus on?",
            sender: 'bot',
            timestamp: new Date(),
            actions: [
              {
                id: 'take-photo',
                label: "Take a picture now",
                action: 'TAKE_PHOTO'
              },
              {
                id: 'budget',
                label: "Style within my budget",
                action: 'BUDGET_STYLING'
              },
              {
                id: 'theme',
                label: "Style me for an occasion",
                action: 'THEME_BASED'
              }
            ]
          };
          addBotMessage(defaultResponse);
        }, 1000);
      }
    }
    
    setInputValue('');
  };

  const addBotMessage = (message: MessageType) => {
    setMessages(prev => [...prev, message]);
  };

  return (
    <ChatBubble isOpen={isOpen} onToggle={toggleChat}>
      <div className="flex flex-col h-full chat-container">
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message) => (
            <MessageItem
              key={message.id}
              message={message}
              onActionClick={handleActionClick}
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
                    <Camera className="w-6 h-6 text-huemate-dark" />
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
    </ChatBubble>
  );
};

export default ChatBot;
