import type { MetadataRoute } from "next";
import { iconQuery } from "@/lib/icon-config";
import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: `/icon.png${iconQuery}`,
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: `/apple-icon.png${iconQuery}`,
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
