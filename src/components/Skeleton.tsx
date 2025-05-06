import React from "react";

interface SkeletonProps {
  height?: number;
  width?: string | number;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  height = 150,
  width = "100%",
  className,
}) => {
  return (
    <div
      className={`animate-pulse bg-gray-300 rounded-md ${className}`}
      style={{ height, width }}
    ></div>
  );
};