import { useMemo } from 'react';
import { Product } from '@/data/products';
import { allProducts } from '@/data/products';

export function useSearch(query: string): Product[] {
  const searchResults = useMemo(() => {
    if (!query || query.trim() === '') {
      return [];
    }

    const searchTerm = query.toLowerCase().trim();

    return allProducts.filter((product) => {
      // Search by product name (case-insensitive)
      const nameMatch = product.name.toLowerCase().includes(searchTerm);

      // Search by category/print type (case-insensitive)
      const categoryMatch = 
        product.category?.toLowerCase().includes(searchTerm) ||
        product.printType.toLowerCase().includes(searchTerm) ||
        product.type.toLowerCase().includes(searchTerm);

      return nameMatch || categoryMatch;
    });
  }, [query]);

  return searchResults;
}

