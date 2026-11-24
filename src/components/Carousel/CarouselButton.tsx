"use client";

interface CarouselButtonProps extends React.PropsWithChildren<
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "aria-label">
> {
  ariaLabel: string; // アクセシビリティのため、aria-label は必須。
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function CarouselButton({
  ariaLabel,
  children,
  className = "",
  onClick,
  ...rest
}: CarouselButtonProps) {
  return (
    <button
      aria-label={ariaLabel}
      className={`flex min-h-11 cursor-pointer items-center gap-2 px-2 text-sm tracking-[0.08em] text-ink hover:text-muted ${className}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
