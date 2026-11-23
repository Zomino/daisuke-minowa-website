import config from "@payload-config";
import { getPayload } from "payload";

import { type Media } from "@/payload-types";

import Artwork, { type ArtworkItem } from "@/app/(frontend)/_components/PortfolioSection/Artwork";

// next/image のぼかしは base64 のデータしか受け付けないので、ここで小さいサムネイルを取ってくる。
// ぼかしがなくてもページが壊れないよう、取れなかったときはぼかしなしにする。
async function toBlurDataURL(image: Media) {
  const thumbUrl = image.sizes?.thumb?.url;
  if (!thumbUrl) return undefined;
  try {
    const response = await fetch(thumbUrl);
    if (!response.ok) return undefined;
    const base64 = Buffer.from(await response.arrayBuffer()).toString("base64");
    return `data:${image.sizes?.thumb?.mimeType ?? "image/jpeg"};base64,${base64}`;
  } catch (error) {
    console.error(`Could not load blur placeholder from ${thumbUrl}`, error);
    return undefined;
  }
}

export default async function PortfolioSection() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "artworks",
    where: { _status: { equals: "published" } },
    sort: "-date",
    limit: 0,
    depth: 1,
  });

  const artwork: ArtworkItem[] = await Promise.all(
    docs
      .filter((doc) => typeof doc.image === "object" && doc.image.sizes?.display?.url)
      .map(async (doc) => {
        const image = doc.image as Media;
        return { ...doc, image, blurDataURL: await toBlurDataURL(image) };
      }),
  );

  return (
    <section id="portfolio">
      <h2 className="sr-only">Portfolio</h2>
      <Artwork artwork={artwork} />
    </section>
  );
}
