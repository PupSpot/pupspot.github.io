import type { Metadata } from "next";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from './providers';

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
    title: "PupSpot",
    description: "Join the community of dog lovers. Connect, share, and explore with your furry friends. Join Now",
    keywords: "dogs, dog lovers, social platform, pets, community",
    authors: [{ name: "PupSpot Team" }],
    robots: "index, follow",
    openGraph: {
        title: "PupSpot",
        description: "Join the community of dog lovers. Connect, share, and explore with your furry friends. Join Now",
        url: "https://www.pupspot.com",
        type: "website",
        images: [
            {
                url: "https://www.pupspot.com/pawicon.png",
                width: 800,
                height: 600,
                alt: "PupSpot Logo",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        site: "@pupspot",
        title: "PupSpot",
        description: "Join the community of dog lovers. Connect, share, and explore with your furry friends. Join Now",
        images: ["https://www.pupspot.com/pawicon.jpg"]
    },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}