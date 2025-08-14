import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Beer, Flame, Calendar, Plus } from 'lucide-react';

const ChiMaek = () => {
  const chiMaekItems = [
    {
      id: 1,
      name: 'Soyamite',
      tagline: 'Light it up like dynamite!',
      price: '$40 / $25',
      description: 'Our signature double-fried chicken with explosive Korean spices. Sweet, spicy, and absolutely addictive.',
      spiceLevel: 3,
      popular: true,
    },
    {
      id: 2,
      name: 'Buldak Crunch',
      tagline: 'The Buldak Challenge!',
      price: '$40 / $25',
      description: 'Fiery hot chicken that\'ll test your spice tolerance. Not for the faint of heart!',
      spiceLevel: 5,
      popular: false,
    },
    {
      id: 3,
      name: 'Gangnam Fried',
      tagline: 'Classic Korean style',
      price: '$40 / $25',
      description: 'Traditional Korean fried chicken with a sweet and savory glaze. Perfect for first-timers.',
      spiceLevel: 1,
      popular: true,
    },
    {
      id: 4,
      name: 'Kimchi Chicken',
      tagline: 'Fermented goodness',
      price: '$40 / $25',
      description: 'Double-fried chicken with fermented kimchi seasoning and tangy sauce.',
      spiceLevel: 4,
      popular: false,
    },
  ];

  const renderSpiceLevel = (level: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, index) => (
          <Flame
            key={index}
            className={`h-4 w-4 ${
              index < level ? 'text-korean-red fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-muted-foreground ml-2">
          {level === 1 ? 'Mild' : level === 2 ? 'Medium' : level === 3 ? 'Spicy' : level === 4 ? 'Very Spicy' : 'Extreme'}
        </span>
      </div>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-korean-red via-korean-red/90 to-korean-yellow/80 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex justify-center items-center space-x-6 mb-8">
                <span className="korean-title text-8xl md:text-9xl">치</span>
                <Plus className="h-16 w-16 animate-pulse" />
                <span className="korean-title text-8xl md:text-9xl">맥</span>
              </div>
              
              <h1 className="korean-title text-4xl md:text-5xl mb-6">
                Chi-Maek: Chicken + Beer
              </h1>
              
              <p className="text-xl md:text-2xl leading-relaxed mb-8">
                Korea's most iconic duo. Our fried chicken is double-fried for maximum crunch, 
                tender on the inside, served with house pickled radish and ice-cold Korean beer.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-white text-korean-red hover:bg-gray-100 font-bold text-lg px-8 py-4">
                  <Link to="/book">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book Your Chi-Maek Experience
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-korean-red font-bold text-lg px-8 py-4">
                  <Link to="/menu">
                    View Full Menu
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Chi-Maek Menu */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="korean-title text-4xl md:text-5xl text-korean-red mb-4">
                Our Chi-Maek Selection
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose your adventure: mild to mind-blowing
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {chiMaekItems.map((item) => (
                <Card key={item.id} className="food-card overflow-hidden">
                  <div className="relative h-48 bg-gradient-to-br from-korean-red/20 to-korean-yellow/20 flex items-center justify-center">
                    <span className="text-6xl">🍗</span>
                    {item.popular && (
                      <Badge className="absolute top-4 right-4 bg-korean-yellow text-korean-red">
                        Popular
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="korean-subtitle text-2xl">{item.name}</h3>
                        <p className="text-korean-red font-medium italic">{item.tagline}</p>
                      </div>
                      <span className="text-korean-red font-bold text-xl">{item.price}</span>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <span className="text-sm font-medium text-foreground mb-2 block">Spice Level:</span>
                        {renderSpiceLevel(item.spiceLevel)}
                      </div>
                      
                      <Button className="w-full btn-korean">
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

        {/* The Perfect Pairing */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="korean-title text-4xl md:text-5xl text-korean-red mb-4">
                The Perfect Pairing
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="food-card text-center">
                <CardContent className="p-6">
                  <div className="text-6xl mb-4">🍺</div>
                  <h3 className="korean-subtitle text-xl mb-3">Korean Beer</h3>
                  <p className="text-muted-foreground">
                    Ice-cold Hite, Cass, or OB - the authentic Korean beer experience
                  </p>
                </CardContent>
              </Card>

              <Card className="food-card text-center">
                <CardContent className="p-6">
                  <div className="text-6xl mb-4">🥬</div>
                  <h3 className="korean-subtitle text-xl mb-3">Pickled Radish</h3>
                  <p className="text-muted-foreground">
                    Fresh, crunchy pickled radish to cleanse your palate between bites
                  </p>
                </CardContent>
              </Card>

              <Card className="food-card text-center">
                <CardContent className="p-6">
                  <div className="text-6xl mb-4">🌶️</div>
                  <h3 className="korean-subtitle text-xl mb-3">Korean Banchan</h3>
                  <p className="text-muted-foreground">
                    Traditional side dishes to complement your chicken perfectly
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-charcoal text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="korean-title text-4xl md:text-5xl text-korean-yellow mb-6">
              Ready for Chi-Maek Night?
            </h2>
            
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Gather your friends and experience the Korean way to unwind. 
              Book your table now for the ultimate Chi-Maek experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-korean text-lg px-8 py-4">
                <Link to="/book">
                  <Beer className="mr-2 h-5 w-5" />
                  Book Chi-Maek Table
                </Link>
              </Button>
              
              <Button asChild className="btn-korean-secondary text-lg px-8 py-4">
                <Link to="/order">
                  Order for Delivery
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ChiMaek;