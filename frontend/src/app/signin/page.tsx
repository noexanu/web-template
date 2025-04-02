"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "@template/components";

import { signinSchema } from "./form.types";
import { Form } from "../../components/Form/Form";
import { useTRPC } from "../../components/QueryProvider/QueryProvider";
import { TextInput } from "../../components/TextInput.example";
import { ROUTES } from "../../const/routes.const";
import { useAuthStore } from "../../stores/authStore";

export default function Signin() {
  const { setAccessToken } = useAuthStore();
  const router = useRouter();
  const trpc = useTRPC();

  const { mutate } = useMutation(
    trpc.signinWithEmailAndPassword.mutationOptions({
      onSuccess: (data) => {
        setAccessToken(data.accessToken);
        router.push(ROUTES.home);
      },
    })
  );

  return (
    <Form schema={signinSchema} onSubmit={mutate}>
      <TextInput name="email" />
      <TextInput name="password" />
      <Button type="submit">submit</Button>
    </Form>
  );
}
