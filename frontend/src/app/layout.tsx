"use client";

import { type PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "../utils/queryClient";
import { trpc, trpcClient } from "../utils/trpc";

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </trpc.Provider>
      </body>
    </html>
  );
}
