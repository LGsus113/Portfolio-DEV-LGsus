import { defineCollection, z } from "astro:content";

const experiences = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string(),
    download: z.string(),
    badge: z.string(),
    type: z.string(),
  })
});

export const collections = {
  experiences,
};