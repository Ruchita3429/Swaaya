'use client';

import { useState } from 'react';
import Container from './Container';

export default function SubscriptionSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log('Subscribing:', email);
    setEmail('');
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <Container>
        <div className="flex flex-col items-center max-w-[520px] mx-auto">
          {/* Heading */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-thin uppercase tracking-wider text-[#111827] mb-3 text-center">
            Subscribe now & get 20% off
          </h2>

          {/* Subtitle */}
          <p className="text-gray-500 text-sm md:text-base mb-8 text-center">
            Be the first to know about new collections and exclusive offers
          </p>

          {/* Email Input + Subscribe Button */}
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              {/* Email Input */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:ring-1 focus:ring-[#111827] focus:border-[#111827] text-[#111827] placeholder-gray-400"
              />

              {/* Subscribe Button */}
              <button
                type="submit"
                className="px-8 py-3 bg-[#111827] text-white font-medium uppercase tracking-wider text-sm hover:bg-gray-800 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}

