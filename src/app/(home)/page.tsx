import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  FlaskConical,
  PlayCircle,
  Search,
  Trophy,
} from 'lucide-react';
import { CopyEndpoint } from '@/components/copy-command';
import { curriculum, pillarCount, topicCount } from '@/lib/curriculum';

const WEEK_COUNT = 13;

const SPECS = [
  { value: String(WEEK_COUNT), label: 'weeks' },
  { value: String(topicCount), label: 'topics' },
  { value: String(pillarCount), label: 'pillars' },
  { value: '10–12h', label: 'per week' },
];

const ANATOMY = [
  {
    icon: Compass,
    title: 'Mental model first',
    desc: 'Plain-English explanation of what the system is and why it exists — before any syntax.',
  },
  {
    icon: PlayCircle,
    title: 'Verified video courses',
    desc: 'Hand-checked videos from the best creators, playable inline so you never leave the page.',
  },
  {
    icon: FlaskConical,
    title: 'Build-this lab',
    desc: 'Every topic ends with something you make with your own hands. That is where mastery happens.',
  },
  {
    icon: CheckCircle2,
    title: 'Mastery checklist',
    desc: 'Interactive progress for each topic, saved in your browser. No account, no sign-up.',
  },
];

const PHASES = [
  {
    n: '01',
    title: 'Foundations & Data',
    weeks: [1, 2, 3, 4],
    goal: 'Be completely comfortable in a Linux shell, containerize anything, and model + query data like you mean it.',
  },
  {
    n: '02',
    title: 'Architecture & Messaging',
    weeks: [5, 6, 7, 8, 9],
    goal: 'Think in systems, not files — design under pressure, distribute state, and decouple with messaging.',
  },
  {
    n: '03',
    title: 'Platform, Ops & Quality',
    weeks: [10, 11, 12, 13],
    goal: 'Run it in production like a senior — orchestrate, observe, secure and test what you ship.',
  },
];

const ENDPOINTS = [
  { path: '/llms.txt', note: 'Index of every topic, for LLMs' },
  { path: '/llms-full.txt', note: 'The entire curriculum in one file' },
  { path: '/docs/data/redis.md', note: 'Any topic as raw markdown' },
];

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fd-ring';

/**
 * Rows that sit flush inside an `overflow-hidden` card need the ring drawn
 * inward, otherwise the card clips its left and right edges.
 */
const focusRingInset =
  'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-fd-ring';

function SectionHeading({
  label,
  title,
  description,
  action,
}: {
  label: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <span className="font-mono text-xs uppercase tracking-widest text-fd-muted-foreground">
          {label}
        </span>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
        {description ? (
          <p className="mt-2 text-sm text-fd-muted-foreground sm:text-base">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="landing flex flex-1 flex-col">
      {/* ---------------------------------------------------------------- */}
      {/*  Hero                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative isolate overflow-hidden border-b border-fd-border">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 grid-texture" />
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-fd-muted-foreground">
              {WEEK_COUNT} weeks · self-paced · build every week
            </span>

            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              From mid-level to senior backend engineer in 90 days.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-fd-muted-foreground sm:text-lg">
              One mentor-built curriculum for the {topicCount} systems every senior is expected to
              know — distributed systems, Kubernetes, Kafka, observability and more. Mental models,
              verified videos, hands-on labs and a week-by-week plan.
            </p>

            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Link
                href="/docs/roadmap"
                className={`inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-fd-primary px-5 text-sm font-semibold text-fd-primary-foreground transition-opacity duration-150 hover:opacity-90 ${focusRing}`}
              >
                Start the 90-day plan
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/docs"
                className={`inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-fd-border bg-fd-card px-5 text-sm font-semibold transition-colors duration-150 hover:bg-fd-accent ${focusRing}`}
              >
                Browse all {topicCount} topics
              </Link>
            </div>
          </div>

          {/* Program spec rail — 1px dividers via gap on a bordered surface */}
          <dl className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-fd-border bg-fd-border sm:grid-cols-4">
            {SPECS.map((spec) => (
              <div key={spec.label} className="bg-fd-background px-4 py-5 text-center">
                <dt className="sr-only">{spec.label}</dt>
                <dd>
                  <span className="block font-mono text-2xl font-semibold tracking-tight">
                    {spec.value}
                  </span>
                  <span className="mt-1 block font-mono text-[11px] uppercase tracking-widest text-fd-muted-foreground">
                    {spec.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Topic anatomy                                                    */}
      {/* ---------------------------------------------------------------- */}
      <section
        aria-labelledby="anatomy-heading"
        className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20"
      >
        <div id="anatomy-heading">
          <SectionHeading
            label="Every topic page"
            title="Read it, watch it, build it, prove it."
            description={`The same four-part structure on all ${topicCount} topics, so you always know what to do next.`}
          />
        </div>

        <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-fd-border bg-fd-border sm:grid-cols-2 lg:grid-cols-4">
          {ANATOMY.map((item) => (
            <div key={item.title} className="bg-fd-background p-5">
              <item.icon className="h-5 w-5 text-fd-foreground" strokeWidth={1.75} />
              <h3 className="mt-3 text-sm font-semibold">{item.title}</h3>
              <p className="mt-1.5 text-sm text-fd-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Curriculum — derived from content/docs                           */}
      {/* ---------------------------------------------------------------- */}
      <section
        aria-labelledby="curriculum-heading"
        className="border-y border-fd-border bg-fd-card/30"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div id="curriculum-heading">
            <SectionHeading
              label="Curriculum"
              title={`${pillarCount} pillars, ${topicCount} systems`}
              description="Sequenced so each topic builds on the last. Follow it top to bottom, or jump straight to what you need."
              action={
                <Link
                  href="/docs"
                  className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-lg border border-fd-border bg-fd-background px-4 text-sm font-medium transition-colors duration-150 hover:bg-fd-accent ${focusRing}`}
                >
                  Open the docs
                  <ArrowRight className="h-4 w-4" />
                </Link>
              }
            />
          </div>

          {/*
            Multi-column flow rather than a grid: pillars have uneven topic
            counts, and a grid would leave a tall row's short neighbour with
            dead space. Columns also keep the curriculum in sequence when read
            down one column and then the next.
          */}
          <div className="mt-8 lg:columns-2 lg:gap-4">
            {curriculum.map((pillar) => (
              <div
                key={pillar.title}
                className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-fd-border bg-fd-background"
              >
                <div className="flex items-center gap-3 border-b border-fd-border px-4 py-3">
                  <span
                    aria-hidden
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-fd-border bg-fd-card text-fd-foreground [&_svg]:h-4 [&_svg]:w-4"
                  >
                    {pillar.icon}
                  </span>
                  <h3 className="truncate text-sm font-semibold">{pillar.title}</h3>
                  <span className="ml-auto shrink-0 font-mono text-[11px] uppercase tracking-widest text-fd-muted-foreground">
                    {String(pillar.topics.length).padStart(2, '0')} topics
                  </span>
                </div>

                <ul className="divide-y divide-fd-border">
                  {pillar.topics.map((topic) => (
                    <li key={topic.url}>
                      <Link
                        href={topic.url}
                        className={`group flex items-start gap-3 px-4 py-3 transition-colors duration-150 hover:bg-fd-accent ${focusRingInset}`}
                      >
                        <span
                          aria-hidden
                          className="mt-0.5 shrink-0 text-fd-muted-foreground transition-colors duration-150 group-hover:text-fd-foreground [&_svg]:h-4 [&_svg]:w-4"
                        >
                          {topic.icon}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium">{topic.title}</span>
                          {topic.description ? (
                            <span className="mt-0.5 block text-xs text-fd-muted-foreground">
                              {topic.description}
                            </span>
                          ) : null}
                        </span>
                        <ArrowRight
                          aria-hidden
                          className="mt-0.5 h-4 w-4 shrink-0 text-fd-muted-foreground/50 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-fd-foreground"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  90-day plan                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section
        aria-labelledby="plan-heading"
        className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20"
      >
        <div id="plan-heading">
          <SectionHeading
            label="The plan"
            title="Three phases, thirteen weeks, one build target each."
            description="Budget roughly 10–12 focused hours a week. If you have less time, stretch the plan — don't skip topics."
            action={
              <Link
                href="/docs/roadmap"
                className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-lg border border-fd-border bg-fd-card px-4 text-sm font-medium transition-colors duration-150 hover:bg-fd-accent ${focusRing}`}
              >
                See the week-by-week plan
                <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
        </div>

        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {PHASES.map((phase) => (
            <li
              key={phase.n}
              className="flex flex-col rounded-xl border border-fd-border bg-fd-card p-5"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xs uppercase tracking-widest text-fd-muted-foreground">
                  Phase {phase.n}
                </span>
                <span className="ml-auto font-mono text-[11px] text-fd-muted-foreground">
                  Weeks {phase.weeks[0]}–{phase.weeks[phase.weeks.length - 1]}
                </span>
              </div>

              <h3 className="mt-2 text-base font-semibold">{phase.title}</h3>
              <p className="mt-2 text-sm text-fd-muted-foreground">{phase.goal}</p>

              <div
                aria-hidden
                className="mt-5 flex flex-wrap gap-1.5 border-t border-fd-border pt-4"
              >
                {phase.weeks.map((week) => (
                  <span
                    key={week}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-fd-border bg-fd-background font-mono text-[11px] text-fd-muted-foreground"
                  >
                    {week}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Built for how you study + machine-readable                       */}
      {/* ---------------------------------------------------------------- */}
      <section
        aria-labelledby="tools-heading"
        className="border-t border-fd-border bg-fd-card/30"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div id="tools-heading">
            <SectionHeading
              label="Built for how you study"
              title="Searchable, resumable, and readable by your AI assistant."
            />
          </div>

          <div className="mt-8 grid items-start gap-4 lg:grid-cols-2">
            <ul className="grid gap-px overflow-hidden rounded-xl border border-fd-border bg-fd-border sm:grid-cols-2 lg:grid-cols-1">
              <li className="flex items-start gap-3 bg-fd-background p-5">
                <Search className="mt-0.5 h-5 w-5 shrink-0 text-fd-foreground" strokeWidth={1.75} />
                <div>
                  <h3 className="text-sm font-semibold">Full-text search</h3>
                  <p className="mt-1.5 text-sm text-fd-muted-foreground">
                    Jump to any concept across all {topicCount} topics without leaving the keyboard.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3 bg-fd-background p-5">
                <Trophy className="mt-0.5 h-5 w-5 shrink-0 text-fd-foreground" strokeWidth={1.75} />
                <div>
                  <h3 className="text-sm font-semibold">Capstone projects</h3>
                  <p className="mt-1.5 text-sm text-fd-muted-foreground">
                    Three portfolio-grade systems that force you to combine most of the curriculum at
                    once.{' '}
                    <Link
                      href="/docs/capstones"
                      className={`font-medium text-fd-foreground underline underline-offset-4 decoration-fd-border transition-colors hover:decoration-fd-foreground ${focusRing} rounded-sm`}
                    >
                      Pick one
                    </Link>
                    .
                  </p>
                </div>
              </li>
            </ul>

            <div className="overflow-hidden rounded-xl border border-fd-border bg-fd-background">
              <div className="border-b border-fd-border px-4 py-3">
                <h3 className="font-mono text-xs uppercase tracking-widest text-fd-muted-foreground">
                  Machine-readable
                </h3>
                <p className="mt-1.5 text-sm text-fd-muted-foreground">
                  Every page is served as clean markdown, so you can hand the whole curriculum to an
                  agent.
                </p>
              </div>
              <div className="divide-y divide-fd-border">
                {ENDPOINTS.map((endpoint) => (
                  <CopyEndpoint key={endpoint.path} path={endpoint.path} note={endpoint.note} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Closing CTA                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-t border-fd-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Week 1 starts in a terminal.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-sm text-fd-muted-foreground sm:text-base">
            Health-check a URL end to end — DNS, TCP, TLS expiry, HTTP status — and you have already
            shipped something. That is the whole method: one build, every week, for thirteen weeks.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link
              href="/docs/roadmap"
              className={`inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-fd-primary px-5 text-sm font-semibold text-fd-primary-foreground transition-opacity duration-150 hover:opacity-90 ${focusRing}`}
            >
              Start with week 1
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/docs/how-to-use"
              className={`inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-fd-border bg-fd-card px-5 text-sm font-semibold transition-colors duration-150 hover:bg-fd-accent ${focusRing}`}
            >
              How to use this guide
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
