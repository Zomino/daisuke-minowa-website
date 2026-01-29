import strapiClient from '@lib/strapiClient';
import Image from 'next/image';

import profileImage from '../../../../public/images/profile.jpg';

import AccessibleEnDash from '@components/AccessibleEnDash/AccessibleEnDash';
import { type EducationEntry } from 'genTypes/educationEntry';
import { type ExhibitionEntry } from 'genTypes/exhibitionEntry';

export default async function AboutSection() {
    const educationEntriesPromise = strapiClient
        .collection('education-entries')
        .find()
        .then((res) => res.data as EducationEntry[])
        .catch(console.error);
    const exhibitionEntriesPromise = strapiClient
        .collection('exhibition-entries')
        .find()
        .then((res) => res.data as ExhibitionEntry[])
        .catch(console.error);

    const [educationEntries = [], exhibitionEntries = []] = await Promise.all([educationEntriesPromise, exhibitionEntriesPromise]);
    const formatDate = (value: Date | string | number) => {
        const date = typeof value === 'number' ? new Date(value, 0, 1) : new Date(value);
        return {
            date,
            display: date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }),
        };
    };

    return (
        <section id="about">
            <h2 className="text-center text-2xl tracking-widest uppercase md:text-3xl">About</h2>
            <div className="relative mx-auto mt-14 w-full overflow-hidden shadow-[0_18px_40px_-18px_rgba(0,0,0,0.45)] md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5">
                <Image
                    alt="Photo of Daisuke Minowa" // This is a mandatory prop for Next.js Image.
                    className="object-contain saturate-60"
                    // Make sure the height and width match the original image dimensions.
                    // The height is necessary for the image to actually be visible.
                    height={3264}
                    width={2448}
                    placeholder="blur" // Use blur placeholder for a smooth loading experience.
                    src={profileImage} // Pass the imported image directly to the src prop to ensure Next.js optimizes it correctly.
                />
                {/* Gradient overlay for top and bottom. */}
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
            </div>
            <h3 className="sr-only">Bio</h3>
            <p className="mx-auto mt-20 max-w-120 px-5 text-center">Born in Tokyo in 1966. Moved to the UK in 1986. Living and working in London.</p>
            <div className="mt-18 flex flex-col items-center gap-15 px-5">
                <div className="w-full max-w-4xl text-center">
                    <h3 className="text-xl tracking-widest uppercase">Exhibitions</h3>
                    <ul className="mt-8 space-y-6">
                        {exhibitionEntries.map((entry) => (
                            <li key={entry.id}>
                                {/* Use flexbox to reverse the name and date visually for style, but maintain proper page structure. */}
                                <div className="flex flex-col-reverse">
                                    <h4 className="text-lg font-extralight tracking-wider">{entry.event_name}</h4>
                                    <p className="text-black/70 italic">
                                        {(() => {
                                            const { date, display } = formatDate(entry.date_from);
                                            return <time dateTime={date.toISOString()}>{display}</time>;
                                        })()}
                                        {entry.date_to && (
                                            <>
                                                <AccessibleEnDash />
                                                {(() => {
                                                    const { date, display } = formatDate(entry.date_to);
                                                    return <time dateTime={date.toISOString()}>{display}</time>;
                                                })()}
                                            </>
                                        )}
                                    </p>
                                </div>
                                {entry.notes && <p className="text-sm text-black/70 italic">{entry.notes}</p>}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-full max-w-4xl text-center">
                    <h3 className="text-xl tracking-widest uppercase">Education</h3>
                    <ul className="mt-8 space-y-6">
                        {educationEntries.map((entry) => (
                            <li key={entry.id}>
                                {/* Use flexbox to reverse the name and date visually for style, but maintain proper page structure. */}
                                <div className="flex flex-col-reverse">
                                    <h4 className="text-lg font-extralight tracking-wider">{entry.experience_name}</h4>
                                    <span className="text-black/70 italic">
                                        {(() => {
                                            const { date, display } = formatDate(entry.year_from);
                                            return <time dateTime={date.toISOString()}>{display}</time>;
                                        })()}
                                        {entry.year_to && (
                                            <>
                                                <AccessibleEnDash />
                                                {(() => {
                                                    const { date, display } = formatDate(entry.year_to);
                                                    return <time dateTime={date.toISOString()}>{display}</time>;
                                                })()}
                                            </>
                                        )}
                                    </span>
                                </div>
                                {entry.notes && <p className="text-sm text-black/70 italic">{entry.notes}</p>}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
