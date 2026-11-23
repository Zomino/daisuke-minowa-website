import { Analytics } from "@vercel/analytics/next";
import { type Metadata, type Viewport } from "next";
import { Shippori_Mincho } from "next/font/google";

import "@/app/(frontend)/globals.css";

// ビルドのときに取得してサイトに同梱するので、閲覧者のブラウザは Google に接続しない。
const mincho = Shippori_Mincho({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-shippori",
  // 日本語の書体は細かく分かれたファイルが多く、先読みすると70以上を読み込んでしまう。
  // 先読みしなければ、ページで使う文字を含むファイルだけをブラウザが取りに行く。
  preload: false,
});

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
      // 固定ナビに隠れないよう、ナビの高さだけ余白をとってスクロールを止める。スマホではナビが2段になる。
      className={`${mincho.variable} scroll-pt-32 scroll-smooth bg-wall font-mincho text-ink md:scroll-pt-22`}
      data-scroll-behavior="smooth"
      lang="en"
    >
      {/* 中身が短いページでも、フッターが画面の下に来るようにする。 */}
      <body className="flex min-h-svh flex-col">
        {children}
        <footer className="mt-15 flex flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm text-muted md:p-8">
          <p>
            &copy; <time dateTime={year.toString()}>{year}</time> Daisuke Minowa
          </p>
          <a
            className="flex min-h-11 items-center hover:text-ink"
            href="https://www.instagram.com/daisuke_minowa"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
