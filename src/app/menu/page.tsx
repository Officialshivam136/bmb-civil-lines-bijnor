import { prisma } from "@/lib/prisma";
import MenuExplorer from "@/components/menu/MenuExplorer";
import OffersSection from "@/components/home/OffersSection";

export default async function MenuPage() {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
    include: {
      products: {
        where: { isActive: true },
        include: { 
          variants: true,
          images: true 
        }
      }
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-2">
          Our Authentic Mithai & Snacks Menu
        </h1>
        <p className="text-sm text-foreground/75 max-w-2xl">
          Order traditional pure desi ghee mithai, Bengali sweets, dry fruit sweets & hot samosas freshly prepared at Bikaner Misthan Bhandar, Civil Lines, Bijnor.
        </p>
      </div>

      {/* Promotional Offers Strip */}
      <div className="-mx-4 mb-6">
        <OffersSection />
      </div>

      {/* Interactive Quick-Access Menu Explorer */}
      <MenuExplorer categories={categories as any} />
    </div>
  );
}
