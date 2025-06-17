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

    return (
        <section id="about">
            <h2 className="text-center text-2xl tracking-widest uppercase md:text-3xl">About</h2>
            <div className="relative mx-auto mt-10 w-full max-w-[500px] md:w-1/2 lg:w-1/4">
                <Image
                    alt="Photo of Daisuke Minowa" // This is a mandatory prop for Next.js Image.
                    className="object-contain"
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
            <p className="mt-5 px-5 text-center text-lg tracking-widest text-white/70 italic">An unrepentant, stupid old man</p>
            <h3 className="mt-10 text-center text-xl tracking-widest uppercase">Bio</h3>
            <p className="mx-auto mt-5 max-w-150 px-5 text-center">Born in Tokyo in 1966. Moved to the UK in 1986. Living and working in London.</p>
            <div className="mt-15 px-5 md:flex md:justify-center md:space-x-5">
                <div className="text-center md:w-1/2 md:text-right">
                    <h3 className="text-xl tracking-widest uppercase">Exhibitions</h3>
                    <ul className="mt-5 space-y-6">
                        {exhibitionEntries.map((entry) => (
                            <li key={entry.id}>
                                {/* Use flexbox to reverse the name and date visually for style, but maintain proper page structure. */}
                                <div className="flex flex-col-reverse">
                                    <h4 className="text-lg font-extralight tracking-wider">{entry.event_name}</h4>
                                    <p className="text-white/70 italic">
                                        <time dateTime={new Date(entry.date_from).toISOString()}>
                                            {new Date(entry.date_from).toLocaleDateString()}
                                        </time>
                                        {entry.date_to && (
                                            <>
                                                <AccessibleEnDash />
                                                <time dateTime={new Date(entry.date_to).toISOString()}>
                                                    {new Date(entry.date_to).toLocaleDateString()}
                                                </time>
                                            </>
                                        )}
                                    </p>
                                </div>
                                {entry.notes && <p className="text-sm text-white/70 italic">{entry.notes}</p>}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-15 text-center md:mt-0 md:ml-10 md:w-1/2 md:text-left">
                    <h3 className="text-xl tracking-widest uppercase">Education</h3>
                    <ul className="mt-5 space-y-6">
                        {educationEntries.map((entry) => (
                            <li key={entry.id}>
                                {/* Use flexbox to reverse the name and date visually for style, but maintain proper page structure. */}
                                <div className="flex flex-col-reverse">
                                    <h4 className="text-lg font-extralight tracking-wider">{entry.experience_name}</h4>
                                    <span className="text-white/70 italic">
                                        <time dateTime={entry.year_from.toString()}>{entry.year_from}</time>
                                        {entry.year_to && (
                                            <>
                                                <AccessibleEnDash />
                                                <time dateTime={entry.year_to.toString()}>{entry.year_to}</time>
                                            </>
                                        )}
                                    </span>
                                </div>
                                {entry.notes && <p className="text-sm text-white/70 italic">{entry.notes}</p>}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
