import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ConvexClientProvider from "./ConvexProvider";
import NavBar from "./NavBar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Converter img",
  description: "Converter imagem ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <ConvexClientProvider>
          <NavBar/>
          {children}
          </ConvexClientProvider>
      </body>
    </html>
  );
}
