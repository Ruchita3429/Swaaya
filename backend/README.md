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

Create a `.env` file in the backend directory with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/swayaa_db?schema=public"

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# SMTP Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=your-email@gmail.com

# Contact Email (where contact form submissions will be sent)
CONTACT_EMAIL=hello@swayaaindia.com
```

### Email Configuration

For Gmail:
1. Enable 2-Step Verification on your Google account
2. Generate an App Password: Google Account → Security → App passwords
3. Use the 16-character app password (not your regular Gmail password)

For other providers, use their SMTP settings:
- **Outlook/Hotmail**: `smtp-mail.outlook.com:587`
- **Yahoo**: `smtp.mail.yahoo.com:587`
- **Custom SMTP**: Use your provider's SMTP settings

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

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user (protected)
- `GET /auth/me` - Get current user (protected)

### Users

- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Products

- `GET /products` - Get all products with pagination and filters
  - Query parameters:
    - `category` - Filter by category
    - `priceRange` - Filter by price range (format: "min-max" or "min-" or "-max")
    - `type` - Filter by product type
    - `printType` - Filter by print type
    - `page` - Page number (default: 1)
    - `limit` - Items per page (default: 20, max: 100)
    - `sortBy` - Sort field (createdAt, price, name, updatedAt)
    - `sortOrder` - Sort order (asc, desc)
  - Example: `GET /products?category=handblock-prints&priceRange=500-2000&page=1&limit=10`
- `GET /products/:id` - Get product by ID
- `GET /products/search?q=query` - Search products
- `POST /products` - Create product (protected, admin)
- `PUT /products/:id` - Update product (protected, admin)
- `DELETE /products/:id` - Delete product (protected, admin)

### Cart

- `GET /api/cart` - Get user's cart (protected)
- `POST /api/cart/items` - Add item to cart (protected)
- `PUT /api/cart/items/:itemId` - Update cart item quantity (protected)
- `DELETE /api/cart/items/:itemId` - Remove item from cart (protected)
- `DELETE /api/cart` - Clear cart (protected)

### Orders (Checkout Flow)

- `POST /api/orders` - Create order from cart (protected)
  - Validates cart (checks stock availability, product active status)
  - Creates order with order items
  - Updates product stock
  - Clears cart after successful order creation
  - Sends order confirmation email to customer
  - Returns detailed order summary
  - Uses database transaction for atomicity
- `GET /api/orders` - Get user's orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)
- `PATCH /api/orders/:id/status` - Update order status (protected, admin)

### Contact

- `POST /api/contact` - Submit contact form
  - Validates form data (name, email, subject, message)
  - Sends email to configured contact email
  - Sends confirmation email to user
  - Returns success message

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

The API uses JWT (JSON Web Tokens) for authentication with bcrypt for password hashing.

### Authentication Flow

1. **Register**: `POST /auth/register`
   ```json
   {
     "email": "user@example.com",
     "name": "John Doe",
     "password": "password123"
   }
   ```
   Returns: `{ success: true, data: { user, token } }`

2. **Login**: `POST /auth/login`
   ```json
   {
     "email": "user@example.com",
     "password": "password123"
   }
   ```
   Returns: `{ success: true, data: { user, token } }`

3. **Protected Routes**: Include the JWT token in the Authorization header:
   ```
   Authorization: Bearer <your-jwt-token>
   ```

4. **Logout**: `POST /auth/logout` (requires authentication)
   - In a stateless JWT system, logout is handled client-side by removing the token

### Password Security

- Passwords are hashed using bcrypt with a salt rounds of 10
- Passwords must be at least 6 characters long
- Never store or log plain text passwords

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


