import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          {/*
            Monogram tile rather than an icon: same anatomy as the pillar
            tiles on the landing page, so the nav reads as part of the same
            system. Decorative — the wordmark beside it carries the name.
          */}
          <span
            aria-hidden
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-fd-border bg-fd-card font-mono text-[10px] font-medium leading-none tracking-tight text-fd-foreground"
          >
            BM
          </span>
          <span className="font-semibold">{appName}</span>
        </>
      ),
    },
    links: [
      {
        text: 'Roadmap',
        url: '/docs/roadmap',
      },
      {
        text: 'All Topics',
        url: '/docs',
      },
    ],
  };
}
