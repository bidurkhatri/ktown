import { MapPin, Clock, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="korean-subtitle text-korean-yellow mb-4">Find Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-korean-red mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">K-Town Newtown</p>
                  <p className="text-sm text-gray-300">
                    123 King Street<br />
                    Newtown NSW 2042<br />
                    Australia
                  </p>
                  <p className="text-sm text-korean-yellow mt-1">
                    2 min walk from Newtown Station
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-korean-red" />
                <a href="tel:+61234567890" className="hover:text-korean-yellow transition-colors">
                  (02) 1234 5678
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-korean-red" />
                <a href="mailto:hello@ktownnewtown.com.au" className="hover:text-korean-yellow transition-colors">
                  hello@ktownnewtown.com.au
                </a>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="korean-subtitle text-korean-yellow mb-4">Opening Hours</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Mon–Thu</span>
                <span>5pm–10pm</span>
              </div>
              <div className="flex justify-between">
                <span>Fri–Sat</span>
                <span>5pm–11pm</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>5pm–10pm</span>
              </div>
            </div>
            
            <Button className="btn-korean mt-6" asChild>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                <MapPin className="h-4 w-4 mr-2" />
                Get Directions
              </a>
            </Button>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h3 className="korean-subtitle text-korean-yellow mb-4">Stay Connected</h3>
            <div className="flex space-x-4 mb-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                 className="bg-korean-red hover:bg-korean-red/80 p-3 rounded-full transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                 className="bg-korean-red hover:bg-korean-red/80 p-3 rounded-full transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm text-gray-300">
                Get updates on K-pop nights, beer specials, and new menu items!
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-korean-red"
                />
                <Button className="btn-korean rounded-l-none">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-400">
            © 2024 K-Town Newtown. All rights reserved.
          </p>
          <p className="text-sm text-gray-400">
            Designed with ❤️ in Newtown
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;