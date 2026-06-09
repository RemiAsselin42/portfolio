import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Content Layer (Astro 5) — collections typées via Zod, sources Markdown versionnées.

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.number(),
    tags: z.array(z.string()).default([]),
    url: z.string().url().optional(),
    cover: z.string().optional(),
    order: z.number().default(0),
  }),
});

const experiences = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experiences' }),
  schema: z.object({
    role: z.string(),
    company: z.string(),
    start: z.string(),
    end: z.string().optional(),
    location: z.string().optional(),
  }),
});

const education = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/education' }),
  schema: z.object({
    title: z.string(),
    school: z.string(),
    start: z.string(),
    end: z.string().optional(),
  }),
});

export const collections = { projects, experiences, education };
