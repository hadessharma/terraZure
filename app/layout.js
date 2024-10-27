import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";
import Navbar from "@/components/nav/navbar";
import AuthProvider from "@/lib/session-provider";
import StoreProvider from "@/lib/redux/storeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Azure Terraform",
  description: "A web app to create cloud resources using terraform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <StoreProvider>
            <Navbar />
            <main>{children}</main>
            <Toaster />
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
