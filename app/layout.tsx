import { CartProvider } from "../context/CartContext";
import { Poppins } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";
import WhatsAppButton from "../components/WhatsAppButton";
import { WishlistProvider } from "../context/WishlistContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400","500","600","700"],
});

export const metadata = {
  title: "MHDS SHOP",
  description: "Boutique e-commerce moderne",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}:{
  children: ReactNode;
}){

  return (

    <html lang="fr">

      <body className={poppins.className}>

        <CartProvider>
        <WishlistProvider> 

          {children}

        </WishlistProvider> 
        </CartProvider>

        <WhatsAppButton/>

      </body>

    </html>

  );

}