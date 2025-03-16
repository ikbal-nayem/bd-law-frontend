import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bangladesh Constitution Law",
  description: "AI-powered assistant for Bangladesh Constitution Law",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<html lang="en">
  <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}>
    <header className="bg-blue-600 text-white p-4 sm:p-6 shadow-md">
      <div className="container mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold">Bangladesh Constitution Law Assistant</h1>
      </div>
    </header>
    <main className="container mx-auto p-4 sm:p-6">
      {children}
    </main>
  </body>
</html>
  );
}
