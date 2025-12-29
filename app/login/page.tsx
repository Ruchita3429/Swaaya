'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Container from '@/components/Container';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (isAuthenticated) {
      router.push(redirect);
    }
  }, [isAuthenticated, router, redirect]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login(email, password);
    setLoading(false);

    if (success) {
      router.push(redirect);
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="py-12 md:py-16 lg:py-24">
        <Container>
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl md:text-4xl font-thin uppercase tracking-wider text-[#111827] mb-8 text-center">
              LOGIN —
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#111827] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#111827] focus:border-[#111827] text-[#111827]"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#111827] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#111827] focus:border-[#111827] text-[#111827]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-[#111827] text-white font-medium uppercase tracking-wider text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <p className="mt-6 text-center text-gray-600">
              Don't have an account?{' '}
              <Link href="/signup" className="text-[#111827] hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </Container>
      </section>
      <Footer />
    </div>
  );
}


