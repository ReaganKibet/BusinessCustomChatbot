import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Utensils, Bot, Sparkles, Brain, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import FeaturedMeals from '../components/FeaturedMeals';

const foodFacts = [
  {
    title: "Sushi's Origin",
    description: "Originally, sushi was a way of preserving fish in fermented rice. The rice was discarded and only the fish was eaten. Modern sushi as we know it today was invented in the 19th century in Tokyo.",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Pizza's Journey",
    description: "Modern pizza originated in Naples, Italy, in the late 18th century. It was originally created as a cheap, quick meal for the working-class poor of Naples.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Tacos' History",
    description: "Tacos predate the arrival of Europeans in Mexico, with anthropological evidence suggesting they were eaten by indigenous people in the Valley of Mexico.",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=800"
  }
];

const HomePage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen">
      {/* Hero Section with Enhanced Background */}
      <div className="relative min-h-screen">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=2000')`,
              backgroundPosition: 'center 30%'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
        </div>

        {/* Hero Content */}
        <div className="relative min-h-screen flex items-center justify-center px-4">
          <div className="max-w-6xl w-full">
            <div className="backdrop-blur-sm bg-black/30 rounded-2xl p-8 md:p-12 border border-white/10">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                    Smart Dining <span className="text-emerald-400">Starts Here</span>
                  </h1>
                  <p className="text-lg md:text-xl mb-8 text-gray-200">
                    Experience culinary excellence enhanced by AI. Let us guide you through a world of flavors, perfectly tailored to your taste.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/menu"
                      className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-300 text-lg shadow-lg group"
                    >
                      <Utensils className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                      Explore Menu
                    </Link>
                    <Link
                      to="/chat"
                      className="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 text-lg shadow-lg backdrop-blur-sm group"
                    >
                      <Bot className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                      AI Chef Assistant
                    </Link>
                  </div>
                </div>
                <div className="relative hidden md:block">
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-full filter blur-[50px]" />
                  <div className="relative">
                    <div className="w-64 h-64 mx-auto relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 opacity-20 animate-pulse" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Brain className="h-32 w-32 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Meals Section */}
      <div className="relative py-24 bg-black">
        <FeaturedMeals />
      </div>

      {/* Cuisine Categories */}
      <div className="relative py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-white">
            Explore Global Flavors
          </h2>
          <p className="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
            Our menu features authentic dishes from around the world, prepared with traditional techniques and the finest ingredients
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* African Cuisine */}
            <div className="group relative overflow-hidden rounded-xl">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=800"
                  alt="African cuisine"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">African Cuisine</h3>
                <p className="text-gray-200 mb-4">Authentic flavors from East Africa</p>
                <Link to="/menu" className="text-emerald-400 font-medium flex items-center group-hover:text-emerald-300 transition-colors">
                  Discover dishes <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Asian Fusion */}
            <div className="group relative overflow-hidden rounded-xl">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src="https://images.unsplash.com/photo-1511910849309-0dffb8785146?auto=format&fit=crop&q=80&w=800"
                  alt="Asian cuisine"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Asian Fusion</h3>
                <p className="text-gray-200 mb-4">Modern takes on classic dishes</p>
                <Link to="/menu" className="text-emerald-400 font-medium flex items-center group-hover:text-emerald-300 transition-colors">
                  Discover dishes <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Mediterranean */}
            <div className="group relative overflow-hidden rounded-xl">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src="https://images.unsplash.com/photo-1516100882582-96c3a05fe590?auto=format&fit=crop&q=80&w=800"
                  alt="Mediterranean cuisine"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Mediterranean</h3>
                <p className="text-gray-200 mb-4">Fresh, healthy, and flavorful</p>
                <Link to="/menu" className="text-emerald-400 font-medium flex items-center group-hover:text-emerald-300 transition-colors">
                  Discover dishes <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant Feature */}
      <div className="relative py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative backdrop-blur-sm bg-black/30">
                <h2 className="text-3xl font-bold mb-4 text-white">
                  Meet Your AI Chef Assistant
                </h2>
                <p className="text-gray-300 mb-8 text-lg">
                  Our advanced AI can help you discover new dishes, learn about ingredients, and find the perfect meal based on your preferences and dietary needs.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <span className="bg-emerald-900 p-1 rounded-full mr-3 mt-1">
                      <Sparkles className="h-4 w-4 text-emerald-400" />
                    </span>
                    <span className="text-gray-300">Get personalized meal recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-emerald-900 p-1 rounded-full mr-3 mt-1">
                      <Sparkles className="h-4 w-4 text-emerald-400" />
                    </span>
                    <span className="text-gray-300">Learn fascinating food facts and history</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-emerald-900 p-1 rounded-full mr-3 mt-1">
                      <Sparkles className="h-4 w-4 text-emerald-400" />
                    </span>
                    <span className="text-gray-300">Discover dishes that match your dietary preferences</span>
                  </li>
                </ul>
                <Link
                  to="/chat"
                  className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-300 text-lg shadow-lg group self-start"
                >
                  <Bot className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Chat with AI Chef
                </Link>
              </div>
              <div className="md:w-1/2 relative">
                <img 
                  src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1000" 
                  alt="AI Chef assistant"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                  <div className="text-center">
                    <Bot className="h-16 w-16 text-white mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">AI Chef Assistant</h3>
                    <p className="text-gray-200 text-sm max-w-xs mx-auto">
                      "I can help you discover amazing dishes from around the world tailored to your taste!"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Food Facts Section */}
      <div className="relative py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-white">
            Fascinating Food Facts
          </h2>
          <p className="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
            Discover the stories behind your favorite dishes and learn about culinary traditions from around the world
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {foodFacts.map((fact, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl bg-gray-900"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={fact.image}
                    alt={fact.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {fact.title}
                  </h3>
                  <p className="text-gray-300">
                    {fact.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;