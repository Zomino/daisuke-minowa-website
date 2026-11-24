import { type Metadata } from "next";

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
      <a
        className="flex min-h-12 items-center hover:text-muted md:min-h-13"
        href="https://www.instagram.com/daisuke_minowa"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram profile of Daisuke Minowa"
      >
        Instagram
      </a>
    </section>
  );
}
