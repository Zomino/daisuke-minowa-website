import { revalidatePath } from 'next/cache';

/** Rebuilds the home page. Does nothing outside Next.js (e.g. the seed script). */
export const revalidateHome = () => {
    try {
        revalidatePath('/');
    } catch {
        // Not running inside Next.js.
    }
};
