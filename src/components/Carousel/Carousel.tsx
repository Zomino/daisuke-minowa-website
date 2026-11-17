"use client";

import useEmblaCarousel from "embla-carousel-react";
import { FiMaximize, FiMinimize, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { AnimatePresence, motion } from "motion/react";
import { type JSX, useCallback, useEffect, useState } from "react";

import CarouselButton from "@/components/Carousel/CarouselButton";

const MotionCarouselButton = motion.create(CarouselButton);

const buttonVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

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
  isUserActive: boolean;
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
  const [isUserActive, setIsUserActive] = useState(false);

  // アニメーションなしで startIndex までスクロールする。
  // カルーセルを最初に描画したときにスクロールバーが出たり消えたりしないよう、useEffect の中で行う必要がある。
  useEffect(() => {
    emblaApi?.scrollTo(startIndex, true);
  }, [emblaApi, startIndex]);

  const close = useCallback(() => {
    onClose?.();
    // 閉じるときに、全画面の状態を戻す。
    // onClose がカルーセルを閉じる場合にちらつかないよう、onClose のあとで行う必要がある。
    setIsFullScreen(false);
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

  // 5秒間操作がなければ、ホバーのボタンを隠すタイマーを設定する。
  useEffect(() => {
    if (!isUserActive) return;

    const timer = setTimeout(() => setIsUserActive(false), 5000);

    return () => clearTimeout(timer);
  }, [isUserActive]);

  return (
    <div
      // カルーセルが、入れ物の高さと幅をいっぱいに使うようにする。
      className={`overflow-hidden bg-white text-black ${
        isFullScreen ? "fixed inset-0 h-screen w-screen" : "relative h-full w-full"
      } ${className}`}
      ref={emblaRef}
      onMouseMove={() => setIsUserActive(true)}
      onMouseLeave={() => setIsUserActive(false)}
    >
      {/* 高さと幅に overflow-auto を付けると、それぞれの項目が自分でスクロールできるようになる。 */}
      <div className="flex h-full w-full">
        {items.map((item, i) => (
          <div key={i} className="flex-[0_0_100%] overflow-auto">
            {children(item, i, {
              scrollNext,
              scrollPrev,
              close,
              toggleFullScreen,
              isFullScreen,
              isUserActive,
            })}
          </div>
        ))}
      </div>
      <AnimatePresence>
        {isUserActive && (
          <motion.div variants={buttonVariants} initial="hidden" animate="visible" exit="hidden">
            <>
              <MotionCarouselButton
                ariaLabel="Close Carousel"
                className="absolute top-4 right-4"
                title="Close Carousel"
                onClick={close}
                variants={buttonVariants}
              >
                <FiX className="h-6 w-6" />
              </MotionCarouselButton>
              <motion.div
                className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-2 rounded-full bg-white p-2 text-black/80 shadow-sm"
                variants={buttonVariants}
              >
                <CarouselButton
                  ariaLabel="Previous Image"
                  className="bg-transparent"
                  title="Previous Image"
                  onClick={scrollPrev}
                >
                  <FiChevronLeft className="h-6 w-6" />
                </CarouselButton>
                <CarouselButton
                  ariaLabel="Toggle Fullscreen"
                  aria-pressed={isFullScreen}
                  className="bg-transparent"
                  title={isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                  onClick={() => setIsFullScreen(!isFullScreen)}
                >
                  {isFullScreen ? (
                    <FiMinimize className="h-6 w-6" />
                  ) : (
                    <FiMaximize className="h-6 w-6" />
                  )}
                </CarouselButton>
                <CarouselButton
                  ariaLabel="Next Image"
                  className="bg-transparent"
                  title="Next Image"
                  onClick={scrollNext}
                >
                  <FiChevronRight className="h-6 w-6" />
                </CarouselButton>
              </motion.div>
            </>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
