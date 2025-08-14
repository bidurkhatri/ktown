import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Beer, Plus } from 'lucide-react';
const ChiMaekSection = () => {
  return <section className="py-20 bg-gradient-to-r from-korean-red via-korean-red/90 to-korean-yellow/80">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white space-y-6">
            <div className="flex items-center space-x-4 mb-6">
              <span className="korean-title text-6xl md:text-7xl text-amber-500">치</span>
              <Plus className="h-12 w-12 animate-pulse" />
              <span className="korean-title text-6xl md:text-7xl text-amber-500">맥</span>
            </div>
            
            <h2 className="korean-title text-4xl md:text-5xl text-amber-500">
              Chi + Maek = Chicken + Beer
            </h2>
            
            <p className="text-xl leading-relaxed">
              The Korean night-out classic. Double-fried, juicy chicken with a cold beer to match. 
              It's not just a meal, it's a cultural experience.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-korean-yellow rounded-full"></div>
                <span className="text-lg">Crispy outside, tender inside</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-korean-yellow rounded-full"></div>
                <span className="text-lg">Ice-cold Korean beers on tap</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-korean-yellow rounded-full"></div>
                <span className="text-lg">Pickled radish & Korean banchan</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button asChild className="bg-white text-korean-red hover:bg-gray-100 font-bold text-lg px-8 py-4">
                <Link to="/chi-maek">
                  <Beer className="mr-2 h-5 w-5" />
                  Explore Chi-Maek
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-korean-red font-bold text-lg px-8 py-4">
                <Link to="/book">
                  Book Your Table
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Visual Element */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              {/* Chicken Basket */}
              <div className="food-card bg-white/10 backdrop-blur-sm rounded-lg p-6 h-48 flex flex-col justify-center items-center text-center">
                <div className="text-4xl mb-4">🍗</div>
                <h3 className="korean-subtitle text-white text-lg">Double-Fried Chicken</h3>
                <p className="text-white/80 text-sm mt-2">Crispy perfection</p>
              </div>
              
              {/* Beer */}
              <div className="food-card bg-white/10 backdrop-blur-sm rounded-lg p-6 h-48 flex flex-col justify-center items-center text-center mt-12">
                <div className="text-4xl mb-4">🍺</div>
                <h3 className="korean-subtitle text-white text-lg">Ice Cold Beer</h3>
                <p className="text-white/80 text-sm mt-2">Perfect pairing</p>
              </div>
              
              {/* Banchan */}
              <div className="food-card bg-white/10 backdrop-blur-sm rounded-lg p-6 h-48 flex flex-col justify-center items-center text-center -mt-6">
                <div className="text-4xl mb-4">🥬</div>
                <h3 className="korean-subtitle text-white text-lg">Pickled Radish</h3>
                <p className="text-white/80 text-sm mt-2">Cleanse the palate</p>
              </div>
              
              {/* Korean Vibes */}
              <div className="food-card bg-white/10 backdrop-blur-sm rounded-lg p-6 h-48 flex flex-col justify-center items-center text-center">
                <div className="text-4xl mb-4">🎌</div>
                <h3 className="korean-subtitle text-white text-lg">Korean Vibes</h3>
                <p className="text-white/80 text-sm mt-2">Authentic experience</p>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-korean-yellow/20 rounded-full animate-float"></div>
            <div className="absolute bottom-4 -left-4 w-16 h-16 bg-white/20 rounded-full animate-float" style={{
            animationDelay: '1s'
          }}></div>
          </div>
        </div>
      </div>
    </section>;
};
export default ChiMaekSection;