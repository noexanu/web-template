import "../styles/globals.scss";
import { type PropsWithChildren } from "react";

import { QueryProvider } from "../components/QueryProvider/QueryProvider";
import { ServiceWorker } from "../components/ServiceWorker/ServiceWorker";
import { envPrivateConfig } from "../config/envPrivateConfig";

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  const isDevelopment = envPrivateConfig.ENVIRONMENT === "development";

  return (
    <html lang="en">
      <head>
        {/* Production build always include manifest.webmanifest */}
        {isDevelopment && <link rel="manifest" href="/manifest.webmanifest" />}
      </head>
      <body>
        <ServiceWorker />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
