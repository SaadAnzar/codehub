import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: import.meta.env.VITE_APP_CODEHUB_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_APP_CODEHUB_SANITY_DATASET,
  apiVersion: '2021-10-21',
  useCdn: false,
  token: import.meta.env.VITE_APP_CODEHUB_SANITY_TOKEN,
  ignoreBrowserTokenWarning: true,
})
