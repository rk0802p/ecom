import React from "react";
import HeroBanner from "./components/HeroBanner";
import { Link } from "react-router-dom";

const Home = () => {
  // Style picks data
  const stylePicks = [
    { id: 1, name: "Weekend Vibes", image: "🌟", category: "Casual" },
    { id: 2, name: "Office Elegance", image: "💼", category: "Professional" },
    { id: 3, name: "Evening Glam", image: "✨", category: "Evening" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white via-light-grey to-soft-beige">
      <HeroBanner />

      {/* Style Picks of the Week */}
      <section className="py-20 px-6 md:px-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-soft-peach/30 via-gentle-lavender/30 to-light-blue/30" />

        <div className="relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-playfair font-bold text-dark-charcoal mb-6">
              Style Picks of the <span className="text-gradient">Week</span>
            </h2>
            <p className="text-lg md:text-xl text-warm-grey max-w-2xl mx-auto">
              Our fashion experts curate the perfect looks for every occasion.
              Discover what's trending this week.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {stylePicks.map((pick, index) => (
              <div
                key={pick.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover-lift smooth-transition"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">{pick.image}</div>
                  <h3 className="font-playfair font-bold text-xl text-dark-charcoal mb-2">
                    {pick.name}
                  </h3>
                  <p className="text-warm-grey font-inter mb-4">{pick.category}</p>
                  <button className="px-6 py-3 bg-gradient-to-r from-accent-peach to-accent-lavender text-white font-inter font-semibold rounded-lg hover:scale-105 transition-all duration-300">
                    View Look
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6 md:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-white to-light-grey p-12 rounded-3xl shadow-xl">
            <h2 className="text-4xl md:text-6xl font-playfair font-bold text-dark-charcoal mb-6">
              Ready to Step into <span className="text-gradient">Elegance</span>?
            </h2>
            <p className="text-lg md:text-xl text-warm-grey mb-8 max-w-2xl mx-auto">
              Join thousands of customers who have already discovered the perfect blend
              of comfort, style, and sophistication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products" className="px-8 py-4 bg-gradient-to-r from-accent-peach to-accent-lavender text-white font-inter font-semibold rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Start Shopping
              </Link>
              <Link to="/about" className="px-8 py-4 bg-transparent border-2 border-accent-blue text-accent-blue font-inter font-semibold rounded-lg hover:bg-accent-blue hover:text-white transition-all duration-300">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
