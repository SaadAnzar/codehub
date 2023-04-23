import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "un3ooh5x",
  dataset: "production",
  apiVersion: "2023-04-14",
  useCdn: true,
  token: import.meta.env.VITE_APP_CODEHUB_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
