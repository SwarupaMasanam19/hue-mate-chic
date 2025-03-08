
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
    content: "Hey there, gorgeous! Ready to find your perfect shade?",
    sender: 'bot',
    timestamp: new Date(),
    actions: [
      {
        id: 'start',
        label: "Let's get started!",
        action: 'START'
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
        content: "Ooooh! I can't wait to make you slay today! First, upload a photo so I can analyze your skin tone.",
        sender: 'bot',
        timestamp: new Date()
      };
      
    case 'PHOTO_UPLOADED':
      return {
        id: Date.now().toString(),
        content: "OMG! Your skin tone is radiant — perfect for warm shades like coral, pastel, and rose pink! Want me to recommend a perfect outfit? Upload a dress or shirt now!",
        sender: 'bot',
        timestamp: new Date(),
        image: userPhoto || DEMO_IMAGES.userPhoto
      };
      
    case 'CLOTHING_UPLOADED':
      return {
        id: Date.now().toString(),
        content: "Okay, darling! Trying this on you... hold on!",
        sender: 'bot',
        timestamp: new Date(),
        image: clothingPhoto || DEMO_IMAGES.clothing1
      };
      
    case 'TRY_ON_COMPLETE':
      return {
        id: Date.now().toString(),
        content: "Aaaand BAM! 🔥 This outfit on you is PERFECTION!",
        sender: 'bot',
        timestamp: new Date(),
        image: DEMO_IMAGES.outfit1,
        actions: [
          {
            id: 'explore',
            label: "Explore similar outfits",
            action: 'EXPLORE_SIMILAR'
          },
          {
            id: 'match',
            label: "Match with accessories",
            action: 'MATCH_ACCESSORIES'
          }
        ]
      };
      
    case 'EXPLORE_SIMILAR':
      return {
        id: Date.now().toString(),
        content: "Here are some similar outfits that would look absolutely stunning on you!",
        sender: 'bot',
        timestamp: new Date(),
        recommendations: {
          type: 'Similar Outfits',
          items: [
            {
              id: 'outfit1',
              name: 'Summer Floral Dress',
              image: DEMO_IMAGES.outfit1
            },
            {
              id: 'outfit2',
              name: 'Elegant Blouse & Skirt',
              image: DEMO_IMAGES.outfit2
            },
            {
              id: 'outfit3',
              name: 'Casual Top & Jeans',
              image: DEMO_IMAGES.clothing2
            },
            {
              id: 'outfit4',
              name: 'Evening Ensemble',
              image: DEMO_IMAGES.clothing1
            }
          ]
        },
        actions: [
          {
            id: 'buy',
            label: "Buy Now",
            action: 'BUY_NOW'
          },
          {
            id: 'try_more',
            label: "Try More Clothes",
            action: 'TRY_MORE'
          }
        ]
      };
      
    case 'MATCH_ACCESSORIES':
      return {
        id: Date.now().toString(),
        content: "Okayyy! Matching your style with these gorgeous accessories would make you POP! 💙",
        sender: 'bot',
        timestamp: new Date(),
        recommendations: {
          type: 'Perfect Accessories',
          items: [
            {
              id: 'acc1',
              name: 'Gold Statement Earrings',
              image: DEMO_IMAGES.accessory1
            },
            {
              id: 'acc2',
              name: 'Elegant Handbag',
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
            id: 'buy',
            label: "Buy These",
            action: 'BUY_NOW'
          }
        ]
      };
      
    case 'MATCH_BOTTOMS':
      return {
        id: Date.now().toString(),
        content: "These bottoms would look amazing with your style!",
        sender: 'bot',
        timestamp: new Date(),
        recommendations: {
          type: 'Complementary Bottoms',
          items: [
            {
              id: 'bottom1',
              name: 'Classic Blue Jeans',
              image: DEMO_IMAGES.clothing2
            },
            {
              id: 'bottom2',
              name: 'Elegant Skirt',
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
        content: "Ooooh yes honey! Pairing your blue jeans with white or pastel pink would be FIRE 🔥! Would you like to see some accessories to complete the look?",
        sender: 'bot',
        timestamp: new Date(),
        actions: [
          {
            id: 'shoes',
            label: "Show me shoes",
            action: 'SHOW_SHOES'
          },
          {
            id: 'bags',
            label: "Show me bags",
            action: 'SHOW_BAGS'
          }
        ]
      };
      
    case 'NO_BOTTOMS':
      return {
        id: Date.now().toString(),
        content: "I totally get it! This look is already stunning as is! Would you like to see some accessories to elevate it even more?",
        sender: 'bot',
        timestamp: new Date(),
        actions: [
          {
            id: 'accessories',
            label: "Show accessories",
            action: 'MATCH_ACCESSORIES'
          },
          {
            id: 'checkout',
            label: "Go to checkout",
            action: 'BUY_NOW'
          }
        ]
      };
      
    case 'BUY_NOW':
      return {
        id: Date.now().toString(),
        content: "Awww, you're gonna break hearts in this outfit! 💅🔥 I've added these items to your shopping bag. Anything else you'd like to explore today?",
        sender: 'bot',
        timestamp: new Date(),
        actions: [
          {
            id: 'try_more',
            label: "Try More Clothes",
            action: 'TRY_MORE'
          },
          {
            id: 'end',
            label: "That's all for now",
            action: 'END_SESSION'
          }
        ]
      };
      
    case 'TRY_MORE':
      return {
        id: Date.now().toString(),
        content: "Yass! Let's find more stunning pieces for you! Upload another clothing item you'd like to try.",
        sender: 'bot',
        timestamp: new Date()
      };
      
    case 'END_SESSION':
      return {
        id: Date.now().toString(),
        content: "Okay my queen, come back when you wanna SLAY again 💅💖. Your fashion journey awaits!",
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
        content: "OMG gurllll! I'm here to help you find your perfect style. What would you like to try next?",
        sender: 'bot',
        timestamp: new Date()
      };
  }
};
