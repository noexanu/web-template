import { type MetadataRoute } from "next";

export default function Manifest(): MetadataRoute.Manifest {
  return {
    name: "My Next.js Application",
    short_name: "Next.js App",
    description: "An application built with Next.js",
    start_url: "/",
    orientation: "portrait",
    display: "standalone",
    theme_color: "#ff0000",
    background_color: "#ff00ff",
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
    screenshots: [
      {
        form_factor: "narrow",
        src: "/screenshot-1080x1920.png",
        sizes: "1080x1920",
        type: "image/png",
      },
      {
        form_factor: "narrow",
        src: "/screenshot-1080x1920.png",
        sizes: "1080x1920",
        type: "image/png",
      },
      {
        form_factor: "narrow",
        src: "/screenshot-1080x1920.png",
        sizes: "1080x1920",
        type: "image/png",
      },
      {
        form_factor: "wide",
        src: "/screenshot-1920x1080.png",
        sizes: "1920x1080",
        type: "image/png",
      },
      {
        form_factor: "wide",
        src: "/screenshot-1920x1080.png",
        sizes: "1920x1080",
        type: "image/png",
      },
      {
        form_factor: "wide",
        src: "/screenshot-1920x1080.png",
        sizes: "1920x1080",
        type: "image/png",
      },
    ],
  };
}
