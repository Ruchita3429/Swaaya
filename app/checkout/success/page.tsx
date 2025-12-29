'use client';

import Link from 'next/link';
import Container from '@/components/Container';
import Footer from '@/components/Footer';
import { CheckCircle } from 'lucide-react';

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-12 md:py-16 lg:py-24">
        <Container>
          <div className="max-w-md mx-auto text-center">
            <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl font-thin uppercase tracking-wider text-[#111827] mb-4">
              ORDER PLACED —
            </h1>
            <p className="text-gray-600 mb-8">
              Thank you for your order! We'll send you a confirmation email shortly.
            </p>
            <div className="space-y-4">
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-[#111827] text-white font-medium uppercase tracking-wider text-sm hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </Link>
              <Link
                href="/profile"
                className="inline-block px-6 py-3 border border-[#111827] text-[#111827] font-medium uppercase tracking-wider text-sm hover:bg-gray-50 transition-colors ml-4"
              >
                View Orders
              </Link>
            </div>
          </div>
        </Container>
      </section>
      <Footer />
    </div>
  );
}



