"use server";

import { headers as getHeaders } from "next/headers";
import { notFound } from "next/navigation";

import { isServiceWorkerRequest } from "../../utils/serviceWorker.utils";

export default async function Offline() {
  const headers = await getHeaders();
  const shouldRespond = isServiceWorkerRequest(headers);

  if (!shouldRespond) {
    notFound();
  }

  return <>you are offline now</>;
}
