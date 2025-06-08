import strapiClient from '@lib/strapiClient';
import { type About } from 'genTypes/About';
import { type EducationEntry } from 'genTypes/EducationEntry';
import { type ExhibitionEntry } from 'genTypes/ExhibitionEntry';

import Image from '@components/Image/Image';
import { STRAPI_BASE_URL } from '@config/env';

export default async function AboutSection(props: React.ComponentProps<'section'>) {
    const aboutPromise = strapiClient
        .single('about')
        .find({ populate: ['profileImage'] })
        .then((res) => res.data as About)
        .catch(console.error);
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

    const [about, educationEntries = [], exhibitionEntries = []] = await Promise.all([
        aboutPromise,
        educationEntriesPromise,
        exhibitionEntriesPromise,
    ]);

    return (
        <section id="about" {...props}>
            <h2 className="text-center text-2xl tracking-widest uppercase md:text-3xl">About</h2>
            <Image
                className="mx-auto mt-10 max-w-70 rounded-full object-contain"
                src={`${STRAPI_BASE_URL}${about?.profileImage?.url || ''}`}
                alt={about?.profileImage?.alternativeText || 'Photo of Daisuke Minowa'}
                width={about?.profileImage?.width}
                height={about?.profileImage?.height}
            />
            <p className="mx-auto mt-5 max-w-100 p-5 text-center">{about?.bio}</p>
            <div className="mt-5 px-5 md:flex md:justify-center md:space-x-5">
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
                                                {/* A non-breaking space followed by an en dash and another non-breaking space. */}
                                                {'\u00A0'}
                                                {'\u2013'}
                                                {'\u00A0'}
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
                                                {/* A non-breaking space followed by an en dash and another non-breaking space */}
                                                {'\u00A0'}
                                                {'\u2013'}
                                                {'\u00A0'}
                                                <time dateTime={entry.year_to?.toString() || entry.year_to.toString()}>{entry.year_to}</time>
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
