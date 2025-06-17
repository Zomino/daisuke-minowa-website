'use client';

import { useEffect, useState } from 'react';

/** Note that this nav assumes that the correct anchors have been set up in the rest of the page. */
export default function Nav() {
    const [isStickyNavVisible, setIsStickyNavVisible] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [userRecentlyNavigated, setUserRecentlyNavigated] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Note that starting position of the static nav is assumed to be roughly 3/4 of the way down viewport height when at the top of the page.
            // Ensure that this aligns with the actual position of the static nav in the layout.
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

    const handleClick = (href: string) => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
        setUserRecentlyNavigated(true);
        setTimeout(() => setUserRecentlyNavigated(false), 2000);
    };

    const renderNav = ({ className, ...rest }: React.ComponentProps<'nav'>) => (
        <nav className={`align-center z-50 flex justify-center p-3 ${className}`} {...rest}>
            <ul className="flex gap-4">
                <li>
                    <a
                        className="cursor-pointer text-sm uppercase hover:text-white/60 md:text-lg"
                        href="portfolio"
                        onClick={() => handleClick('#portfolio')}
                    >
                        Portfolio
                    </a>
                </li>
                <li>
                    <a
                        className="cursor-pointer text-sm uppercase hover:text-white/60 md:text-lg"
                        href="#about"
                        onClick={() => handleClick('#about')}
                    >
                        About
                    </a>
                </li>
                <li>
                    <a
                        className="cursor-pointer text-sm uppercase hover:text-white/60 md:text-lg"
                        href="#contact"
                        onClick={() => handleClick('#contact')}
                    >
                        Contact
                    </a>
                </li>
            </ul>
        </nav>
    );

    return (
        <>
            {/*
                The nav is rendered twice to allow for smooth animations on the sticky nav.
                When a single nav is used, the addition and removal of animation classes causes the nav to transition in from the sides of the screen.
                This is not the most modular design, but it works for this simple case.
            */}
            {renderNav({ className: 'absolute top-[calc(60%)] left-1/2 -translate-x-1/2 transform' })}
            {renderNav({
                className: `fixed top-0 left-0 w-full bg-black shadow-md transition-all duration-300 ease-in-out ${isStickyNavVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-full opacity-0'}`,
                'aria-hidden': true, // This nav is not necessary for screen readers as it duplicates the content of the static nav.
            })}
        </>
    );
}
