'use client';

import { type HTMLAttributes } from 'react';

interface NavProps extends HTMLAttributes<HTMLElement> {
    className?: string; // Optional className for additional styling
    onNavigate?: () => void; // Optional callback for navigation events
}

/** Note that this nav assumes that the correct anchors have been set up in the rest of the page. */
export default function Nav({ className = '', onNavigate, ...rest }: NavProps) {
    const handleClick = (href: string) => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
        onNavigate?.();
    };

    return (
        <nav className={`align-center z-50 flex justify-center p-3 ${className}`} {...rest}>
            <ul className="flex gap-4">
                <li>
                    <a className="cursor-pointer text-sm uppercase hover:text-white/60 md:text-lg" onClick={() => handleClick('#portfolio')}>
                        Portfolio
                    </a>
                </li>
                <li>
                    <a className="cursor-pointer text-sm uppercase hover:text-white/60 md:text-lg" onClick={() => handleClick('#about')}>
                        About
                    </a>
                </li>
                <li>
                    <a className="cursor-pointer text-sm uppercase hover:text-white/60 md:text-lg" onClick={() => handleClick('#contact')}>
                        Contact
                    </a>
                </li>
            </ul>
        </nav>
    );
}
