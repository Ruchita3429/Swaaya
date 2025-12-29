'use client';

import Image from 'next/image';
import Container from './Container';
import { useCart } from '@/contexts/CartContext';
import { allProducts } from '@/data/products';

// Get products 6-15 for best sellers (or you can mark specific products as bestsellers)
const bestSellers = allProducts.slice(5, 15);

export default function BestSellers() {
  const { addToCart } = useCart();

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white">
      <Container>
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-thin uppercase tracking-wider text-[#111827] mb-3">
            BEST SELLERS —
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Our most loved Indian print kurtis - handcrafted with traditional artistry
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {bestSellers.map((product) => (
            <div key={product.id} className="group flex flex-col">
              {/* Product Image */}
              <div className="relative w-full aspect-square bg-white mb-4 overflow-hidden flex-shrink-0">
                <div className="relative w-full h-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
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
                  onClick={() => addToCart(product)}
                  className="w-full px-4 py-2 text-xs md:text-sm font-medium uppercase tracking-wider text-[#111827] border border-[#111827] hover:bg-[#111827] hover:text-white transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

