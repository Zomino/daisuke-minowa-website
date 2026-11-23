"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { type Artwork as PayloadArtwork, type Media } from "@/payload-types";

import ArtworkCarousel from "@/app/(frontend)/_components/PortfolioSection/ArtworkCarousel";

export type ArtworkItem = PayloadArtwork & { image: Media; blurDataURL?: string };

interface ArtworkProps extends React.ComponentProps<"div"> {
  artwork: ArtworkItem[];
}

export default function Artwork({ artwork, className = "", ...rest }: ArtworkProps) {
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [isCarouselClosing, setIsCarouselClosing] = useState(false);
  const [carouselStartIndex, setCarouselStartIndex] = useState(0);

  // カルーセルを開いている間は、ページのスクロールを止める。
  // カルーセルが使われる場所に依存しないよう、カルーセルの部品ではなく、ここで行う。
  useEffect(() => {
    if (isCarouselOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCarouselOpen]);

  const handleImageClick = (index: number) => {
    setCarouselStartIndex(index);
    setIsCarouselClosing(false);
    setIsCarouselOpen(true);
  };

  // 消えるアニメーションのあいだは表示しておき、背景のトランジションが終わってから取り除く。
  // 中の要素のトランジションも伝わってくるので、背景そのもののときだけ扱う。
  const handleOverlayTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (isCarouselClosing && event.target === event.currentTarget) {
      setIsCarouselOpen(false);
    }
  };

  return (
    <div className={`columns-1 gap-4 space-y-4 md:columns-2 lg:columns-3 ${className}`} {...rest}>
      {isCarouselOpen && (
        <div
          className={`fixed inset-0 z-50 h-screen w-screen bg-black/70 backdrop-blur-md transition duration-300 starting:scale-95 starting:opacity-0 ${isCarouselClosing ? "pointer-events-none scale-95 opacity-0" : ""}`}
          onTransitionEnd={handleOverlayTransitionEnd}
        >
          <ArtworkCarousel
            artwork={artwork}
            onClose={() => setIsCarouselClosing(true)}
            startIndex={carouselStartIndex}
          />
        </div>
      )}
      {artwork.map((a, index) => (
        <button
          key={a.id}
          type="button"
          className="group relative block w-full overflow-hidden hover:cursor-pointer"
          onClick={() => handleImageClick(index)}
        >
          <Image
            className="h-auto w-full transition duration-300 group-hover:brightness-50 group-focus-visible:brightness-50"
            src={a.image.sizes?.display?.url || ""}
            alt={a.image.alt || a.title}
            width={a.image.sizes?.display?.width ?? undefined}
            height={a.image.sizes?.display?.height ?? undefined}
            quality={90}
            placeholder={a.blurDataURL ? "blur" : "empty"}
            blurDataURL={a.blurDataURL}
            // sizes はグリッドのメディアクエリに合わせる。
            // Next.js が画像の読み込みを最適化するための、おおよその値。
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            <span className="text-lg text-white">{a.title}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
