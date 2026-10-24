const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- Cleaning catalogue: Removing all Bakery/Cakes and non-traditional items ---');

  // 1. Slugs to delete
  const itemsToDelete = [
    // All Cakes & Bakery
    'fresh-pineapple-cake-eggless',
    'black-forest-celebration-cake',
    'light-chocolate-cake',
    'butterscotch-crunch-cake',
    // Non-sweet/modern chaap items
    'malai-chap',
    'malai-roll'
  ];

  for (const slug of itemsToDelete) {
    const p = await prisma.product.findUnique({ where: { slug } });
    if (p) {
      await prisma.productImage.deleteMany({ where: { productId: p.id } });
      await prisma.productVariant.deleteMany({ where: { productId: p.id } });
      await prisma.review.deleteMany({ where: { productId: p.id } });
      await prisma.orderItem.deleteMany({ where: { variantId: { in: (await prisma.productVariant.findMany({ where: { productId: p.id } })).map(v => v.id) } } });
      await prisma.product.delete({ where: { id: p.id } });
      console.log(`✓ Removed product: ${slug}`);
    }
  }

  // 2. Delete Cakes Category if empty or exists
  const cakesCategory = await prisma.category.findUnique({ where: { slug: 'cakes' } });
  if (cakesCategory) {
    // Check if any product remains
    const remainingProducts = await prisma.product.count({ where: { categoryId: cakesCategory.id } });
    if (remainingProducts === 0) {
      await prisma.category.delete({ where: { id: cakesCategory.id } });
      console.log('✓ Removed Cakes & Bakery category');
    }
  }

  // Update Special Items category to "Festive Sweet Gift Boxes" for decorum and purity
  const specialCategory = await prisma.category.findUnique({ where: { slug: 'special-items' } });
  if (specialCategory) {
    await prisma.category.update({
      where: { id: specialCategory.id },
      data: {
        name: 'Festive Sweet Gift Boxes',
        slug: 'festive-gift-boxes',
        image: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Indian_Sweets.JPG'
      }
    });
    console.log('✓ Renamed Special Items category to Festive Sweet Gift Boxes');
  }

  const remainingTotal = await prisma.product.count();
  const remainingCategories = await prisma.category.findMany({ select: { name: true } });
  console.log(`\nRemaining purely authentic sweets & snacks total: ${remainingTotal}`);
  console.log('Active Categories:', remainingCategories.map(c => c.name));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
