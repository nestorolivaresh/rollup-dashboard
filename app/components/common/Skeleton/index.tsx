interface SkeletonLoaderProps {
  lines?: number;
  className?: string;
}
export const Skeleton: React.FC<SkeletonLoaderProps> = ({
  lines = 1,
  className,
}) => {
  return (
    <div className="w-full mx-auto">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          className={`animate-pulse bg-[#272727] rounded ${className}`}
          key={index}
        ></div>
      ))}
    </div>
  );
};
