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
      <main className="mt-12 px-4 sm:px-6 md:px-8">
        <AboutSection />
      </main>
    </>
  );
}
