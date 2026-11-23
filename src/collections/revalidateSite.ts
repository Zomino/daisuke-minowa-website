import { revalidatePath } from "next/cache";

/** サイトの全ページを作り直す。Next.js の外（payload の CLI など）では何もしない。 */
export const revalidateSite = () => {
  try {
    revalidatePath("/", "layout");
  } catch {
    // Next.js の中で動いていない。
  }
};
