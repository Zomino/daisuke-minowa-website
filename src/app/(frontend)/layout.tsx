import { Analytics } from "@vercel/analytics/next";
import { type Metadata, type Viewport } from "next";

import "@/app/(frontend)/globals.css";
export const metadata: Metadata = {
  title: "Daisuke Minowa",
  description:
    "The website of Daisuke Minowa, a London-based Japanese artist. Here you find a list of my recent and previous artwork.",
  keywords: "art, painting, illustration, portfolio, japanese artist, london artist",
  authors: [{ name: "Zou Minowa", url: "https://github.com/Zomino" }],
  creator: "Zou Minowa",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // サーバーで描画するので、表示のたびに値が変わることはない。
  // oxlint-disable-next-line react/purity
  const year = new Date().getFullYear();

  return (
    <html
      className="scroll-pt-22 scroll-smooth bg-white font-arial text-black"
      data-scroll-behavior="smooth"
      lang="en"
    >
      <body>
        {children}
        <footer className="mt-15">
          <p className="text-center text-xs md:text-sm">
            &copy; <time dateTime={year.toString()}>{year}</time> Daisuke Minowa. All rights
            reserved.
          </p>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
