
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
    content: "Hey there, superstar! 😎 Ready to discover some jaw-dropping outfits that'll make you shine like never before?",
    sender: 'bot',
    timestamp: new Date()
  },
  {
    id: '2',
    content: "I'm HueMate, your AI Fashion Stylist! 💅\nI'll help you find the perfect shades, fabrics, and outfits that match your personality and skin tone.",
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
        id: 'take-photo',
        label: "Take a picture now",
        action: 'TAKE_PHOTO'
      },
      {
        id: 'theme',
        label: "Style me for an occasion",
        action: 'THEME_BASED'
      },
      {
        id: 'budget',
        label: "Style within my budget",
        action: 'BUDGET_STYLING'
      }
    ]
  }
];

// Simulated AI responses based on user actions
export const getResponseForAction = (
  action: string, 
  userPhoto?: string,
  clothingPhoto?: string,
  budget?: string,
  theme?: string
): MessageType => {
  switch (action) {
    case 'TAKE_PHOTO':
      return {
        id: Date.now().toString(),
        content: "Hey superstar! Want to discover colors and outfits that will make you glow? Let's start by capturing a pic of you! (Don't worry! Your picture is not stored or misused.)",
        sender: 'bot',
        timestamp: new Date(),
        actions: [
          {
            id: 'capture-photo',
            label: "Capture a photo",
            action: 'CAPTURE_PHOTO'
          }
        ]
      };
      
    case 'CAPTURE_PHOTO':
      return {
        id: Date.now().toString(),
        content: "Got it! Now lemme analyze your skin tone and body shape. Hang tight!",
        sender: 'bot',
        timestamp: new Date(),
        image: userPhoto || DEMO_IMAGES.userPhoto,
        actions: [
          {
            id: 'analyze-skin-tone',
            label: "Continue",
            action: 'ANALYZE_SKIN_TONE'
          }
        ]
      };
      
    case 'ANALYZE_SKIN_TONE':
      return {
        id: Date.now().toString(),
        content: "Ooooh! You have a beautiful warm skin tone! Earth tones, gold jewelry, and rust shades will make you absolutely glow! ✨",
        sender: 'bot',
        timestamp: new Date(),
        actions: [
          {
            id: 'analyze-body-shape',
            label: "Continue to body shape",
            action: 'BODY_SHAPE'
          }
        ]
      };
      
    case 'BODY_SHAPE':
      return {
        id: Date.now().toString(),
        content: "To make your outfit suggestion even more accurate, may I know your body type?",
        sender: 'bot',
        timestamp: new Date(),
        actions: [
          {
            id: 'slim',
            label: "Slim",
            action: 'BODY_SLIM'
          },
          {
            id: 'curvy',
            label: "Curvy",
            action: 'BODY_CURVY'
          },
          {
            id: 'plus',
            label: "Plus Size",
            action: 'BODY_PLUS'
          },
          {
            id: 'athletic',
            label: "Athletic",
            action: 'BODY_ATHLETIC'
          },
          {
            id: 'hourglass',
            label: "Hourglass",
            action: 'BODY_HOURGLASS'
          }
        ]
      };
    
    case 'BODY_SLIM':
    case 'BODY_CURVY':
    case 'BODY_PLUS':
    case 'BODY_ATHLETIC':
    case 'BODY_HOURGLASS':
      return {
        id: Date.now().toString(),
        content: "Great! And how do you identify?",
        sender: 'bot',
        timestamp: new Date(),
        actions: [
          {
            id: 'female',
            label: "Female",
            action: 'GENDER_FEMALE'
          },
          {
            id: 'male',
            label: "Male",
            action: 'GENDER_MALE'
          },
          {
            id: 'transgender',
            label: "Transgender",
            action: 'GENDER_TRANSGENDER'
          },
          {
            id: 'no-say',
            label: "Prefer not to say",
            action: 'GENDER_NOTSAY'
          }
        ]
      };
      
    case 'GENDER_FEMALE':
    case 'GENDER_MALE':
    case 'GENDER_TRANSGENDER':
    case 'GENDER_NOTSAY':
      return {
        id: Date.now().toString(),
        content: "Ahhh! I'm already visualizing a STUNNING look for you. One sec...",
        sender: 'bot',
        timestamp: new Date(),
        actions: [
          {
            id: 'start',
            label: "Show me outfits",
            action: 'SHOW_OUTFITS'
          },
          {
            id: 'budget',
            label: "Style within my budget",
            action: 'BUDGET_STYLING'
          }
        ]
      };
      
    case 'SHOW_OUTFITS':
      return {
        id: Date.now().toString(),
        content: "Based on your warm skin tone and body shape, these outfits would look ABSOLUTELY FIRE on you! 🔥",
        sender: 'bot',
        timestamp: new Date(),
        recommendations: {
          type: 'Perfect for Your Style',
          items: [
            {
              id: 'outfit1',
              name: 'Bold & Stunning',
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
            id: 'virtual-try-on',
            label: "Try this on me",
            action: 'VIRTUAL_TRY_ON'
          },
          {
            id: 'more-outfits',
            label: "Show me more",
            action: 'MORE_OUTFITS'
          }
        ]
      };
      
    case 'VIRTUAL_TRY_ON':
      return {
        id: Date.now().toString(),
        content: "I'm working on a virtual try-on feature. Hang tight, superstar! 💫",
        sender: 'bot',
        timestamp: new Date(),
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
      
    case 'BUDGET_STYLING':
      return {
        id: Date.now().toString(),
        content: "Got a budget in mind for your outfit? Let me style you within your budget! 💰",
        sender: 'bot',
        timestamp: new Date(),
        actions: [
          {
            id: 'budget-1000',
            label: "₹1000",
            action: 'BUDGET_1000'
          },
          {
            id: 'budget-2000',
            label: "₹2000",
            action: 'BUDGET_2000'
          },
          {
            id: 'budget-5000',
            label: "₹5000",
            action: 'BUDGET_5000'
          },
          {
            id: 'custom-budget',
            label: "Custom budget",
            action: 'CUSTOM_BUDGET'
          }
        ]
      };
      
    case 'BUDGET_1000':
    case 'BUDGET_2000': 
    case 'BUDGET_5000':
      const budgetAmount = action === 'BUDGET_1000' ? '₹1000' : 
                          action === 'BUDGET_2000' ? '₹2000' : '₹5000';
      return {
        id: Date.now().toString(),
        content: `Alright! I'll curate a complete outfit within ${budgetAmount}. Gimme a sec.`,
        sender: 'bot',
        timestamp: new Date(),
        recommendations: {
          type: `Complete Outfits within ${budgetAmount}`,
          items: [
            {
              id: 'budget-outfit1',
              name: `Dress + Earrings + Shoes = ${action === 'BUDGET_1000' ? '₹970' : 
                    action === 'BUDGET_2000' ? '₹1940' : '₹4850'}`,
              image: DEMO_IMAGES.outfit1
            },
            {
              id: 'budget-outfit2',
              name: `Top + Jeans + Sneakers = ${action === 'BUDGET_1000' ? '₹890' : 
                    action === 'BUDGET_2000' ? '₹1780' : '₹4500'}`,
              image: DEMO_IMAGES.outfit2
            }
          ]
        },
        actions: [
          {
            id: 'save',
            label: "Save This Look",
            action: 'SAVE_BUDGET_LOOK'
          },
          {
            id: 'more-budget',
            label: "Show Me More",
            action: 'MORE_BUDGET_OPTIONS'
          }
        ]
      };
      
    case 'CUSTOM_BUDGET':
      return {
        id: Date.now().toString(),
        content: "Please type your budget amount in the chat (e.g., ₹3500)",
        sender: 'bot',
        timestamp: new Date()
      };
      
    case 'THEME_BASED':
      return {
        id: Date.now().toString(),
        content: "What's the occasion? Is it a Wedding Party, Best Friend's Wedding, Office Party, Night Out, Date Night, or something else?",
        sender: 'bot',
        timestamp: new Date(),
        actions: [
          {
            id: 'wedding',
            label: "Wedding",
            action: 'THEME_WEDDING'
          },
          {
            id: 'office',
            label: "Office Party",
            action: 'THEME_OFFICE'
          },
          {
            id: 'date',
            label: "Date Night",
            action: 'THEME_DATE'
          },
          {
            id: 'night-out',
            label: "Night Out",
            action: 'THEME_NIGHT_OUT'
          },
          {
            id: 'custom-theme',
            label: "Other Occasion",
            action: 'CUSTOM_THEME'
          }
        ]
      };
      
    case 'THEME_WEDDING':
    case 'THEME_OFFICE':
    case 'THEME_DATE':
    case 'THEME_NIGHT_OUT':
      const themeName = action === 'THEME_WEDDING' ? 'Wedding' : 
                       action === 'THEME_OFFICE' ? 'Office Party' : 
                       action === 'THEME_DATE' ? 'Date Night' : 'Night Out';
      return {
        id: Date.now().toString(),
        content: `Oooo! ${themeName}, huh? I'm already on it. Gimme a sec.`,
        sender: 'bot',
        timestamp: new Date(),
        recommendations: {
          type: `Perfect for ${themeName}`,
          items: [
            {
              id: 'theme-outfit1',
              name: 'Stunning Choice',
              image: DEMO_IMAGES.outfit1
            },
            {
              id: 'theme-outfit2',
              name: 'Head-Turner',
              image: DEMO_IMAGES.outfit2
            }
          ]
        },
        actions: [
          {
            id: 'save',
            label: "Save This Look",
            action: 'SAVE_THEME_LOOK'
          },
          {
            id: 'more-theme',
            label: "Show Me More",
            action: 'MORE_THEME_OPTIONS'
          }
        ]
      };
      
    case 'CUSTOM_THEME':
      return {
        id: Date.now().toString(),
        content: "Please type the occasion you're styling for in the chat",
        sender: 'bot',
        timestamp: new Date()
      };
      
    case 'SAVE_LOOK':
    case 'SAVE_BUDGET_LOOK':
    case 'SAVE_THEME_LOOK':
      return {
        id: Date.now().toString(),
        content: "OMG, you're about to slay in this fit! 🔥\nCan't wait to see you rock it. Don't forget to tag me when you do! 💅",
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
      
    case 'HAVE_JEANS':
      return {
        id: Date.now().toString(),
        content: "Got it! I'll style your blue jeans with a trendy white shirt and gold accessories. One sec!",
        sender: 'bot',
        timestamp: new Date(),
        recommendations: {
          type: 'Perfect with Your Blue Jeans',
          items: [
            {
              id: 'jeans-outfit1',
              name: 'White Shirt + Gold Earrings + Sneakers = ₹870',
              image: DEMO_IMAGES.outfit1
            },
            {
              id: 'jeans-outfit2',
              name: 'Printed Top + Silver Bracelet + Wedges = ₹920',
              image: DEMO_IMAGES.outfit2
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
            id: 'more',
            label: "Show Me More",
            action: 'MORE_JEANS_OPTIONS'
          }
        ]
      };
      
    case 'MORE_OUTFITS':
    case 'MORE_BUDGET_OPTIONS':
    case 'MORE_THEME_OPTIONS':
    case 'MORE_JEANS_OPTIONS':
    case 'TRY_MORE':
      return {
        id: Date.now().toString(),
        content: "Let's find you another killer look! What's your priority now?",
        sender: 'bot',
        timestamp: new Date(),
        actions: [
          {
            id: 'style',
            label: "Style",
            action: 'SHOW_OUTFITS'
          },
          {
            id: 'budget',
            label: "Budget",
            action: 'BUDGET_STYLING'
          },
          {
            id: 'theme',
            label: "Occasion",
            action: 'THEME_BASED'
          }
        ]
      };
      
    case 'END_SESSION':
      return {
        id: Date.now().toString(),
        content: "OMG, you're about to serve some serious looks! 😎\nDon't forget to tag me when you slay in these outfits, okay? 😉\nCatch you later, style icon! 💅",
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
        content: "I hear you! Let me help you with that. What would you like to focus on now?",
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
  }
};

// Function to handle custom budget inputs
export const getCustomBudgetResponse = (budgetAmount: string): MessageType => {
  return {
    id: Date.now().toString(),
    content: `Alright! I'll curate a complete outfit within ${budgetAmount}. Gimme a sec.`,
    sender: 'bot',
    timestamp: new Date(),
    recommendations: {
      type: `Complete Outfits within ${budgetAmount}`,
      items: [
        {
          id: 'budget-outfit1',
          name: `Dress + Earrings + Shoes = ${parseFloat(budgetAmount.replace(/[₹,]/g, '')) * 0.97}`,
          image: DEMO_IMAGES.outfit1
        },
        {
          id: 'budget-outfit2',
          name: `Top + Jeans + Sneakers = ${parseFloat(budgetAmount.replace(/[₹,]/g, '')) * 0.89}`,
          image: DEMO_IMAGES.outfit2
        }
      ]
    },
    actions: [
      {
        id: 'save',
        label: "Save This Look",
        action: 'SAVE_BUDGET_LOOK'
      },
      {
        id: 'more-budget',
        label: "Show Me More",
        action: 'MORE_BUDGET_OPTIONS'
      }
    ]
  };
};

// Function to handle custom theme inputs
export const getCustomThemeResponse = (theme: string): MessageType => {
  return {
    id: Date.now().toString(),
    content: `Oooo! ${theme}, huh? I'm already on it. Gimme a sec.`,
    sender: 'bot',
    timestamp: new Date(),
    recommendations: {
      type: `Perfect for ${theme}`,
      items: [
        {
          id: 'theme-outfit1',
          name: 'Stunning Choice',
          image: DEMO_IMAGES.outfit1
        },
        {
          id: 'theme-outfit2',
          name: 'Head-Turner',
          image: DEMO_IMAGES.outfit2
        }
      ]
    },
    actions: [
      {
        id: 'save',
        label: "Save This Look",
        action: 'SAVE_THEME_LOOK'
      },
      {
        id: 'more-theme',
        label: "Show Me More",
        action: 'MORE_THEME_OPTIONS'
      }
    ]
  };
};
