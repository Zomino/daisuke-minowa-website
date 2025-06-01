import { type Metadata, type Viewport } from 'next';

import './globals.css';

export const metadata: Metadata = {
    title: 'Daisuke Minowa',
    description: 'The website of Daisuke Minowa, a London-based Japanese artist. Here you find a list of my recent and previous artwork.',
    keywords: 'art, painting, illustration, portfolio, japanese artist, london artist',
    authors: [{ name: 'Zou Minowa', url: 'https://github.com/Zomino' }],
    creator: 'Zou Minowa',
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html className="font-arial scroll-smooth scroll-pt-22" lang="en">
            <body>{children}</body>
        </html>
    );
}
