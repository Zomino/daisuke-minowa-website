'use client';

import axios from 'axios';
import Image from 'next/image';
import { type HTMLAttributes, useEffect, useState } from 'react';

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
        const fetchImages = async () => {
            try {
                // TODO: Replace Lorem Picsum with Strapi
                const response = await axios.get('https://picsum.photos/v2/list');

                setImages(response.data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, [images]);

    /**
     * The nav is rendered twice to allow for smooth animations on the sticky nav.
     * When a single nav is used, the addition and removal of animation classes causes the nav to transition in from the sides of the screen.
     */
    const renderNav = ({ className, ...rest }: HTMLAttributes<HTMLElement>) => {
        const handleClick = (href: string) => {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }

            window.history.pushState(null, '', href);

            setUserRecentlyNavigated(true);

            setTimeout(() => setUserRecentlyNavigated(false), 2000);
        };

        return (
            <nav className={`align-center z-50 flex justify-center p-3 ${className}`} {...rest}>
                <ul className="flex gap-4">
                    <li>
                        <a className="text-md cursor-pointer uppercase" onClick={() => handleClick('#portfolio')}>
                            Portfolio
                        </a>
                    </li>
                    <li>
                        <a className="text-md cursor-pointer uppercase" onClick={() => handleClick('#about')}>
                            About
                        </a>
                    </li>
                    <li>
                        <a className="text-md cursor-pointer uppercase" onClick={() => handleClick('#contact')}>
                            Contact
                        </a>
                    </li>
                </ul>
            </nav>
        );
    };

    return (
        <>
            <header className="relative h-screen">
                <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center text-5xl font-extralight tracking-widest uppercase">
                    Daisuke Minowa
                </h1>
                {renderNav({ className: 'absolute top-[calc(60%)] left-1/2 -translate-x-1/2 transform' })}
                {renderNav({
                    className: `fixed top-0 left-0 w-full bg-white shadow-md transform transition-all duration-300 ease-in-out z-50 ${isStickyNavVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`,
                    'aria-hidden': true,
                })}
            </header>
            <main>
                <section id="portfolio">
                    <h2 className="text-center text-3xl tracking-wide uppercase">Portfolio</h2>
                    <div className="mt-10 columns-1 gap-1 space-y-1 p-1 md:columns-2 lg:columns-3 xl:columns-4">
                        {images.map((image) => (
                            <div key={image.id} className="group relative hover:cursor-pointer">
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
                                    <h3 className="text-white">{`Image by ${image.author}`}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                <section id="about" className="mt-10">
                    <h2 className="text-center text-3xl tracking-wide uppercase">About</h2>
                </section>
                <section id="contact" className="mt-10">
                    <h2 className="text-center text-3xl tracking-wide uppercase">Contact</h2>
                </section>
            </main>
            <footer className="mt-10">
                <p className="text-center">&copy; {new Date().getFullYear()} Daisuke Minowa. All rights reserved.</p>
            </footer>
        </>
    );
}
