
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Phone, Mail, Train, Car, Navigation, ExternalLink, Calendar } from 'lucide-react';

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
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Find us upstairs inside the iconic Newtown Hotel — right in the heart of King Street's vibrant dining scene.
            </p>
          </div>
        </section>

        {/* Location Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Interactive Map */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="korean-subtitle text-2xl flex items-center">
                      <MapPin className="mr-2 h-6 w-6 text-korean-red" />
                      We're Here!
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Google Maps Embed */}
                    <div className="relative overflow-hidden rounded-lg mb-4">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.455678!2d151.174456!3d-33.897112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12b0221ad33bb7%3A0x59dfbc5acb6cd2c4!2sNewtown%20Hotel!5e0!3m2!1sen!2sau!4v1691548000000!5m2!1sen!2sau"
                        width="100%"
                        height="350"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-80 rounded-lg"
                        title="K-Town Newtown @ Newtown Hotel"
                      />
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <p className="font-semibold text-lg">K-Town Newtown</p>
                      <p className="text-muted-foreground">Inside Newtown Hotel</p>
                      <p>174 King Street</p>
                      <p>Newtown NSW 2042</p>
                      <p>Australia</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button className="flex-1 btn-korean" asChild>
                        <a 
                          href="https://maps.google.com/maps?q=174+King+Street,+Newtown+NSW+2042" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Navigation className="mr-2 h-4 w-4" />
                          Get Directions
                        </a>
                      </Button>
                      
                      <Button variant="outline" className="flex-1" asChild>
                        <a 
                          href="https://www.google.com/maps/@-33.897112,151.174456,3a,75y,90t/data=!3m6!1e1" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Street View
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact & Info */}
              <div className="space-y-8">
                {/* Contact Details */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="korean-subtitle text-2xl flex items-center">
                      <Phone className="mr-2 h-6 w-6 text-korean-red" />
                      Contact Details
                    </CardTitle>
                    <Button className="btn-korean-secondary" asChild>
                      <a href="/book">
                        <Calendar className="mr-2 h-4 w-4" />
                        Book Table
                      </a>
                    </Button>
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
                      <p className="text-sm text-center text-muted-foreground">
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
                      <Train className="h-5 w-5 text-korean-red mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">By Train</p>
                        <p className="text-sm text-muted-foreground">
                          2 minute walk from Newtown Station<br />
                          T2 Inner West & Leppington Line
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Car className="h-5 w-5 text-korean-red mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">By Car</p>
                        <p className="text-sm text-muted-foreground">
                          Limited street parking on King Street<br />
                          Free after 6pm weekdays
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <span className="h-5 w-5 text-korean-red mt-0.5 text-center font-bold text-lg flex-shrink-0">🚌</span>
                      <div>
                        <p className="font-semibold">By Bus</p>
                        <p className="text-sm text-muted-foreground">
                          Routes 422, 423, 426, 428, 430, 370 stop nearby<br />
                          Multiple stops along King Street
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
