import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "dqto1edk",
  dataset: "production",
  apiVersion: "2021-10-21",
  useCdn: true,
  token: import.meta.env.VITE_APP_CODEHUB_SANITY_TOKEN,
});
