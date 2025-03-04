"use client";

import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "../components/QueryProvider/QueryProvider";

export function Home() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.test.queryOptions());

  return data;
}
