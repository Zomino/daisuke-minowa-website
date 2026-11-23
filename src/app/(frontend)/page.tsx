import Image from "next/image";

import heroImage from "@/app/(frontend)/_images/hero.jpg";

import Nav from "@/app/(frontend)/_components/Nav/Nav";
import PortfolioSection from "@/app/(frontend)/_components/PortfolioSection/PortfolioSection";

export default function Page() {
  return (
    <>
      {/* 白い枠は、写真のまわりに見える壁の余白。svh にして、スマホのアドレスバーで下が隠れないようにする。 */}
      <header className="relative h-svh overflow-hidden border-16 border-wall md:border-32">
        <Image
          alt="Hero background image" // Next.js の Image では必須の項目。
          aria-hidden // 飾りの画像なので、支援技術からは隠す。代替テキストがページに出てしまうのも防ぐ。
          className="absolute inset-0 object-cover md:object-[50%_30%]"
          fill // fill にすると、幅と高さを指定しなくてもレイアウトのずれを防げる。
          placeholder="blur" // 読み込み中はぼかした画像を出して、なめらかに表示する。
          priority // この画像はすぐに読み込む。
          src={heroImage} // 読み込んだ画像をそのまま src に渡す。Next.js が正しく最適化できるようにするため。
        />
        {/* 上のナビと下の名前が、路地の明るい所でも読めるよう、上端と下端だけ暗くする。 */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(rgb(0_0_0/0.6)_0,rgb(0_0_0/0.4)_60px,transparent_170px,transparent_64%,rgb(0_0_0/0.5)_81%,rgb(0_0_0/0.65)_100%)]"
        />
        {/* PC では人影をはさんで左右に、スマホでは足元に2段で置く。 */}
        <h1 className="absolute inset-x-0 bottom-16 flex flex-col items-center text-4xl leading-snug font-medium tracking-[0.16em] text-wall uppercase md:bottom-18 md:flex-row md:text-[clamp(2.25rem,3.9vw,4rem)]">
          <span className="md:flex-1 md:text-center">Daisuke</span>{" "}
          <span className="md:flex-1 md:text-center">Minowa</span>
        </h1>
        <Nav className="absolute inset-x-0 top-0 text-wall" />
      </header>
      <main className="px-4 pt-18 md:px-8 md:pt-24">
        <PortfolioSection />
      </main>
    </>
  );
}
