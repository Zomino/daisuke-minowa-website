import { FaInstagram, FaEnvelope } from 'react-icons/fa';

export default async function ContactSection() {
    return (
        <section id="contact">
            <h2 className="text-center text-2xl tracking-widest uppercase md:text-3xl">Contact</h2>
            <div className="mt-10 flex flex-col items-center justify-center gap-5 md:flex-row">
                <span className="flex cursor-pointer items-center gap-2 hover:text-white/60">
                    <FaEnvelope aria-hidden className="h-6 w-6" />
                    <a href="mailto:dminowa@gmail.com" aria-label="Email Daisuke Minowa">
                        dminowa@gmail.com
                    </a>
                </span>
                <span className="flex cursor-pointer items-center gap-2 hover:text-white/60">
                    <FaInstagram aria-hidden className="h-6 w-6" />
                    <a
                        href="https://www.instagram.com/daisuke_minowa"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white/60"
                        aria-label="Instagram profile of Daisuke Minowa"
                    >
                        Instagram
                    </a>
                </span>
            </div>
        </section>
    );
}
