import "../assets/icon/fontawesome/css/all.min.css";
import "./globals.css";
import "./grid.css";
import "./customSwiper.css";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Providers } from "@/lib/Providers";

import { Inter } from "next/font/google";
import ToastProvider from "@/toast/ToastProvider";

// const ReduxProvider = dynamic(() => import("../lib/Providers.jsx"), {
//   ssr: false,
// });

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ToastProvider>
            <Header />
          </ToastProvider>
          <div className="home grid wide">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
