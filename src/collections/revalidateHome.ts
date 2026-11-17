import { revalidatePath } from 'next/cache';

/** トップページを作り直す。Next.js の外（seed のスクリプトなど）では何もしない。 */
export const revalidateHome = () => {
    try {
        revalidatePath('/');
    } catch {
        // Next.js の中で動いていない。
    }
};
