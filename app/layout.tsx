import { CartProvider } from "../context/CartContext";
import { Poppins } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";

/*
Import de la police Poppins
et définition du type children pour TypeScript
*/

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "MHDS SHOP",
  description: "Boutique e-commerce moderne",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={poppins.className}>

      <CartProvider>

      {children}

      </CartProvider>

      </body>
    </html>
  );
}