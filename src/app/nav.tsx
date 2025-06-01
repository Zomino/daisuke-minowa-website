'use client';

import { type HTMLAttributes } from 'react';

/** Note that this nav assumes that the correct anchors have been set up in the rest of the page. */
export default function Nav({ className = '', onNavigate, ...rest }: HTMLAttributes<HTMLElement> & { className?: string; onNavigate?: () => void }) {
    const handleClick = (href: string) => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);

        onNavigate?.();
    };

    return (
        <nav className={`align-center z-50 flex justify-center p-3 ${className}`} {...rest}>
            <ul className="flex gap-4">
                <li>
                    <a className="text-md cursor-pointer uppercase hover:text-black/60" onClick={() => handleClick('#portfolio')}>
                        Portfolio
                    </a>
                </li>
                <li>
                    <a className="text-md cursor-pointer uppercase hover:text-black/60" onClick={() => handleClick('#about')}>
                        About
                    </a>
                </li>
                <li>
                    <a className="text-md cursor-pointer uppercase hover:text-black/60" onClick={() => handleClick('#contact')}>
                        Contact
                    </a>
                </li>
            </ul>
        </nav>
    );
}
