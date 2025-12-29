'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, User, Menu, X } from 'lucide-react';
import CartButton from './CartButton';
import SearchBar from './SearchBar';
import { useAuth } from '@/contexts/AuthContext';

const menuItems = [
  { label: 'HOME', href: '/' },
  { label: 'COLLECTION', href: '/collection' },
  { label: 'ABOUT', href: '/about' },
  { label: 'CONTACT', href: '/contact' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuth();
  

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="h-20 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <span className="text-2xl font-bold uppercase tracking-tight text-gray-900 transition-colors group-hover:text-pink-500">
                SWAYAA<span className="text-pink-500">.</span>
              </span>
            </Link>

            {/* Desktop Menu - Center */}
            <div className="hidden md:flex items-center gap-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 uppercase tracking-wider text-sm font-medium transition-all duration-200 rounded-lg ${
                      isActive
                        ? 'text-pink-500 bg-pink-50'
                        : 'text-gray-700 hover:text-pink-500 hover:bg-pink-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-2">
              {/* Search Icon */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden sm:flex items-center justify-center w-10 h-10 text-gray-700 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-all duration-200"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* Profile Icon */}
              <Link
                href={isAuthenticated ? '/profile' : '/login'}
                className="hidden sm:flex items-center justify-center w-10 h-10 text-gray-700 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-all duration-200"
                aria-label="Profile"
              >
                <User size={20} />
              </Link>

              {/* Cart Icon with Badge */}
              <CartButton />

              {/* Mobile Hamburger Menu */}
              <button
                className="md:hidden flex items-center justify-center w-10 h-10 text-gray-700 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white py-6">
              <div className="flex flex-col gap-1">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`px-4 py-3 uppercase tracking-wider text-sm font-medium transition-all duration-200 rounded-lg ${
                        isActive
                          ? 'text-pink-500 bg-pink-50'
                          : 'text-gray-700 hover:text-pink-500 hover:bg-pink-50'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              
              {/* Mobile Only - Search & Profile */}
              <div className="sm:hidden flex gap-2 mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-gray-700 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-all duration-200"
                  aria-label="Search"
                >
                  <Search size={20} />
                  <span className="text-sm font-medium">SEARCH</span>
                </button>
                <button
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-gray-700 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-all duration-200"
                  aria-label="Profile"
                >
                  <User size={20} />
                  <span className="text-sm font-medium">PROFILE</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
      
      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-20"></div>

      {/* Search Bar */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}