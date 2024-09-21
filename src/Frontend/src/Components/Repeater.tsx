import { ReactNode } from "react";

interface RepeatProps {
  count: Number;
  children?: ReactNode;
}

export const Repeater = ({ count, children }: RepeatProps) => {
  return (
    <>
      {[...Array(count)].map(() => children)}
    </>
  )
}