import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/providers/AppProviders";
import { Navbar } from "@/shared/components/layout/Navbar";
import { FeaturesSection } from "@/shared/components/layout/FeaturesSection";
import { Footer } from "@/shared/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreshCart - Your Online Store",
  description: "FreshCart - Your one-stop shop for all your needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <AppProviders>
          <Navbar />
          <main className="min-h-screen pt-24 md:pt-16 ">
            {children}
          </main>
          <FeaturesSection />
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}

