import { type Metadata } from "next";

import AboutSection from "@/app/(frontend)/_components/AboutSection/AboutSection";
import Nav from "@/app/(frontend)/_components/Nav/Nav";

export const metadata: Metadata = {
  title: "About | Daisuke Minowa",
};

export default function Page() {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main className="px-4 pt-12 md:px-8 md:pt-14">
        <AboutSection />
      </main>
    </>
  );
}
