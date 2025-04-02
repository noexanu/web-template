import { type JSX } from "react";

export type ButtonProps = JSX.IntrinsicElements["button"];

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button type="button" {...props}>
      {children}
    </button>
  );
};
