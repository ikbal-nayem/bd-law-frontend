import React from "react";
import "@/styles/globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bangladesh Constitution Assistant",
  description: "Get answers about the Constitution of Bangladesh",
  generator: "By Ikbal Nayem",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
        <Script type="module" src="https://md-block.verou.me/md-block.js" strategy="lazyOnload"/>
      </body>
    </html>
  );
}
