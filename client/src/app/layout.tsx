import { type Metadata, type Viewport } from 'next';

import './globals.css';

export const metadata: Metadata = {
    title: 'Zou Minowa',
    description: 'The website of Zou Minowa, a London-based Japanese artist. Here you find a list of my recent and previous artwork.',
    keywords: 'art, painting, illustration, portfolio, japanese artist, london artist',
    authors: [{ name: 'Zou Minowa', url: 'https://github.com/Zomino' }],
    creator: 'Zou Minowa',
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html className="font-arial scroll-pt-22 scroll-smooth bg-white text-black" lang="en">
            <body>{children}</body>
        </html>
    );
}
