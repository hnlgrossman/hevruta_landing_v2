// import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "../scss/main.scss";
import "../scss/home.scss";
import "../scss/item.scss";
import Footer from "../components/Footer";
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTopButton from '../components/ScrollToTopButton';
import Script from 'next/script';
import UserTracker from '@/components/UserTracker';

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
        <UserTracker />
        <Script src="https://cdn.enable.co.il/licenses/enable-L2556825acdsy3oi-0424-69920/init.js" />
        
        {/* Meta Pixel Code */}
        <Script id="facebook-pixel">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1380261343172555');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1380261343172555&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </body> 
    </html>
  );
}
