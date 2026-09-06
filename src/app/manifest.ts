import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mirella",
    short_name: "Mirella",
    description: "Agenda, prontuários e financeiro do consultório",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#F8F1E6",
    theme_color: "#3A1B3D",
    icons: [
      { src: "/icon-192", sizes: "192x192", type: "image/png" },
      { src: "/icon-512", sizes: "512x512", type: "image/png" },
    ],
  };
}
