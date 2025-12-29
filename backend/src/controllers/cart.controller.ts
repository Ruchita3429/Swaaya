import { Response, NextFunction } from 'express';
import prisma from '../config/database';
import { createError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth.middleware';

export const getCart = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId!;

    // Get or create cart
    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    }

    const total = cart.items.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    res.json({
      success: true,
      data: {
        cart: {
          id: cart.id,
          items: cart.items,
          total,
          itemCount: cart.items.length,
        },
      },
    });
  } catch (error: any) {
    next(error);
  }
};

export const addToCart = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId!;
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      throw createError('Product ID is required', 400);
    }

    // Verify product exists
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    });

    if (!product) {
      throw createError('Product not found', 404);
    }

    // Check stock availability
    if (product.stock < quantity) {
      throw createError('Insufficient stock', 400);
    }

    // Get or create cart
    let cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }

    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: parseInt(productId),
        },
      },
    });

    let cartItem;
    if (existingItem) {
      // Update quantity
      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
        include: { product: true },
      });
    } else {
      // Create new cart item
      cartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: parseInt(productId),
          quantity,
        },
        include: { product: true },
      });
    }

    res.status(201).json({
      success: true,
      data: { cartItem },
    });
  } catch (error: any) {
    next(error);
  }
};

export const updateCartItem = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId!;
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      throw createError('Quantity must be at least 1', 400);
    }

    // Verify cart item belongs to user
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: parseInt(itemId) },
      include: {
        cart: true,
        product: true,
      },
    });

    if (!cartItem) {
      throw createError('Cart item not found', 404);
    }

    if (cartItem.cart.userId !== userId) {
      throw createError('Unauthorized', 403);
    }

    // Check stock availability
    if (cartItem.product.stock < quantity) {
      throw createError('Insufficient stock', 400);
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: parseInt(itemId) },
      data: { quantity },
      include: { product: true },
    });

    res.json({
      success: true,
      data: { cartItem: updatedItem },
    });
  } catch (error: any) {
    next(error);
  }
};

export const removeFromCart = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId!;
    const { itemId } = req.params;

    // Verify cart item belongs to user
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: parseInt(itemId) },
      include: { cart: true },
    });

    if (!cartItem) {
      throw createError('Cart item not found', 404);
    }

    if (cartItem.cart.userId !== userId) {
      throw createError('Unauthorized', 403);
    }

    await prisma.cartItem.delete({
      where: { id: parseInt(itemId) },
    });

    res.json({
      success: true,
      message: 'Item removed from cart',
    });
  } catch (error: any) {
    next(error);
  }
};

export const clearCart = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId!;

    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (cart) {
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      });
    }

    res.json({
      success: true,
      message: 'Cart cleared successfully',
    });
  } catch (error: any) {
    next(error);
  }
};


