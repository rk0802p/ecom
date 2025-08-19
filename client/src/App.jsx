import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./Home"; 
import Contact from "./components/Contact";
import About from "./components/About";
import Products from "./components/Products";
import Cart from "./components/Cart";

const App = () => {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/products" element={<Products />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/about" element={<About />} />
				<Route path="/cart" element={<Cart />} />
			</Routes>
			<Footer />
		</>
	);
};

export default App;
