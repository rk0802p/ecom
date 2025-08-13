import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    orderNumber: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        orderNumber: "",
        message: ""
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white via-light-grey to-soft-beige">
      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-20 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-soft-peach via-gentle-lavender to-light-blue opacity-60" />
        
        {/* Floating Shoe Silhouettes */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-accent-peach/20 to-accent-lavender/20 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-accent-lavender/15 to-accent-blue/15 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-dark-charcoal mb-6">
            We'd Love to Hear From You
          </h1>
          <p className="text-xl md:text-2xl text-warm-grey max-w-2xl mx-auto leading-relaxed">
            Questions, feedback, or style advice — drop us a message.
          </p>
          
          {/* Lifestyle Shoe Image */}
          <div className="mt-12 flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-accent-peach to-accent-lavender rounded-full flex items-center justify-center shadow-lg">
              <span className="text-4xl">👟</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-6 md:px-20">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          {isSubmitted && (
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-accent-peach to-accent-lavender rounded-full mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-playfair font-bold text-dark-charcoal mb-2">
                Thanks! We'll be in touch soon.
              </h3>
              <p className="text-warm-grey">Your message has been sent successfully.</p>
            </div>
          )}

          {/* Contact Form Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-inter font-medium text-dark-charcoal mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/60 border border-light-grey/50 rounded-lg text-dark-charcoal placeholder-warm-grey focus:outline-none focus:border-accent-peach focus:ring-2 focus:ring-accent-peach/20 transition-all duration-300 font-inter"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-inter font-medium text-dark-charcoal mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/60 border border-light-grey/50 rounded-lg text-dark-charcoal placeholder-warm-grey focus:outline-none focus:border-accent-peach focus:ring-2 focus:ring-accent-peach/20 transition-all duration-300 font-inter"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Subject and Order Number Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="subject" className="block text-sm font-inter font-medium text-dark-charcoal mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/60 border border-light-grey/50 rounded-lg text-dark-charcoal placeholder-warm-grey focus:outline-none focus:border-accent-peach focus:ring-2 focus:ring-accent-peach/20 transition-all duration-300 font-inter"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label htmlFor="orderNumber" className="block text-sm font-inter font-medium text-dark-charcoal mb-2">
                    Order Number (Optional)
                  </label>
                  <input
                    type="text"
                    id="orderNumber"
                    name="orderNumber"
                    value={formData.orderNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/60 border border-light-grey/50 rounded-lg text-dark-charcoal placeholder-warm-grey focus:outline-none focus:border-accent-peach focus:ring-2 focus:ring-accent-peach/20 transition-all duration-300 font-inter"
                    placeholder="If related to an order"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-inter font-medium text-dark-charcoal mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white/60 border border-light-grey/50 rounded-lg text-dark-charcoal placeholder-warm-grey focus:outline-none focus:border-accent-peach focus:ring-2 focus:ring-accent-peach/20 transition-all duration-300 font-inter resize-none"
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-accent-peach to-accent-lavender text-white font-inter font-semibold text-lg rounded-xl hover:from-accent-peach/90 hover:to-accent-lavender/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Store Location */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-accent-peach to-accent-lavender rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="text-xl font-playfair font-bold text-dark-charcoal mb-3">
                Store Location
              </h3>
              <p className="text-warm-grey mb-3 leading-relaxed">
                
              </p>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent-peach hover:text-accent-lavender transition-colors duration-300 font-inter font-medium"
              >
                View on Google Maps →
              </a>
            </div>

            {/* Email */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-accent-lavender to-accent-blue rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="text-xl font-playfair font-bold text-dark-charcoal mb-3">
                Email Us
              </h3>
              <p className="text-warm-grey mb-3 leading-relaxed">
                We typically respond within<br />
                24 hours during business days
              </p>
              <a 
                className="text-accent-lavender hover:text-accent-blue transition-colors duration-300 font-inter font-medium"
              >
                 →
              </a>
            </div>

            {/* Phone */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-accent-blue to-accent-peach rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="text-xl font-playfair font-bold text-dark-charcoal mb-3">
                Call Us
              </h3>
              <p className="text-warm-grey mb-3 leading-relaxed">
                Monday - Friday: 9AM - 6PM<br />
                Saturday: 10AM - 4PM
              </p>
              <a 
                href="tel:+1-555-123-4567" 
                className="text-accent-blue hover:text-accent-peach transition-colors duration-300 font-inter font-medium"
              >
 →
              </a>
            </div>
          </div>

          {/* Dividing Lines */}
          <div className="hidden md:block mt-16">
            <div className="flex justify-center space-x-16">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-accent-peach to-transparent"></div>
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-accent-lavender to-transparent"></div>
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-accent-blue to-transparent"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
