
import React, { useState, useRef, useEffect } from 'react';
import ChatBubble from './ui/ChatBubble';
import MessageItem, { MessageType } from './MessageItem';
import PhotoUploader from './PhotoUploader';
import ActionButton from './ActionButton';
import { Send } from 'lucide-react';
import { getInitialMessages, getResponseForAction } from '@/utils/chatMessages';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>(getInitialMessages());
  const [inputValue, setInputValue] = useState('');
  const [awaitingPhotoUpload, setAwaitingPhotoUpload] = useState(false);
  const [awaitingClothingUpload, setAwaitingClothingUpload] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [clothingPhoto, setClothingPhoto] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleActionClick = (action: string) => {
    // Add a slight delay to simulate processing
    setTimeout(() => {
      if (action === 'START') {
        setAwaitingPhotoUpload(true);
      } else if (action === 'PHOTO_UPLOADED') {
        setAwaitingPhotoUpload(false);
        setAwaitingClothingUpload(true);
      } else if (action === 'CLOTHING_UPLOADED') {
        setAwaitingClothingUpload(false);
        // Simulate processing time for try-on
        setTimeout(() => {
          addBotMessage(getResponseForAction('TRY_ON_COMPLETE'));
        }, 1500);
      }
      
      addBotMessage(getResponseForAction(action, userPhoto || undefined, clothingPhoto || undefined));
    }, 500);
  };

  const handleUserPhotoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const photoUrl = e.target.result as string;
        setUserPhoto(photoUrl);
        
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
          addBotMessage(getResponseForAction('PHOTO_UPLOADED', photoUrl));
          setAwaitingPhotoUpload(false);
          setAwaitingClothingUpload(true);
        }, 1000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClothingPhotoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const photoUrl = e.target.result as string;
        setClothingPhoto(photoUrl);
        
        // Add user message with the clothing photo
        const userMessage: MessageType = {
          id: Date.now().toString(),
          content: "I'd like to try this on!",
          sender: 'user',
          timestamp: new Date(),
          image: photoUrl
        };
        setMessages(prev => [...prev, userMessage]);
        
        // Simulate processing time
        setTimeout(() => {
          addBotMessage(getResponseForAction('CLOTHING_UPLOADED', undefined, photoUrl));
          setAwaitingClothingUpload(false);
          
          // Simulate processing time for try-on
          setTimeout(() => {
            addBotMessage(getResponseForAction('TRY_ON_COMPLETE'));
          }, 1500);
        }, 1000);
      }
    };
    reader.readAsDataURL(file);
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
    setInputValue('');
    
    // Check for specific user messages
    const lowerCaseInput = inputValue.toLowerCase();
    
    if (lowerCaseInput.includes('blue jeans') && lowerCaseInput.includes('already have')) {
      setTimeout(() => {
        addBotMessage(getResponseForAction('HAVE_JEANS'));
      }, 1000);
    } else if (lowerCaseInput.includes('don\'t want') && lowerCaseInput.includes('bottom')) {
      setTimeout(() => {
        addBotMessage(getResponseForAction('NO_BOTTOMS'));
      }, 1000);
    } else {
      // Default response
      setTimeout(() => {
        const defaultResponse: MessageType = {
          id: Date.now().toString(),
          content: "I hear you! Let me help you with that. Would you like to see some outfit suggestions?",
          sender: 'bot',
          timestamp: new Date(),
          actions: [
            {
              id: 'explore-more',
              label: "Show me outfits",
              action: 'EXPLORE_SIMILAR'
            },
            {
              id: 'accessories',
              label: "Show accessories",
              action: 'MATCH_ACCESSORIES'
            }
          ]
        };
        addBotMessage(defaultResponse);
      }, 1000);
    }
  };

  const addBotMessage = (message: MessageType) => {
    setMessages(prev => [...prev, message]);
  };

  return (
    <ChatBubble isOpen={isOpen} onToggle={toggleChat}>
      <div className="flex flex-col h-full">
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
          {awaitingPhotoUpload && (
            <div className="mb-4">
              <PhotoUploader onPhotoSelected={handleUserPhotoUpload} variant="user" />
            </div>
          )}
          
          {awaitingClothingUpload && (
            <div className="mb-4">
              <PhotoUploader onPhotoSelected={handleClothingPhotoUpload} variant="clothing" />
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
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
