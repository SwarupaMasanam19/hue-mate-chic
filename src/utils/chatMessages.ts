
import { MessageType } from '@/components/MessageItem';

// Demo placeholder images
const DEMO_IMAGES = {
  userPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80',
  clothing1: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80',
  clothing2: 'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80',
  outfit1: 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80',
  outfit2: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80',
  accessory1: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80',
  accessory2: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80',
  logoIcon: '/lovable-uploads/e7c7a034-8f23-408d-89b4-7d447102a958.png',
};

// Initial greeting messages
export const getInitialMessages = (): MessageType[] => [
  {
    id: '1',
    content: "Hey there! 😎 Ready to discover some jaw-dropping outfits that'll make you shine like never before?",
    sender: 'bot',
    timestamp: new Date()
  },
  {
    id: '2',
    content: "I'm HueMate, your AI Fashion Stylist! 💅\nI'll help you find the perfect shades, fabrics, and outfits that match your unique personality and skin tone.",
    sender: 'bot',
    timestamp: new Date()
  },
  {
    id: '3',
    content: "So tell me — how do you wanna do this today? 😉",
    sender: 'bot',
    timestamp: new Date(),
    actions: [
      {
        id: 'upload-photo',
        label: "Try outfits on my photo",
        action: 'START'
      },
      {
        id: 'camera',
        label: "Live try-on experience",
        action: 'LIVE_EXPERIENCE'
      }
    ]
  }
];

// Simulated AI responses based on user actions
export const getResponseForAction = (
  action: string, 
  userPhoto?: string,
  clothingPhoto?: string
): MessageType => {
  switch (action) {
    case 'START':
      return {
        id: Date.now().toString(),
        content: "Ooooh! I already see some killer potential in you. 🔥\nLemme do my magic and style you up in some fabulous outfits, cool?",
        sender: 'bot',
        timestamp: new Date()
      };
      
    case 'LIVE_EXPERIENCE':
      return {
        id: Date.now().toString(),
        content: "Awesome! For the live experience, let's start with a photo upload first, then we can explore some real-time options!",
        sender: 'bot',
        timestamp: new Date()
      };
      
    case 'PHOTO_UPLOADED':
      return {
        id: Date.now().toString(),
        content: "Ahh, I love the energy you're bringing! 💅\nI'll pull out some perfect shades and fits for you. Hang tight!",
        sender: 'bot',
        timestamp: new Date(),
        image: userPhoto || DEMO_IMAGES.userPhoto
      };
      
    case 'CLOTHING_UPLOADED':
      return {
        id: Date.now().toString(),
        content: "Let me work my styling magic! Just a moment while I create the perfect look...",
        sender: 'bot',
        timestamp: new Date(),
        image: clothingPhoto || DEMO_IMAGES.clothing1
      };
      
    case 'TRY_ON_COMPLETE':
      return {
        id: Date.now().toString(),
        content: "Daaayum! 😎 This look is absolutely FIRE on you!\nBut wait — I can level this up even more. Wanna add a bottom, accessory, or some killer shoes?",
        sender: 'bot',
        timestamp: new Date(),
        image: DEMO_IMAGES.outfit1,
        actions: [
          {
            id: 'full-look',
            label: "Yes, style me a full look",
            action: 'STYLE_FULL_LOOK'
          },
          {
            id: 'own-mind',
            label: "Nah, I already have something in mind",
            action: 'OWN_MIND'
          }
        ]
      };
      
    case 'STYLE_FULL_LOOK':
      return {
        id: Date.now().toString(),
        content: "You're about to become a whole fashion moment! Here are some complete looks that would be absolutely stunning on you:",
        sender: 'bot',
        timestamp: new Date(),
        recommendations: {
          type: 'Complete Looks',
          items: [
            {
              id: 'outfit1',
              name: 'Bold & Stylish',
              image: DEMO_IMAGES.outfit1
            },
            {
              id: 'outfit2',
              name: 'Effortlessly Chic',
              image: DEMO_IMAGES.outfit2
            },
            {
              id: 'outfit3',
              name: 'Modern Classic',
              image: DEMO_IMAGES.clothing2
            },
            {
              id: 'outfit4',
              name: 'Statement Style',
              image: DEMO_IMAGES.clothing1
            }
          ]
        },
        actions: [
          {
            id: 'save',
            label: "Save This Look",
            action: 'SAVE_LOOK'
          },
          {
            id: 'try_more',
            label: "Find Me Another Fit",
            action: 'TRY_MORE'
          }
        ]
      };
      
    case 'OWN_MIND':
      return {
        id: Date.now().toString(),
        content: "Tell me what you already have! Blue jeans? Black pants? A favorite jacket?",
        sender: 'bot',
        timestamp: new Date(),
        actions: [
          {
            id: 'blue_jeans',
            label: "I have blue jeans",
            action: 'HAVE_JEANS'
          },
          {
            id: 'black_pants',
            label: "I have black pants",
            action: 'HAVE_BLACK_PANTS'
          },
          {
            id: 'something_else',
            label: "Something else",
            action: 'HAVE_SOMETHING_ELSE'
          }
        ]
      };
      
    case 'MATCH_ACCESSORIES':
      return {
        id: Date.now().toString(),
        content: "These accessories would take your style to a whole new level! 💯",
        sender: 'bot',
        timestamp: new Date(),
        recommendations: {
          type: 'Statement Accessories',
          items: [
            {
              id: 'acc1',
              name: 'Gold Statement Pieces',
              image: DEMO_IMAGES.accessory1
            },
            {
              id: 'acc2',
              name: 'Elegant Essentials',
              image: DEMO_IMAGES.accessory2
            }
          ]
        },
        actions: [
          {
            id: 'bottom',
            label: "Match with bottoms",
            action: 'MATCH_BOTTOMS'
          },
          {
            id: 'save',
            label: "Save This Look",
            action: 'SAVE_LOOK'
          }
        ]
      };
      
    case 'MATCH_BOTTOMS':
      return {
        id: Date.now().toString(),
        content: "These bottoms would create the perfect balance for your look:",
        sender: 'bot',
        timestamp: new Date(),
        recommendations: {
          type: 'Perfect Bottoms',
          items: [
            {
              id: 'bottom1',
              name: 'Classic Blue Jeans',
              image: DEMO_IMAGES.clothing2
            },
            {
              id: 'bottom2',
              name: 'Elegant Statement Piece',
              image: DEMO_IMAGES.outfit2
            }
          ]
        },
        actions: [
          {
            id: 'have_jeans',
            label: "I already have blue jeans",
            action: 'HAVE_JEANS'
          },
          {
            id: 'no_bottoms',
            label: "I don't want bottoms",
            action: 'NO_BOTTOMS'
          }
        ]
      };
      
    case 'HAVE_JEANS':
      return {
        id: Date.now().toString(),
        content: "Ouuu! 🔥 A classic blue jean, huh?\nIn that case, I'd say… a crisp white shirt + minimal sneakers + gold accessories = INSTANT 🔥 FIT.\n\nWanna see how it looks?",
        sender: 'bot',
        timestamp: new Date(),
        actions: [
          {
            id: 'show_look',
            label: "Yes, show me the look",
            action: 'SHOW_JEANS_LOOK'
          },
          {
            id: 'another',
            label: "No, suggest another",
            action: 'SUGGEST_ALTERNATIVE'
          }
        ]
      };
      
    case 'HAVE_BLACK_PANTS':
      return {
        id: Date.now().toString(),
        content: "Black pants are such a versatile staple! 💯\nI'd pair them with a bold colored top + statement accessories + sleek boots = absolute style icon vibes!\n\nShould I show you how this would look?",
        sender: 'bot',
        timestamp: new Date(),
        actions: [
          {
            id: 'show_look',
            label: "Yes, show me the look",
            action: 'SHOW_PANTS_LOOK'
          },
          {
            id: 'another',
            label: "No, suggest another",
            action: 'SUGGEST_ALTERNATIVE'
          }
        ]
      };
      
    case 'SHOW_JEANS_LOOK':
    case 'SHOW_PANTS_LOOK':
      return {
        id: Date.now().toString(),
        content: "You're absolutely slaying this look! 💅\nThis outfit was MADE for you, trust me.",
        sender: 'bot',
        timestamp: new Date(),
        image: DEMO_IMAGES.outfit1,
        actions: [
          {
            id: 'save',
            label: "Save This Look",
            action: 'SAVE_LOOK'
          },
          {
            id: 'try_more',
            label: "Find Me Another Fit",
            action: 'TRY_MORE'
          }
        ]
      };
      
    case 'NO_BOTTOMS':
      return {
        id: Date.now().toString(),
        content: "Got it! This look is already a style statement on its own. Would you like to add some accessories to really make it pop?",
        sender: 'bot',
        timestamp: new Date(),
        actions: [
          {
            id: 'accessories',
            label: "Show me accessories",
            action: 'MATCH_ACCESSORIES'
          },
          {
            id: 'save',
            label: "Save This Look",
            action: 'SAVE_LOOK'
          }
        ]
      };
      
    case 'SUGGEST_ALTERNATIVE':
      return {
        id: Date.now().toString(),
        content: "No problem! How about something with a bit more edge? Maybe:\n\n• A graphic tee + your jeans + a statement jacket\n• Or a monochrome look with layers and texture\n\nWhat's your vibe today?",
        sender: 'bot',
        timestamp: new Date(),
        actions: [
          {
            id: 'classy',
            label: "Show me something classy",
            action: 'STYLE_CLASSY'
          },
          {
            id: 'casual',
            label: "Keep it casual and comfy",
            action: 'STYLE_CASUAL'
          },
          {
            id: 'icon',
            label: "Make me look like a fashion icon",
            action: 'STYLE_ICON'
          }
        ]
      };
      
    case 'SAVE_LOOK':
      return {
        id: Date.now().toString(),
        content: "Yassss! 💅 You're about to break some hearts with this look, trust me. 🔥\nWanna try another look or should we wrap things up?",
        sender: 'bot',
        timestamp: new Date(),
        actions: [
          {
            id: 'try_more',
            label: "Find Me Another Fit",
            action: 'TRY_MORE'
          },
          {
            id: 'end',
            label: "That's all for now",
            action: 'END_SESSION'
          }
        ]
      };
      
    case 'STYLE_CLASSY':
    case 'STYLE_CASUAL':
    case 'STYLE_ICON':
      return {
        id: Date.now().toString(),
        content: "Whoa! This is giving pure fashion icon vibes. 🔥\nWhy do I feel like you're about to break some hearts in this?",
        sender: 'bot',
        timestamp: new Date(),
        image: action === 'STYLE_CASUAL' ? DEMO_IMAGES.clothing2 : DEMO_IMAGES.outfit2,
        actions: [
          {
            id: 'save',
            label: "Save This Look",
            action: 'SAVE_LOOK'
          },
          {
            id: 'try_more',
            label: "Find Me Another Fit",
            action: 'TRY_MORE'
          }
        ]
      };
      
    case 'TRY_MORE':
      return {
        id: Date.now().toString(),
        content: "Let's find you another killer look! What kind of vibe are you going for now?",
        sender: 'bot',
        timestamp: new Date(),
        actions: [
          {
            id: 'classy',
            label: "Show me something classy",
            action: 'STYLE_CLASSY'
          },
          {
            id: 'casual',
            label: "Keep it casual and comfy",
            action: 'STYLE_CASUAL'
          },
          {
            id: 'icon',
            label: "Make me look like a fashion icon",
            action: 'STYLE_ICON'
          }
        ]
      };
      
    case 'END_SESSION':
      return {
        id: Date.now().toString(),
        content: "OMG, you're about to serve some serious looks! 😎\nDon't forget to tag me when you slay in these outfits, okay? 😉\n\nCatch you later, style icon! 💅",
        sender: 'bot',
        timestamp: new Date(),
        actions: [
          {
            id: 'restart',
            label: "Start Over",
            action: 'START'
          }
        ]
      };
      
    default:
      return {
        id: Date.now().toString(),
        content: "Hey, no pressure! Fashion is all about experimenting, you know? 😉\nIf you want, I can find something that's low-key, high fashion, or totally casual.",
        sender: 'bot',
        timestamp: new Date(),
        actions: [
          {
            id: 'classy',
            label: "Show me something classy",
            action: 'STYLE_CLASSY'
          },
          {
            id: 'casual',
            label: "Keep it casual and comfy",
            action: 'STYLE_CASUAL'
          },
          {
            id: 'icon',
            label: "Make me look like a fashion icon",
            action: 'STYLE_ICON'
          }
        ]
      };
  }
};
