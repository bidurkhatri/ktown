import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <h2 className="korean-title text-4xl md:text-5xl">
              Welcome to K-Town
            </h2>
            
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Inspired by Korea's bustling food alleys, K-Town Newtown brings authentic 
                double-fried chicken, fiery sauces, and hearty plant-based options right 
                to your plate.
              </p>
              
              <p>
                Our chefs master the art of Korean street food, from our signature 
                Soyamite chicken that'll "light you up like dynamite" to our 
                incredible Vegan KFC that'll make you question everything you 
                thought you knew about plant-based eating.
              </p>
              
              <p className="font-semibold text-foreground">
                Come hungry, leave happy. 🔥
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="btn-korean">
                <Link to="/menu">
                  Explore Our Menu
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="btn-outline-korean">
                <Link to="/location">
                  <MapPin className="mr-2 h-4 w-4" />
                  Find Us in Newtown
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="food-card aspect-square bg-gradient-to-br from-korean-red/20 to-korean-yellow/20 rounded-lg flex items-center justify-center">
                <span className="korean-subtitle text-2xl text-center">Korean Street Food</span>
              </div>
              <div className="food-card aspect-[4/3] bg-gradient-to-br from-korean-yellow/20 to-korean-red/20 rounded-lg flex items-center justify-center">
                <span className="korean-subtitle text-xl text-center">Chi-Maek Combo</span>
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="food-card aspect-[4/3] bg-gradient-to-br from-green-500/20 to-green-300/20 rounded-lg flex items-center justify-center">
                <span className="korean-subtitle text-xl text-center">Vegan Seoul</span>
              </div>
              <div className="food-card aspect-square bg-gradient-to-br from-korean-red/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                <span className="korean-subtitle text-2xl text-center">Spicy Delights</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;