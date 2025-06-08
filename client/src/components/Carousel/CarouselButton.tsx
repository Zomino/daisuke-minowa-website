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
            className={`cursor-pointer rounded-full bg-black/70 p-3 text-white/70 hover:bg-white/20 ${className}`}
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
