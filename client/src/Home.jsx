// src/pages/Home.jsx or wherever you're storing page components
import React from "react";
import HeroBanner from "./components/HeroBanner"; // adjust path if needed

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <HeroBanner />

      {/* Placeholder for product grid */}
      <section className="py-12 px-6 md:px-20">
        <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
        <div className="text-gray-600">
          {/* We'll replace this with a product grid next */}
          Product grid coming soon...
        </div>
      </section>
    </div>
  );
};

export default Home;
