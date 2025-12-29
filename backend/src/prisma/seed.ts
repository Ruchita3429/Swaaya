import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create a test user
  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      passwordHash: hashedPassword,
    },
  });

  console.log('✅ Created test user:', user.email);

  // Create sample products
  const products = [
    {
      name: 'Kalamkari Hand Block Print Long Kurti',
      description: 'Beautiful handcrafted Kalamkari print long kurti',
      price: 1299,
      image: '/kurti-kalamkari-1.jpg',
      type: 'long',
      printType: 'kalamkari',
      category: 'handblock-prints',
      stock: 50,
    },
    {
      name: 'Pure Cotton Hand Block Print Short Kurti',
      description: 'Comfortable pure cotton short kurti',
      price: 899,
      image: '/kurti-handblock-1.jpg',
      type: 'short',
      printType: 'handblock',
      category: 'handblock-prints',
      stock: 30,
    },
    {
      name: 'Kalamkari Print 2 Piece Set',
      description: 'Elegant 2-piece set with Kalamkari print',
      price: 1599,
      image: '/set-kalamkari-1.jpg',
      type: '2-piece',
      printType: 'kalamkari',
      category: 'handblock-prints',
      stock: 25,
    },
    {
      name: 'Ajrak Print Pure Cotton Kurti',
      description: 'Traditional Ajrak print kurti',
      price: 1199,
      image: '/kurti-ajrak-1.jpg',
      type: 'long',
      printType: 'ajrak',
      category: 'handblock-prints',
      stock: 40,
    },
    {
      name: 'Chanderi Silk Kurti',
      description: 'Luxurious Chanderi silk kurti',
      price: 2199,
      image: '/kurti-chanderi-1.jpg',
      type: 'long',
      printType: 'chanderi-silk',
      category: 'silk',
      stock: 15,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { name: product.name },
      update: {},
      create: {
        ...product,
        isActive: true,
      },
    });
  }

  console.log(`✅ Created ${products.length} products`);

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


