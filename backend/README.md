# Swayaa Backend API

Backend API for Swayaa e-commerce platform built with Node.js, TypeScript, Express, PostgreSQL, and Prisma.

## Features

- 🔐 Authentication & Authorization (JWT)
- 👤 User Management
- 📦 Product Management
- 🛒 Shopping Cart
- 📋 Order Management
- 🔍 Product Search
- ✅ Input Validation
- 🛡️ Error Handling
- 🌐 CORS Support

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Update the following variables in `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/swayaa?schema=public"
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
CORS_ORIGIN=http://localhost:3000
```

### 3. Set Up Database

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# (Optional) Open Prisma Studio to view/edit data
npm run prisma:studio
```

### 4. Run the Server

```bash
# Development mode (with hot reload)
npm run dev

# Production mode
npm run build
npm start
```

The server will start on `http://localhost:5000` (or the PORT specified in `.env`).

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user (protected)

### Users

- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Products

- `GET /api/products` - Get all products (with filters: type, printType, category)
- `GET /api/products/search?q=query` - Search products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (protected, admin)
- `PUT /api/products/:id` - Update product (protected, admin)
- `DELETE /api/products/:id` - Delete product (protected, admin)

### Cart

- `GET /api/cart` - Get user's cart (protected)
- `POST /api/cart/items` - Add item to cart (protected)
- `PUT /api/cart/items/:itemId` - Update cart item quantity (protected)
- `DELETE /api/cart/items/:itemId` - Remove item from cart (protected)
- `DELETE /api/cart` - Clear cart (protected)

### Orders

- `POST /api/orders` - Create order from cart (protected)
- `GET /api/orders` - Get user's orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)
- `PATCH /api/orders/:id/status` - Update order status (protected, admin)

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts          # Prisma client configuration
│   ├── controllers/
│   │   ├── auth.controller.ts   # Authentication logic
│   │   ├── user.controller.ts   # User management
│   │   ├── product.controller.ts # Product CRUD
│   │   ├── cart.controller.ts   # Cart operations
│   │   └── order.controller.ts  # Order management
│   ├── middleware/
│   │   ├── auth.middleware.ts   # JWT authentication
│   │   ├── errorHandler.ts      # Global error handler
│   │   ├── notFoundHandler.ts   # 404 handler
│   │   └── validation.middleware.ts # Request validation
│   ├── routes/
│   │   ├── auth.routes.ts       # Auth routes
│   │   ├── user.routes.ts       # User routes
│   │   ├── product.routes.ts    # Product routes
│   │   ├── cart.routes.ts       # Cart routes
│   │   └── order.routes.ts      # Order routes
│   └── server.ts                # Express app setup
├── prisma/
│   └── schema.prisma            # Database schema
├── .env.example                 # Environment variables template
├── package.json
├── tsconfig.json
└── README.md
```

## Database Schema

- **User**: User accounts with email/password authentication
- **Product**: Product catalog with type, printType, category
- **Cart**: Shopping cart linked to user
- **CartItem**: Items in cart with quantity
- **Order**: Orders with status tracking
- **OrderItem**: Order line items with price snapshot

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Error Handling

All errors follow a consistent format:

```json
{
  "success": false,
  "error": {
    "message": "Error message here"
  }
}
```

## Development

- Use `npm run dev` for development with hot reload
- Use `npm run prisma:studio` to view/edit database data
- Use `npm run prisma:migrate` to create new migrations

## Production

1. Set `NODE_ENV=production` in `.env`
2. Use a strong `JWT_SECRET`
3. Configure proper `CORS_ORIGIN` for your frontend domain
4. Use environment-specific database credentials
5. Run `npm run build` to compile TypeScript
6. Use `npm start` to run the compiled code


