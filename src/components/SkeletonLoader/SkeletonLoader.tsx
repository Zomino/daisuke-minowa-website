export default function SkeletonLoader({ children, className, ...props }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
    return (
        <div className={`from-dark-gray via-darker-gray to-dark-gray animate-pulse bg-gradient-to-r ${className}`} {...props}>
            <div className="flex h-full w-full items-center justify-center">{children}</div>
        </div>
    );
}
