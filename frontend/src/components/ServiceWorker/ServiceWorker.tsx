"use client";

import { type FC, useEffect } from "react";

import { registerServiceWorker } from "../../utils/serviceWorker.utils";

export const ServiceWorker: FC = () => {
  useEffect(registerServiceWorker, []);

  // eslint-disable-next-line unicorn/no-useless-undefined
  return undefined;
};
