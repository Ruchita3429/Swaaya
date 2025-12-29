'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Container from '@/components/Container';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const totalPrice = getTotalPrice();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/checkout');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (cartItems.length === 0 && isAuthenticated) {
      router.push('/');
    }
  }, [cartItems.length, isAuthenticated, router]);

  const handlePayment = async () => {
    // Placeholder for payment integration
    // This will be replaced with Razorpay/Stripe integration later
    try {
      // Create order first
      const orderData = {
        items: cartItems,
        total: totalPrice,
        userId: user?.id,
        timestamp: new Date().toISOString(),
      };

      // TODO: Call API to create order
      console.log('Creating order:', orderData);

      // TODO: Initiate payment
      // await handlePayment(orderData);

      // For now, just clear cart and redirect to success
      clearCart();
      router.push('/checkout/success');
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    }
  };

  if (!isAuthenticated || cartItems.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="py-12 md:py-16 lg:py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-thin uppercase tracking-wider text-[#111827] mb-8">
              CHECKOUT —
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Order Summary */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-bold text-[#111827] mb-6">Order Summary</h2>
                <div className="space-y-4 border border-gray-200 p-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                      <div className="relative w-20 h-20 flex-shrink-0 bg-white border border-gray-200">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-[#111827] mb-1">{item.name}</h3>
                        <p className="text-sm font-bold text-[#111827] mb-2">{item.price}</p>
                        <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-[#111827]">
                          ₹{(parseInt(item.price.replace(/[₹,]/g, '')) * item.quantity).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Summary */}
              <div className="lg:col-span-1">
                <div className="border border-gray-200 p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-[#111827] mb-6">Payment Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-[#111827]">₹{totalPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-[#111827]">Free</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex justify-between">
                      <span className="text-lg font-bold text-[#111827]">Total</span>
                      <span className="text-xl font-bold text-[#111827]">
                        ₹{totalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handlePayment}
                    className="w-full px-6 py-3 bg-[#111827] text-white font-medium uppercase tracking-wider text-sm hover:bg-gray-800 transition-colors"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <Footer />
    </div>
  );
}



