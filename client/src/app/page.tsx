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
                <div className="pointer-events-none absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                {/* Fade the bottom of the hero into the white page background. */}
                <div className="pointer-events-none absolute bottom-0 left-0 h-[12.5%] w-full bg-[linear-gradient(0deg,#fff_0%,rgba(255,255,255,0.85)_40%,rgba(255,255,255,0.35)_75%,rgba(255,255,255,0)_100%)]" />
                <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center text-4xl font-extralight tracking-widest uppercase text-white drop-shadow-lg md:text-5xl">
                    Daisuke Minowa
                </h1>
                <Nav />
            </header>
            {/* Soft, extended gradient bridge between dark hero and light page background. */}
            <div aria-hidden className="h-16 bg-white" />
            <main className="mt-12 px-4 sm:px-6 md:px-8">
                <div className="pt-4">
                    <PortfolioSection />
                </div>
                <div className="my-20 md:my-24">
                    <Divider />
                </div>
                <div className="mt-20">
                    <AboutSection />
                </div>
                <div className="my-20 md:my-24">
                    <Divider />
                </div>
                <div className="mt-20">
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
