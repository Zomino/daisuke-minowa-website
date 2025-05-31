'use client';

import { type HTMLAttributes, useEffect, useState } from 'react';

export default function Page() {
    const [isSticky, setIsSticky] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.scrollY < lastScrollY &&
                window.scrollY > window.innerHeight * 0.75 // Ensure we are past the original nav position
            ) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }

            setLastScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    /**
     * The nav is rendered twice to allow for smooth animations on the sticky nav.
     * When a single nav is used, the addition and removal of animation classes causes the nav to transition in from the sides of the screen.
     */
    const renderNav = ({ className, ...rest }: HTMLAttributes<HTMLElement>) => (
        <nav className={`align-center z-50 flex justify-center p-3 ${className}`} {...rest}>
            <ul className="flex gap-4">
                <li>
                    <a href="#portfolio" className="text-md uppercase">
                        Portfolio
                    </a>
                </li>
                <li>
                    <a href="#about" className="text-md uppercase">
                        About
                    </a>
                </li>
                <li>
                    <a href="#contact" className="text-md uppercase">
                        Contact
                    </a>
                </li>
            </ul>
        </nav>
    );

    return (
        <>
            <header className="relative h-screen">
                <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center text-5xl font-extralight tracking-widest uppercase">
                    Daisuke Minowa
                </h1>
                {renderNav({ className: 'absolute top-[calc(60%)] left-1/2 -translate-x-1/2 transform' })}
                {renderNav({
                    className: `fixed top-0 left-0 w-full bg-white shadow-md transform transition-all duration-300 ease-in-out z-50 ${isSticky ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`,
                    'aria-hidden': true,
                })}
            </header>
            <main>
                <section id="portfolio">
                    <h2 className="text-center text-3xl tracking-wide uppercase">Portfolio</h2>
                </section>

                <section id="about" className="mt-5">
                    <h2 className="text-center text-3xl tracking-wide uppercase">About</h2>
                </section>
                <section id="contact" className="mt-5">
                    <h2 className="text-center text-3xl tracking-wide uppercase">Contact</h2>
                </section>
            </main>
            <footer className="mt-10">
                <p className="text-center">&copy; {new Date().getFullYear()} Daisuke Minowa. All rights reserved.</p>
            </footer>
        </>
    );
}
