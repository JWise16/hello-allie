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
  title: "Allie",
  description: "Your AI Voice Assistant",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJhMyAzIDAgMCAxIDMgM3Y2YTMgMyAwIDAgMS02IDBWNWEzIDMgMCAwIDEgMy0zeiIgZmlsbD0iI0ZGMDAzMyIvPgo8cGF0aCBkPSJNMTkgMTB2MmE3IDcgMCAwIDEtMTQgMHYtMmExIDEgMCAwIDEgMiAwdjJhNSA1IDAgMCAwIDEwIDB2LTJhMSAxIDAgMCAxIDIgMHoiIGZpbGw9IiNGRjAwMzMiLz4KPHBhdGggZD0iTTEyIDE4LjVhMSAxIDAgMCAxIDEgMXYyYTEgMSAwIDAgMS0yIDB2LTJhMSAxIDAgMCAxIDEtMXoiIGZpbGw9IiNGRjAwMzMiLz4KPC9zdmc+",
        type: "image/svg+xml",
      },
    ],
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
        {children}
      </body>
    </html>
  );
}
