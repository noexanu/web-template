"use client";

import { trpc } from "../utils/trpc";

export default function HomePage() {
  const { isPending, isError, data } = trpc.test.useQuery({ text: "User" });

  if (isPending) {
    return <>fetching...</>;
  }

  if (isError) {
    return <>error</>;
  }

  return <>fetched: {data}</>;
}
