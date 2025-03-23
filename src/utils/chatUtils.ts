
import { MessageType } from '@/components/MessageItem';

export function createUserMessage(content: string, image?: string): MessageType {
  return {
    id: Date.now().toString(),
    content,
    sender: 'user',
    timestamp: new Date(),
    image
  };
}

export function createBotMessage(content: string, actions?: any[], image?: string, recommendations?: any): MessageType {
  return {
    id: Date.now().toString(),
    content,
    sender: 'bot',
    timestamp: new Date(),
    actions,
    image,
    recommendations
  };
}

export function getWelcomeMessages(): MessageType[] {
  return [
    createBotMessage(
      "Hey there, superstar! 😎 Ready to discover some jaw-dropping outfits that'll make you shine like never before?",
      [
        {
          id: 'start-styling',
          label: "Yes, I'm ready!",
          action: 'START_STYLING'
        },
        {
          id: 'how-it-works',
          label: "How does this work?",
          action: 'HOW_IT_WORKS'
        }
      ]
    )
  ];
}

export function getPersonalizedGreeting(gender: string): string {
  if (gender === 'female') {
    return "Hey gorgeous! 💅 Let's find colors and outfits that will make you absolutely glow!";
  } else if (gender === 'male') {
    return "Hey handsome! 😎 Let's find colors and outfits that will make you look incredible!";
  } else {
    return "Hey style icon! ✨ Let's find colors and outfits that will make you absolutely shine!";
  }
}

export function getSkinToneDescription(skinTone: string): string {
  switch(skinTone) {
    case "warm":
      return "Ooooh! Warm skin tones glow in earth tones, gold jewelry, and rust shades. Want me to recommend outfits?";
    case "cool":
      return "OMG! Cool skin tones look divine in pastels, silver accessories, and icy tones. Let me style you up!";
    case "neutral":
      return "Lucky you! Almost any color looks amazing on you. Let me find the most fabulous shade for you!";
    default:
      return "Your skin tone is beautiful! Let me recommend some perfect color palettes for you.";
  }
}

export function getBudgetStylingResponse(budget: string): MessageType {
  return createBotMessage(
    `Alright! I'll curate a complete outfit within ${budget}. Here's what I've got for you:`,
    [
      {
        id: 'more-options',
        label: "Show me more options",
        action: 'MORE_BUDGET_OPTIONS'
      },
      {
        id: 'finalize',
        label: "I love this outfit!",
        action: 'FINALIZE_OUTFIT'
      }
    ],
    undefined,
    {
      type: "Budget-Friendly Outfits",
      items: [
        {
          id: "outfit1",
          name: `Outfit 1: Dress + Earrings + Shoes = ₹${parseInt(budget.replace(/[^\d]/g, '')) - 30}`,
          image: "/placeholder.svg"
        },
        {
          id: "outfit2",
          name: `Outfit 2: Top + Jeans + Sneakers = ₹${parseInt(budget.replace(/[^\d]/g, '')) - 110}`,
          image: "/placeholder.svg"
        }
      ]
    }
  );
}

export function getThemeBasedResponse(theme: string): MessageType {
  return createBotMessage(
    `Oooo! ${theme}, huh? I'm already on it. Here are some stunning outfit ideas:`,
    [
      {
        id: 'more-options',
        label: "Show me more options",
        action: 'MORE_THEME_OPTIONS'
      },
      {
        id: 'finalize',
        label: "I love this outfit!",
        action: 'FINALIZE_OUTFIT'
      }
    ],
    undefined,
    {
      type: `Outfits for ${theme}`,
      items: [
        {
          id: "outfit1",
          name: "Elegant Option",
          image: "/placeholder.svg"
        },
        {
          id: "outfit2",
          name: "Stylish Option",
          image: "/placeholder.svg"
        }
      ]
    }
  );
}
