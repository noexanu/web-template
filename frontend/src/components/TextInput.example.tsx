import { useController } from "react-hook-form";

export const TextInput = (props: { name: string }) => {
  const {
    field: { value: defaultValue, ...fieldProps },
    // fieldState,
  } = useController(props);

  return (
    <input type="text" {...props} {...fieldProps} defaultValue={defaultValue} />
  );
};
