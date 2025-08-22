import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone, Calendar, Menu } from 'lucide-react';

const SimpleMobileNav = () => {

  return (
    <>
      {/* Spacer to prevent content from being hidden behind fixed nav */}
      <div className="h-20 md:hidden" />
      
      {/* Fixed bottom navigation for mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 md:hidden">
        <div className="grid grid-cols-3 gap-1 p-2">
          <Button variant="ghost" className="flex flex-col items-center py-2 h-auto" asChild>
            <a href="tel:+61234567890">
              <Phone className="h-5 w-5 mb-1" />
              <span className="text-xs">Call</span>
            </a>
          </Button>
          
          <Button variant="ghost" className="flex flex-col items-center py-2 h-auto" asChild>
            <Link to="/book">
              <Calendar className="h-5 w-5 mb-1" />
              <span className="text-xs">Book</span>
            </Link>
          </Button>
          
          <Button variant="ghost" className="flex flex-col items-center py-2 h-auto" asChild>
            <Link to="/menu">
              <Menu className="h-5 w-5 mb-1" />
              <span className="text-xs">Menu</span>
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default SimpleMobileNav;