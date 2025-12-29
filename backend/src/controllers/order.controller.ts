import { Response, NextFunction } from 'express';
import prisma from '../config/database';
import { createError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth.middleware';
import { sendOrderConfirmationEmail } from '../services/email.service';

export const createOrder = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId!;

    // Use transaction to ensure atomicity
    const result = await prisma.$transaction(async (tx) => {
      // Get user information
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      if (!user) {
        throw createError('User not found', 404);
      }

      // Get user's cart with products
      const cart = await tx.cart.findUnique({
        where: { userId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      // Validate cart exists and is not empty
      if (!cart) {
        throw createError('Cart not found', 404);
      }

      if (cart.items.length === 0) {
        throw createError('Cart is empty', 400);
      }

      // Validate cart items
      const validationErrors: string[] = [];
      const orderItems: Array<{
        productId: number;
        quantity: number;
        price: number;
        productName: string;
      }> = [];

      for (const item of cart.items) {
        const product = item.product;

        // Check if product exists and is active
        if (!product) {
          validationErrors.push(`Product with ID ${item.productId} not found`);
          continue;
        }

        if (!product.isActive) {
          validationErrors.push(`Product "${product.name}" is no longer available`);
          continue;
        }

        // Check stock availability
        if (product.stock < item.quantity) {
          validationErrors.push(
            `Insufficient stock for "${product.name}". Available: ${product.stock}, Requested: ${item.quantity}`
          );
          continue;
        }

        // Check if price is valid
        if (product.price <= 0) {
          validationErrors.push(`Invalid price for product "${product.name}"`);
          continue;
        }

        // Add to order items
        orderItems.push({
          productId: product.id,
          quantity: item.quantity,
          price: product.price,
          productName: product.name,
        });
      }

      // If there are validation errors, throw them
      if (validationErrors.length > 0) {
        throw createError(`Cart validation failed: ${validationErrors.join('; ')}`, 400);
      }

      // Re-validate that we have items after filtering
      if (orderItems.length === 0) {
        throw createError('No valid items in cart', 400);
      }

      // Calculate total amount
      const totalAmount = orderItems.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);

      // Create order with items
      const order = await tx.order.create({
        data: {
          userId,
          totalAmount,
          status: 'pending',
          items: {
            create: orderItems.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                  type: true,
                  printType: true,
                  category: true,
                },
              },
            },
          },
        },
      });

      // Update product stock for each item
      for (const item of orderItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      // Clear cart after successful order creation
      await tx.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      return { order, orderItems, user };
    });

    const { order, orderItems, user } = result;

    // Build order summary
    const orderSummary = {
      orderId: order.id,
      status: order.status,
      totalAmount: order.totalAmount,
      itemCount: order.items.length,
      items: order.items.map((item) => ({
        id: item.id,
        product: {
          id: item.product.id,
          name: item.product.name,
          image: item.product.image,
          type: item.product.type,
          printType: item.product.printType,
          category: item.product.category,
        },
        quantity: item.quantity,
        price: item.price,
        subtotal: item.price * item.quantity,
      })),
      createdAt: order.createdAt,
    };

    // Send order confirmation email (non-blocking)
    // Don't fail the order if email fails
    sendOrderConfirmationEmail({
      orderId: order.id,
      customerName: user.name,
      customerEmail: user.email,
      totalAmount: order.totalAmount,
      items: order.items.map((item) => ({
        product: {
          name: item.product.name,
          image: item.product.image,
        },
        quantity: item.quantity,
        price: item.price,
      })),
      orderDate: order.createdAt,
    }).catch((emailError) => {
      // Log email error but don't fail the request
      console.error('Failed to send order confirmation email:', emailError);
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: {
        order: orderSummary,
      },
    });
  } catch (error: any) {
    // If it's already a formatted error, pass it through
    if (error.statusCode) {
      return next(error);
    }
    next(error);
  }
};

export const getOrders = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId!;

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      success: true,
      data: { orders },
      count: orders.length,
    });
  } catch (error: any) {
    next(error);
  }
};

export const getOrderById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId!;
    const { id } = req.params;

    const order = await prisma.order.findFirst({
      where: {
        id: parseInt(id),
        userId, // Ensure user can only access their own orders
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      throw createError('Order not found', 404);
    }

    res.json({
      success: true,
      data: { order },
    });
  } catch (error: any) {
    next(error);
  }
};

export const updateOrderStatus = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      throw createError('Invalid order status', 400);
    }

    const order = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { status },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    res.json({
      success: true,
      data: { order },
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return next(createError('Order not found', 404));
    }
    next(error);
  }
};


