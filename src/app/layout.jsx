import "../assets/icon/fontawesome/css/all.min.css";
import "./globals.css";
import "./grid.css";
import "./customSwiper.css";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Providers } from "@/lib/Providers";

import { Inter } from "next/font/google";

export const metadata = {
  title: "Xem phim HD",
  description: "Trang web Xem phim HD cung cấp phim nước ngoài hay!",
};

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <div className="home grid wide">{children}</div>
          <Footer />
        </body>
      </html>
    </Providers>
  );
}
