import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
	const [items, setItems] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	// Load cart items from localStorage only once on mount
	useEffect(() => {
		if (!isLoaded) {
			try {
				const raw = localStorage.getItem('cartItems');
				if (raw) {
					const parsed = JSON.parse(raw);
					if (Array.isArray(parsed)) {
						setItems(parsed);
					}
				}
			} catch (error) {
				console.error('Error loading cart:', error);
			}
			setIsLoaded(true);
		}
	}, [isLoaded]);

	// Persist items and notify navbar only when items actually change
	useEffect(() => {
		if (isLoaded) { // Only run after initial load
			localStorage.setItem('cartItems', JSON.stringify(items));
			const count = items.reduce((sum, it) => sum + (it.quantity || 0), 0);
			localStorage.setItem('cartCount', String(count));
			window.dispatchEvent(new CustomEvent('cartUpdated'));
		}
	}, [items, isLoaded]);

	// Helpers
	const updateQty = (id, delta) => {
		setItems((prev) => prev.map((it) => it.id === id ? { ...it, quantity: Math.max(1, (it.quantity || 1) + delta) } : it));
	};
	const removeItem = (id) => setItems((prev) => prev.filter((it) => it.id !== id));
	const clearCart = () => setItems([]);

	const totals = useMemo(() => {
		const quantity = items.reduce((sum, it) => sum + (it.quantity || 1), 0);
		const subtotal = items.reduce((sum, it) => sum + it.price * (it.quantity || 1), 0);
		const shipping = quantity * 5; // $5 per product
		const tax = 0;
		const total = subtotal + shipping + tax;
		return { quantity, subtotal, shipping, tax, total };
	}, [items]);

	// Debug logging
	useEffect(() => {
		console.log('Cart items state:', items);
		console.log('Cart isLoaded:', isLoaded);
	}, [items, isLoaded]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-off-white via-light-grey to-soft-beige">
			{/* Hero */}
			<section className="relative py-16 px-6 md:px-20 overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-r from-soft-peach/25 via-gentle-lavender/25 to-light-blue/25" />
				<div className="relative z-10 text-center max-w-4xl mx-auto">
					<h1 className="text-5xl md:text-6xl font-playfair font-bold text-dark-charcoal mb-4">Your Cart</h1>
					<p className="text-lg md:text-xl text-warm-grey">Review your picks before checkout.</p>
				</div>
			</section>

			{/* Content */}
			<section className="pb-20 px-6 md:px-20">
				<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Items */}
					<div className="lg:col-span-2 space-y-6">
						{!isLoaded ? (
							<div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-white/20">
								<div className="text-2xl text-warm-grey">Loading cart...</div>
							</div>
						) : items.length === 0 ? (
							<div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-white/20">
								<div className="text-6xl mb-4">👜</div>
								<h3 className="text-2xl font-playfair font-bold text-dark-charcoal mb-2">Your cart is empty</h3>
								<p className="text-warm-grey mb-6">Time to find your perfect pair.</p>
								<Link to="/products" className="px-6 py-3 bg-gradient-to-r from-accent-peach to-accent-lavender text-white font-inter font-semibold rounded-lg">Shop Collection</Link>
							</div>
						) : (
							items.map((it) => (
								<div key={it.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all">
									<div className="flex flex-col sm:flex-row gap-6">
										<img src={it.image} alt={it.name} className="w-full sm:w-40 h-40 object-cover rounded-xl shadow" />
										<div className="flex-1">
											<div className="flex items-start justify-between">
												<div>
													<h4 className="text-xl font-playfair font-bold text-dark-charcoal">{it.name}</h4>
													<p className="text-sm text-warm-grey">{it.category}</p>
												</div>
												<button onClick={() => removeItem(it.id)} className="text-warm-grey hover:text-red-500 transition-colors">Remove</button>
											</div>
											<div className="mt-4 flex items-center justify-between">
												<div className="flex items-center space-x-3">
													<button onClick={() => updateQty(it.id, -1)} className="w-8 h-8 rounded-md border border-light-grey text-dark-charcoal hover:bg-light-grey">-</button>
													<span className="min-w-[2rem] text-center">{it.quantity || 1}</span>
													<button onClick={() => updateQty(it.id, 1)} className="w-8 h-8 rounded-md border border-light-grey text-dark-charcoal hover:bg-light-grey">+</button>
												</div>
												<p className="text-lg font-inter font-semibold text-dark-charcoal">${(it.price * (it.quantity || 1)).toFixed(2)}</p>
											</div>
										</div>
									</div>
								</div>
							))
						)}
					</div>

					{/* Summary */}
					<div className="space-y-4">
						<div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
							<h3 className="text-2xl font-playfair font-bold text-dark-charcoal mb-4">Summary</h3>
							<div className="flex justify-between text-dark-charcoal mb-2"><span>Total products</span><span>{totals.quantity}</span></div>
							<div className="flex justify-between text-dark-charcoal mb-2"><span>Subtotal</span><span>${totals.subtotal.toFixed(2)}</span></div>
							<div className="flex justify-between text-dark-charcoal mb-2"><span>Shipping</span><span>${totals.shipping.toFixed(2)}</span></div>
							<div className="flex justify-between text-dark-charcoal mb-4"><span>Tax</span><span>${totals.tax.toFixed(2)}</span></div>
							<div className="flex justify-between text-dark-charcoal text-lg font-semibold mb-6"><span>Total</span><span>${totals.total.toFixed(2)}</span></div>
							<div className="flex gap-3">
								<button className="flex-1 px-4 py-3 bg-gradient-to-r from-accent-peach to-accent-lavender text-white font-inter font-semibold rounded-lg">Checkout</button>
								<button onClick={clearCart} className="px-4 py-3 border-2 border-red-300 text-red-500 rounded-lg hover:bg-red-50">Clear Cart</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Cart;
