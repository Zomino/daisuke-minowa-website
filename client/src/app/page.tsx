import Image from 'next/image';

import heroImage from '../../public/images/hero.jpg';

import AboutSection from './components/AboutSection/AboutSection';
import ContactSection from './components/ContactSection/ContactSection';
import Divider from '../components/Divider/Divider';
import Nav from './components/Nav/Nav';
import PortfolioSection from './components/PortfolioSection/PortfolioSection';

export default function Page() {
    return (
        <>
            <header className="relative h-screen">
                <Image
                    alt="Hero background image" // This is a mandatory prop for Next.js Image.
                    aria-hidden // This image is decorative, so we can hide it from assistive technologies. This also prevents the alt text from showing up in the page.
                    className="absolute inset-0 object-cover"
                    fill // Use fill to prevent layout shift without needing to specify width and height.
                    placeholder="blur" // Use blur placeholder for a smooth loading experience.
                    priority // Ensure the image is loaded immediately.
                    src={heroImage} // Pass the imported image directly to the src prop to ensure Next.js optimizes it correctly.
                />
                {/* Render overlay for the image to add light contrast so the heading stays readable. */}
                <div className="pointer-events-none absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center text-4xl font-extralight tracking-widest uppercase text-white drop-shadow-lg md:text-5xl">
                    Daisuke Minowa
                </h1>
                <Nav />
            </header>
            {/* Soft, extended gradient bridge between dark hero and light page background. */}
            <div
                aria-hidden
                className="h-16"
                style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.1) 65%, #fff 100%)' }}
            />
            <main className="mt-10 p-1">
                <PortfolioSection />
                <Divider />
                <div className="mt-10">
                    <AboutSection />
                </div>
                <Divider />
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
