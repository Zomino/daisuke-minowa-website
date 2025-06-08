import strapiClient from '@lib/strapiClient';
import { type ContactInfo } from 'genTypes/contactInfo';
import { FaInstagram, FaEnvelope } from 'react-icons/fa';

export default async function ContactSection(props: React.ComponentProps<'section'>) {
    const contactInfo = await strapiClient
        .collection('contact-info')
        .find()
        .then((res) => res.data as unknown as ContactInfo)
        .catch(console.error);

    return (
        <section id="contact" {...props}>
            <h2 className="text-center text-2xl tracking-widest uppercase md:text-3xl">Contact</h2>
            <div className="mt-10 flex flex-col items-center justify-center gap-5 md:flex-row">
                {contactInfo?.email && (
                    <span className="flex cursor-pointer items-center gap-2 hover:text-white/60">
                        <FaEnvelope aria-hidden className="h-6 w-6" />
                        <a href={`mailto:${contactInfo.email}`} aria-label="Email Daisuke Minowa">
                            {contactInfo.email}
                        </a>
                    </span>
                )}
                {contactInfo?.link_instagram && (
                    <span className="flex cursor-pointer items-center gap-2 hover:text-white/60">
                        <FaInstagram aria-hidden className="h-6 w-6" />
                        <a
                            href={contactInfo.link_instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white/60"
                            aria-label="Instagram profile of Daisuke Minowa"
                        >
                            Instagram
                        </a>
                    </span>
                )}
            </div>
        </section>
    );
}
