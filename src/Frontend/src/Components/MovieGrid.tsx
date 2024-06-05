import { FC, ReactNode } from "react";

interface MovieGridProps {
  children?: ReactNode;
}

export const MovieGrid: FC<MovieGridProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-40 pb-10">
      {children}
    </div>
  )
}