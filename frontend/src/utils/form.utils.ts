import { type FieldValues, type FormState } from "react-hook-form";

export const getFieldError = (
  name: string,
  formState: FormState<FieldValues>
) =>
  formState.errors[name]
    ? (formState.errors[name].message as string)
    : undefined;
