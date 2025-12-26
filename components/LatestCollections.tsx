'use client';

import Image from 'next/image';
import Container from './Container';
import { useCart } from '@/contexts/CartContext';

// Indian print kurtis and related products
const products = [
  {
    id: 1,
    name: 'Kalamkari Hand Block Print Long Kurti',
    price: '₹1,299',
    image: '/kurti-kalamkari-1.jpg',
  },
  {
    id: 2,
    name: 'Pure Cotton Hand Block Print Short Kurti',
    price: '₹899',
    image: '/kurti-handblock-1.jpg',
  },
  {
    id: 3,
    name: 'Kalamkari Print 2 Piece Set',
    price: '₹1,599',
    image: '/set-kalamkari-1.jpg',
  },
  {
    id: 4,
    name: 'Hand Block Print Long Kurti with Lining Pants',
    price: '₹1,899',
    image: '/kurti-pants-1.jpg',
  },
  {
    id: 5,
    name: 'Ajrak Print Pure Cotton Kurti',
    price: '₹1,199',
    image: '/kurti-ajrak-1.jpg',
  },
  {
    id: 6,
    name: 'Bagh Print 3 Piece Set',
    price: '₹1,799',
    image: '/set-bagh-1.jpg',
  },
  {
    id: 7,
    name: 'Jaipur Hand Block Print Short Kurti',
    price: '₹999',
    image: '/kurti-jaipur-1.jpg',
  },
  {
    id: 8,
    name: 'Mul Hand Block Print Long Kurti',
    price: '₹1,399',
    image: '/kurti-mul-1.jpg',
  },
  {
    id: 9,
    name: 'Kalamkari Print 2 Piece Set with Dupatta',
    price: '₹1,699',
    image: '/set-kalamkari-2.jpg',
  },
  {
    id: 10,
    name: 'Pure Cotton Hand Block Print Kurti',
    price: '₹1,099',
    image: '/kurti-cotton-1.jpg',
  },
];

export default function LatestCollections() {
  const { addToCart } = useCart();

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white">
      <Container>
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-thin uppercase tracking-wider text-[#111827] mb-3">
            LATEST COLLECTIONS —
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Handcrafted Indian prints in pure cotton - Kalamkari, Hand Block, Ajrak & more
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => (
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

