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
      // 固定ナビに隠れないよう、ナビの高さだけ余白をとってスクロールを止める。スマホではナビが2段になる。
      className={`${mincho.variable} scroll-pt-32 scroll-smooth bg-wall font-mincho text-ink md:scroll-pt-22`}
      data-scroll-behavior="smooth"
      lang="en"
    >
      {children}
    </html>
  );
}
