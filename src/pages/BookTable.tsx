import { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Users, Phone, Mail, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BookTable = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
  });

  const timeSlots = [
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', 
    '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.phone || !formData.date || !formData.time || !formData.guests) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate booking submission
    toast({
      title: "Booking Request Submitted! 🎉",
      description: "We'll confirm your reservation within 30 minutes via SMS.",
    });

    // Reset form
    setFormData({
      name: '',
      phone: '',
      date: '',
      time: '',
      guests: '',
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="py-16 bg-gradient-to-r from-korean-red to-korean-yellow text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="korean-title text-5xl md:text-7xl mb-4">
              Book a Table
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Secure your spot for the ultimate K-Town experience
            </p>
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="korean-subtitle text-2xl text-center">Book Your Table</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Your Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="0412 345 678"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="date">Date *</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => handleInputChange('date', e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="time">Time *</Label>
                        <Select onValueChange={(value) => handleInputChange('time', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>{time}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="guests">People *</Label>
                        <Select onValueChange={(value) => handleInputChange('guests', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="How many?" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1,2,3,4,5,6,7,8].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? 'person' : 'people'}
                              </SelectItem>
                            ))}
                            <SelectItem value="9+">9+ people</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button type="submit" className="w-full btn-korean text-lg py-3">
                      <Calendar className="mr-2 h-5 w-5" />
                      Book Table
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Info Panel */}
              <div className="space-y-8">
                {/* Opening Hours */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center korean-subtitle text-xl">
                      <Clock className="mr-2 h-5 w-5 text-korean-red" />
                      Opening Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Monday – Thursday</span>
                        <span className="font-semibold">5:00pm – 10:00pm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Friday – Saturday</span>
                        <span className="font-semibold">5:00pm – 11:00pm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span className="font-semibold">5:00pm – 10:00pm</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center korean-subtitle text-xl">
                      <Phone className="mr-2 h-5 w-5 text-korean-red" />
                      Contact Us
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-korean-red" />
                      <a href="tel:+61234567890" className="hover:text-korean-red transition-colors">
                        (02) 1234 5678
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-korean-red" />
                      <a href="mailto:bookings@ktownnewtown.com.au" className="hover:text-korean-red transition-colors">
                        bookings@ktownnewtown.com.au
                      </a>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-korean-red mt-0.5" />
                      <div>
                        <p>123 King Street</p>
                        <p>Newtown NSW 2042</p>
                        <p className="text-korean-red text-sm mt-1">2 min walk from Newtown Station</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Group Bookings */}
                <Card className="bg-gradient-to-br from-korean-red/10 to-korean-yellow/10">
                  <CardHeader>
                    <CardTitle className="flex items-center korean-subtitle text-xl">
                      <Users className="mr-2 h-5 w-5 text-korean-red" />
                      Large Groups & Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Planning a party, corporate event, or K-pop night out? We can accommodate groups of 9+ with special menus and arrangements.
                    </p>
                    <Button variant="outline" className="btn-outline-korean">
                      <a href="mailto:events@ktownnewtown.com.au">Contact Events Team</a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default BookTable;