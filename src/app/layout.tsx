import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "../scss/main.scss";
import "../scss/item.scss";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Simple Item Catalog",
  description: "A simple Next.js app with a home page and item pages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
