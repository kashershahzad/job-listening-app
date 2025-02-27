import { UserProvider } from "@/context/UserContext";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/app/components/Provider/ReactQueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JobConnect",
  description: "A job Listening app",
  icons: [
    { rel: "icon", url: "/logo.png" },
  ],
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReactQueryProvider>
          <UserProvider>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </UserProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
