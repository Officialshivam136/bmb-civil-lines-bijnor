import Link from 'next/link';
import { MapPin, Phone, Clock, Smartphone, Download } from 'lucide-react';
import BMBLogo from '@/components/common/BMBLogo';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border pt-12 pb-24 md:pb-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          {/* Official BMB Logo in Footer */}
          <div className="mb-4">
            <BMBLogo size="lg" />
          </div>

          <p className="text-sm text-foreground/80 mb-5 max-w-sm leading-relaxed">
            Authentic, pure desi ghee traditional mithai, hot samosas & celebration treats delivered fresh right to your doorstep across Bijnor.
          </p>

          {/* Android App Download Banner */}
          <div className="mb-6 p-4 rounded-2xl bg-primary/5 border border-primary/20 max-w-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-xs text-foreground block">BMB Android App</span>
                <span className="text-[10px] text-foreground/60">Order faster with 1-click install</span>
              </div>
            </div>
            <a
              href="/bmb-misthan-bijnor.apk"
              download="bmb-misthan-bijnor.apk"
              className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white font-bold px-3 py-1.5 rounded-lg text-xs shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> APK
            </a>
          </div>

          <div className="space-y-2.5 text-xs text-foreground/80">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 shrink-0 text-primary mt-0.5" />
              <span>1101, Civil Lines, Opposite Classic Bar, Punjabi Colony, Nai Basti, Bijnor, Uttar Pradesh 246701</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 shrink-0 text-primary" />
              <span>+91 89791 64646 (Orders & WhatsApp)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 shrink-0 text-primary" />
              <span>Open Daily: 10:00 AM – 10:00 PM</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-sm text-foreground uppercase tracking-wider mb-4">Quick Navigation</h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link href="/" className="text-foreground/80 hover:text-primary transition-colors">Home Storefront</Link></li>
            <li><Link href="/menu" className="text-foreground/80 hover:text-primary transition-colors">Complete Menu</Link></li>
            <li><Link href="/cart" className="text-foreground/80 hover:text-primary transition-colors">Shopping Cart</Link></li>
            <li><Link href="/track-order" className="text-foreground/80 hover:text-primary transition-colors">Live Order Tracking</Link></li>
            <li><Link href="/qr-order" className="text-foreground/80 hover:text-primary transition-colors">⚡ Counter QR & Dine-in</Link></li>
            <li><Link href="/account" className="text-foreground/80 hover:text-primary transition-colors">Patron Account</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm text-foreground uppercase tracking-wider mb-4">Customer Care</h4>
          <ul className="space-y-2.5 text-xs">
            <li><a href="https://maps.google.com/?q=Bikaner+Misthan+Bhandar+Civil+Lines+Bijnor" target="_blank" rel="noreferrer" className="text-foreground/80 hover:text-primary transition-colors">Google Maps Directions</a></li>
            <li><a href="https://wa.me/918979164646" target="_blank" rel="noreferrer" className="text-foreground/80 hover:text-primary transition-colors">WhatsApp Direct Support</a></li>
            <li><span className="text-foreground/60">Express 30–45 Min Bijnor Delivery</span></li>
            <li><span className="text-foreground/60">Tamper-Proof Hygienic Packaging</span></li>
            <li>
              <a href="/bmb-misthan-bijnor.apk" download className="text-primary font-bold hover:underline">
                Download Android Mobile App (.apk)
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-foreground/60 gap-4">
        <div>
          &copy; {new Date().getFullYear()} BMB — Bikaner Misthan Bhandar, Civil Lines, Bijnor. All rights reserved.
        </div>
        <div className="flex gap-4">
          <span>Pure Desi Ghee Sweetmaker</span>
          <span>•</span>
          <span>Bijnor, U.P.</span>
        </div>
      </div>
    </footer>
  );
}
