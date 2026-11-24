import { type Metadata } from "next";

import CopyButton from "@/app/(frontend)/_components/CopyButton/CopyButton";

export const metadata: Metadata = {
  title: "Contact | Daisuke Minowa",
};

export default function Page() {
  return (
    // 残りの高さいっぱいに広げて、リンクを画面の上下中央に置く。
    <section
      id="contact"
      className="flex grow flex-col items-center justify-center text-[19px] md:text-[22px]"
    >
      <h1 className="sr-only">Contact</h1>
      <a
        className="flex min-h-12 items-center hover:text-muted md:min-h-13"
        href="mailto:dminowa@gmail.com"
        aria-label="Email Daisuke Minowa"
      >
        Email
      </a>
      {/* メールのアプリを設定していないと mailto は何も起きないので、押すとアドレスをコピーできるようにもする。 */}
      <CopyButton
        className="-mt-2 mb-2 min-h-11 text-sm tracking-[0.04em] text-muted"
        text="dminowa@gmail.com"
      />
      <a
        className="flex min-h-12 items-center hover:text-muted md:min-h-13"
        href="https://www.instagram.com/daisuke_minowa"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram profile of Daisuke Minowa"
      >
        Instagram
      </a>
      <a
        className="-mt-2 flex min-h-11 items-center text-sm tracking-[0.04em] text-muted hover:text-ink"
        href="https://www.instagram.com/daisuke_minowa"
        target="_blank"
        rel="noopener noreferrer"
      >
        @daisuke_minowa
      </a>
    </section>
  );
}
