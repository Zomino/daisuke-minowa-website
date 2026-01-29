'use client';

import { forwardRef } from 'react';

interface CarouselButtonProps extends React.PropsWithChildren<Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'>> {
    ariaLabel: string; // Mandatory aria-label for accessibility.
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const CarouselButton = forwardRef<HTMLButtonElement, CarouselButtonProps>(({ ariaLabel, children, className = '', onClick, ...rest }, ref) => {
    return (
        <button
            ref={ref}
            aria-label={ariaLabel}
            className={`cursor-pointer rounded-full border border-black/10 bg-white p-3 text-black/70 shadow-sm hover:bg-black/5 ${className}`}
            onClick={onClick}
            {...rest}
        >
            {children}
        </button>
    );
});

// Set display name for better debugging.
CarouselButton.displayName = 'CarouselButton';

export default CarouselButton;
