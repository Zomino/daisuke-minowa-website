import Image from "next/image";

import heroImage from "@/app/(frontend)/_images/hero.jpg";

import Nav from "@/app/(frontend)/_components/Nav/Nav";
import PortfolioSection from "@/app/(frontend)/_components/PortfolioSection/PortfolioSection";

export default function Page() {
  return (
    <>
      <header className="relative h-screen">
        <Image
          alt="Hero background image" // Next.js の Image では必須の項目。
          aria-hidden // 飾りの画像なので、支援技術からは隠す。代替テキストがページに出てしまうのも防ぐ。
          className="absolute inset-0 object-cover"
          fill // fill にすると、幅と高さを指定しなくてもレイアウトのずれを防げる。
          placeholder="blur" // 読み込み中はぼかした画像を出して、なめらかに表示する。
          priority // この画像はすぐに読み込む。
          src={heroImage} // 読み込んだ画像をそのまま src に渡す。Next.js が正しく最適化できるようにするため。
        />
        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center text-4xl font-extralight tracking-widest text-white uppercase drop-shadow-lg md:text-5xl">
          Daisuke Minowa
        </h1>
        <Nav className="absolute inset-x-0 top-0 text-wall" />
      </header>
      <main className="px-4 sm:px-6 md:px-8">
        <div className="mt-28">
          <PortfolioSection />
        </div>
      </main>
    </>
  );
}
