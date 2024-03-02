import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/components/providers/query-provider";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "StudySpeak",
  description: "A tool to quickly make and study flashcards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <QueryProvider>
          <Navbar />
          <main className="pt-24 h-full">{children}</main>
          <Toaster richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
