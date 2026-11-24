import { type Metadata } from "next";

import ContactSection from "@/app/(frontend)/_components/ContactSection/ContactSection";

export const metadata: Metadata = {
  title: "Contact | Daisuke Minowa",
};

export default function Page() {
  return (
    // 残りの高さいっぱいに広げて、リンクを画面の上下中央に置く。
    <div className="flex grow flex-col justify-center">
      <ContactSection />
    </div>
  );
}
