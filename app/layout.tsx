import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
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
        className={`${plusJakartaSans.variable} font-sans antialiased`}
      >
        <Navbar />
        <div className="px-4 sm:px-8 lg:px-48">
          {children}
        </div>
      </body>
    </html>
  );
}

function Navbar() {
  return (
    <div className="navbar bg-base-100 border-b border-base-300 px-4 sm:px-8 lg:px-48">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Fake Mailbox
        </Link>
      </div>
    </div>
  )
}