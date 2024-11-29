import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chronolens",
  description: "The web-based app",
};

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.className}>
      <body className="overflow-hidden">{children}</body>
    </html>
  );
}
