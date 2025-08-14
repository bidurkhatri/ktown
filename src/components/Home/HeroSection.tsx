import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Utensils, Calendar } from 'lucide-react';
import heroImage from '@/assets/hero-chicken.jpg';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Sizzling Korean fried chicken and beer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="korean-title text-5xl md:text-7xl lg:text-8xl mb-6 animate-neon-pulse">
          K-TOWN NEWTOWN
        </h1>
        
        <div className="korean-subtitle text-xl md:text-3xl lg:text-4xl mb-4 text-korean-yellow yellow-glow">
          Korean Fried Chicken • Street Eats • Ice Cold Beer
        </div>
        
        <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto text-gray-200">
          Your new favourite spot for crispy chicken, spicy street eats, and vegan-friendly delights.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild className="btn-korean text-lg px-8 py-4">
            <Link to="/menu">
              <Utensils className="mr-2 h-5 w-5" />
              View Menu
            </Link>
          </Button>
          
          <Button asChild className="btn-korean-secondary text-lg px-8 py-4">
            <Link to="/book">
              <Calendar className="mr-2 h-5 w-5" />
              Book a Table
            </Link>
          </Button>
        </div>
        
        {/* Floating scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;