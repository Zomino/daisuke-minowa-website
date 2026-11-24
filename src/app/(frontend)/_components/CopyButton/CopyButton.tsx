"use client";

import { useEffect, useState } from "react";

/** 押すと text をコピーし、少しのあいだ「Copied」と出す。 */
export default function CopyButton({ text, className = "" }: { text: string; className?: string }) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;
    const timer = setTimeout(() => setIsCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [isCopied]);

  const handleClick = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
  };

  return (
    <button
      type="button"
      className={`cursor-pointer hover:text-ink ${className}`}
      onClick={handleClick}
      aria-label={`Copy ${text}`}
    >
      {/* 幅が変わって周りが動かないよう、2つの文字を重ねて長い方の幅をとる。 */}
      <span className="grid">
        <span className={`col-start-1 row-start-1 ${isCopied ? "invisible" : ""}`}>{text}</span>
        <span className={`col-start-1 row-start-1 ${isCopied ? "" : "invisible"}`}>Copied</span>
      </span>
      {/* 読み上げソフトに、コピーできたことを伝える。 */}
      <span className="sr-only" aria-live="polite">
        {isCopied ? "Copied" : ""}
      </span>
    </button>
  );
}
