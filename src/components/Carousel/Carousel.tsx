"use client";

import useEmblaCarousel from "embla-carousel-react";
import { type JSX, useCallback, useEffect, useState } from "react";

import CarouselButton from "@/components/Carousel/CarouselButton";

// 型として使えるよう、undefined を除く必要がある。
type EmblaOptions = Exclude<Parameters<typeof useEmblaCarousel>[0], undefined>;

// CarouselBag は、カルーセルを操作するための関数と状態をまとめたもの。
// Formik が子の描画関数に渡す、関数と状態のまとまり（bag）を参考にしている。
interface CarouselBag {
  scrollNext: () => void;
  scrollPrev: () => void;
  close: () => void;
  toggleFullScreen: () => void;
  isFullScreen: boolean;
}

interface CarouselProps<T> extends Omit<EmblaOptions, "startIndex"> {
  children: (item: T, index: number, carouselBag: CarouselBag) => number | string | JSX.Element;
  className?: string;
  items: T[];
  onClose?: () => void;
  startIndex?: number; // カルーセルを開いたときに最初に出す番号（省略可）
}

export default function Carousel<T>({
  children,
  className,
  onClose,
  items,
  startIndex = 0,
  ...rest
}: CarouselProps<T>) {
  const [emblaRef, emblaApi] = useEmblaCarousel(rest);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(startIndex);

  // アニメーションなしで startIndex までスクロールする。
  // カルーセルを最初に描画したときにスクロールバーが出たり消えたりしないよう、useEffect の中で行う必要がある。
  useEffect(() => {
    emblaApi?.scrollTo(startIndex, true);
  }, [emblaApi, startIndex]);

  // 「3 / 6」のように、今何枚目かを出すために、表示中の番号を覚えておく。
  useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", handleSelect);

    return () => {
      emblaApi.off("select", handleSelect);
    };
  }, [emblaApi]);

  const close = useCallback(() => {
    // 全画面の状態は戻さない。消えるアニメーションの途中で、表示が切り替わってしまうため。
    // 閉じたあとはカルーセルごと取り除かれるので、次に開くときは全画面でない状態から始まる。
    onClose?.();
  }, [onClose]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const toggleFullScreen = useCallback(() => setIsFullScreen(!isFullScreen), [isFullScreen]);

  // キーボードの操作を扱う。
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          return scrollPrev();
        case "ArrowRight":
          return scrollNext();
        case "Escape":
          return close();
        case "f":
          return toggleFullScreen();
        default:
          return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("popstate", close);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", close);
    };
  }, [
    close,
    emblaApi,
    isFullScreen,
    onClose,
    scrollNext,
    scrollPrev,
    startIndex,
    toggleFullScreen,
  ]);

  return (
    <div
      // カルーセルが、入れ物の高さと幅をいっぱいに使うようにする。
      className={`overflow-hidden bg-wall text-ink ${
        isFullScreen ? "fixed inset-0 h-screen w-screen" : "relative h-full w-full"
      } ${className}`}
      ref={emblaRef}
    >
      {/* 高さと幅に overflow-auto を付けると、それぞれの項目が自分でスクロールできるようになる。 */}
      <div className="flex h-full w-full">
        {items.map((item, i) => (
          // スマホでは説明が下に続くので、最後の行が下の操作の帯に隠れないよう余白をとる。
          <div key={i} className="flex-[0_0_100%] overflow-auto max-md:pb-16">
            {children(item, i, {
              scrollNext,
              scrollPrev,
              close,
              toggleFullScreen,
              isFullScreen,
            })}
          </div>
        ))}
      </div>
      {/* 美術館の案内のように、操作は文字で常に出しておく。 */}
      <CarouselButton
        ariaLabel="Close carousel"
        className="absolute top-2 right-2 bg-wall/90 md:top-4 md:right-4"
        onClick={close}
      >
        Close
      </CarouselButton>
      <div className="absolute inset-x-0 bottom-0 z-50 flex items-center justify-between gap-2 bg-wall/90 px-2 md:px-6">
        <CarouselButton ariaLabel="Previous image" onClick={scrollPrev}>
          <span aria-hidden>←</span> Previous
        </CarouselButton>
        <p className="text-sm tracking-[0.08em] text-muted">
          <span className="sr-only">Image </span>
          {selectedIndex + 1} / {items.length}
        </p>
        <div className="flex gap-2 md:gap-6">
          <CarouselButton ariaLabel="Next image" onClick={scrollNext}>
            Next <span aria-hidden>→</span>
          </CarouselButton>
          <CarouselButton
            ariaLabel={isFullScreen ? "View smaller" : "View larger"}
            className="max-md:hidden"
            onClick={toggleFullScreen}
          >
            {isFullScreen ? "View smaller" : "View larger"}
          </CarouselButton>
        </div>
      </div>
    </div>
  );
}
