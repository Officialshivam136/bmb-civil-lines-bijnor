import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Star, MapPin, Clock, Truck, Phone, Sparkles } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import HeroSection from "@/components/home/HeroSection";
import TrustSection from "@/components/home/TrustSection";
import OffersSection from "@/components/home/OffersSection";
import MenuExplorer from "@/components/menu/MenuExplorer";

export default async function Home() {
  const shopSettings = await prisma.shopSettings.findFirst();
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

  const featuredProducts = await prisma.product.findMany({
    where: { isActive: true, isFeatured: true },
    include: { variants: true, images: true },
    take: 8
  });

  const reviews = await prisma.review.findMany({
    where: { isApproved: true },
    include: { user: true, product: true },
    take: 4
  });

  return (
    <div className="flex flex-col gap-12 pb-16">
      {/* Animated Hero Section with Framer Motion */}
      <HeroSection shopName={shopSettings?.shopName || "Bikaner Misthan Bhandar"} />

      {/* Shop Information Bar */}
      <section className="container mx-auto px-4">
        <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 shadow-md -mt-14 relative z-20 flex flex-wrap justify-between items-center gap-6">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-primary mb-1">
              {shopSettings?.shopName || "Bikaner Misthan Bhandar"}
            </h2>
            <div className="flex items-center gap-2 text-sm text-foreground/70">
              <div className="flex items-center gap-1 bg-amber-500/10 text-amber-700 px-2 py-0.5 rounded text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>4.8</span>
              </div>
              <span className="text-xs font-medium text-foreground/70">Civil Lines Outlet, Bijnor</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-6 text-sm text-foreground/80">
            <a 
              href={shopSettings?.googleMapsUrl || "https://maps.google.com/?q=Bikaner+Misthan+Bhandar+Civil+Lines+Bijnor"} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold block text-[11px] text-foreground/50">LOCATION</span>
                <span className="font-medium text-xs md:text-sm">Civil Lines, Bijnor</span>
              </div>
            </a>

            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold block text-[11px] text-foreground/50">TIMINGS</span>
                <span className="font-medium text-xs md:text-sm">{shopSettings?.openingHours || "10:00 AM - 10:00 PM"}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold block text-[11px] text-foreground/50">DELIVERY</span>
                <span className="font-medium text-xs md:text-sm">Bijnor (30-45 Mins)</span>
              </div>
            </div>

            <a href={`tel:${shopSettings?.phone || "+918979164646"}`} className="flex items-center gap-2 hover:text-primary transition-colors">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold block text-[11px] text-foreground/50">CALL / WHATSAPP</span>
                <span className="font-medium text-xs md:text-sm">{shopSettings?.phone}</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Promotional Offers & Coupons */}
      <OffersSection />

      {/* Explore Categories */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Explore Sweet Categories</h2>
            <p className="text-sm text-foreground/60 mt-1">Authentic Pure Desi Ghee Mithai, Namkeen & Savouries</p>
          </div>
          <Link href="/menu" className="text-primary font-semibold hover:underline text-sm">
            View All Sweets &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/menu#category-${category.slug}`}
              className="group block overflow-hidden rounded-2xl bg-surface border border-border shadow-sm hover:border-primary/50 transition-all hover:shadow-md"
            >
              <div className="aspect-[4/3] bg-border/20 w-full relative overflow-hidden">
                {category.image ? (
                  <Image 
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-primary/20 group-hover:scale-105 transition-transform duration-300">
                    <span className="text-4xl">🍬</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-bold text-base md:text-lg group-hover:text-[#fcd34d] transition-colors drop-shadow-sm">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Single-Page Complete Menu like Tularam Restaurant (#menu) */}
      <section id="menu" className="container mx-auto px-4 scroll-mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-3 border-b border-border">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Civil Lines Counter & Doorstep Delivery Menu</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">
              Complete Traditional Mithai & Savouries Menu
            </h2>
            <p className="text-xs sm:text-sm text-foreground/70 mt-1 max-w-xl">
              Choose your portion (250g, 500g, 1kg or pieces) and tap &quot;ADD&quot; for instant cart addition.
            </p>
          </div>
          <Link
            href="/menu"
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1 shrink-0"
          >
            Open Dedicated Menu Page &rarr;
          </Link>
        </div>

        <MenuExplorer categories={categories as any} />
      </section>

      {/* Dignified Professional Reviews */}
      <section className="bg-surface border-y border-border py-14">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-700 px-3.5 py-1 rounded-full text-xs font-bold mb-3">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Patron Testimonials</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              What Respected Citizens of Bijnor Say
            </h2>
            <p className="text-sm text-foreground/70 mt-2">
              Words of appreciation from doctors, advocates, and families who rely on our purity and heritage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-background border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs md:text-sm text-foreground/80 italic leading-relaxed mb-4">
                    "{rev.comment}"
                  </p>
                </div>
                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm block text-foreground">
                      {rev.user.name || "Esteemed Patron"}
                    </span>
                    <span className="text-[11px] text-foreground/50">
                      Civil Lines, Bijnor • Verified {rev.product.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Framer Animated Trust Section */}
      <TrustSection />
    </div>
  );
}
