import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  FlaskConical,
  FileText,
  GraduationCap,
  Newspaper,
  ScrollText,
  Sparkles,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*  VideoGrid — responsive wrapper for VideoCard                              */
/* -------------------------------------------------------------------------- */

export function VideoGrid({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Resource / ResourceGrid — link cards for docs, books, articles, labs      */
/* -------------------------------------------------------------------------- */

type ResourceType = 'doc' | 'book' | 'article' | 'lab' | 'course' | 'paper';

const RES_META: Record<ResourceType, { icon: typeof BookOpen; label: string; cls: string }> = {
  doc: { icon: FileText, label: 'Docs', cls: 'text-sky-500' },
  book: { icon: BookOpen, label: 'Book', cls: 'text-amber-500' },
  article: { icon: Newspaper, label: 'Article', cls: 'text-violet-500' },
  lab: { icon: FlaskConical, label: 'Hands-on', cls: 'text-emerald-500' },
  course: { icon: GraduationCap, label: 'Course', cls: 'text-rose-500' },
  paper: { icon: ScrollText, label: 'Paper', cls: 'text-teal-500' },
};

export function ResourceGrid({ children }: { children: ReactNode }) {
  return <div className="not-prose my-6 grid grid-cols-1 gap-3 sm:grid-cols-2">{children}</div>;
}

export function Resource({
  title,
  href,
  type = 'article',
  desc,
}: {
  title: string;
  href: string;
  type?: ResourceType;
  desc?: string;
}) {
  const meta = RES_META[type] ?? RES_META.article;
  const Icon = meta.icon;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-start gap-3 rounded-xl border border-fd-border bg-fd-card p-3.5 text-fd-card-foreground no-underline transition-colors hover:border-fd-primary/40 hover:bg-fd-accent"
    >
      <span className={`mt-0.5 shrink-0 ${meta.cls}`}>
        <Icon className="h-5 w-5" />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="flex items-center gap-2">
          <span className="text-sm font-semibold leading-snug">{title}</span>
        </span>
        {desc ? (
          <span className="mt-0.5 text-xs text-fd-muted-foreground">{desc}</span>
        ) : null}
        <span className="mt-1 text-[11px] font-medium uppercase tracking-wide text-fd-muted-foreground">
          {meta.label}
        </span>
      </span>
      <ArrowRight className="ml-auto mt-1 h-4 w-4 shrink-0 text-fd-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/*  MentorNote — the "coach speaking" callout                                 */
/* -------------------------------------------------------------------------- */

export function MentorNote({ title = "Mentor's note", children }: { title?: string; children: ReactNode }) {
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-fd-primary/30 bg-fd-primary/5">
      <div className="flex items-center gap-2 border-b border-fd-primary/20 bg-fd-primary/10 px-4 py-2">
        <Sparkles className="h-4 w-4 text-fd-primary" />
        <span className="text-sm font-semibold text-fd-primary">{title}</span>
      </div>
      <div className="px-4 py-3 text-sm [&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  TopicGrid / TopicCard — navigation cards for the home + index             */
/* -------------------------------------------------------------------------- */

export function TopicGrid({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}

export function TopicCard({
  title,
  href,
  icon,
  desc,
  tag,
}: {
  title: string;
  href: string;
  icon?: string;
  desc?: string;
  tag?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-2 rounded-xl border border-fd-border bg-fd-card p-4 text-fd-card-foreground no-underline transition-all hover:-translate-y-0.5 hover:border-fd-primary/40 hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        {icon ? <span className="text-2xl">{icon}</span> : null}
        {tag ? (
          <span className="rounded-full bg-fd-muted px-2 py-0.5 text-[11px] font-medium text-fd-muted-foreground">
            {tag}
          </span>
        ) : null}
      </div>
      <span className="font-semibold">{title}</span>
      {desc ? <span className="text-sm text-fd-muted-foreground">{desc}</span> : null}
      <span className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-medium text-fd-primary">
        Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/*  Roadmap / Phase / Week — the 3-month timeline                             */
/* -------------------------------------------------------------------------- */

export function Roadmap({ children }: { children: ReactNode }) {
  return <div className="not-prose my-8 flex flex-col gap-8">{children}</div>;
}

export function Phase({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section>
      <div className="mb-4 flex flex-col gap-1 rounded-xl border border-fd-border bg-gradient-to-br from-fd-primary/10 to-transparent p-4">
        <h3 className="m-0 text-lg font-bold">{title}</h3>
        {subtitle ? <p className="m-0 text-sm text-fd-muted-foreground">{subtitle}</p> : null}
      </div>
      <div className="relative ml-3 flex flex-col gap-4 border-l-2 border-dashed border-fd-border pl-6">
        {children}
      </div>
    </section>
  );
}

export function Week({
  n,
  title,
  children,
}: {
  n: number | string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <span className="absolute -left-[33px] flex h-6 w-6 items-center justify-center rounded-full border-2 border-fd-primary bg-fd-background text-[11px] font-bold text-fd-primary">
        {n}
      </span>
      <div className="rounded-xl border border-fd-border bg-fd-card p-4">
        <p className="m-0 mb-1 text-sm font-semibold">{title}</p>
        <div className="text-sm text-fd-muted-foreground [&_p]:my-1.5 [&_ul]:my-1.5 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-0.5 [&_a]:text-fd-primary [&_a]:underline">
          {children}
        </div>
      </div>
    </div>
  );
}
