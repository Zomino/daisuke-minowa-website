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
          // 上下の操作の分だけ余白をとり、写真が操作の下に入り込まないようにする。
          // 操作に背景を付けずに済むので、次の写真に移るときも壁の色だけが見える。
          // 全画面でも白い壁の余白は残し、少しだけ狭めて写真を大きくする。
          <div
            key={i}
            // 余白の変化もなめらかにして、写真が画像の幅の変化と一緒に広がるようにする。
            // 上の余白は、Close の下にもう少し空きができるよう、下より広くとる。
            className={`h-full flex-[0_0_100%] overflow-auto pt-20 pb-20 transition-[padding] duration-300 ${isFullScreen ? "md:pt-24" : "md:pt-28 md:pb-24"}`}
          >
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
        className="absolute top-4 right-4 px-3 md:top-8 md:right-8"
        onClick={close}
      >
        Close
      </CarouselButton>
      {/* サイトの左右の余白（スマホ 16px、PC 32px）と揃え、下にも同じだけ余裕をとる。 */}
      {/* 左右の幅が違っても枚数が真ん中に来るよう、両端の列を同じ幅にする。 */}
      <div className="absolute inset-x-0 bottom-0 z-50 grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 pt-2 pb-4 md:px-8 md:pt-3 md:pb-6">
        <CarouselButton
          ariaLabel="Previous image"
          className="justify-self-start"
          onClick={scrollPrev}
        >
          <span aria-hidden>←</span> Previous
        </CarouselButton>
        <p className="text-sm tracking-[0.08em] text-muted">
          <span className="sr-only">Image </span>
          {selectedIndex + 1} / {items.length}
        </p>
        <div className="flex gap-2 justify-self-end md:gap-6">
          <CarouselButton ariaLabel="Next image" onClick={scrollNext}>
            Next <span aria-hidden>→</span>
          </CarouselButton>
          <CarouselButton
            ariaLabel={isFullScreen ? "View smaller" : "View larger"}
            className="max-md:hidden"
            onClick={toggleFullScreen}
          >
            {/* 2つの文字を同じ場所に重ねて、長い方の幅を確保する。切り替えても Next の位置が動かない。 */}
            <span className="grid">
              <span className={`col-start-1 row-start-1 ${isFullScreen ? "invisible" : ""}`}>
                View larger
              </span>
              <span className={`col-start-1 row-start-1 ${isFullScreen ? "" : "invisible"}`}>
                View smaller
              </span>
            </span>
          </CarouselButton>
        </div>
      </div>
    </div>
  );
}
