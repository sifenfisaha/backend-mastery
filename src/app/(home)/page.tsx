import Link from 'next/link';
import {
  ArrowRight,
  Boxes,
  Calendar,
  CheckCircle2,
  PlayCircle,
  Rocket,
} from 'lucide-react';

const PILLARS = [
  { icon: '🐧', title: 'Foundations', desc: 'Linux, networking & Docker — the ground everything stands on.' },
  { icon: '🗄️', title: 'Data Layer', desc: 'PostgreSQL, Redis & caching strategies that survive real traffic.' },
  { icon: '🏛️', title: 'Architecture', desc: 'System design, distributed systems, microservices, scaling.' },
  { icon: '📨', title: 'Messaging', desc: 'Queues, event-driven design, Kafka & RabbitMQ.' },
  { icon: '☸️', title: 'Platform & Ops', desc: 'Kubernetes, AWS/Azure, CI/CD, observability.' },
  { icon: '🛡️', title: 'Quality', desc: 'Security & testing woven through everything you ship.' },
];

const FEATURES = [
  { icon: Calendar, title: '13-week roadmap', desc: 'A week-by-week plan that takes you from mid-level to senior-capable.' },
  { icon: PlayCircle, title: 'Curated video courses', desc: 'Hand-verified videos from the best creators — playable inline.' },
  { icon: CheckCircle2, title: 'Mastery checklists', desc: 'Interactive, saved-in-your-browser progress for every topic.' },
  { icon: Rocket, title: 'Build-this labs', desc: 'Every topic ends with something you build with your own hands.' },
];

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-fd-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-fd-primary)/8%,transparent_60%)]" />
        <div className="relative mx-auto max-w-5xl px-6 py-20 text-center sm:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card px-3 py-1 text-xs font-medium text-fd-muted-foreground">
            <Boxes className="h-3.5 w-3.5 text-fd-primary" /> A 3-month backend mastery program
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            From mid-level to{' '}
            <span className="bg-gradient-to-r from-fd-primary to-purple-500 bg-clip-text text-transparent">
              senior backend engineer
            </span>{' '}
            in 90 days.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-fd-muted-foreground">
            One mentor-built curriculum for the 17 systems every senior is expected to know —
            distributed systems, Kubernetes, Kafka, observability and more. Explanations, verified
            videos, hands-on labs and a day-by-day plan.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/docs/roadmap"
              className="inline-flex items-center gap-2 rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-semibold text-fd-primary-foreground transition-opacity hover:opacity-90"
            >
              Start the 90-day plan <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-lg border border-fd-border bg-fd-card px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-fd-accent"
            >
              Browse all topics
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-5xl px-6 py-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-xl border border-fd-border bg-fd-card p-5">
              <f.icon className="h-6 w-6 text-fd-primary" />
              <h3 className="mt-3 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-fd-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-20">
        <h2 className="text-center text-2xl font-bold">Six pillars, seventeen systems</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-fd-muted-foreground">
          Everything is organized so each topic builds on the last. Follow it top to bottom, or
          jump to what you need.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p) => (
            <Link
              key={p.title}
              href="/docs"
              className="group rounded-xl border border-fd-border bg-fd-card p-5 transition-all hover:-translate-y-0.5 hover:border-fd-primary/40 hover:shadow-md"
            >
              <span className="text-2xl">{p.icon}</span>
              <h3 className="mt-3 flex items-center gap-1 font-semibold">
                {p.title}
                <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </h3>
              <p className="mt-1 text-sm text-fd-muted-foreground">{p.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
