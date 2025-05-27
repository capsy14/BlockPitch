import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata = {
  title: "BlockPitch - Crypto Investment Platform",
  description: "Connect startups and investors in the blockchain space",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

