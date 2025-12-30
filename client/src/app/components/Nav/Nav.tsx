'use client';

import { useEffect, useRef, useState } from 'react';

const SCROLL_KEYS = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', 'Space'];

/** Note that this nav assumes that the correct anchors have been set up in the rest of the page. */
export default function Nav() {
    const [isStickyNavVisible, setIsStickyNavVisible] = useState(false);
    const lastScrollYRef = useRef(0);
    const navigationActiveRef = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            const isNavPastOriginalPosition = window.scrollY > window.innerHeight * 0.75;
            const isScrollingUp = window.scrollY < lastScrollYRef.current;

            // Show while navigating programmatically, or when past the hero and scrolling up.
            if (navigationActiveRef.current || (isNavPastOriginalPosition && isScrollingUp)) {
                setIsStickyNavVisible(true);
            } else {
                setIsStickyNavVisible(false);
            }

            lastScrollYRef.current = window.scrollY;
        };

        const cancelNavigationIfUserScrolls = () => {
            if (!navigationActiveRef.current) return;

            navigationActiveRef.current = false;
            handleScroll();
        };

        const handleKeydown = (event: KeyboardEvent) => {
            if (SCROLL_KEYS.includes(event.code)) {
                cancelNavigationIfUserScrolls();
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('wheel', cancelNavigationIfUserScrolls, { passive: true });
        window.addEventListener('touchmove', cancelNavigationIfUserScrolls, { passive: true });
        window.addEventListener('keydown', handleKeydown, { passive: true });

        handleScroll(); // Set initial visibility based on starting position.

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('wheel', cancelNavigationIfUserScrolls);
            window.removeEventListener('touchmove', cancelNavigationIfUserScrolls);
            window.removeEventListener('keydown', handleKeydown);
        };
    }, []);

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        event.preventDefault();
        navigationActiveRef.current = true;
        setIsStickyNavVisible(true);
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
    };

    const renderNav = ({ className, ...rest }: React.ComponentProps<'nav'>) => (
        <nav className={`align-center z-50 flex justify-center p-3 ${className}`} {...rest}>
            <ul className="flex gap-4">
                <li>
                    <a
                        className="cursor-pointer text-base uppercase hover:text-white/60 md:text-lg"
                        href="#portfolio"
                        onClick={(event) => handleClick(event, '#portfolio')}
                    >
                        Portfolio
                    </a>
                </li>
                <li>
                    <a
                        className="cursor-pointer text-lg uppercase hover:opacity-70 md:text-xl"
                        href="#about"
                        onClick={(event) => handleClick(event, '#about')}
                    >
                        About
                    </a>
                </li>
                <li>
                    <a
                        className="cursor-pointer text-lg uppercase hover:opacity-70 md:text-xl"
                        href="#contact"
                        onClick={(event) => handleClick(event, '#contact')}
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
            {renderNav({ className: 'absolute top-[calc(60%)] left-1/2 -translate-x-1/2 transform text-white' })}
            {renderNav({
                className: `fixed top-0 left-0 w-full bg-white text-black shadow-md transition-all duration-300 ease-in-out ${isStickyNavVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-full opacity-0'}`,
                'aria-hidden': true, // This nav is not necessary for screen readers as it duplicates the content of the static nav.
            })}
        </>
    );
}
