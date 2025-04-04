// import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "../scss/main.scss";
import "../scss/home.scss";
import "../scss/item.scss";
import Footer from "../components/Footer";
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTopButton from '../components/ScrollToTopButton';
import Script from 'next/script';

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

// export const metadata: Metadata = {
//   title: "Simple Item Catalog",
//   description: "A simple Next.js app with a home page and item pages",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.className}`}>
        <main>{children}</main>
        <Footer />
        <ScrollToTopButton />
        <WhatsAppButton />
        <Script src="https://cdn.enable.co.il/licenses/enable-L2556825acdsy3oi-0424-69920/init.js" />
      </body> 
    </html>
  );
}
