import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProviders from "@/lib/ReactQueryProvider";
import { AuthProvider } from "@/utils/store/authStore";
import Header from "@/components/custom/header/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TaskPilot",
  description: "Task Manager Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ReactQueryProviders>
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
