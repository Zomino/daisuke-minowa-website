"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const SCROLL_KEYS = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", "Space"];

interface NavProps {
  className?: string; // 固定でない方のナビに付けるクラス。ページごとに位置と色が違う。
}

/** このナビは、トップページに #portfolio のアンカーが置かれていることを前提にしている。 */
export default function Nav({ className = "" }: NavProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isStickyNavVisible, setIsStickyNavVisible] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const isNavOutOfViewRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const navigationActiveRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrollingUp = window.scrollY < lastScrollYRef.current;

      // プログラムで移動している間か、固定でない方のナビが見えない位置で上にスクロールしているときに表示する。
      if (navigationActiveRef.current || (isNavOutOfViewRef.current && isScrollingUp)) {
        setIsStickyNavVisible(true);
      } else {
        setIsStickyNavVisible(false);
      }

      lastScrollYRef.current = window.scrollY;
    };

    // ナビの位置はページごとに違うので、スクロール量ではなく、ナビが画面に見えているかで判断する。
    const observer = new IntersectionObserver(([entry]) => {
      isNavOutOfViewRef.current = !entry.isIntersecting;
      handleScroll();
    });
    if (navRef.current) observer.observe(navRef.current);

    const cancelNavigationIfUserScrolls = () => {
      if (!navigationActiveRef.current) return;

      navigationActiveRef.current = false;
      handleScroll();
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if (SCROLL_KEYS.includes(event.code)) {
        cancelNavigationIfUserScrolls();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", cancelNavigationIfUserScrolls, { passive: true });
    window.addEventListener("touchmove", cancelNavigationIfUserScrolls, { passive: true });
    window.addEventListener("keydown", handleKeydown, { passive: true });

    handleScroll(); // 最初の位置に合わせて、表示するかどうかを決める。

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", cancelNavigationIfUserScrolls);
      window.removeEventListener("touchmove", cancelNavigationIfUserScrolls);
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  // トップページの中では、作品の位置までなめらかにスクロールする。
  const handlePortfolioClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigationActiveRef.current = true;
    setIsStickyNavVisible(true);
    document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" });
    window.history.pushState(null, "", "#portfolio");
  };

  // showName：トップページの普段のナビでは、ヒーローに名前があるので出さない。
  const renderNav = ({
    className,
    showName,
    ...rest
  }: React.ComponentProps<"nav"> & { showName: boolean }) => (
    <nav
      className={`z-50 flex flex-col items-center gap-1 px-4 py-4 font-medium tracking-[0.08em] md:flex-row md:px-8 ${showName ? "md:justify-between" : "md:justify-end"} ${className}`}
      {...rest}
    >
      {showName && (
        <Link
          className="flex min-h-11 items-center text-lg tracking-[0.16em] hover:opacity-70 md:text-xl"
          href="/"
        >
          DAISUKE MINOWA
        </Link>
      )}
      <ul className="flex w-full justify-between md:w-auto md:gap-7 md:text-[17px]">
        <li>
          {isHome ? (
            <a
              className="flex h-11 items-center hover:opacity-70"
              href="#portfolio"
              onClick={handlePortfolioClick}
            >
              Works
            </a>
          ) : (
            <Link className="flex h-11 items-center hover:opacity-70" href="/#portfolio">
              Works
            </Link>
          )}
        </li>
        <li>
          <Link
            aria-current={pathname === "/about" ? "page" : undefined}
            className="flex h-11 items-center underline-offset-8 hover:opacity-70 aria-[current=page]:underline"
            href="/about"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            aria-current={pathname === "/contact" ? "page" : undefined}
            className="flex h-11 items-center underline-offset-8 hover:opacity-70 aria-[current=page]:underline"
            href="/contact"
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );

  return (
    <>
      {/*
                固定ナビをなめらかに動かすため、ナビを2つ描画している。
                1つだけだと、アニメーションのクラスを付け外ししたときに、ナビが画面の横から入ってきてしまう。
                きれいな設計ではないが、この程度の用途なら十分に動く。
            */}
      {renderNav({ className, ref: navRef, showName: !isHome })}
      {renderNav({
        showName: true,
        className: `fixed top-0 left-0 w-full bg-wall text-ink shadow-[0_1px_0_rgb(0_0_0/0.06)] transition-all duration-300 ease-in-out ${isStickyNavVisible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0"}`,
        "aria-hidden": true, // 固定でない方のナビと内容が同じなので、スクリーンリーダーには不要。
      })}
    </>
  );
}
