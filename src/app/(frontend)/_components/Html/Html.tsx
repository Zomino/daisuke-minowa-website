import { Shippori_Mincho } from "next/font/google";

// ビルドのときに取得してサイトに同梱するので、閲覧者のブラウザは Google に接続しない。
const mincho = Shippori_Mincho({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-shippori",
  // 日本語の書体は細かく分かれたファイルが多く、先読みすると70以上を読み込んでしまう。
  // 先読みしなければ、ページで使う文字を含むファイルだけをブラウザが取りに行く。
  preload: false,
});

export default function Html({ children }: { children: React.ReactNode }) {
  return (
    <html
      // 固定ナビに隠れないよう、ナビの高さに左右の余白と同じ空き（スマホ 16px、PC 32px）を足してスクロールを止める。
      // ナビの高さは、スマホでは2段で 124px、PC では 76px。
      className={`${mincho.variable} scroll-pt-35 scroll-smooth bg-wall font-mincho text-ink md:scroll-pt-27`}
      data-scroll-behavior="smooth"
      lang="en"
    >
      {children}
    </html>
  );
}
