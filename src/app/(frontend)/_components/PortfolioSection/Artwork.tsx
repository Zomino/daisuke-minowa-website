"use client";

import { AnimatePresence, motion } from "motion/react";
// 新しい Image の実装は、残念ながら blurDataURL に base64 の文字列しか受け付けず、URL は使えない。
// 今のところ、回避策を考えるほどの価値はない。
import Image from "next/legacy/image";
import { useEffect, useState } from "react";

import { type Artwork as PayloadArtwork, type Media } from "@/payload-types";

import ArtworkCarousel from "@/app/(frontend)/_components/PortfolioSection/ArtworkCarousel";

export type ArtworkItem = PayloadArtwork & { image: Media; blurDataURL?: string };

interface ArtworkProps extends React.ComponentProps<"div"> {
  artwork: ArtworkItem[];
}

export default function Artwork({ artwork, className, ...rest }: ArtworkProps) {
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
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
    setIsCarouselOpen(true);
  };

  return (
    <div
      className={`mt-10 columns-1 gap-4 space-y-4 md:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 ${className}`}
      {...rest}
    >
      <AnimatePresence>
        {isCarouselOpen && (
          <motion.div
            className="fixed inset-0 z-50 h-screen w-screen bg-black/70 backdrop-blur-md"
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <ArtworkCarousel
              artwork={artwork}
              onClose={() => setIsCarouselOpen(false)}
              startIndex={carouselStartIndex}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {artwork.map((a, index) => (
        <button
          key={a.id}
          type="button"
          className="group relative block w-full overflow-hidden shadow-[0_18px_40px_-18px_rgba(0,0,0,0.45)] hover:cursor-pointer"
          onClick={() => handleImageClick(index)}
        >
          <Image
            className="transition duration-300 group-hover:brightness-50 group-focus-visible:brightness-50"
            src={a.image.sizes?.display?.url || ""}
            alt={a.image.alt || a.title}
            width={a.image.sizes?.display?.width ?? undefined}
            height={a.image.sizes?.display?.height ?? undefined}
            quality={90}
            placeholder={a.blurDataURL ? "blur" : "empty"}
            blurDataURL={a.blurDataURL}
            // sizes はグリッドのメディアクエリに合わせる。
            // Next.js が画像の読み込みを最適化するための、おおよその値。
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            <span className="text-white">{a.title}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
