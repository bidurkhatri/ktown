import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Leaf, Heart, Sparkles, Plus, Award } from 'lucide-react';

const VeganSeoul = () => {
  const veganItems = [
    {
      id: 1,
      name: 'Vegan KFC',
      tagline: 'Can\'t believe it\'s vegan!',
      price: '$40 / $25',
      description: 'Plant-based perfection that rivals the real thing. Made with premium soy protein and our secret Korean spice blend.',
      features: ['High Protein', 'Zero Cholesterol', 'Crispy Perfection'],
      popular: true,
    },
    {
      id: 2,
      name: 'Perilla Buckwheat Noodles',
      tagline: 'Nutty, hearty, satisfying',
      price: '$18',
      description: 'Traditional buckwheat noodles with perilla oil, fresh vegetables, and authentic Korean seasonings.',
      features: ['Gluten-Free Option', 'Rich in Omega-3', 'Traditional Recipe'],
      popular: false,
    },
    {
      id: 3,
      name: 'Cabbage Jeon',
      tagline: 'Crispy Korean pancakes',
      price: '$16',
      description: 'Golden, crispy Korean pancakes loaded with fresh cabbage and Korean seasonings. Perfect for sharing.',
      features: ['Fresh Vegetables', 'Crispy Texture', 'Sharing Size'],
      popular: true,
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-green-600 via-green-500 to-green-400 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex justify-center items-center space-x-4 mb-8">
                <Leaf className="h-16 w-16" />
                <h1 className="korean-title text-6xl md:text-8xl">
                  Vegan Seoul
                </h1>
                <Sparkles className="h-16 w-16" />
              </div>
              
              <p className="text-xl md:text-2xl leading-relaxed mb-8">
                Flavour-packed, plant-based, and 100% satisfying – no compromise on taste, 
                just pure Korean deliciousness that happens to be vegan.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-white text-green-600 hover:bg-gray-100 font-bold text-lg px-8 py-4">
                  <Link to="/book">
                    <Heart className="mr-2 h-5 w-5" />
                    Book Plant-Based Table
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 font-bold text-lg px-8 py-4">
                  <Link to="/menu">
                    View Full Menu
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Plant-Powered Philosophy */}
        <section className="py-16 bg-gradient-to-b from-green-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="korean-title text-4xl md:text-5xl text-green-800 mb-8">
                Plant-Powered Korean Cuisine
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="text-left space-y-6">
                  <p className="text-lg text-green-700 leading-relaxed">
                    Our vegan options aren't an afterthought – they're a celebration of Korean cuisine's 
                    natural harmony with plant-based ingredients.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-green-700">100% Plant-Based</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-green-700">Authentic Flavours</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-green-700">Fresh Local Ingredients</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-green-700">Environmentally Conscious</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="text-8xl mb-4">🌱</div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-lg border border-green-200 inline-block">
                    <p className="korean-subtitle text-lg text-green-800 mb-2">
                      "Best vegan Korean food in Sydney!"
                    </p>
                    <div className="flex justify-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vegan Menu */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="korean-title text-4xl md:text-5xl text-green-800 mb-4">
                Our Vegan Seoul Menu
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Every dish crafted with love, creativity, and the finest plant-based ingredients
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {veganItems.map((item) => (
                <Card key={item.id} className="food-card overflow-hidden">
                  <div className="relative h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                    <span className="text-6xl">🌿</span>
                    {item.popular && (
                      <Badge className="absolute top-4 right-4 bg-green-600 text-white">
                        <Award className="h-3 w-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="korean-subtitle text-xl text-green-800">{item.name}</h3>
                        <p className="text-green-600 font-medium italic">{item.tagline}</p>
                      </div>
                      <span className="text-green-600 font-bold text-lg">{item.price}</span>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <span className="text-sm font-medium text-foreground mb-2 block">Features:</span>
                        <div className="flex flex-wrap gap-2">
                          {item.features.map((feature, index) => (
                            <Badge key={index} variant="secondary" className="bg-green-100 text-green-700">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Add to Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Sustainability Message */}
        <section className="py-16 bg-green-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="korean-title text-4xl md:text-5xl mb-8">
                Good for You, Good for the Planet
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="text-6xl mb-4">💚</div>
                  <h3 className="korean-subtitle text-xl mb-3">Health Conscious</h3>
                  <p>Lower in saturated fat, zero cholesterol, packed with nutrients</p>
                </div>
                
                <div className="text-center">
                  <div className="text-6xl mb-4">🌍</div>
                  <h3 className="korean-subtitle text-xl mb-3">Eco-Friendly</h3>
                  <p>Reduced carbon footprint while supporting sustainable agriculture</p>
                </div>
                
                <div className="text-center">
                  <div className="text-6xl mb-4">🌾</div>
                  <h3 className="korean-subtitle text-xl mb-3">Local Sourcing</h3>
                  <p>Supporting Australian farmers and reducing food miles</p>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
                <h3 className="korean-subtitle text-2xl mb-4">Join the Plant-Based Revolution</h3>
                <p className="text-lg mb-6">
                  Whether you're vegan, vegetarian, or just curious about plant-based eating, 
                  our Vegan Seoul menu proves that choosing plants doesn't mean sacrificing flavour.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="bg-white text-green-600 hover:bg-gray-100 font-bold">
                    <Link to="/book">
                      <Leaf className="mr-2 h-5 w-5" />
                      Book Vegan Table
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 font-bold">
                    <Link to="/order">
                      Order Plant-Based Delivery
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default VeganSeoul;