import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Phone, Mail, Train, Car, Navigation } from 'lucide-react';

const Location = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="py-16 bg-gradient-to-r from-korean-red to-korean-yellow text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="korean-title text-5xl md:text-7xl mb-4">
              Find Us
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Right in the heart of Newtown's vibrant food scene
            </p>
          </div>
        </section>

        {/* Location Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Map */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="korean-subtitle text-2xl flex items-center">
                      <MapPin className="mr-2 h-6 w-6 text-korean-red" />
                      We're Here!
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Placeholder for Google Maps */}
                    <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center mb-4">
                      <div className="text-center">
                        <MapPin className="h-16 w-16 text-korean-red mx-auto mb-4" />
                        <p className="text-lg font-semibold">Interactive Map</p>
                        <p className="text-muted-foreground">Google Maps integration would go here</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="font-semibold text-lg">K-Town Newtown</p>
                      <p>123 King Street</p>
                      <p>Newtown NSW 2042</p>
                      <p>Australia</p>
                    </div>
                    
                    <Button className="w-full mt-4 btn-korean" asChild>
                      <a 
                        href="https://maps.google.com/maps?q=123+King+Street,+Newtown+NSW+2042" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Navigation className="mr-2 h-4 w-4" />
                        Get Directions
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Contact & Info */}
              <div className="space-y-8">
                {/* Contact Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="korean-subtitle text-2xl flex items-center">
                      <Phone className="mr-2 h-6 w-6 text-korean-red" />
                      Contact Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-korean-red" />
                      <div>
                        <a href="tel:+61234567890" className="font-semibold hover:text-korean-red transition-colors">
                          (02) 1234 5678
                        </a>
                        <p className="text-sm text-muted-foreground">Click to call</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-korean-red" />
                      <div>
                        <a href="mailto:hello@ktownnewtown.com.au" className="font-semibold hover:text-korean-red transition-colors">
                          hello@ktownnewtown.com.au
                        </a>
                        <p className="text-sm text-muted-foreground">General inquiries</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Opening Hours */}
                <Card>
                  <CardHeader>
                    <CardTitle className="korean-subtitle text-2xl flex items-center">
                      <Clock className="mr-2 h-6 w-6 text-korean-red" />
                      Opening Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="font-medium">Monday – Thursday</span>
                        <span className="font-semibold text-korean-red">5:00pm – 10:00pm</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="font-medium">Friday – Saturday</span>
                        <span className="font-semibold text-korean-red">5:00pm – 11:00pm</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="font-medium">Sunday</span>
                        <span className="font-semibold text-korean-red">5:00pm – 10:00pm</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 bg-korean-yellow/10 rounded-lg">
                      <p className="text-sm text-center">
                        <strong>Last orders:</strong> 30 minutes before closing
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Getting Here */}
                <Card>
                  <CardHeader>
                    <CardTitle className="korean-subtitle text-2xl flex items-center">
                      <Train className="mr-2 h-6 w-6 text-korean-red" />
                      Getting Here
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Train className="h-5 w-5 text-korean-red mt-0.5" />
                      <div>
                        <p className="font-semibold">By Train</p>
                        <p className="text-sm text-muted-foreground">
                          2 minute walk from Newtown Station<br />
                          T2 Inner West & Leppington Line
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Car className="h-5 w-5 text-korean-red mt-0.5" />
                      <div>
                        <p className="font-semibold">By Car</p>
                        <p className="text-sm text-muted-foreground">
                          Street parking available on King Street<br />
                          Paid parking after 6pm weekdays
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <span className="h-5 w-5 text-korean-red mt-0.5 text-center font-bold">🚌</span>
                      <div>
                        <p className="font-semibold">By Bus</p>
                        <p className="text-sm text-muted-foreground">
                          Multiple bus routes stop on King Street<br />
                          Routes 422, 423, 426, 428
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Neighbourhood */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="korean-title text-4xl md:text-5xl text-korean-red mb-4">
                In the Heart of Newtown
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Located on iconic King Street, surrounded by vintage shops, street art, 
                and Sydney's most eclectic dining scene
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-6xl mb-4">🎨</div>
                  <h3 className="korean-subtitle text-xl mb-3">Street Art</h3>
                  <p className="text-muted-foreground">
                    Explore Newtown's famous street art and murals along King Street
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-6xl mb-4">🛍️</div>
                  <h3 className="korean-subtitle text-xl mb-3">Vintage Shopping</h3>
                  <p className="text-muted-foreground">
                    Discover unique finds in the many vintage and retro stores nearby
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-6xl mb-4">🎵</div>
                  <h3 className="korean-subtitle text-xl mb-3">Live Music</h3>
                  <p className="text-muted-foreground">
                    Newtown's legendary music venues are just a short walk away
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Location;