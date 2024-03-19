import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.scss";
import { Suspense } from 'react';

const font = Montserrat({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Emaxski",
  description: "Emaxski - лыжные объявления.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <html lang="en">
        <body className={font.className} style={font.style}>{children}</body>
      </html>
    </Suspense>
  );
}
