// src/components/HeroBanner.jsx
import React, { useEffect, useRef } from "react";

const HeroBanner = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-off-white via-light-grey to-soft-beige">
      {/* Background Image with Lifestyle Concept */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-soft-peach/20 via-gentle-lavender/20 to-light-blue/20" />
        
        {/* Abstract Shoe Silhouettes */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-accent-peach/30 to-accent-lavender/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-accent-lavender/20 to-accent-blue/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(44, 44, 44, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(44, 44, 44, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div ref={heroRef} className="fade-in-section max-w-4xl mx-auto">
          {/* Brand Logo */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold text-dark-charcoal mb-6 leading-tight">
              Aero<span className="text-gradient">Stride</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-accent-peach via-accent-lavender to-accent-blue mx-auto rounded-full" />
          </div>

          {/* Tagline */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-inter font-light text-dark-charcoal mb-4">
              Style in Every Step
            </h2>
            <p className="text-lg md:text-xl text-warm-grey max-w-2xl mx-auto leading-relaxed">
              Experience the perfect blend of comfort, elegance, and innovation. 
              Every step tells a story of sophistication.
            </p>
          </div>

          {/* Call to Action */}
          <div className="mb-16">
            <button className="group px-12 py-5 bg-gradient-to-r from-accent-peach to-accent-lavender text-white font-inter font-semibold text-lg rounded-full hover-lift smooth-transition shadow-lg hover:shadow-xl">
              <span className="flex items-center justify-center">
                Shop the Collection
                <svg className="ml-3 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </div>

          {/* Floating Elements */}
          <div className="flex justify-center space-x-8 opacity-60">
            <div className="text-center">
              <div className="w-3 h-3 bg-accent-peach rounded-full animate-gentle-bounce" />
              <p className="text-sm text-warm-grey mt-2 font-inter">Premium</p>
            </div>
            <div className="text-center">
              <div className="w-3 h-3 bg-accent-lavender rounded-full animate-gentle-bounce" style={{ animationDelay: '0.5s' }} />
              <p className="text-sm text-warm-grey mt-2 font-inter">Comfort</p>
            </div>
            <div className="text-center">
              <div className="w-3 h-3 bg-accent-blue rounded-full animate-gentle-bounce" style={{ animationDelay: '1s' }} />
              <p className="text-sm text-warm-grey mt-2 font-inter">Style</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-gentle-bounce">
          <div className="flex flex-col items-center text-warm-grey">
            <span className="text-sm font-inter mb-2">Discover More</span>
            <div className="w-6 h-10 border-2 border-warm-grey rounded-full flex justify-center">
              <div className="w-1 h-3 bg-warm-grey rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Glass Overlay Elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 glass-overlay rounded-full opacity-20" />
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 glass-overlay rounded-full opacity-20" />
    </div>
  );
};

export default HeroBanner;
