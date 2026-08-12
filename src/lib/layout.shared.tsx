import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Boxes } from 'lucide-react';
import { appName } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Boxes className="h-5 w-5 text-fd-primary" />
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
