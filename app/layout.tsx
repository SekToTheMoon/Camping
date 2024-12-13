import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Providers from "./Providers";
import { ClerkProvider } from "@clerk/nextjs";
import { Noto_Sans_Thai } from "next/font/google";

const Thai = Noto_Sans_Thai({
  weight: "400",
  subsets: ["thai"],
});

export const metadata: Metadata = {
  title: "Camping",
  description: "find camping place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${Thai.className} antialiased`}>
          <Providers>
            <Navbar />
            <main className="container">{children}</main>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
