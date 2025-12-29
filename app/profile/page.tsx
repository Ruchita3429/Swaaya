'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Container from '@/components/Container';
import Footer from '@/components/Footer';

// Mock order history
const mockOrders = [
  {
    id: 'order-1',
    date: '2024-01-15',
    total: '₹2,598',
    items: 2,
    status: 'Delivered',
  },
  {
    id: 'order-2',
    date: '2024-01-10',
    total: '₹1,899',
    items: 1,
    status: 'Delivered',
  },
  {
    id: 'order-3',
    date: '2024-01-05',
    total: '₹3,299',
    items: 3,
    status: 'Processing',
  },
];

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/profile');
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="py-12 md:py-16 lg:py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-thin uppercase tracking-wider text-[#111827] mb-8">
              PROFILE —
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* User Information */}
              <div>
                <h2 className="text-xl font-bold text-[#111827] mb-6">Account Information</h2>
                <div className="border border-gray-200 p-6 space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Name</label>
                    <p className="text-base text-[#111827] mt-1">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-base text-[#111827] mt-1">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-sm text-gray-600 hover:text-[#111827] border border-gray-300 hover:border-gray-400 transition-colors mt-4"
                  >
                    Logout
                  </button>
                </div>
              </div>

              {/* Order History */}
              <div>
                <h2 className="text-xl font-bold text-[#111827] mb-6">Order History</h2>
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-sm font-medium text-[#111827]">Order #{order.id}</p>
                          <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            order.status === 'Delivered'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <p className="text-sm text-gray-600">{order.items} item(s)</p>
                        <p className="text-base font-bold text-[#111827]">{order.total}</p>
                      </div>
                    </div>
                  ))}
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


