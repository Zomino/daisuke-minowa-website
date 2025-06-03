'use client';

import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import Carousel from './ImageCarousel';
import Nav from './Nav';

export default function Page() {
    // TODO: Replace Lorem Picsum with Strapi
    const [images, setImages] = useState<
        Array<{
            id: string;
            author: string;
            width: number;
            height: number;
            url: string;
            download_url: string;
        }>
    >([]);
    const [userRecentlyNavigated, setUserRecentlyNavigated] = useState(false);
    const [isStickyNavVisible, setIsStickyNavVisible] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    const [isCarouselOpen, setIsCarouselOpen] = useState(false);
    const [carouselStartIndex, setCarouselStartIndex] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            // Note that starting position of the static nav is assumed to be roughly 3/4 of the way down viewport height when at the top of the page.
            const isNavPastOriginalPosition = window.scrollY > window.innerHeight * 0.75;

            // The nav should be visible if the user has recently navigated or if they are past the original position of the nav and scrolling up.
            if (isNavPastOriginalPosition && (userRecentlyNavigated || window.scrollY < lastScrollY)) {
                setIsStickyNavVisible(true);
            } else {
                setIsStickyNavVisible(false);
            }

            setLastScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, userRecentlyNavigated]);

    useEffect(() => {
        const fetchImages = () =>
            axios
                .get('https://picsum.photos/v2/list')
                .then((response) => setImages(response.data))
                .catch((error) => console.error('Error fetching images:', error));

        fetchImages();
    }, []);

    const handleNavigate = () => {
        setUserRecentlyNavigated(true);
        setTimeout(() => setUserRecentlyNavigated(false), 2000);
    };

    const handleImageClick = (index: number) => {
        setCarouselStartIndex(index);
        setIsCarouselOpen(true);
    };

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
                {/*
                  The nav is rendered twice to allow for smooth animations on the sticky nav.
                  When a single nav is used, the addition and removal of animation classes causes the nav to transition in from the sides of the screen.
                */}
                <Nav className="absolute top-[calc(60%)] left-1/2 -translate-x-1/2 transform" onNavigate={handleNavigate} />
                <Nav
                    aria-hidden // Ensure only the first nav is accessible to screen readers
                    className={`fixed top-0 left-0 z-50 w-full transform bg-black shadow-md transition-all duration-300 ease-in-out ${isStickyNavVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-full opacity-0'}`}
                    onNavigate={handleNavigate}
                />
            </header>
            <main className="mt-10">
                {images.length > 0 && (
                    <Carousel images={images} isOpen={isCarouselOpen} onClose={() => setIsCarouselOpen(false)} startIndex={carouselStartIndex} />
                )}
                <section id="portfolio">
                    <h2 className="text-center text-2xl tracking-wide uppercase md:text-3xl">Portfolio</h2>
                    <div className="mt-10 columns-1 gap-1 space-y-1 p-1 md:columns-2 lg:columns-3 xl:columns-4">
                        {images.map((image, index) => (
                            <div key={image.id} className="group relative hover:cursor-pointer" onClick={() => handleImageClick(index)}>
                                <Image
                                    className="transition duration-300 group-hover:brightness-50"
                                    src={image.download_url}
                                    alt={`Image by ${image.author}`}
                                    width={image.width}
                                    height={image.height}
                                />
                                <div
                                    aria-hidden
                                    className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100"
                                >
                                    <h3>{`Image by ${image.author}`}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                <section id="about" className="mt-10">
                    <h2 className="text-center text-2xl tracking-wide uppercase md:text-3xl">About</h2>
                </section>
                <section id="contact" className="mt-10">
                    <h2 className="text-centertext-2xl tracking-wide uppercase md:text-3xl">Contact</h2>
                </section>
            </main>
            <footer className="mt-10">
                <p className="text-center">
                    &copy; <time dateTime={new Date().getFullYear().toString()}>{new Date().getFullYear()}</time> Daisuke Minowa. All rights reserved.
                </p>
            </footer>
        </>
    );
}
