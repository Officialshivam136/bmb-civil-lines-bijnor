import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import MembershipBanner from "@/components/layout/MembershipBanner";
import ClientProviders from "@/components/ClientProviders";
import FloatingCartBar from "@/components/menu/FloatingCartBar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bikaner Misthan Bhandar - Bijnor | Pure Desi Ghee Mithai & Snacks",
  description: "Fresh Pure Desi Ghee Mithai & Snacks, Delivered to Your Door in Civil Lines & Across Bijnor.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('bmb_theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && prefersDark) || (saved === 'system' && prefersDark)) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200">
        <ClientProviders>
          <MembershipBanner />
          <Header />
          <main className="flex-grow pb-16 md:pb-0">{children}</main>
          <Footer />
          <FloatingCartBar />
          <MobileNav />
        </ClientProviders>
      </body>
    </html>
  );
}
