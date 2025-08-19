import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [cartCount, setCartCount] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Helper: derive count from cartItems in localStorage
	const computeCartCount = () => {
		try {
			const raw = localStorage.getItem('cartItems');
			console.log('Navbar: raw cartItems from localStorage:', raw);
			if (!raw) return 0;
			const items = JSON.parse(raw);
			console.log('Navbar: parsed cartItems:', items);
			if (!Array.isArray(items)) return 0;
			const count = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
			console.log('Navbar: computed cart count:', count);
			return count;
		} catch (error) {
			console.error('Navbar: error computing cart count:', error);
			return 0;
		}
	};

	// Load cart count on mount and on storage/cartUpdated
	useEffect(() => {
		const load = () => setCartCount(computeCartCount());
		load();
		const handleStorage = () => load();
		const handleCartUpdated = () => load();
		window.addEventListener('storage', handleStorage);
		window.addEventListener('cartUpdated', handleCartUpdated);
		return () => {
			window.removeEventListener('storage', handleStorage);
			window.removeEventListener('cartUpdated', handleCartUpdated);
		};
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
						<Link to="/products" className="text-dark-charcoal hover:text-accent-peach transition-colors duration-300 font-medium">
							Products
						</Link>
						<Link to="/about" className="text-dark-charcoal hover:text-accent-peach transition-colors duration-300 font-medium">
							About
						</Link>
						<Link to="/contact" className="text-dark-charcoal hover:text-accent-peach transition-colors duration-300 font-medium">
							Contact
						</Link>
					</div>

					{/* Cart Icon (links to /cart) */}
					<div className="hidden md:block">
						<Link to="/cart" className="relative p-3 inline-block text-dark-charcoal hover:text-accent-peach transition-colors duration-300" title="Go to cart">
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
							</svg>
							{cartCount > 0 && (
								<span className="absolute -top-2 -right-2 bg-gradient-to-r from-accent-peach to-accent-lavender text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
									{cartCount}
								</span>
							)}
						</Link>
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
							<Link to="/products" className="block text-dark-charcoal hover:text-accent-peach transition-colors duration-300 font-medium py-2">
								Products
							</Link>
							<Link to="/about" className="block text-dark-charcoal hover:text-accent-peach transition-colors duration-300 font-medium py-2">
								About
							</Link>
							<Link to="/contact" className="block text-dark-charcoal hover:text-accent-peach transition-colors duration-300 font-medium py-2">
								Contact
							</Link>
							<Link to="/cart" className="flex items-center justify-between py-2 text-dark-charcoal hover:text-accent-peach transition-colors duration-300 font-medium">
								<span>Cart</span>
								{cartCount > 0 && (
									<span className="bg-gradient-to-r from-accent-peach to-accent-lavender text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center">
										{cartCount}
									</span>
								)}
							</Link>
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
