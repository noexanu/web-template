"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { signupSchema } from "./form.types";
import { Form } from "../../components/Form/Form";
import { useTRPC } from "../../components/QueryProvider/QueryProvider";
import { TextInput } from "../../components/TextInput.example";
import { ROUTES } from "../../const/routes.const";
import { useAuthStore } from "../../stores/authStore";

export default function Signup() {
  const { setAccessToken } = useAuthStore();
  const router = useRouter();
  const trpc = useTRPC();

  const { mutate } = useMutation(
    trpc.signupWithEmailAndPassword.mutationOptions({
      onSuccess: (data) => {
        setAccessToken(data.accessToken);
        router.push(ROUTES.home);
      },
    })
  );

  return (
    <Form schema={signupSchema} onSubmit={mutate}>
      <TextInput name="email" />
      <TextInput name="password" />
      <input type="submit" />
    </Form>
  );
}
