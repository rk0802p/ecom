import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-light-grey/30' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl md:text-3xl font-playfair font-bold text-gradient">
              AeroStride
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-dark-charcoal hover:text-accent-peach transition-colors duration-300 font-medium">
              Home
            </Link>
            <a href="#products" className="text-dark-charcoal hover:text-accent-peach transition-colors duration-300 font-medium">
              Products
            </a>
            <a href="#about" className="text-dark-charcoal hover:text-accent-peach transition-colors duration-300 font-medium">
              About
            </a>
            <Link to="/contact" className="text-dark-charcoal hover:text-accent-peach transition-colors duration-300 font-medium">
              Contact
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="px-6 py-3 bg-gradient-to-r from-accent-peach to-accent-lavender text-white font-inter font-semibold rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Shop Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-dark-charcoal hover:text-accent-peach transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-light-grey/30">
            <div className="px-6 py-4 space-y-4">
              <Link to="/" className="block text-dark-charcoal hover:text-accent-peach transition-colors duration-300 font-medium py-2">
                Home
              </Link>
              <a href="#products" className="block text-dark-charcoal hover:text-accent-peach transition-colors duration-300 font-medium py-2">
                Products
              </a>
              <a href="#about" className="block text-dark-charcoal hover:text-accent-peach transition-colors duration-300 font-medium py-2">
                About
              </a>
              <Link to="/contact" className="block text-dark-charcoal hover:text-accent-peach transition-colors duration-300 font-medium py-2">
                Contact
              </Link>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-accent-peach to-accent-lavender text-white font-inter font-semibold rounded-lg hover:scale-105 transition-all duration-300">
                Shop Now
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Subtle Underline */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent-peach via-accent-lavender to-accent-blue opacity-30" />
    </nav>
  );
};

export default Navbar;
