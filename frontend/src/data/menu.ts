import { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: "Grilled Tilapia",
    description: "Fresh tilapia grilled to perfection with local herbs and spices",
    ingredients: ["Fresh Tilapia", "Local Herbs", "Lemon", "Garlic", "Chili"],
    price: 1800,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&q=80&w=800",
    featured: true,
    servingSize: "1 whole fish",
    spicyLevel: "medium",
    preparationTime: 25,
    popularity: 4.8,
    dietaryInfo: {
      vegetarian: false,
      vegan: false,
      glutenFree: true
    },
    nutritionalInfo: {
      calories: 280,
      protein: 26,
      carbs: 0,
      fat: 18
    }
  },
  {
    id: '2',
    name: "Nyama Choma Platter",
    description: "Tender grilled meat selection with kachumbari and ugali",
    ingredients: ["Goat Meat", "Beef", "Onions", "Tomatoes", "Ugali"],
    price: 2500,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
    featured: true,
    servingSize: "Serves 2",
    spicyLevel: "medium",
    preparationTime: 35,
    popularity: 4.9,
    dietaryInfo: {
      vegetarian: false,
      vegan: false,
      glutenFree: true
    },
    nutritionalInfo: {
      calories: 850,
      protein: 65,
      carbs: 45,
      fat: 48
    }
  },
  {
    id: '3',
    name: "Sukuma Wiki & Ugali",
    description: "Traditional Kenyan meal with perfectly cooked collard greens",
    ingredients: ["Sukuma Wiki", "Ugali", "Onions", "Tomatoes", "Spices"],
    price: 600,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&q=80&w=800",
    featured: false,
    servingSize: "Single serving",
    spicyLevel: "mild",
    preparationTime: 20,
    popularity: 4.5,
    dietaryInfo: {
      vegetarian: true,
      vegan: true,
      glutenFree: true
    },
    nutritionalInfo: {
      calories: 450,
      protein: 12,
      carbs: 65,
      fat: 15
    }
  },
  {
    id: '4',
    name: "Swahili Fish Curry",
    description: "Coastal delicacy with coconut curry sauce and aromatic rice",
    ingredients: ["Fish", "Coconut Milk", "Curry Spices", "Rice", "Coriander"],
    price: 1500,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&q=80&w=800",
    featured: false,
    servingSize: "Single serving",
    spicyLevel: "hot",
    preparationTime: 30,
    popularity: 4.7,
    dietaryInfo: {
      vegetarian: false,
      vegan: false,
      glutenFree: true
    },
    nutritionalInfo: {
      calories: 580,
      protein: 32,
      carbs: 45,
      fat: 28
    }
  },
  {
    id: '5',
    name: "Vegetable Samosa Platter",
    description: "Crispy pastries filled with spiced vegetables, served with chutney",
    ingredients: ["Mixed Vegetables", "Pastry", "Indian Spices", "Mint Chutney"],
    price: 400,
    category: "Starters",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800",
    featured: false,
    servingSize: "4 pieces",
    spicyLevel: "medium",
    preparationTime: 15,
    popularity: 4.6,
    dietaryInfo: {
      vegetarian: true,
      vegan: true,
      glutenFree: false
    },
    nutritionalInfo: {
      calories: 320,
      protein: 6,
      carbs: 42,
      fat: 16
    }
  },
  {
    id: '6',
    name: "Chicken Tikka Masala",
    description: "Tender chicken pieces in a rich, creamy tomato sauce",
    ingredients: ["Chicken", "Tomatoes", "Cream", "Indian Spices", "Butter"],
    price: 1200,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=800",
    featured: true,
    servingSize: "Single serving",
    spicyLevel: "medium",
    preparationTime: 35,
    popularity: 4.8,
    dietaryInfo: {
      vegetarian: false,
      vegan: false,
      glutenFree: true
    },
    nutritionalInfo: {
      calories: 550,
      protein: 35,
      carbs: 25,
      fat: 38
    }
  },
  {
    id: '7',
    name: "Mango Lassi",
    description: "Refreshing yogurt-based drink with fresh mango pulp",
    ingredients: ["Mango", "Yogurt", "Honey", "Cardamom"],
    price: 300,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?auto=format&fit=crop&q=80&w=800",
    featured: false,
    servingSize: "350ml",
    spicyLevel: "mild",
    preparationTime: 5,
    popularity: 4.5,
    dietaryInfo: {
      vegetarian: true,
      vegan: false,
      glutenFree: true
    },
    nutritionalInfo: {
      calories: 180,
      protein: 5,
      carbs: 35,
      fat: 2
    }
  },
  {
    id: '8',
    name: "Biryani",
    description: "Aromatic rice dish with spiced meat and caramelized onions",
    ingredients: ["Basmati Rice", "Meat", "Onions", "Biryani Spices", "Saffron"],
    price: 1400,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800",
    featured: true,
    servingSize: "Single serving",
    spicyLevel: "hot",
    preparationTime: 45,
    popularity: 4.9,
    dietaryInfo: {
      vegetarian: false,
      vegan: false,
      glutenFree: true
    },
    nutritionalInfo: {
      calories: 650,
      protein: 28,
      carbs: 85,
      fat: 22
    }
  },
  {
    id: '9',
    name: "Masala Dosa",
    description: "Crispy rice crepe filled with spiced potatoes",
    ingredients: ["Rice Batter", "Potatoes", "Onions", "Indian Spices", "Coconut Chutney"],
    price: 800,
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1630383249896-2b90d2fe4dfb?auto=format&fit=crop&q=80&w=800",
    featured: false,
    servingSize: "Single serving",
    spicyLevel: "medium",
    preparationTime: 20,
    popularity: 4.7,
    dietaryInfo: {
      vegetarian: true,
      vegan: true,
      glutenFree: false
    },
    nutritionalInfo: {
      calories: 450,
      protein: 12,
      carbs: 75,
      fat: 14
    }
  },
  {
    id: '10',
    name: "Mango Cheesecake",
    description: "Creamy cheesecake with fresh mango puree topping",
    ingredients: ["Cream Cheese", "Mango", "Biscuit Base", "Sugar", "Vanilla"],
    price: 600,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=800",
    featured: false,
    servingSize: "1 slice",
    spicyLevel: "mild",
    preparationTime: 30,
    popularity: 4.6,
    dietaryInfo: {
      vegetarian: true,
      vegan: false,
      glutenFree: false
    },
    nutritionalInfo: {
      calories: 380,
      protein: 8,
      carbs: 45,
      fat: 22
    }
  }
];