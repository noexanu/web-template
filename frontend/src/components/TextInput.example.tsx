import { type FC, type JSX } from "react";
import { useFormContext } from "react-hook-form";

import { getFieldError } from "../utils/form.utils";

type Props = JSX.IntrinsicElements["input"] & { name: string };

export const TextInput: FC<Props> = (props) => {
  const { register, formState } = useFormContext();
  const error = getFieldError(props.name, formState);

  return (
    <div className="flex">
      <input {...props} {...register(props.name)} />
      {error}
    </div>
  );
};
