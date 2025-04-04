import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Sidebar from "./_components/sidebar";
import { Toaster } from "sonner";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stocky",
  description: "Stocky, Smart Manager your stocks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${montserrat.className} antialiased`}>
        <div className="flex gap-8">
          <Sidebar />
          {children}
          <Toaster position="bottom-right" duration={2000} />
        </div>
      </body>
    </html>
  );
}
