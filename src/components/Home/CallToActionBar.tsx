import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Phone, ShoppingBag } from 'lucide-react';

const CallToActionBar = () => {
  return (
    <>
      {/* Desktop CTA Section */}
      <section className="hidden md:block py-16 bg-charcoal">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="korean-title text-3xl md:text-4xl text-korean-yellow mb-4">
              Ready for K-Town?
            </h2>
            <p className="text-xl text-gray-300">
              Visit us in Newtown or order for delivery
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild className="btn-korean text-lg px-8 py-4">
              <Link to="/location">
                <MapPin className="mr-2 h-5 w-5" />
                Find Us in Newtown
              </Link>
            </Button>
            
            <Button asChild className="btn-korean-secondary text-lg px-8 py-4">
              <Link to="/book">
                <Calendar className="mr-2 h-5 w-5" />
                Book a Table
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-charcoal text-lg px-8 py-4">
              <Link to="/order">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Order Online
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mobile Sticky CTA Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-charcoal border-t border-gray-700 p-4">
        <div className="grid grid-cols-2 gap-3">
          <Button asChild className="btn-korean-secondary">
            <Link to="/book">
              <Calendar className="mr-2 h-4 w-4" />
              Book Table
            </Link>
          </Button>
          
          <Button asChild className="btn-korean">
            <a href="tel:+61234567890">
              <Phone className="mr-2 h-4 w-4" />
              Call Us
            </a>
          </Button>
        </div>
        
        <Button asChild className="w-full mt-3 btn-outline-korean">
          <Link to="/order">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Order Online
          </Link>
        </Button>
      </div>

      {/* Add bottom padding to main content on mobile to account for sticky bar */}
      <div className="md:hidden h-32"></div>
    </>
  );
};

export default CallToActionBar;