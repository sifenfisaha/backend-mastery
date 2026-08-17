import type { Folder, Item } from 'fumadocs-core/page-tree';
import type { ReactNode } from 'react';
import { source } from './source';

/**
 * The landing page reads its curriculum from the same page tree that builds the
 * docs sidebar, so topic names, ordering, icons and counts can never drift from
 * `content/docs`. Icons arrive pre-resolved as elements via `lucideIconsPlugin`.
 */

export interface CurriculumTopic {
  title: string;
  description?: string;
  icon?: ReactNode;
  url: string;
}

export interface CurriculumPillar {
  title: string;
  icon?: ReactNode;
  /** Folders have no index page here, so we enter the pillar at its first topic. */
  url: string;
  topics: CurriculumTopic[];
}

function asText(node: ReactNode): string {
  return typeof node === 'string' ? node : '';
}

function buildCurriculum(): CurriculumPillar[] {
  return source
    .getPageTree()
    .children.filter((node): node is Folder => node.type === 'folder')
    .map((folder) => {
      const topics = folder.children
        .filter((node): node is Item => node.type === 'page')
        .map((item) => ({
          title: asText(item.name),
          description: source.getPageByHref(item.url)?.page.data.description,
          icon: item.icon,
          url: item.url,
        }));

      return {
        title: asText(folder.name),
        icon: folder.icon,
        url: folder.index?.url ?? topics[0]?.url ?? '/docs',
        topics,
      };
    })
    .filter((pillar) => pillar.topics.length > 0);
}

export const curriculum = buildCurriculum();

export const topicCount = curriculum.reduce((total, pillar) => total + pillar.topics.length, 0);

export const pillarCount = curriculum.length;
