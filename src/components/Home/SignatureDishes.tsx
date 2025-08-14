import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Flame, Leaf } from 'lucide-react';
import soyamiteImage from '@/assets/soyamite-chicken.jpg';
import buldakImage from '@/assets/buldak-chicken.jpg';
import veganKfcImage from '@/assets/vegan-kfc.jpg';
import tteokbokkiImage from '@/assets/tteokbokki-skewers.jpg';

const SignatureDishes = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const dishes = [
    {
      id: 1,
      name: "Soyamite Chicken",
      tagline: "Light it up like dynamite!",
      price: "$40 / $25",
      image: soyamiteImage,
      description: "Our signature double-fried chicken with explosive Korean spices",
      spicy: true,
      vegan: false,
    },
    {
      id: 2,
      name: "Buldak Crunch",
      tagline: "The Buldak Challenge!",
      price: "$40 / $25",
      image: buldakImage,
      description: "Fiery hot chicken that'll test your spice tolerance",
      spicy: true,
      vegan: false,
    },
    {
      id: 3,
      name: "Vegan KFC",
      tagline: "Can't believe it's vegan!",
      price: "$40 / $25",
      image: veganKfcImage,
      description: "Plant-based perfection that rivals the real thing",
      spicy: false,
      vegan: true,
    },
    {
      id: 4,
      name: "Tteokbokki Skewers",
      tagline: "Korean comfort on a stick",
      price: "$10",
      image: tteokbokkiImage,
      description: "Chewy rice cakes pan-fried & coated in signature chilli paste",
      spicy: true,
      vegan: true,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % dishes.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + dishes.length) % dishes.length);
  };

  return (
    <section className="py-20 bg-charcoal text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="korean-title text-4xl md:text-5xl text-korean-yellow mb-4">
            Signature Dishes
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            The flavours that put K-Town on the map
          </p>
        </div>

        {/* Mobile Slider */}
        <div className="block lg:hidden">
          <div className="relative">
            <Card className="bg-gray-800 border-gray-700 overflow-hidden">
              <div className="relative h-64">
                <img 
                  src={dishes[currentSlide].image} 
                  alt={dishes[currentSlide].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  {dishes[currentSlide].spicy && (
                    <div className="bg-korean-red px-2 py-1 rounded-full flex items-center">
                      <Flame className="h-4 w-4 mr-1" />
                      <span className="text-xs font-bold">SPICY</span>
                    </div>
                  )}
                  {dishes[currentSlide].vegan && (
                    <div className="bg-green-500 px-2 py-1 rounded-full flex items-center">
                      <Leaf className="h-4 w-4 mr-1" />
                      <span className="text-xs font-bold">VEGAN</span>
                    </div>
                  )}
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="korean-subtitle text-xl">{dishes[currentSlide].name}</h3>
                  <span className="text-korean-yellow font-bold">{dishes[currentSlide].price}</span>
                </div>
                <p className="text-korean-red font-medium mb-2">{dishes[currentSlide].tagline}</p>
                <p className="text-gray-300 text-sm">{dishes[currentSlide].description}</p>
              </CardContent>
            </Card>

            {/* Slider Controls */}
            <div className="flex justify-center items-center mt-6 space-x-4">
              <Button 
                onClick={prevSlide}
                variant="outline" 
                size="icon"
                className="border-korean-red text-korean-red hover:bg-korean-red hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex space-x-2">
                {dishes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      currentSlide === index ? 'bg-korean-red' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              
              <Button 
                onClick={nextSlide}
                variant="outline" 
                size="icon"
                className="border-korean-red text-korean-red hover:bg-korean-red hover:text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {dishes.map((dish) => (
            <Card key={dish.id} className="food-card bg-gray-800 border-gray-700 overflow-hidden group">
              <div className="relative h-48">
                <img 
                  src={dish.image} 
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  {dish.spicy && (
                    <div className="bg-korean-red px-2 py-1 rounded-full flex items-center">
                      <Flame className="h-4 w-4 mr-1" />
                      <span className="text-xs font-bold">SPICY</span>
                    </div>
                  )}
                  {dish.vegan && (
                    <div className="bg-green-500 px-2 py-1 rounded-full flex items-center">
                      <Leaf className="h-4 w-4 mr-1" />
                      <span className="text-xs font-bold">VEGAN</span>
                    </div>
                  )}
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="korean-subtitle text-lg">{dish.name}</h3>
                  <span className="text-korean-yellow font-bold">{dish.price}</span>
                </div>
                <p className="text-korean-red font-medium mb-2">{dish.tagline}</p>
                <p className="text-gray-300 text-sm">{dish.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild className="btn-korean-secondary">
            <a href="/menu">View Full Menu</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SignatureDishes;