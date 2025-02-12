import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { type Router } from "@template/backend";

export const trpc = createTRPCReact<Router>();
export const trpcClient = trpc.createClient({
  links: [httpBatchLink({ url: "http://localhost:4000/trpc" })],
});
