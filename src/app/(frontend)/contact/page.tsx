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
      <main className="mt-12 px-4 sm:px-6 md:px-8">
        <ContactSection />
      </main>
    </>
  );
}
