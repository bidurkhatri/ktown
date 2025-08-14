import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Menu, X, Facebook, Instagram, Phone, User, LogOut, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import kTownLogo from '@/assets/ktown-logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Chi-Maek', href: '/chi-maek' },
    { name: 'Vegan Seoul', href: '/vegan-seoul' },
    { name: 'Book a Table', href: '/book' },
    { name: 'Order Online', href: '/order' },
    { name: 'Location', href: '/location' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={kTownLogo} alt="K-Town Newtown" className="h-8 md:h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.href) ? 'text-primary neon-glow' : 'text-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Section - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
                      <Shield className="h-4 w-4 mr-1" />
                      Admin
                    </Button>
                  </Link>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={signOut}
                  className="text-foreground hover:text-primary"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
                  <User className="h-4 w-4 mr-1" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Social Icons & Call Button - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
               className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
               className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <Button variant="outline" size="sm" className="btn-outline-korean" asChild>
              <a href="tel:+61234567890">
                <Phone className="h-4 w-4 mr-2" />
                Call Us
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border mt-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.href) ? 'text-primary' : 'text-foreground'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
              </Link>
              ))}
              
              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-border">
                {user ? (
                  <div className="space-y-2">
                    {isAdmin && (
                      <Link 
                        to="/admin" 
                        className="flex items-center text-sm font-medium transition-colors hover:text-primary text-foreground"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Admin Dashboard
                      </Link>
                    )}
                    <button 
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center text-sm font-medium transition-colors hover:text-primary text-foreground w-full text-left"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link 
                    to="/auth" 
                    className="flex items-center text-sm font-medium transition-colors hover:text-primary text-foreground"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Link>
                )}
              </div>
              
              <div className="flex items-center space-x-4 pt-4 border-t border-border">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                   className="text-muted-foreground hover:text-primary transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                   className="text-muted-foreground hover:text-primary transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <Button variant="outline" size="sm" className="btn-outline-korean" asChild>
                  <a href="tel:+61234567890">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Us
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;