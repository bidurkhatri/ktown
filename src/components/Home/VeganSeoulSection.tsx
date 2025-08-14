import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Leaf, Heart, Sparkles } from 'lucide-react';

const VeganSeoulSection = () => {
  const veganDishes = [
    {
      name: "Vegan KFC",
      description: "Plant-based chicken that'll fool your taste buds",
      icon: "🌱"
    },
    {
      name: "Perilla Buckwheat Noodles",
      description: "Nutty, hearty noodles with Korean flavours",
      icon: "🍜"
    },
    {
      name: "Cabbage Jeon",
      description: "Crispy Korean pancakes with fresh vegetables",
      icon: "🥞"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-green-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center space-x-4 mb-6">
            <Leaf className="h-12 w-12 text-green-600" />
            <h2 className="korean-title text-4xl md:text-5xl text-green-800">
              Vegan Seoul
            </h2>
            <Sparkles className="h-12 w-12 text-green-600" />
          </div>
          
          <p className="text-xl text-green-700 max-w-3xl mx-auto leading-relaxed">
            Flavour-packed, plant-based options – because K-Town loves every diner. 
            No compromise on taste, just pure Korean deliciousness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {veganDishes.map((dish, index) => (
            <Card key={index} className="food-card bg-white border-green-200 hover:border-green-400 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-6xl mb-4">{dish.icon}</div>
                <h3 className="korean-subtitle text-xl text-green-800 mb-3">{dish.name}</h3>
                <p className="text-green-600 leading-relaxed">{dish.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Highlight */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-green-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Heart className="h-8 w-8 text-red-500" />
                <span className="korean-subtitle text-2xl text-green-800">
                  Plant-Powered Goodness
                </span>
              </div>
              
              <div className="space-y-4 text-green-700">
                <p className="text-lg leading-relaxed">
                  Our vegan options aren't an afterthought – they're a celebration of Korean cuisine's 
                  natural harmony with plant-based ingredients.
                </p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>100% Plant-Based</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Authentic Korean Flavours</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Fresh Local Ingredients</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Made with Love</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="relative inline-block">
                <div className="text-8xl mb-4">🌿</div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              </div>
              <p className="korean-subtitle text-lg text-green-800 mb-6">
                "Can't believe it's vegan!"
              </p>
              <p className="text-sm text-green-600 italic">
                - Every customer who tries our Vegan KFC
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button asChild className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-4">
            <Link to="/vegan-seoul">
              <Leaf className="mr-2 h-5 w-5" />
              Explore Vegan Seoul
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VeganSeoulSection;