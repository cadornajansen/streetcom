import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import ReactQueryProvider from "@/utils/providers/ReactQueryProvider";
import "./globals.css";

import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Streetcom",
  description: "Your One Stop Shop for All Streetwear Clothes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased mx-24",
          fontSans.variable
        )}
      >
        <ReactQueryProvider>
          <Header />
          {children}
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
