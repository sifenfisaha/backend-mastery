'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';

type CopyState = 'idle' | 'copied' | 'error';

/**
 * Row for a machine-readable endpoint.
 *
 * The visible label is always the stable path, so server and client render the
 * same markup and the row never changes width. The copy action resolves the
 * absolute URL in the browser, where the deployment origin is actually known.
 */
export function CopyEndpoint({ path, note }: { path: string; note: string }) {
  const [state, setState] = useState<CopyState>('idle');
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(new URL(path, window.location.origin).href);
      setState('copied');
    } catch {
      setState('error');
    }
    timer.current = setTimeout(() => setState('idle'), 2000);
  }

  return (
    <div className="flex items-stretch">
      <a
        href={path}
        className="group flex min-w-0 flex-1 items-center gap-3 px-4 py-3 transition-colors duration-150 hover:bg-fd-accent focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-fd-ring"
      >
        {/* Stacked on narrow screens so the note stays readable instead of truncating. */}
        <span className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-3">
          <code className="shrink-0 font-mono text-xs font-medium text-fd-foreground">{path}</code>
          <span className="truncate text-xs text-fd-muted-foreground">{note}</span>
        </span>
        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-fd-muted-foreground/60 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fd-foreground" />
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy full URL for ${path}`}
        className="flex w-11 shrink-0 items-center justify-center border-l border-fd-border text-fd-muted-foreground transition-colors duration-150 hover:bg-fd-accent hover:text-fd-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-fd-ring"
      >
        {state === 'copied' ? (
          <Check className="h-4 w-4 text-fd-success" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
      <span aria-live="polite" className="sr-only">
        {state === 'copied' ? `Copied full URL for ${path}` : null}
        {state === 'error' ? 'Copy failed — open the link and copy the address instead' : null}
      </span>
    </div>
  );
}
