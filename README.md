# Backend Mastery — a 3-month path from mid-level to senior


A documentation-style learning platform (Next.js + [Fumadocs](https://fumadocs.dev)) that teaches the
17 systems every senior backend engineer is expected to know: distributed systems, microservices,
system design, Kubernetes, Docker, AWS/Azure, CI/CD, Linux & networking, PostgreSQL, Redis,
Kafka/RabbitMQ, observability, load balancing, caching, queues & event-driven architecture,
scalability/reliability/fault tolerance, security and testing.

Every topic page includes:

- 🧠 a plain-English **mental model** and a **mentor's note**
- 📚 **core concepts** you must be able to explain
- 📺 **curated, verified videos** (real links to Fireship, ByteByteGo, TechWorld with Nana, Hussein
  Nasser, freeCodeCamp and more) that **play inline**
- 🔗 the best free **docs, books and articles**
- 🔨 a **"Build this" lab** — hands-on every time
- ✅ an **interactive mastery checklist** that saves progress in your browser (localStorage)

It's tied together by a week-by-week [**90-day roadmap**](./content/docs/roadmap.mdx) and three
[**capstone projects**](./content/docs/capstones.mdx).

## Run it

```bash
pnpm install      # first time only
pnpm dev          # start the dev server → http://localhost:3000
```

Production build:

```bash
pnpm build
pnpm start
```

## Where things live

| Path | What it is |
| --- | --- |
| `content/docs/**.mdx` | All the learning content (edit these to change pages) |
| `content/docs/**/meta.json` | Sidebar ordering & section titles |
| `src/components/learn.tsx` | Static components: `VideoGrid`, `Resource`, `MentorNote`, `TopicGrid`, `Roadmap`/`Phase`/`Week` |
| `src/components/learn-client.tsx` | Interactive components: `VideoCard` (inline play), `Checklist`/`Check` (saved progress) |
| `src/components/mdx.tsx` | Registers all components so MDX can use them without imports |
| `src/app/(home)/page.tsx` | The marketing landing page |
| `src/lib/layout.shared.tsx` / `src/lib/shared.ts` | Nav, branding, routes |

## Authoring a new topic page

Create `content/docs/<section>/<slug>.mdx` with frontmatter (`title`, `description`, `icon`), add the
slug to that section's `meta.json`, and use the components above — see
`content/docs/foundations/docker.mdx` as the reference template.

Custom MDX components available everywhere (no imports needed):
`<MentorNote>`, `<VideoGrid>` + `<VideoCard id="…" title="…" channel="…" duration="…" />`,
`<ResourceGrid>` + `<Resource type="doc|book|article|lab|course|paper" … />`,
`<Steps>`/`<Step>`, `<Accordions>`/`<Accordion>`, `<Tabs>`/`<Tab>`,
`<Checklist id="…">` + `<Check>`, `<TopicGrid>`/`<TopicCard>`, `<Roadmap>`/`<Phase>`/`<Week>`.
