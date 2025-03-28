import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface FeaturedMeal {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  chef: string;
  rating: number;
  specialTag?: string;
}

const featuredMeals: FeaturedMeal[] = [
  {
    id: '1',
    name: "Chef's Special Seafood Paella",
    description: "A vibrant Spanish dish with saffron-infused rice, fresh seafood, and seasonal vegetables",
    price: 2800,
    image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&q=80&w=2000",
    chef: "Maria Rodriguez",
    rating: 4.9,
    specialTag: "Today's Special"
  },
  {
    id: '2',
    name: "Truffle Mushroom Risotto",
    description: "Creamy Arborio rice slowly cooked with wild mushrooms and finished with black truffle",
    price: 2200,
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=2000",
    chef: "Alessandro Bianchi",
    rating: 4.8,
    specialTag: "Vegetarian"
  },
  {
    id: '3',
    name: "Grilled Wagyu Steak",
    description: "Premium Japanese Wagyu beef grilled to perfection with herb butter and seasonal vegetables",
    price: 3500,
    image: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&q=80&w=2000",
    chef: "James Peterson",
    rating: 5.0,
    specialTag: "Premium"
  },
  {
    id: '4',
    name: "Mango Coconut Panna Cotta",
    description: "Silky coconut cream dessert topped with fresh mango coulis and toasted coconut flakes",
    price: 950,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=2000",
    chef: "Sophia Chen",
    rating: 4.7,
    specialTag: "New"
  }
];

const FeaturedMeals: React.FC = () => {
  const { theme } = useTheme();
  const [swiper, setSwiper] = useState<any>(null);

  return (
    <div className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-emerald-500/20 rounded-full filter blur-[80px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-500/20 rounded-full filter blur-[80px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-200 dark:text-white neon-text">
              Today's Featured Meals
            </h2>
            <p className="text-gray-400 dark:text-gray-300 mt-2">
              Handcrafted by our master chefs for an exceptional dining experience
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => swiper?.slidePrev()} 
              className="p-2 rounded-full bg-emerald-700 text-white hover:bg-emerald-600 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => swiper?.slideNext()} 
              className="p-2 rounded-full bg-emerald-700 text-white hover:bg-emerald-600 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <Swiper
          onSwiper={setSwiper}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          modules={[Autoplay, Navigation, Pagination]}
          className="featured-meals-swiper"
        >
          {featuredMeals.map((meal) => (
            <SwiperSlide key={meal.id}>
              <div className="h-full">
                <div className={`${theme === 'light' ? 'futuristic-card' : 'futuristic-card-dark'} rounded-xl overflow-hidden shadow-lg h-full hover:shadow-xl transition-shadow group neon-border`}>
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={meal.image}
                      alt={meal.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                    {meal.specialTag && (
                      <div className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                        {meal.specialTag}
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-2xl font-bold text-white neon-text">{meal.name}</h3>
                      <p className="text-emerald-200 mt-1">By Chef {meal.chef}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-400 dark:text-gray-300 mb-4">
                      {meal.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-emerald-500 dark:text-emerald-400 text-xl">
                        KSh {meal.price.toLocaleString()}
                      </span>
                      <div className="flex items-center">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`w-4 h-4 ${star <= Math.floor(meal.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
                            />
                          ))}
                        </div>
                        <span className="ml-1 text-xs text-gray-400 dark:text-gray-400">{meal.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center">
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FeaturedMeals;