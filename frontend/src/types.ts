export interface Message {
    role: 'user' | 'assistant';
    content: string;
  }
  
  export interface MenuItem {
    id: string;
    name: string;
    description: string;
    ingredients: string[];
    price: number;
    category: string;
    image: string;
    featured: boolean;
    servingSize: string;
    spicyLevel?: 'mild' | 'medium' | 'hot';
    dietaryInfo: {
      vegetarian: boolean;
      vegan: boolean;
      glutenFree: boolean;
    };
    nutritionalInfo: {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
    };
    preparationTime: number; // in minutes
    popularity: number; // 1-5 rating
  }
  
  export interface Order {
    id: string;
    items: {
      menuItem: MenuItem;
      quantity: number;
      specialInstructions?: string;
    }[];
    totalAmount: number;
    status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered';
    timestamp: Date;
    tableNumber?: number;
    customerName?: string;
  }
  
  export interface DiningExperience {
    type: 'casual' | 'fine' | 'family' | 'romantic';
    priceRange: 'budget' | 'moderate' | 'premium';
    groupSize: number;
    preferences?: {
      spiceLevel?: 'mild' | 'medium' | 'hot';
      dietary?: ('vegetarian' | 'vegan' | 'glutenFree')[];
    };
  }
  
  export interface FilterOptions {
    priceRange?: {
      min: number;
      max: number;
    };
    categories?: string[];
    dietary?: ('vegetarian' | 'vegan' | 'glutenFree')[];
    spiceLevel?: ('mild' | 'medium' | 'hot')[];
    servingSize?: number;
    maxPrepTime?: number;
    minRating?: number;
  }