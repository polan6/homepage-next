
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
// Prevent fontawesome from dynamically adding its css since we did it manually above
config.autoAddCss = false

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/component/assets/Header";
import Footer from "@/component/assets/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Polanのホームページ",
  description: "このサイトはPolanのホームページです",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
				<Header/>
				{children}
				<Footer/>
      </body>
    </html>
  );
}
