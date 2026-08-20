import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "../context/AuthContext";
import ReduxProvider from "../providers/ReduxProviders";
import AuthInitializer from "@/components/AuthInitializer";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CustomerCRM",
  description: "AI-powered CRM platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="relative overflow-x-hidden bg-black text-white">
        <ReduxProvider>
          <AuthInitializer>
            <AuthProvider>
              {/* Background Effects */}
              <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="gold-glow glow-one" />
                <div className="gold-glow glow-two" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.08),transparent_35%)]" />

                <div className="absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent blur-[1px]" />
              </div>

              <Navbar />

              <div className="relative z-0">{children}</div>

              <Footer />
            </AuthProvider>
          </AuthInitializer>
        </ReduxProvider>
      </body>
    </html>
  );
}
