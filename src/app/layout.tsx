import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.scss";

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
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
