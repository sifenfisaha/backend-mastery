import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import {
  MentorNote,
  Resource,
  ResourceGrid,
  Roadmap,
  Phase,
  Week,
  TopicCard,
  TopicGrid,
  VideoGrid,
} from './learn';
import { Check, Checklist, VideoCard } from './learn-client';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Step,
    Steps,
    Tab,
    Tabs,
    Accordion,
    Accordions,
    // custom learning components
    MentorNote,
    Resource,
    ResourceGrid,
    Roadmap,
    Phase,
    Week,
    TopicCard,
    TopicGrid,
    VideoGrid,
    VideoCard,
    Checklist,
    Check,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
