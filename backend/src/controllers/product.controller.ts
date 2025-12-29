import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';
import { createError } from '../middleware/errorHandler';

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { 
      category, 
      priceRange, 
      type, 
      printType,
      page = '1', 
      limit = '20',
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build where clause
    const where: any = { isActive: true };
    
    if (category) {
      where.category = category;
    }
    
    if (type) {
      where.type = type;
    }
    
    if (printType) {
      where.printType = printType;
    }
    
    // Handle price range filter
    if (priceRange) {
      const priceRangeStr = priceRange as string;
      // Expected format: "min-max" or "min-" or "-max"
      const parts = priceRangeStr.split('-');
      
      if (parts.length === 2) {
        const minPriceStr = parts[0].trim();
        const maxPriceStr = parts[1].trim();
        
        const minPrice = minPriceStr ? parseFloat(minPriceStr) : null;
        const maxPrice = maxPriceStr ? parseFloat(maxPriceStr) : null;
        
        if (minPrice !== null && !isNaN(minPrice) && maxPrice !== null && !isNaN(maxPrice)) {
          // Both min and max provided
          if (minPrice > maxPrice) {
            throw createError('Minimum price cannot be greater than maximum price', 400);
          }
          where.price = {
            gte: minPrice,
            lte: maxPrice,
          };
        } else if (minPrice !== null && !isNaN(minPrice)) {
          // Only min provided
          where.price = {
            gte: minPrice,
          };
        } else if (maxPrice !== null && !isNaN(maxPrice)) {
          // Only max provided
          where.price = {
            lte: maxPrice,
          };
        }
      }
    }

    // Pagination
    const pageNum = Math.max(1, parseInt(page as string));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit as string))); // Max 100 items per page
    const skip = (pageNum - 1) * limitNum;

    // Validate sortBy field
    const validSortFields = ['createdAt', 'price', 'name', 'updatedAt'];
    const sortField = validSortFields.includes(sortBy as string) ? sortBy as string : 'createdAt';
    const order = (sortOrder as string).toLowerCase() === 'asc' ? 'asc' : 'desc';

    // Get total count for pagination metadata
    const totalCount = await prisma.product.count({ where });

    // Optimized query - only select needed fields
    const products = await prisma.product.findMany({
      where,
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        image: true,
        type: true,
        printType: true,
        category: true,
        stock: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
      take: limitNum,
      skip,
      orderBy: {
        [sortField]: order,
      },
    });

    const totalPages = Math.ceil(totalCount / limitNum);

    res.json({
      success: true,
      data: { products },
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: totalCount,
        totalPages,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
      },
    });
  } catch (error: any) {
    next(error);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const productId = parseInt(id);
    
    if (isNaN(productId)) {
      throw createError('Invalid product ID', 400);
    }

    // Optimized query - only select needed fields
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        image: true,
        type: true,
        printType: true,
        category: true,
        stock: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!product) {
      throw createError('Product not found', 404);
    }

    // Check if product is active (optional: you might want to show inactive products to admins)
    if (!product.isActive) {
      throw createError('Product not found', 404);
    }

    res.json({
      success: true,
      data: { product },
    });
  } catch (error: any) {
    next(error);
  }
};

export const searchProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== 'string') {
      throw createError('Search query is required', 400);
    }

    const query = q.toLowerCase().trim();

    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { category: { contains: query, mode: 'insensitive' } },
          { printType: { contains: query, mode: 'insensitive' } },
          { type: { contains: query, mode: 'insensitive' } },
        ],
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      success: true,
      data: { products },
      count: products.length,
    });
  } catch (error: any) {
    next(error);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, price, image, type, printType, category, stock } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        image,
        type,
        printType,
        category,
        stock: stock ? parseInt(stock) : 0,
        isActive: true,
      },
    });

    res.status(201).json({
      success: true,
      data: { product },
    });
  } catch (error: any) {
    next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.price) updateData.price = parseFloat(updateData.price);
    if (updateData.stock) updateData.stock = parseInt(updateData.stock);

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    res.json({
      success: true,
      data: { product },
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return next(createError('Product not found', 404));
    }
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return next(createError('Product not found', 404));
    }
    next(error);
  }
};


