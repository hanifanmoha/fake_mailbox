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
  title: "Fake Mailbox",
  description: "Fake mail app for testing purpose",
  icons: {
    icon: '/mailbox.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <div className="px-48">
          {children}
        </div>
      </body>
    </html>
  );
}

function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm px-48">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Fake Mailbox</a>
      </div>
    </div>
  )
}