import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AddItemProvider } from "../context/addItemContext";
import { Toaster } from "../components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Blanco, Get your money right!",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AddItemProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}>
          {children}
          <Toaster position={`top-right`} closeButton />
        </body>
      </AddItemProvider>
    </html>
  );
}
