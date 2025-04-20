"use server";

import { type Metadata } from "next";
import Link from "next/link";

import { Home } from "../components/Home";
import { HydrateClient } from "../components/HydrateClient/HydrateClient";
import { ROUTES } from "../const/routes.const";
import { prefetchQuery } from "../utils/querySSR.utils";
import { trpcSSR } from "../utils/trpcSSR.utils";

export default async function HomePage() {
  await prefetchQuery(trpcSSR.testProtected.queryOptions());

  return (
    <HydrateClient>
      <Home />
      <Link href={ROUTES.signin}>signin</Link>
      <Link href={ROUTES.signup}>signup</Link>
    </HydrateClient>
  );
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "home",
  };
}
