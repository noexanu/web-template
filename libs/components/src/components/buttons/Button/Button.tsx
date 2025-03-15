import { type JSX } from "react";

export type ButtonProps = JSX.IntrinsicElements["button"] & {
  label: string;
};

export const Button = ({ label, ...props }: ButtonProps) => {
  return (
    <button type="button" {...props}>
      {label}
    </button>
  );
};
