import { FC, ReactNode } from "react";

interface RepeatProps {
  times: Number;
  children?: ReactNode;
}

export const Repeat: FC<RepeatProps> = ({ times, children }) => {
  return (
    <>
      {[...Array(times)].map(() => children)}
    </>
  )
}