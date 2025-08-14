import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Truck, Clock, Smartphone, CreditCard, Star } from 'lucide-react';

const OrderOnline = () => {
  const deliveryPlatforms = [
    {
      name: 'Uber Eats',
      description: 'Fast delivery across Sydney',
      deliveryTime: '25-35 mins',
      fee: '$2.99',
      color: 'bg-black text-white',
      url: '#',
    },
    {
      name: 'DoorDash',
      description: 'Reliable delivery service',
      deliveryTime: '30-40 mins', 
      fee: '$3.49',
      color: 'bg-red-600 text-white',
      url: '#',
    },
    {
      name: 'Menulog',
      description: 'Local delivery option',
      deliveryTime: '35-45 mins',
      fee: '$3.99',
      color: 'bg-orange-500 text-white',
      url: '#',
    },
  ];

  const popularItems = [
    { name: 'Soyamite Chicken', price: '$25', rating: 4.8 },
    { name: 'Vegan KFC', price: '$25', rating: 4.9 },
    { name: 'Tteokbokki Skewers', price: '$10', rating: 4.7 },
    { name: 'Buldak Crunch', price: '$25', rating: 4.6 },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="py-16 bg-gradient-to-r from-korean-red to-korean-yellow text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="korean-title text-5xl md:text-7xl mb-4">
              Order Online
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Get K-Town delivered straight to your door
            </p>
          </div>
        </section>

        {/* Delivery Platforms */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="korean-title text-4xl md:text-5xl text-korean-red mb-4">
                Choose Your Platform
              </h2>
              <p className="text-xl text-muted-foreground">
                Order through your favourite delivery app
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {deliveryPlatforms.map((platform, index) => (
                <Card key={index} className="food-card hover:scale-105 transition-transform duration-300">
                  <CardHeader className="text-center">
                    <div className={`mx-auto w-16 h-16 rounded-full ${platform.color} flex items-center justify-center mb-4`}>
                      <Truck className="h-8 w-8" />
                    </div>
                    <CardTitle className="korean-subtitle text-xl">{platform.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <p className="text-muted-foreground">{platform.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Delivery Time:</span>
                        <Badge variant="outline">{platform.deliveryTime}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Delivery Fee:</span>
                        <span className="font-semibold">{platform.fee}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full btn-korean" asChild>
                      <a href={platform.url} target="_blank" rel="noopener noreferrer">
                        Order on {platform.name}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Items */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="korean-title text-4xl md:text-5xl text-korean-red mb-4">
                Most Ordered Items
              </h2>
              <p className="text-xl text-muted-foreground">
                See what everyone's ordering for delivery
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {popularItems.map((item, index) => (
                <Card key={index} className="food-card text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">🍗</div>
                    <h3 className="korean-subtitle text-lg mb-2">{item.name}</h3>
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{item.rating}</span>
                    </div>
                    <p className="text-korean-red font-bold text-lg">{item.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Delivery Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Delivery Areas */}
              <Card>
                <CardHeader>
                  <CardTitle className="korean-subtitle text-2xl flex items-center">
                    <Truck className="mr-2 h-6 w-6 text-korean-red" />
                    Delivery Areas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground mb-4">
                    We deliver to these Sydney areas:
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>• Newtown</div>
                    <div>• Enmore</div>
                    <div>• Erskineville</div>
                    <div>• Marrickville</div>
                    <div>• Camperdown</div>
                    <div>• Glebe</div>
                    <div>• Redfern</div>
                    <div>• Surry Hills</div>
                    <div>• Chippendale</div>
                    <div>• Alexandria</div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-korean-yellow/10 rounded-lg">
                    <p className="text-sm">
                      <strong>Free delivery</strong> on orders over $35 within 5km of Newtown
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Order Info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="korean-subtitle text-xl flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-korean-red" />
                      Delivery Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Mon–Thu</span>
                        <span className="font-semibold">5:00pm – 9:30pm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fri–Sat</span>
                        <span className="font-semibold">5:00pm – 10:30pm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span className="font-semibold">5:00pm – 9:30pm</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="korean-subtitle text-xl flex items-center">
                      <Smartphone className="mr-2 h-5 w-5 text-korean-red" />
                      How to Order
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-korean-red text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <span>Choose your delivery platform</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-korean-red text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <span>Browse our full menu</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-korean-red text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      <span>Add items to your cart</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-korean-red text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      <span>Check out and track delivery</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="korean-subtitle text-xl flex items-center">
                      <CreditCard className="mr-2 h-5 w-5 text-korean-red" />
                      Payment Options
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      We accept all major credit cards, PayPal, Apple Pay, and Google Pay through our delivery partners.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contact for Issues */}
        <section className="py-16 bg-charcoal text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="korean-title text-3xl md:text-4xl text-korean-yellow mb-6">
              Need Help with Your Order?
            </h2>
            
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              If you have any issues with your delivery order, get in touch with us directly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-korean text-lg px-8 py-4">
                <a href="tel:+61234567890">
                  Call: (02) 1234 5678
                </a>
              </Button>
              
              <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-charcoal text-lg px-8 py-4">
                <a href="mailto:delivery@ktownnewtown.com.au">
                  Email Support
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default OrderOnline;