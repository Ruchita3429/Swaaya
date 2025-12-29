'use client';

import { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Container from '@/components/Container';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { allProducts } from '@/data/products';

export default function CollectionContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPrintTypes, setSelectedPrintTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('default');
  
  // Get search query from URL
  const searchQuery = searchParams.get('search') || '';

  // Filter products by search query
  const searchFilteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return allProducts;
    }

    const query = searchQuery.toLowerCase().trim();
    return allProducts.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(query);
      const categoryMatch = 
        product.category?.toLowerCase().includes(query) ||
        product.printType.toLowerCase().includes(query) ||
        product.type.toLowerCase().includes(query);
      return nameMatch || categoryMatch;
    });
  }, [searchQuery]);

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handlePrintTypeChange = (printType: string) => {
    setSelectedPrintTypes((prev) =>
      prev.includes(printType) ? prev.filter((t) => t !== printType) : [...prev, printType]
    );
  };

  const filteredProducts = useMemo(() => {
    return searchFilteredProducts.filter((product) => {
      const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(product.type);
      const printTypeMatch = selectedPrintTypes.length === 0 || selectedPrintTypes.includes(product.printType);
      return typeMatch && printTypeMatch;
    });
  }, [searchFilteredProducts, selectedTypes, selectedPrintTypes]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === 'price-low') {
        return parseInt(a.price.replace(/[₹,]/g, '')) - parseInt(b.price.replace(/[₹,]/g, ''));
      }
      if (sortBy === 'price-high') {
        return parseInt(b.price.replace(/[₹,]/g, '')) - parseInt(a.price.replace(/[₹,]/g, ''));
      }
      return 0;
    });
  }, [filteredProducts, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      <section className="py-8 md:py-12 lg:py-16">
        <Container>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left Sidebar - Filters */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <h3 className="text-lg font-bold uppercase tracking-wider text-[#111827] mb-6">
                  FILTERS
                </h3>

                {/* Type Filter */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[#111827] mb-4">
                    TYPE
                  </h4>
                  <div className="space-y-3 border border-gray-200 p-4">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes('short')}
                        onChange={() => handleTypeChange('short')}
                        className="w-4 h-4 text-[#111827] border-gray-300 rounded focus:ring-[#111827]"
                      />
                      <span className="ml-3 text-sm text-[#111827] group-hover:text-gray-600">
                        Short
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes('long')}
                        onChange={() => handleTypeChange('long')}
                        className="w-4 h-4 text-[#111827] border-gray-300 rounded focus:ring-[#111827]"
                      />
                      <span className="ml-3 text-sm text-[#111827] group-hover:text-gray-600">
                        Long
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes('2-piece')}
                        onChange={() => handleTypeChange('2-piece')}
                        className="w-4 h-4 text-[#111827] border-gray-300 rounded focus:ring-[#111827]"
                      />
                      <span className="ml-3 text-sm text-[#111827] group-hover:text-gray-600">
                        2 Piece Set
                      </span>
                    </label>
                  </div>
                </div>

                {/* Print Type Filter */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[#111827] mb-4">
                    PRINTS
                  </h4>
                  <div className="space-y-3 border border-gray-200 p-4">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedPrintTypes.includes('kalamkari')}
                        onChange={() => handlePrintTypeChange('kalamkari')}
                        className="w-4 h-4 text-[#111827] border-gray-300 rounded focus:ring-[#111827]"
                      />
                      <span className="ml-3 text-sm text-[#111827] group-hover:text-gray-600">
                        Kalamkari
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedPrintTypes.includes('ajrak')}
                        onChange={() => handlePrintTypeChange('ajrak')}
                        className="w-4 h-4 text-[#111827] border-gray-300 rounded focus:ring-[#111827]"
                      />
                      <span className="ml-3 text-sm text-[#111827] group-hover:text-gray-600">
                        Ajrak
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedPrintTypes.includes('bagh')}
                        onChange={() => handlePrintTypeChange('bagh')}
                        className="w-4 h-4 text-[#111827] border-gray-300 rounded focus:ring-[#111827]"
                      />
                      <span className="ml-3 text-sm text-[#111827] group-hover:text-gray-600">
                        Bagh
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedPrintTypes.includes('handblock')}
                        onChange={() => handlePrintTypeChange('handblock')}
                        className="w-4 h-4 text-[#111827] border-gray-300 rounded focus:ring-[#111827]"
                      />
                      <span className="ml-3 text-sm text-[#111827] group-hover:text-gray-600">
                        Handblock - Jaipur
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedPrintTypes.includes('handblock-mul')}
                        onChange={() => handlePrintTypeChange('handblock-mul')}
                        className="w-4 h-4 text-[#111827] border-gray-300 rounded focus:ring-[#111827]"
                      />
                      <span className="ml-3 text-sm text-[#111827] group-hover:text-gray-600">
                        Handblock - Mul
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedPrintTypes.includes('mangalgiri')}
                        onChange={() => handlePrintTypeChange('mangalgiri')}
                        className="w-4 h-4 text-[#111827] border-gray-300 rounded focus:ring-[#111827]"
                      />
                      <span className="ml-3 text-sm text-[#111827] group-hover:text-gray-600">
                        Mangalgiri
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedPrintTypes.includes('ikat-premium')}
                        onChange={() => handlePrintTypeChange('ikat-premium')}
                        className="w-4 h-4 text-[#111827] border-gray-300 rounded focus:ring-[#111827]"
                      />
                      <span className="ml-3 text-sm text-[#111827] group-hover:text-gray-600">
                        Ikat - Premiums
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedPrintTypes.includes('cotton-prints')}
                        onChange={() => handlePrintTypeChange('cotton-prints')}
                        className="w-4 h-4 text-[#111827] border-gray-300 rounded focus:ring-[#111827]"
                      />
                      <span className="ml-3 text-sm text-[#111827] group-hover:text-gray-600">
                        Cotton Prints
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedPrintTypes.includes('cotton-silk')}
                        onChange={() => handlePrintTypeChange('cotton-silk')}
                        className="w-4 h-4 text-[#111827] border-gray-300 rounded focus:ring-[#111827]"
                      />
                      <span className="ml-3 text-sm text-[#111827] group-hover:text-gray-600">
                        Cotton Silk
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedPrintTypes.includes('chanderi-silk')}
                        onChange={() => handlePrintTypeChange('chanderi-silk')}
                        className="w-4 h-4 text-[#111827] border-gray-300 rounded focus:ring-[#111827]"
                      />
                      <span className="ml-3 text-sm text-[#111827] group-hover:text-gray-600">
                        Chanderi Silk
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedPrintTypes.includes('ikat-plain')}
                        onChange={() => handlePrintTypeChange('ikat-plain')}
                        className="w-4 h-4 text-[#111827] border-gray-300 rounded focus:ring-[#111827]"
                      />
                      <span className="ml-3 text-sm text-[#111827] group-hover:text-gray-600">
                        Ikat Plain
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Header with Title and Sort */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-thin uppercase tracking-wider text-[#111827]">
                    {searchQuery ? `SEARCH RESULTS —` : 'ALL COLLECTIONS —'}
                  </h2>
                  {searchQuery && (
                    <p className="text-gray-500 text-sm mt-2">
                      {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for "{searchQuery}"
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="sort" className="text-sm text-gray-500">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 bg-white text-[#111827] text-sm focus:outline-none focus:ring-1 focus:ring-[#111827] focus:border-[#111827]"
                  >
                    <option value="default">Default</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Product Grid */}
              {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {sortedProducts.map((product) => (
                    <div key={product.id} className="group flex flex-col">
                      {/* Product Image */}
                      <div className="relative w-full aspect-square bg-white mb-4 overflow-hidden flex-shrink-0">
                        <div className="relative w-full h-full">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          />
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="text-center flex-grow flex flex-col justify-end">
                        <h3 className="text-sm md:text-base text-[#111827] mb-1">
                          {product.name}
                        </h3>
                        <p className="text-sm md:text-base font-bold text-[#111827] mb-3">
                          {product.price}
                        </p>
                        <button
                          onClick={() => addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                          })}
                          className="w-full px-4 py-2 text-xs md:text-sm font-medium uppercase tracking-wider text-[#111827] border border-[#111827] hover:bg-[#111827] hover:text-white transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg mb-2">
                    {searchQuery ? `No products found for "${searchQuery}"` : 'No products match your filters'}
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => router.push('/collection')}
                      className="text-[#111827] hover:underline font-medium"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
      <Footer />
    </div>
  );
}

