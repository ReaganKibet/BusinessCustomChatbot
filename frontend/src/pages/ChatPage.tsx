import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../components/ChatMessage';
import { Message } from '../types';
import { Send, X, Coffee, BookOpen, Bot, Sparkles, Brain, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { chatService } from '../api/chatService';

const foodFacts = [
  "The world's most expensive pizza costs $12,000 and takes 72 hours to make.",
  "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly good to eat.",
  "The hottest chili pepper in the world is the Carolina Reaper, measuring over 2.2 million Scoville Heat Units.",
  "Chocolate was once used as currency by the Aztecs.",
  "Apples float in water because they are 25% air.",
  "The fear of cooking is known as 'Mageirocophobia'.",
  "Nutmeg is actually hallucinogenic in large doses.",
  "The most expensive spice in the world is saffron, which can cost up to $5,000 per pound.",
  "Carrots were originally purple, not orange.",
  "The world's oldest known recipe is for beer, dating back to around 3900 BC."
];

const ChatPage: React.FC = () => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Smart Dining Starts Here! I'm your AI dining assistant. I can help you with our menu, ingredients, nutritional information, and suggest your next favorite meal. How can I assist you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFoodFactPopup, setShowFoodFactPopup] = useState(true);
  const [currentFact, setCurrentFact] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  const createParticles = () => {
    if (particlesRef.current) {
      const container = particlesRef.current;
      container.innerHTML = '';
      
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full';
        
        // Random size
        const size = Math.random() * 6 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random color
        const colors = ['bg-blue-400', 'bg-purple-400', 'bg-indigo-400', 'bg-cyan-400'];
        particle.classList.add(colors[Math.floor(Math.random() * colors.length)]);
        
        // Random opacity
        particle.style.opacity = (Math.random() * 0.5 + 0.1).toString();
        
        // Animation
        particle.style.animation = `floating ${Math.random() * 10 + 5}s linear infinite`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(particle);
      }
    }
  };

  useEffect(() => {
    createParticles();
  }, []);

  useEffect(() => {
    // Select a random food fact when the component mounts
    const randomFact = foodFacts[Math.floor(Math.random() * foodFacts.length)];
    setCurrentFact(randomFact);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatService.sendMessage(input);
      if (response.error) {
          throw new Error(response.error);
      }
      
      const botMessage = {
          role: 'assistant',
          content: response.response
      };
      
      setMessages(prev => [...prev, botMessage]);
  } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.'
      }]);
  } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-3d-gradient-light' : 'bg-3d-gradient'} hexagon-bg pt-8 pl-20 md:pl-24 cyberpunk-grid`}>
      <div className="max-w-4xl mx-auto p-4 relative">
        <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0"></div>
        
        <div className={`${theme === 'light' ? 'futuristic-card' : 'futuristic-card-dark'} rounded-2xl overflow-hidden shadow-xl relative z-10 neon-border`}>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="flex items-center">
              <div className="mr-4 bg-white/20 p-2 rounded-full">
                <Brain className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold neon-text">Smart Dining Starts Here</h1>
                <p className="text-blue-100 text-sm">Let AI Suggest Your Next Favorite Meal!</p>
              </div>
            </div>
          </div>
          
          <div ref={chatContainerRef} className="h-[500px] overflow-y-auto p-6 space-y-4 relative">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {isTyping && (
              <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-800/30">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-100 neon-text">
                    AI Chef Assistant
                  </p>
                  <div className="flex space-x-1 mt-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t dark:border-gray-700 p-6 bg-gray-800/50">
            <div className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(e)}
                placeholder="Ask about our menu, ingredients, or get recommendations..."
                className="flex-1 rounded-lg border dark:border-gray-600 px-4 py-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 neon-border"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg px-4 py-2 hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed neon-border"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 flex justify-center space-x-4">
              <button 
                onClick={() => {
                  const randomFact = foodFacts[Math.floor(Math.random() * foodFacts.length)];
                  setMessages(prev => [...prev, {
                    role: 'user',
                    content: "Tell me an interesting food fact!"
                  }, {
                    role: 'assistant',
                    content: `Here's an interesting food fact: ${randomFact}`
                  }]);
                }}
                className="text-sm text-blue-400 hover:text-purple-400 transition-colors inline-flex items-center neon-text"
              >
                <BookOpen className="w-4 h-4 mr-1" />
                Get a food fact
              </button>
              <button 
                onClick={() => {
                  setMessages(prev => [...prev, {
                    role: 'user',
                    content: "Recommend me something to eat"
                  }]);
                  setIsLoading(true);
                  setIsTyping(true);
                  setTimeout(() => {
                    setMessages(prev => [...prev, {
                      role: 'assistant',
                      content: "Smart Dining Starts Here! I'd recommend trying our Nyama Choma Platter which is perfect for sharing, or the Swahili Fish Curry if you enjoy spicy food. For a vegetarian option, the Masala Dosa is excellent. Would you like more details about any of these dishes?"
                    }]);
                    setIsLoading(false);
                    setIsTyping(false);
                  }, 1500);
                }}
                className="text-sm text-blue-400 hover:text-purple-400 transition-colors inline-flex items-center neon-text"
              >
                <Sparkles className="w-4 h-4 mr-1" />
                Get recommendations
              </button>
            </div>
          </div>
        </div>

        {/* Food Fact Popup */}
        {showFoodFactPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className={`${theme === 'light' ? 'futuristic-card' : 'futuristic-card-dark'} rounded-2xl shadow-xl max-w-md w-full overflow-hidden animate-fade-in neon-border`}>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <Brain className="w-6 h-6 text-white mr-2" />
                  <h3 className="text-lg font-bold text-white neon-text">Smart Dining Starts Here</h3>
                </div>
                <button 
                  onClick={() => setShowFoodFactPopup(false)}
                  className="text-white hover:text-blue-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500 rounded-full filter blur-[100px] opacity-20"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500 rounded-full filter blur-[100px] opacity-20"></div>
                
                <div className="bg-gray-800/30 p-4 rounded-xl mb-6 backdrop-blur-sm neon-border">
                  <p className="text-gray-200 text-lg">
                    {currentFact}
                  </p>
                </div>
                
                <div className="flex justify-between">
                  <button
                    onClick={() => {
                      const randomFact = foodFacts[Math.floor(Math.random() * foodFacts.length)];
                      setCurrentFact(randomFact);
                    }}
                    className="text-blue-400 hover:text-purple-400 transition-colors flex items-center neon-text"
                  >
                    <Sparkles className="w-4 h-4 mr-1" />
                    Another fact
                  </button>
                  <button
                    onClick={() => setShowFoodFactPopup(false)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors neon-border"
                  >
                    Start chatting
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;