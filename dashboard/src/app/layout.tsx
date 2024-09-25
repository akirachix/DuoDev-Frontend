import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Eco-Threads Hub",
  description: "Online Marketplace for Recycled Products",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next18", "pwa", "next-pwa"],
  authors: [
    {
      name: "Ronald Mcgarret",
      url: "https://www.linkedin.com/in/ronald-mcgarret/",
    },
    {
      name: "Hosewell Karanja",
      url: "https://www.linkedin.com/in/hosewell-karanja-47750a316/"
    }
  ],
  icons: [
    { rel: "apple-touch-icon", url: "/ecohublogo.svg"  },
    { rel: "icon", url: "/ecohublogo.svg" },
  ],
  };


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
