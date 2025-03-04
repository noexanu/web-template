import { type ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";

type Props<T extends z.ZodSchema> = {
  schema: T;
  defaultValues?: z.output<T>;
  onSubmit: (formData: z.output<T>) => Promise<void> | void;
  children: ReactNode;
};

export const Form = <T extends z.ZodSchema>({
  schema,
  defaultValues,
  onSubmit,
  children,
}: Props<T>) => {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};
