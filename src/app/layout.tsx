import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cornell FinTech Club",
  description:
    "Empowering the future of finance through technology. Cornell University's premier undergraduate fintech organization.",
  openGraph: {
    title: "Cornell FinTech Club",
    description:
      "Empowering the future of finance through technology. Cornell University's premier undergraduate fintech organization.",
    url: "https://fintech-website-pied.vercel.app",
    siteName: "Cornell FinTech Club",
    images: [
      {
        url: "https://fintech-website-pied.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cornell FinTech Club",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cornell FinTech Club",
    description:
      "Empowering the future of finance through technology. Cornell University's premier undergraduate fintech organization.",
    images: ["https://fintech-website-pied.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
