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
      className={`cursor-pointer rounded-full border border-black/10 bg-white p-3 text-black/70 shadow-sm hover:bg-black/5 ${className}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
