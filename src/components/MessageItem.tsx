
import React from 'react';
import { cn } from '@/lib/utils';
import ActionButton from './ActionButton';

export type MessageType = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  image?: string;
  recommendations?: {
    type: string;
    items: Array<{
      id: string;
      name: string;
      image?: string;
    }>;
  };
  actions?: Array<{
    id: string;
    label: string;
    action: string;
  }>;
};

interface MessageItemProps {
  message: MessageType;
  onActionClick: (action: string) => void;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, onActionClick }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div 
      className={cn(
        "w-full mb-4",
        isBot ? "animate-slide-right" : "animate-slide-left"
      )}
    >
      <div className={cn(
        "max-w-[85%] mb-1",
        isBot ? "mr-auto" : "ml-auto"
      )}>
        <div className={isBot ? "chat-bubble-bot" : "chat-bubble-user"}>
          <p className="text-sm">{message.content}</p>
        </div>
        
        {message.image && (
          <div className={cn(
            "mt-2 rounded-2xl overflow-hidden bg-white",
            isBot ? "chat-bubble-bot p-1" : "chat-bubble-user p-1"
          )}>
            <img 
              src={message.image} 
              alt="Uploaded content" 
              className="w-full h-auto rounded-xl object-cover"
            />
          </div>
        )}

        {message.recommendations && (
          <div className="mt-2 chat-bubble-bot p-3">
            <p className="text-xs font-medium mb-2">{message.recommendations.type}</p>
            <div className="grid grid-cols-2 gap-2">
              {message.recommendations.items.map(item => (
                <div key={item.id} className="bg-white rounded-lg p-2 shadow-sm">
                  {item.image && (
                    <div className="w-full h-24 mb-2 rounded-md overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <p className="text-xs text-center font-medium">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {message.actions && message.actions.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {message.actions.map(action => (
              <ActionButton
                key={action.id}
                variant="outline"
                size="sm"
                onClick={() => onActionClick(action.action)}
              >
                {action.label}
              </ActionButton>
            ))}
          </div>
        )}
      </div>
      
      <div className={cn(
        "text-xs text-huemate-dark/50",
        isBot ? "text-left" : "text-right"
      )}>
        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export default MessageItem;
