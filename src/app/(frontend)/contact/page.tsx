import { type Metadata } from "next";

import ContactSection from "@/app/(frontend)/_components/ContactSection/ContactSection";
import Nav from "@/app/(frontend)/_components/Nav/Nav";

export const metadata: Metadata = {
  title: "Contact | Daisuke Minowa",
};

export default function Page() {
  return (
    <>
      <header>
        <Nav />
      </header>
      {/* 残りの高さいっぱいに広げて、リンクを画面の上下中央に置く。 */}
      <main className="flex grow flex-col justify-center px-4 md:px-8">
        <ContactSection />
      </main>
    </>
  );
}
