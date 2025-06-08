import Image from '@components/Image/Image';

import AboutSection from './components/AboutSection/AboutSection';
import Nav from './components/Nav/Nav';
import PortfolioSection from './components/PortfolioSection/PortfolioSection';
import ContactSection from './components/ContactSection/ContactSection';

export default function Page() {
    return (
        <>
            <header className="relative h-screen">
                <Image
                    className="absolute inset-0 h-full w-full object-cover"
                    src="/images/hero.jpg"
                    alt="Hero background image"
                    priority // Ensure the image is loaded immediately
                    width={2364} // Use the actual width of the image
                    height={1773} // Use the actual height of the image
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
                <AboutSection className="mt-10" />
                <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <ContactSection className="mt-10" />
            </main>
            <footer className="mt-15">
                <p className="text-center text-xs md:text-sm">
                    &copy; <time dateTime={new Date().getFullYear().toString()}>{new Date().getFullYear()}</time> Daisuke Minowa. All rights reserved.
                </p>
            </footer>
        </>
    );
}
