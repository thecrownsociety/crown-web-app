import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Provider";
import Navbar from "@/components/Navbar";
import TradingViewWidget from "@/components/TradingViewWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Crown Society",
  description: "The Crown Society",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <TradingViewWidget />
          {children}
        </Providers>
      </body>
    </html>
  );
}
