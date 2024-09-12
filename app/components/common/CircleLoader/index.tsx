interface CircleLoaderProps {
  size?: number;
  color?: string;
  className?: string;
}

export const CircleLoader = ({
  size = 20,
  color = "#000",
  className,
}: CircleLoaderProps) => {
  return (
    <div className={`flex justify-center items-center ${className}`} data-testid="circle-loader">
      <div
        className="border-4 border-gray-200 rounded-full animate-spin"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderTopColor: color,
        }}
      ></div>
    </div>
  );
};
