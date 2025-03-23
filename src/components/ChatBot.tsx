import React, { useState, useRef, useEffect } from 'react';
import ChatBubble from './ui/ChatBubble';
import ChatInterface from './ChatInterface';
import { MessageType } from './MessageItem';
import SkinToneAnalyzer from './SkinToneAnalyzer';
import GenderSelection from './GenderSelection';
import BodyShapeSelection from './BodyShapeSelection';
import { Camera } from 'lucide-react';
import { 
  getWelcomeMessages, 
  createBotMessage, 
  createUserMessage,
  getPersonalizedGreeting,
  getSkinToneDescription,
  getBudgetStylingResponse,
  getThemeBasedResponse
} from '@/utils/chatUtils';
import { toast } from '@/hooks/use-toast';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>(getWelcomeMessages());
  const [inputValue, setInputValue] = useState('');
  const [awaitingCameraCapture, setAwaitingCameraCapture] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [skinTone, setSkinTone] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [bodyShape, setBodyShape] = useState<string | null>(null);
  const [awaitingBudgetInput, setAwaitingBudgetInput] = useState(false);
  const [awaitingThemeInput, setAwaitingThemeInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

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
        
        const userMessage = createUserMessage("I'd like to take a photo");
        setMessages(prev => [...prev, userMessage]);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast({
        title: "Camera Access Error",
        description: "I couldn't access your camera. Please make sure you've given permission for camera access.",
        variant: "destructive"
      });
      
      addBotMessage(
        createBotMessage(
          "I couldn't access your camera. Please make sure you've given permission for camera access.",
          [
            {
              id: 'try-again',
              label: "Try again",
              action: 'TAKE_PHOTO'
            }
          ]
        )
      );
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const photoUrl = canvas.toDataURL('image/jpeg');
        setUserPhoto(photoUrl);
        
        const stream = video.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        video.srcObject = null;
        setAwaitingCameraCapture(false);
        
        const userMessage = createUserMessage("Here's my photo!", photoUrl);
        setMessages(prev => [...prev, userMessage]);
        
        setTimeout(() => {
          const tones = ["warm", "cool", "neutral"];
          const analyzedTone = tones[Math.floor(Math.random() * tones.length)];
          setSkinTone(analyzedTone);
          
          const skinToneResponse = createBotMessage(
            `Got it! I've analyzed your photo. ${getSkinToneDescription(analyzedTone)}`,
            [
              {
                id: 'continue-gender',
                label: "Continue",
                action: 'SELECT_GENDER'
              }
            ]
          );
          addBotMessage(skinToneResponse);
        }, 1500);
      }
    }
  };

  const handleGenderSelection = (selectedGender: string) => {
    setGender(selectedGender);
    
    const userMessage = createUserMessage(`I identify as ${selectedGender}`);
    setMessages(prev => [...prev, userMessage]);
    
    const greeting = getPersonalizedGreeting(selectedGender);
    
    setTimeout(() => {
      const response = createBotMessage(
        greeting,
        [
          {
            id: 'select-body-shape',
            label: "Next: Select body shape",
            action: 'SELECT_BODY_SHAPE'
          }
        ]
      );
      addBotMessage(response);
    }, 1000);
  };

  const handleBodyShapeSelection = (shape: string) => {
    setBodyShape(shape);
    
    const userMessage = createUserMessage(`My body shape is ${shape}`);
    setMessages(prev => [...prev, userMessage]);
    
    setTimeout(() => {
      const response = createBotMessage(
        "Ahhh! I'm already visualizing a STUNNING look for you. What would you like to do next?",
        [
          {
            id: 'budget-styling',
            label: "Style within my budget",
            action: 'BUDGET_STYLING'
          },
          {
            id: 'theme-based',
            label: "Style for an occasion",
            action: 'THEME_BASED'
          },
          {
            id: 'complete-outfit',
            label: "Complete my look",
            action: 'COMPLETE_OUTFIT'
          }
        ]
      );
      addBotMessage(response);
    }, 1000);
  };

  const handleActionClick = (action: string) => {
    setTimeout(() => {
      switch(action) {
        case 'START_STYLING':
          addBotMessage(
            createBotMessage(
              "Let's get started! First, I'll need to take a quick photo to analyze your skin tone. Ready?",
              [
                {
                  id: 'take-photo',
                  label: "Take a photo now",
                  action: 'TAKE_PHOTO'
                }
              ]
            )
          );
          break;
        
        case 'HOW_IT_WORKS':
          addBotMessage(
            createBotMessage(
              "I'm HueMate, your AI Fashion Stylist! I'll help you find the perfect shades, fabrics, and outfits that match your unique personality and skin tone. I'll analyze your photo (which is never stored!), ask about your body shape and style preferences, and then suggest personalized outfits!",
              [
                {
                  id: 'get-started',
                  label: "Let's get started!",
                  action: 'START_STYLING'
                }
              ]
            )
          );
          break;
        
        case 'TAKE_PHOTO':
          startCamera();
          break;
        
        case 'SELECT_GENDER':
          addBotMessage(
            createBotMessage(
              "To personalize your experience, could you tell me your gender?",
              []
            )
          );
          break;
        
        case 'SELECT_BODY_SHAPE':
          addBotMessage(
            createBotMessage(
              "To make it even better, could you tell me your body shape?",
              []
            )
          );
          break;
        
        case 'BUDGET_STYLING':
          setAwaitingBudgetInput(true);
          addBotMessage(
            createBotMessage(
              "Great! What's your budget for this outfit?",
              []
            )
          );
          break;
        
        case 'THEME_BASED':
          setAwaitingThemeInput(true);
          addBotMessage(
            createBotMessage(
              "Exciting! What occasion are you dressing up for?",
              []
            )
          );
          break;
        
        case 'COMPLETE_OUTFIT':
          addBotMessage(
            createBotMessage(
              "Based on your skin tone and body shape, here are some outfit recommendations that will look stunning on you!",
              [
                {
                  id: 'more-outfits',
                  label: "Show me more options",
                  action: 'MORE_OUTFITS'
                },
                {
                  id: 'finalize',
                  label: "I love this outfit!",
                  action: 'FINALIZE_OUTFIT'
                }
              ],
              undefined,
              {
                type: "Recommended Outfits",
                items: [
                  {
                    id: "outfit1",
                    name: "Casual Chic",
                    image: "/placeholder.svg"
                  },
                  {
                    id: "outfit2",
                    name: "Business Casual",
                    image: "/placeholder.svg"
                  }
                ]
              }
            )
          );
          break;
        
        case 'MORE_OUTFITS':
        case 'MORE_BUDGET_OPTIONS':
        case 'MORE_THEME_OPTIONS':
          addBotMessage(
            createBotMessage(
              "Here are some more options I think would look amazing on you!",
              [
                {
                  id: 'more',
                  label: "Show me more",
                  action: 'MORE_OUTFITS'
                },
                {
                  id: 'finalize',
                  label: "I love this outfit!",
                  action: 'FINALIZE_OUTFIT'
                }
              ],
              undefined,
              {
                type: "More Outfit Options",
                items: [
                  {
                    id: "outfit3",
                    name: "Evening Elegance",
                    image: "/placeholder.svg"
                  },
                  {
                    id: "outfit4",
                    name: "Weekend Casual",
                    image: "/placeholder.svg"
                  }
                ]
              }
            )
          );
          break;
        
        case 'FINALIZE_OUTFIT':
          addBotMessage(
            createBotMessage(
              "OMG, you're about to slay in this fit! 🔥 Can't wait to see you rock it. Don't forget to tag me when you do! 💅",
              [
                {
                  id: 'save',
                  label: "Save This Outfit",
                  action: 'SAVE_OUTFIT'
                },
                {
                  id: 'another',
                  label: "Find Me Another",
                  action: 'START_OVER'
                }
              ]
            )
          );
          break;
        
        case 'SAVE_OUTFIT':
          addBotMessage(
            createBotMessage(
              "Your outfit has been saved! Would you like to try on another style or are we done for today?",
              [
                {
                  id: 'another',
                  label: "Try another style",
                  action: 'START_OVER'
                },
                {
                  id: 'done',
                  label: "I'm done for now",
                  action: 'END_SESSION'
                }
              ]
            )
          );
          break;
        
        case 'START_OVER':
          setUserPhoto(null);
          addBotMessage(
            createBotMessage(
              "Let's find you another stunning outfit! What would you like to focus on?",
              [
                {
                  id: 'budget',
                  label: "Style within my budget",
                  action: 'BUDGET_STYLING'
                },
                {
                  id: 'theme',
                  label: "Style for an occasion",
                  action: 'THEME_BASED'
                },
                {
                  id: 'complete',
                  label: "Complete my look",
                  action: 'COMPLETE_OUTFIT'
                }
              ]
            )
          );
          break;
        
        case 'END_SESSION':
          addBotMessage(
            createBotMessage(
              "Alright babe! Have a fab day and keep slaying! 💄✨ Come back anytime for more style advice!",
              [
                {
                  id: 'restart',
                  label: "Start Over",
                  action: 'FULL_RESTART'
                }
              ]
            )
          );
          break;
        
        case 'FULL_RESTART':
          setUserPhoto(null);
          setSkinTone(null);
          setGender(null);
          setBodyShape(null);
          setMessages(getWelcomeMessages());
          break;
          
        default:
          addBotMessage(
            createBotMessage(
              "I'm not sure what to do with that. Would you like to start over?",
              [
                {
                  id: 'restart',
                  label: "Start Over",
                  action: 'FULL_RESTART'
                }
              ]
            )
          );
      }
    }, 500);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    const userMessage = createUserMessage(inputValue);
    setMessages(prev => [...prev, userMessage]);
    
    if (awaitingBudgetInput) {
      setAwaitingBudgetInput(false);
      setTimeout(() => {
        const formattedBudget = inputValue.startsWith('₹') ? inputValue : `₹${inputValue}`;
        addBotMessage(getBudgetStylingResponse(formattedBudget));
      }, 1000);
    } else if (awaitingThemeInput) {
      setAwaitingThemeInput(false);
      setTimeout(() => {
        addBotMessage(getThemeBasedResponse(inputValue));
      }, 1000);
    } else {
      const lowerCaseInput = inputValue.toLowerCase();
      
      if (lowerCaseInput.includes('blue jean') || lowerCaseInput.includes('jeans')) {
        setTimeout(() => {
          addBotMessage(
            createBotMessage(
              "Got it! I'll style your blue jeans with a trendy white shirt and gold accessories. One sec!",
              [
                {
                  id: 'show-jean-outfit',
                  label: "Show me the outfit",
                  action: 'SHOW_JEAN_OUTFIT'
                }
              ]
            )
          );
        }, 1000);
      } else if (lowerCaseInput.includes('budget')) {
        setTimeout(() => {
          setAwaitingBudgetInput(true);
          addBotMessage(
            createBotMessage(
              "Great! What's your budget for this outfit?",
              []
            )
          );
        }, 1000);
      } else if (lowerCaseInput.includes('wedding') || lowerCaseInput.includes('party') || 
                lowerCaseInput.includes('date') || lowerCaseInput.includes('occasion')) {
        setTimeout(() => {
          setAwaitingThemeInput(true);
          addBotMessage(
            createBotMessage(
              "Exciting! What occasion are you dressing up for?",
              []
            )
          );
        }, 1000);
      } else {
        setTimeout(() => {
          addBotMessage(
            createBotMessage(
              "I hear you! Let me help you with that. What would you like to focus on?",
              [
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
            )
          );
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
      <ChatInterface
        messages={messages}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSendMessage={handleSendMessage}
        onActionClick={handleActionClick}
        awaitingCameraCapture={awaitingCameraCapture}
        videoRef={videoRef}
        canvasRef={canvasRef}
        capturePhoto={capturePhoto}
        messagesEndRef={messagesEndRef}
        awaitingBudgetInput={awaitingBudgetInput}
        awaitingThemeInput={awaitingThemeInput}
      />
      
      {isOpen && !awaitingCameraCapture && userPhoto && skinTone && !gender && (
        <div className="absolute bottom-20 left-4 right-4 z-10">
          <GenderSelection onSelectGender={handleGenderSelection} />
        </div>
      )}
      
      {isOpen && !awaitingCameraCapture && userPhoto && skinTone && gender && !bodyShape && (
        <div className="absolute bottom-20 left-4 right-4 z-10">
          <BodyShapeSelection gender={gender} onSelectBodyShape={handleBodyShapeSelection} />
        </div>
      )}
    </ChatBubble>
  );
};

export default ChatBot;
