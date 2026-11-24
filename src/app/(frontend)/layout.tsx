import { Analytics } from "@vercel/analytics/next";
import { type Metadata, type Viewport } from "next";

import "@/app/(frontend)/globals.css";

import Body from "@/app/(frontend)/_components/Body/Body";
import Footer from "@/app/(frontend)/_components/Footer/Footer";
import Header from "@/app/(frontend)/_components/Header/Header";
import Html from "@/app/(frontend)/_components/Html/Html";
import Main from "@/app/(frontend)/_components/Main/Main";

export const metadata: Metadata = {
  title: "Daisuke Minowa",
  description:
    "The website of Daisuke Minowa, a London-based Japanese artist. Here you find a list of my recent and previous artwork.",
  keywords: "art, painting, illustration, portfolio, japanese artist, london artist",
  authors: [{ name: "Zou Minowa", url: "https://github.com/Zomino" }],
  creator: "Zou Minowa",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// header は @header スロットから受け取る。ページごとに中身が違う（ホームは写真つき）ため。
export default function RootLayout({
  children,
  header,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
}) {
  return (
    <Html>
      <Body>
        <Header>{header}</Header>
        <Main>{children}</Main>
        <Footer />
        <Analytics />
      </Body>
    </Html>
  );
}
