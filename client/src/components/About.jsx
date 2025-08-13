import React, { useEffect, useRef } from "react";

const About = () => {
  const sectionRefs = useRef([]);

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

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const coreValues = [
    {
      icon: "✨",
      title: "Quality Craftsmanship",
      description: "Shoes built to last, from sole to stitch."
    },
    {
      icon: "🌱",
      title: "Sustainable Materials",
      description: "Footwear that's kind to the planet."
    },
    {
      icon: "💫",
      title: "Everyday Comfort",
      description: "Style that feels as good as it looks."
    },
    {
      icon: "🌍",
      title: "Global Inspiration",
      description: "Designs inspired by cultures and cities worldwide."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white via-light-grey to-soft-beige">
      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-20 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-soft-peach via-gentle-lavender to-light-blue opacity-60" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-accent-peach/20 to-accent-lavender/20 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-accent-lavender/15 to-accent-blue/15 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-dark-charcoal mb-6">
            More Than Just Shoes
          </h1>
          <p className="text-xl md:text-2xl text-warm-grey max-w-2xl mx-auto leading-relaxed">
            We design footwear for people who move the world forward.
          </p>
          
          {/* Lifestyle Image */}
          <div className="mt-12 flex justify-center">
            <div className="relative w-32 h-32 bg-gradient-to-br from-accent-peach to-accent-lavender rounded-full flex items-center justify-center shadow-lg overflow-hidden">
              <span className="text-5xl">🚶‍♀️</span>
              {/* Motion Blur Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div ref={addToRefs} className="fade-in-section grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Workshop Image */}
            <div className="relative">
              <div className="bg-gradient-to-br from-accent-peach/20 to-accent-lavender/20 rounded-3xl p-8 shadow-xl">
                <div className="w-full h-80 bg-gradient-to-br from-soft-beige to-light-grey rounded-2xl flex items-center justify-center">
                  <span className="text-8xl">🛠️</span>
                </div>
                {/* Soft Drop Shadow */}
                <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-accent-blue/10 to-accent-peach/10 rounded-3xl -z-10" />
              </div>
            </div>

            {/* Right: Brand Story */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-dark-charcoal">
                From Concept to Comfort
              </h2>
              <div className="space-y-4 text-lg text-warm-grey leading-relaxed">
                <p>
                  Our journey began in a small workshop where we discovered that the best shoes aren't just made—they're crafted with purpose. Every stitch, every material choice, every design decision is driven by our belief that comfort and style should never be mutually exclusive.
                </p>
                <p>
                  We started AeroStride with a simple mission: to create footwear that empowers people to move confidently through their day. Whether you're walking to work, running errands, or exploring new places, your shoes should feel like an extension of yourself.
                </p>
                <p>
                  Today, we continue to push boundaries in sustainable materials and innovative comfort technology, always staying true to our roots of quality craftsmanship and thoughtful design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <div ref={addToRefs} className="fade-in-section text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-dark-charcoal mb-6">
              What Drives Us Forward
            </h2>
            <p className="text-xl text-warm-grey max-w-3xl mx-auto">
              Our core values shape every decision we make, from design to delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <div 
                key={index}
                ref={addToRefs}
                className="fade-in-section bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-accent-peach to-accent-lavender rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">{value.icon}</span>
                </div>
                <h3 className="text-xl font-playfair font-bold text-dark-charcoal mb-3">
                  {value.title}
                </h3>
                <p className="text-warm-grey leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6 md:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <div ref={addToRefs} className="fade-in-section">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-dark-charcoal mb-6">
              Ready to Walk With Us?
            </h2>
            <p className="text-xl text-warm-grey mb-8 max-w-2xl mx-auto">
              Discover our latest collection today and experience the perfect blend of comfort, style, and craftsmanship.
            </p>
            <button className="px-12 py-4 bg-gradient-to-r from-accent-peach to-accent-lavender text-white font-inter font-semibold text-xl rounded-xl hover:from-accent-peach/90 hover:to-accent-lavender/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Shop Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
