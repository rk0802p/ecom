import React, { useState, useEffect } from "react";

const Products = () => {
  // Simple state management
  const [selectedCategory, setSelectedCategory] = useState("All Shoes");
  const [sortBy, setSortBy] = useState("Newest");

  // Product data - simple and clean
  const products = [
    {
      id: 1,
      name: "AeroFlex Runner",
      category: "Sneakers",
      price: 120,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop&crop=center",
      description: "Lightweight running shoes with premium comfort technology"
    },
    {
      id: 2,
      name: "Urban Glide High",
      category: "Sneakers",
      price: 140,
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop&crop=center",
      description: "High-top urban sneakers with modern street style"
    },
    {
      id: 3,
      name: "MetroStride Classic",
      category: "Sneakers",
      price: 110,
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=300&fit=crop&crop=center",
      description: "Timeless casual sneakers for everyday wear"
    },
    {
      id: 4,
      name: "TrailStep Boot",
      category: "Boots",
      price: 160,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop&crop=center",
      description: "Rugged outdoor boots for adventure seekers"
    },
    {
      id: 5,
      name: "WinterGuard Boot",
      category: "Boots",
      price: 180,
      image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=300&fit=crop&crop=center",
      description: "Insulated winter boots for extreme cold weather"
    },
    {
      id: 6,
      name: "DesertWalker Boot",
      category: "Boots",
      price: 145,
      image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&h=300&fit=crop&crop=center",
      description: "Comfortable desert boots for casual outdoor wear"
    },
    {
      id: 7,
      name: "Coastal Breeze Slip",
      category: "Sandals",
      price: 80,
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=300&fit=crop&crop=center",
      description: "Comfortable slip-on sandals for beach days"
    },
    {
      id: 8,
      name: "SummerGlide Slide",
      category: "Sandals",
      price: 65,
      image: "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=400&h=300&fit=crop&crop=center",
      description: "Elegant slide sandals for summer elegance"
    },
    {
      id: 9,
      name: "LuxeWalk Loafer",
      category: "Formal",
      price: 150,
      image: "https://images.unsplash.com/photo-1565814636199-ae5c8c8c9c8c?w=400&h=300&fit=crop&crop=center",
      description: "Premium leather loafers for sophisticated style"
    },
    {
      id: 10,
      name: "Executive Oxford",
      category: "Formal",
      price: 220,
      image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&h=300&fit=crop&crop=center",
      description: "Classic Oxford shoes for business and formal occasions"
    },
    {
      id: 11,
      name: "Weekend Slip-On",
      category: "Casual",
      price: 95,
      image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=300&fit=crop&crop=center",
      description: "Comfortable slip-ons for weekend relaxation"
    },
    {
      id: 12,
      name: "StreetStyle Canvas",
      category: "Casual",
      price: 75,
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop&crop=center",
      description: "Versatile canvas shoes for everyday street style"
    }
  ];

  // Categories array
  const categories = ["All Shoes", "Sneakers", "Boots", "Sandals", "Formal", "Casual"];

  // Filter and sort products - SIMPLE LOGIC
  const getFilteredAndSortedProducts = () => {
    // Step 1: Filter
    let filtered = products;
    if (selectedCategory !== "All Shoes") {
      filtered = products.filter(product => product.category === selectedCategory);
    }

    // Step 2: Sort
    let sorted = [...filtered];
    switch (sortBy) {
      case "Price (Low → High)":
        return sorted.sort((a, b) => a.price - b.price);
      case "Price (High → Low)":
        return sorted.sort((a, b) => b.price - a.price);
      case "Newest":
      default:
        return sorted.sort((a, b) => b.id - a.id);
    }
  };

  // Get current products to display
  const currentProducts = getFilteredAndSortedProducts();

  // Cart functionality
  const addToCart = (product, event) => {
    console.log('Products: Adding to cart:', product);
    
    // Read existing cart items
    let items = [];
    try {
      const raw = localStorage.getItem('cartItems');
      console.log('Products: Existing cartItems raw:', raw);
      if (raw) items = JSON.parse(raw);
      console.log('Products: Existing cartItems parsed:', items);
    } catch (error) {
      console.error('Products: Error reading cartItems:', error);
    }

    // If item exists, increase quantity; else push new
    const existing = items.find((it) => it.id === product.id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
      console.log('Products: Updated existing item quantity to:', existing.quantity);
    } else {
      items.push({ ...product, quantity: 1 });
      console.log('Products: Added new item to cart');
    }

    // Persist cart
    localStorage.setItem('cartItems', JSON.stringify(items));
    console.log('Products: Saved cartItems to localStorage:', items);

    // Update cartCount and notify navbar
    const count = items.reduce((sum, it) => sum + (it.quantity || 0), 0);
    localStorage.setItem('cartCount', String(count));
    console.log('Products: Updated cartCount to:', count);
    window.dispatchEvent(new CustomEvent('cartUpdated'));

    // Subtle feedback on the clicked button
    if (event && event.currentTarget) {
      const btn = event.currentTarget;
      const original = btn.textContent;
      btn.textContent = '✓ Added!';
      btn.classList.add('bg-green-500', 'border-green-500', 'text-white');
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove('bg-green-500', 'border-green-500', 'text-white');
      }, 1200);
    }
  };

  // Debug logging
  useEffect(() => {
    console.log("=== PRODUCTS DEBUG ===");
    console.log("Selected Category:", selectedCategory);
    console.log("Sort By:", sortBy);
    console.log("Total Products:", products.length);
    console.log("Filtered Products:", currentProducts.length);
    console.log("Current Products:", currentProducts);
    console.log("======================");
  }, [selectedCategory, sortBy, currentProducts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white via-light-grey to-soft-beige">
      {/* Hero Banner */}
      <section className="relative py-20 px-6 md:px-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-soft-peach via-gentle-lavender to-light-blue opacity-60" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-dark-charcoal mb-6">
            Step Into Your <span className="text-gradient">Style</span>
          </h1>
          <p className="text-xl md:text-2xl text-warm-grey max-w-2xl mx-auto leading-relaxed mb-8">
            Discover the Collection
          </p>
          <p className="text-lg text-warm-grey max-w-xl mx-auto leading-relaxed">
            Every shoe, crafted for comfort and style.
          </p>
        </div>
      </section>

      {/* Filter & Sort Bar */}
      <section className="py-8 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Category Filter */}
              <div className="flex items-center space-x-4">
                <label className="text-sm font-inter font-medium text-dark-charcoal">
                  Category:
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 bg-white/60 border border-light-grey/50 rounded-lg text-dark-charcoal focus:outline-none focus:border-accent-peach focus:ring-2 focus:ring-accent-peach/20 transition-all duration-300 font-inter"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Options */}
              <div className="flex items-center space-x-4">
                <label className="text-sm font-inter font-medium text-dark-charcoal">
                  Sort by:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-white/60 border border-light-grey/50 rounded-lg text-dark-charcoal focus:outline-none focus:border-accent-peach focus:ring-2 focus:ring-accent-peach/20 transition-all duration-300 font-inter"
                >
                  <option value="Newest">Newest</option>
                  <option value="Price (Low → High)">Price (Low → High)</option>
                  <option value="Price (High → Low)">Price (High → Low)</option>
                </select>
              </div>

              {/* Results Count */}
              <div className="text-sm text-warm-grey font-inter">
                {currentProducts.length} products found
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProducts.map((product, index) => (
              <div
                key={product.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-500 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Product Image */}
                <div className="relative mb-6">
                  <div className="w-full h-48 bg-gradient-to-br from-light-grey to-soft-beige rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    {/* Fallback emoji if image fails to load */}
                    <div className="hidden w-full h-full items-center justify-center text-6xl">
                      {product.category === "Sneakers" ? "👟" : 
                       product.category === "Boots" ? "🥾" : 
                       product.category === "Sandals" ? "🩴" : 
                       product.category === "Formal" ? "👞" : "👟"}
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="text-center">
                  <h3 className="text-xl font-playfair font-bold text-dark-charcoal mb-2 group-hover:text-accent-peach transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-sm text-warm-grey mb-3 font-inter">
                    {product.description}
                  </p>
                  <p className="text-lg font-inter font-semibold text-dark-charcoal mb-4">
                    ${product.price}
                  </p>
                  
                  {/* CTA Buttons */}
                  <div className="flex space-x-3">
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-accent-peach to-accent-lavender text-white font-inter font-semibold rounded-lg hover:from-accent-peach/90 hover:to-accent-lavender/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                      View Details
                    </button>
                    <button 
                      onClick={(e) => addToCart(product, e)}
                      className="flex-1 px-4 py-2 bg-transparent border-2 border-accent-blue text-accent-blue font-inter font-semibold rounded-lg hover:bg-accent-blue hover:text-white transition-all duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-accent-peach/20 to-accent-lavender/20 text-dark-charcoal text-xs font-inter font-medium rounded-full border border-accent-peach/30">
                    {product.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* No Products Message */}
          {currentProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-playfair font-bold text-dark-charcoal mb-2">
                No products found
              </h3>
              <p className="text-warm-grey mb-6">
                Try adjusting your filters or browse all categories.
              </p>
              <button
                onClick={() => setSelectedCategory("All Shoes")}
                className="px-6 py-3 bg-gradient-to-r from-accent-peach to-accent-lavender text-white font-inter font-semibold rounded-lg hover:from-accent-peach/90 hover:to-accent-lavender/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View All Products
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6 md:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-playfair font-bold text-dark-charcoal mb-6">
            Ready to Find Your Perfect <span className="text-gradient">Fit</span>?
          </h2>
          <p className="text-lg md:text-xl text-warm-grey mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Our style experts are here to help you discover the perfect shoes for your lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-accent-peach to-accent-lavender text-white font-inter font-semibold rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Get Style Advice
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-accent-blue text-accent-blue font-inter font-semibold rounded-lg hover:bg-accent-blue hover:text-white transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
