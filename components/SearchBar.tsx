'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { useSearch } from '@/hooks/useSearch';
import Link from 'next/link';
import Image from 'next/image';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const searchResults = useSearch(query);

  // Focus input when search opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      router.push(`/collection?search=${encodeURIComponent(query.trim())}`);
      setQuery('');
      onClose();
    }
    if (e.key === 'Escape') {
      setQuery('');
      onClose();
    }
  };

  const handleResultClick = (e: React.MouseEvent, searchQuery: string) => {
    e.preventDefault();
    router.push(`/collection?search=${encodeURIComponent(searchQuery)}`);
    setQuery('');
    onClose();
  };

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    if (showResults) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showResults]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Search Bar */}
      <div className="fixed top-20 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="relative">
            {/* Search Input */}
            <div className="relative flex items-center">
              <Search className="absolute left-4 text-gray-400" size={20} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setShowResults(true)}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowResults(true);
                }}
                placeholder="Search products..."
                className="w-full pl-12 pr-12 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#111827] focus:border-[#111827] text-[#111827] text-base"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 text-gray-400 hover:text-[#111827] transition-colors"
                  aria-label="Clear search"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {/* Search Results Dropdown */}
            {showResults && query.trim() && (
              <div 
                ref={resultsRef}
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 shadow-lg max-h-96 overflow-y-auto z-50"
              >
                {searchResults.length > 0 ? (
                  <div className="py-2">
                    {searchResults.slice(0, 8).map((product) => (
                      <Link
                        key={product.id}
                        href={`/collection?search=${encodeURIComponent(query)}`}
                        onClick={(e) => handleResultClick(e, query)}
                        className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                      >
                        <div className="relative w-16 h-16 flex-shrink-0 bg-white border border-gray-200">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-[#111827] truncate">
                            {product.name}
                          </h3>
                          <p className="text-sm font-bold text-[#111827] mt-1">
                            {product.price}
                          </p>
                        </div>
                      </Link>
                    ))}
                    {searchResults.length > 8 && (
                      <div className="px-4 py-3 border-t border-gray-200 text-center">
                        <Link
                          href={`/collection?search=${encodeURIComponent(query)}`}
                          onClick={(e) => handleResultClick(e, query)}
                          className="text-sm text-[#111827] hover:underline font-medium"
                        >
                          View all {searchResults.length} results
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="px-4 py-8 text-center text-gray-500">
                    <p>No products found for "{query}"</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

