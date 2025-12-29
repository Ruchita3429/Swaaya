# Backend Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set Up PostgreSQL Database

Make sure PostgreSQL is installed and running. Then create a database:

```sql
CREATE DATABASE swayaa;
```

### 3. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
NODE_ENV=development

DATABASE_URL="postgresql://username:password@localhost:5432/swayaa?schema=public"

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

CORS_ORIGIN=http://localhost:3000
FRONTEND_URL=http://localhost:3000
```

**Important**: Replace `username` and `password` with your PostgreSQL credentials.

### 4. Set Up Database Schema

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations to create tables
npm run prisma:migrate

# (Optional) Seed the database with sample data
npm run prisma:seed
```

### 5. Start the Server

```bash
# Development mode (with hot reload)
npm run dev

# The server will start on http://localhost:5000
```

## Verify Installation

Visit `http://localhost:5000/health` in your browser or use curl:

```bash
curl http://localhost:5000/health
```

You should see:
```json
{
  "status": "ok",
  "message": "Swayaa API is running",
  "timestamp": "..."
}
```

## Test Authentication

### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Save the `token` from the response and use it in subsequent requests:

```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Troubleshooting

### Database Connection Issues

- Ensure PostgreSQL is running: `pg_isready` or check your PostgreSQL service
- Verify DATABASE_URL format: `postgresql://user:password@host:port/database`
- Check if the database exists: `psql -l` or use pgAdmin

### Port Already in Use

Change the PORT in `.env` file or kill the process using port 5000:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill
```

### Prisma Issues

- Delete `node_modules` and `package-lock.json`, then `npm install`
- Regenerate Prisma Client: `npm run prisma:generate`
- Reset database: `npx prisma migrate reset` (⚠️ deletes all data)

## Next Steps

1. Update `.env` with production values
2. Connect your Next.js frontend to this API
3. Update frontend API calls to use `http://localhost:5000/api`
4. Add admin role checking for protected routes
5. Implement payment gateway integration


