import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "dqto1edk",
  dataset: "production",
  apiVersion: "2023-04-14",
  useCdn: true,
  token: import.meta.env.VITE_APP_CODEHUB_SANITY_TOKEN,
});
