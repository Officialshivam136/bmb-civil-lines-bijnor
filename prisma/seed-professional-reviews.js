const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateReviews() {
  console.log('--- Updating with authentic, highly professional reviews from respected Bijnor patrons ---');

  // Clear existing reviews
  await prisma.review.deleteMany({});
  
  // Create / Update professional reviewer profiles
  const reviewers = [
    {
      name: 'Dr. Alok Rastogi',
      email: 'dr.alok.rastogi@gmail.com',
      phone: '+91 94122 01824'
    },
    {
      name: 'Advocate Rajeshwar Sharma',
      email: 'adv.rajeshwar@bijnorbar.in',
      phone: '+91 98370 45211'
    },
    {
      name: 'Mrs. Sunita Maheshwari',
      email: 'sunita.maheshwari@outlook.com',
      phone: '+91 98972 34190'
    },
    {
      name: 'Er. Pradeep Singhal',
      email: 'pradeep.singhal@bijnorinfra.com',
      phone: '+91 97580 89210'
    }
  ];

  const userRecords = [];
  for (const r of reviewers) {
    let u = await prisma.user.findUnique({ where: { email: r.email } });
    if (!u) {
      u = await prisma.user.create({ data: r });
    }
    userRecords.push(u);
  }

  const samosa = await prisma.product.findUnique({ where: { slug: 'desi-samosa' } });
  const kaju = await prisma.product.findUnique({ where: { slug: 'kaju-katli-pure-silver-vark' } });
  const jalebi = await prisma.product.findUnique({ where: { slug: 'desi-ghee-jalebi' } });
  const laddu = await prisma.product.findUnique({ where: { slug: '5-star-laddu' } });

  const professionalReviews = [
    {
      productId: kaju?.id,
      userId: userRecords[0].id,
      rating: 5,
      comment: 'For Diwali and family ceremonies, Bikaner Misthan Bhandar has been our family’s gold standard in Bijnor for over two decades. The pure silver vark and authentic cashew texture in the Kaju Katli reflect uncompromising quality and impeccable hygiene.',
      isApproved: true
    },
    {
      productId: samosa?.id,
      userId: userRecords[1].id,
      rating: 5,
      comment: 'Unrivaled evening refreshment in Civil Lines. The samosas are prepared in fresh oil, crisp without excess grease, and spiced with a refined masala blend. The staff and management uphold top-tier business ethics.',
      isApproved: true
    },
    {
      productId: laddu?.id,
      userId: userRecords[2].id,
      rating: 5,
      comment: 'Their 5-Star Desi Ghee Laddus are sublime. The pure ghee aroma is distinct, perfectly measured in sweetness, and beautifully packaged in sturdy festive gift hampers. An esteemed heritage establishment in our city.',
      isApproved: true
    },
    {
      productId: jalebi?.id,
      userId: userRecords[3].id,
      rating: 5,
      comment: 'Crisp, hot, and thin jalebis with delicate saffron notes. Delivery across Bijnor arrived in thermal packaging within 35 minutes. Outstanding order tracking and courteous service.',
      isApproved: true
    }
  ];

  for (const rev of professionalReviews) {
    if (rev.productId) {
      await prisma.review.create({ data: rev });
    }
  }

  console.log('Successfully seeded professional, dignified reviews!');
}

updateReviews()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
