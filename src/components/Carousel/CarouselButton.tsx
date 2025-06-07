interface CarouselButtonProps extends React.PropsWithChildren<Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'>> {
    ariaLabel: string; // Mandatory aria-label for accessibility
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function CarouselButton({ ariaLabel, children, className, onClick, ...rest }: CarouselButtonProps) {
    return (
        <button
            aria-label={ariaLabel}
            className={`cursor-pointer rounded-full p-3 text-white/70 hover:bg-white/20 ${className}`}
            onClick={onClick}
            {...rest}
        >
            {children}
        </button>
    );
}
