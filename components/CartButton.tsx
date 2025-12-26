'use client';

import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import CartModal from './CartModal';

export default function CartButton() {
  const { getTotalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const itemCount = getTotalItems();

  return (
    <>
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative flex items-center justify-center w-10 h-10 text-gray-700 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-all duration-200"
        aria-label="Shopping Cart"
      >
        <ShoppingBag size={20} />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {itemCount > 9 ? '9+' : itemCount}
          </span>
        )}
      </button>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

