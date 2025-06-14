import Image from 'next/image';

import heroImage from '../../public/images/hero.jpg';
import AboutSection from './components/AboutSection/AboutSection';
import Nav from './components/Nav/Nav';
import PortfolioSection from './components/PortfolioSection/PortfolioSection';
import ContactSection from './components/ContactSection/ContactSection';

export default function Page() {
    return (
        <>
            <header className="relative h-screen">
                <Image
                    aria-hidden // This image is decorative, so we can hide it from assistive technologies. This also prevents the alt text from showing up in the page.
                    alt="Hero background image"
                    className="absolute inset-0 object-cover"
                    fill // Use fill to prevent layout shift without needing to specify width and height.
                    src={heroImage} // Pass the imported image directly to the src prop to ensure Next.js optimizes it correctly.
                    placeholder="blur" // Use blur placeholder for a smooth loading experience.
                    priority // Ensure the image is loaded immediately.
                />
                <div className="pointer-events-none absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-black to-transparent" />
                <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center text-4xl font-extralight tracking-widest uppercase drop-shadow-lg md:text-5xl">
                    Daisuke Minowa
                </h1>
                <Nav />
            </header>
            <main className="mt-10 p-1">
                <PortfolioSection />
                <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <div className="mt-10">
                    <AboutSection />
                </div>
                <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <div className="mt-10">
                    <ContactSection />
                </div>
            </main>
            <footer className="mt-15">
                <p className="text-center text-xs md:text-sm">
                    &copy; <time dateTime={new Date().getFullYear().toString()}>{new Date().getFullYear()}</time> Daisuke Minowa. All rights reserved.
                </p>
            </footer>
        </>
    );
}
