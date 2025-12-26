'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAVBAR_HEIGHT = 80; // 5rem = 80px

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const router = useRouter();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    clearCart,
  } = useCart();
  const { isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Ensure we're in the browser before rendering portal
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Check screen size for responsive width
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    if (mounted) {
      checkScreenSize();
      window.addEventListener('resize', checkScreenSize);
      return () => window.removeEventListener('resize', checkScreenSize);
    }
  }, [mounted]);

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  // Disable body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Trigger animation
      setIsAnimating(true);
    } else {
      document.body.style.overflow = '';
      // Delay animation reset for smooth close
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const totalPrice = getTotalPrice();

  if (!mounted) return null;

  // Don't render if closed and animation finished
  if (!isOpen && !isAnimating) return null;

  return createPortal(
    <>
      {/* Backdrop Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9998,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      />

      {/* Cart Drawer */}
      <div
        style={{
          position: 'fixed',
          top: `${NAVBAR_HEIGHT}px`,
          right: 0,
          width: isMobile ? '100vw' : '420px',
          height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          zIndex: 9999,
          backgroundColor: 'white',
          boxShadow: '-4px 0 6px -1px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        {/* Header - Sticky Top */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px',
            borderBottom: '1px solid #e5e7eb',
            position: 'sticky',
            top: 0,
            backgroundColor: 'white',
            zIndex: 10,
            flexShrink: 0,
          }}
        >
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#111827',
              margin: 0,
            }}
          >
            Shopping Cart
          </h2>
          <button
            onClick={onClose}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            aria-label="Close cart"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Cart Items - Scrollable */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: '24px',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {cartItems.length === 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
                padding: '40px 20px',
              }}
            >
              <ShoppingBag size={64} className="text-gray-300" style={{ marginBottom: '16px' }} />
              <p style={{ color: '#6b7280', fontSize: '18px', marginBottom: '8px', margin: 0 }}>
                Your cart is empty
              </p>
              <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>
                Add some items to get started
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    paddingBottom: '24px',
                    borderBottom: '1px solid #e5e7eb',
                  }}
                >
                  {/* Product Image */}
                  <div
                    style={{
                      position: 'relative',
                      width: '80px',
                      height: '80px',
                      flexShrink: 0,
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="80px"
                    />
                  </div>

                  {/* Product Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3
                      style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#111827',
                        marginBottom: '4px',
                        margin: '0 0 4px 0',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {item.name}
                    </h3>
                    <p
                      style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#111827',
                        marginBottom: '12px',
                        margin: '0 0 12px 0',
                      }}
                    >
                      {item.price}
                    </p>

                    {/* Quantity Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid #d1d5db',
                          backgroundColor: 'white',
                          cursor: 'pointer',
                          borderRadius: '4px',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} className="text-[#111827]" />
                      </button>
                      <span
                        style={{
                          fontSize: '14px',
                          fontWeight: 500,
                          color: '#111827',
                          width: '32px',
                          textAlign: 'center',
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid #d1d5db',
                          backgroundColor: 'white',
                          cursor: 'pointer',
                          borderRadius: '4px',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} className="text-[#111827]" />
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      alignSelf: 'flex-start',
                      padding: '8px',
                      borderRadius: '4px',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    aria-label="Remove item"
                  >
                    <X size={18} className="text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Sticky Bottom */}
        {cartItems.length > 0 && (
          <div
            style={{
              borderTop: '1px solid #e5e7eb',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              position: 'sticky',
              bottom: 0,
              backgroundColor: 'white',
              zIndex: 10,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#111827',
                }}
              >
                Total:
              </span>
              <span
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#111827',
                }}
              >
                ₹{totalPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <button
              onClick={clearCart}
              style={{
                width: '100%',
                padding: '8px 16px',
                fontSize: '14px',
                color: '#6b7280',
                border: '1px solid #d1d5db',
                backgroundColor: 'white',
                cursor: 'pointer',
                borderRadius: '4px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#111827';
                e.currentTarget.style.borderColor = '#9ca3af';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#6b7280';
                e.currentTarget.style.borderColor = '#d1d5db';
              }}
            >
              Clear Cart
            </button>
            <button
              onClick={() => {
                if (cartItems.length === 0) return;
                onClose();
                if (isAuthenticated) {
                  router.push('/checkout');
                } else {
                  router.push('/login?redirect=/checkout');
                }
              }}
              disabled={cartItems.length === 0}
              style={{
                width: '100%',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'white',
                backgroundColor: cartItems.length === 0 ? '#9ca3af' : '#111827',
                border: 'none',
                cursor: cartItems.length === 0 ? 'not-allowed' : 'pointer',
                borderRadius: '4px',
                opacity: cartItems.length === 0 ? 0.6 : 1,
              }}
              onMouseEnter={(e) => {
                if (cartItems.length > 0) {
                  e.currentTarget.style.backgroundColor = '#1f2937';
                }
              }}
              onMouseLeave={(e) => {
                if (cartItems.length > 0) {
                  e.currentTarget.style.backgroundColor = '#111827';
                }
              }}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>,
    document.body
  );
}

