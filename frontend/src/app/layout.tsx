import "../styles/globals.scss";
import { type PropsWithChildren } from "react";

import { QueryProvider } from "../components/QueryProvider/QueryProvider";

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
