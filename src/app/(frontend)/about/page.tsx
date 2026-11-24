import { type Metadata } from "next";

import AboutSection from "@/app/(frontend)/_components/AboutSection/AboutSection";

export const metadata: Metadata = {
  title: "About | Daisuke Minowa",
};

export default function Page() {
  return (
    <div className="pt-12 md:pt-14">
      <AboutSection />
    </div>
  );
}
