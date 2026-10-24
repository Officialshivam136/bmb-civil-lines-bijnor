const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding initial data...')

  // 1. Create Settings
  await prisma.shopSettings.create({
    data: {
      shopName: 'Bikaner Misthan Bhandar',
      phone: '+91 89791 64646',
      whatsapp: '+91 89791 64646',
      address: '1101, Civil Lines, opposite Classic Bar, Punjabi Colony, Nai Basti, Bijnor, Uttar Pradesh 246701'
    }
  })

  // 2. Create Categories
  const categories = [
    { name: 'Snacks & Chaat', slug: 'snacks-chaat', sortOrder: 1 },
    { name: 'Traditional Mithai', slug: 'traditional-mithai', sortOrder: 2 },
    { name: 'Kaju & Dry Fruits', slug: 'kaju-dry-fruits', sortOrder: 3 },
    { name: 'Barfi & Milk Sweets', slug: 'barfi-milk-sweets', sortOrder: 4 },
    { name: 'Laddu', slug: 'laddu', sortOrder: 5 },
    { name: 'Special Items', slug: 'special-items', sortOrder: 6 },
    { name: 'Cakes', slug: 'cakes', sortOrder: 7 }
  ]

  const categoryMap = {}
  for (const cat of categories) {
    const created = await prisma.category.create({ data: cat })
    categoryMap[cat.slug] = created.id
  }

  // 3. Create Products and Variants
  // Helper to create product
  const createProduct = async (catSlug, name, isAvailable = true) => {
    const slug = name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and')
    return prisma.product.create({
      data: {
        name,
        slug,
        categoryId: categoryMap[catSlug],
        isActive: isAvailable
      }
    })
  }

  // Helper to create variant
  const createVariant = async (productId, weight, price) => {
    return prisma.productVariant.create({
      data: {
        productId,
        weight,
        price,
        stock: 100, // Default for now
        isActive: true
      }
    })
  }

  // Snacks
  const samosa = await createProduct('snacks-chaat', 'Samosa')
  await createVariant(samosa.id, '1 piece', 22)
  const dhokla = await createProduct('snacks-chaat', 'Dhokla')
  await createVariant(dhokla.id, '500g', 170)

  // Mithai
  const rasbhari = await createProduct('traditional-mithai', 'Rasbhari')
  await createVariant(rasbhari.id, '250g', 110)
  const jalebi = await createProduct('traditional-mithai', 'Jalebi')
  await createVariant(jalebi.id, '250g', 81)
  const kalajamun = await createProduct('traditional-mithai', 'Kala Jamun')
  await createVariant(kalajamun.id, '250g', 130)
  const rasgulla = await createProduct('traditional-mithai', 'Rasgulla')
  await createVariant(rasgulla.id, '250g', 130)
  
  const malaiChap = await createProduct('special-items', 'Malai Chap')
  await createVariant(malaiChap.id, '250g', 175)
  const fiveStarLaddu = await createProduct('laddu', '5 Star Laddu')
  await createVariant(fiveStarLaddu.id, '250g', 430)

  // Add items without prices to let admin configure them
  const kajuKatli = await createProduct('kaju-dry-fruits', 'Kaju Katli')
  await prisma.product.update({ where: { id: kajuKatli.id }, data: { priceConfigured: false } })
  
  console.log('Seed completed successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
