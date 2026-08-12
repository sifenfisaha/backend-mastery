'use client';

import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import { Check as CheckIcon, Play, ExternalLink } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*  VideoCard — a YouTube resource that plays inline on click                 */
/* -------------------------------------------------------------------------- */

export interface VideoCardProps {
  /** YouTube video id (the v= part). Omit for playlists/channels and pass href. */
  id?: string;
  title: string;
  channel?: string;
  duration?: string;
  /** Used when there is no single video id (playlist, channel, external). */
  href?: string;
}

export function VideoCard({ id, title, channel, duration, href }: VideoCardProps) {
  const [playing, setPlaying] = useState(false);
  const watchUrl = href ?? (id ? `https://www.youtube.com/watch?v=${id}` : '#');
  const thumb = id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : undefined;

  return (
    <div className="not-prose group flex flex-col overflow-hidden rounded-xl border border-fd-border bg-fd-card text-fd-card-foreground shadow-sm transition-colors hover:border-fd-primary/40">
      <div className="relative aspect-video w-full overflow-hidden bg-fd-muted">
        {playing && id ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerated-motion; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => (id ? setPlaying(true) : window.open(watchUrl, '_blank'))}
            className="absolute inset-0 flex items-center justify-center"
            aria-label={`Play ${title}`}
          >
            {thumb ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={thumb}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-fd-primary/20 via-fd-card to-fd-accent" />
            )}
            <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition-transform group-hover:scale-110">
              <Play className="ml-0.5 h-6 w-6 fill-current" />
            </span>
            {duration ? (
              <span className="absolute bottom-2 right-2 z-10 rounded bg-black/75 px-1.5 py-0.5 text-xs font-medium text-white">
                {duration}
              </span>
            ) : null}
          </button>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <a
          href={watchUrl}
          target="_blank"
          rel="noreferrer"
          className="line-clamp-2 text-sm font-semibold decoration-fd-primary/50 hover:underline"
        >
          {title}
        </a>
        <div className="mt-auto flex items-center justify-between pt-1 text-xs text-fd-muted-foreground">
          <span className="truncate">{channel}</span>
          <a
            href={watchUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 shrink-0 hover:text-fd-foreground"
          >
            YouTube <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Checklist — mastery checklist with per-page localStorage persistence       */
/* -------------------------------------------------------------------------- */

interface ChecklistCtx {
  checked: boolean[];
  toggle: (i: number) => void;
}
const Ctx = createContext<ChecklistCtx | null>(null);

export function Checklist({ id, children }: { id: string; children: ReactNode }) {
  const items = Children.toArray(children).filter(isValidElement) as ReactElement[];
  const total = items.length;
  const storageKey = `mastery:${id}`;

  const [checked, setChecked] = useState<boolean[]>(() => Array(total).fill(false));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as boolean[];
        setChecked(Array.from({ length: total }, (_, i) => parsed[i] ?? false));
      }
    } catch {
      /* ignore */
    }
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey, total]);

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const done = checked.filter(Boolean).length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const ctx = useMemo(() => ({ checked, toggle }), [checked]);

  return (
    <Ctx.Provider value={ctx}>
      <div className="not-prose my-4 rounded-xl border border-fd-border bg-fd-card p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-sm font-semibold">Mastery checklist</span>
          <span className="text-xs text-fd-muted-foreground">
            {ready ? `${done}/${total} · ${pct}%` : `${total} items`}
          </span>
        </div>
        <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-fd-muted">
          <div
            className="h-full rounded-full bg-fd-primary transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <ul className="flex flex-col gap-1.5">
          {items.map((child, i) => cloneElement(child, { key: i, index: i } as never))}
        </ul>
        {ready && done === total && total > 0 ? (
          <p className="mt-3 text-sm font-medium text-fd-primary">
            🎉 Topic mastered — you can defend every one of these in an interview.
          </p>
        ) : null}
      </div>
    </Ctx.Provider>
  );
}

export function Check({ children, index }: { children: ReactNode; index?: number }) {
  const ctx = useContext(Ctx);
  const i = index ?? 0;
  const isChecked = ctx?.checked[i] ?? false;
  return (
    <li>
      <button
        type="button"
        onClick={() => ctx?.toggle(i)}
        className="flex w-full items-start gap-3 rounded-lg px-2 py-1.5 text-left text-sm transition-colors hover:bg-fd-accent"
      >
        <span
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
            isChecked
              ? 'border-fd-primary bg-fd-primary text-fd-primary-foreground'
              : 'border-fd-border bg-fd-background'
          }`}
        >
          {isChecked ? <CheckIcon className="h-3.5 w-3.5" /> : null}
        </span>
        <span className={isChecked ? 'text-fd-muted-foreground line-through' : ''}>{children}</span>
      </button>
    </li>
  );
}
