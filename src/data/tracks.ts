import type { ResourceLink } from '../types'

// ============================================================================
//  Curated, VERIFIED external learning tracks (checked live, July 2026).
//  These are real, stable destinations — not search links. Anthropic Academy
//  courses are free and issue their own completion certificates, which pair
//  well with this program's internal belt certificate.
// ============================================================================

const course = (label: string, url: string, source: string): ResourceLink => ({ label, url, kind: 'course', source })
const site = (label: string, url: string, source: string): ResourceLink => ({ label, url, kind: 'article', source })
const repo = (label: string, url: string): ResourceLink => ({ label, url, kind: 'cookbook', source: 'GitHub' })

/** Official, always-useful destinations — surfaced on the Resources page. */
export const OFFICIAL_TRACKS: { group: string; note: string; links: ResourceLink[] }[] = [
  {
    group: 'Anthropic Academy (free · issues certificates)',
    note: 'The official Anthropic learning platform. Free courses across AI Fluency, product, and developer tracks — each issues a free completion certificate. Pair these with your internal belt certificate.',
    links: [
      site('Anthropic Learn — hub', 'https://www.anthropic.com/learn', 'Anthropic'),
      course('Anthropic Academy — all courses', 'https://anthropic.skilljar.com/', 'Anthropic Academy'),
      course('AI Fluency: Framework & Foundations', 'https://www.anthropic.com/learn/claude-for-you', 'Anthropic Academy'),
      course('Claude by Anthropic — courses', 'https://claude.com/resources/courses', 'Anthropic'),
    ],
  },
  {
    group: 'Hands-on code & tutorials',
    note: 'Run-it-yourself notebooks and tutorials maintained by Anthropic.',
    links: [
      repo('anthropics/courses — educational courses', 'https://github.com/anthropics/courses'),
      repo('Prompt-engineering interactive tutorial', 'https://github.com/anthropics/prompt-eng-interactive-tutorial'),
      repo('anthropics/anthropic-cookbook', 'https://github.com/anthropics/anthropic-cookbook'),
      repo('anthropics/anthropic-quickstarts', 'https://github.com/anthropics/anthropic-quickstarts'),
    ],
  },
  {
    group: 'Partner courses (DeepLearning.AI · Coursera)',
    note: 'Short courses built with Anthropic. Great for a focused evening deep-dive on a specific week.',
    links: [
      course('Claude Code: A Highly Agentic Coding Assistant', 'https://www.deeplearning.ai/courses/claude-code-a-highly-agentic-coding-assistant', 'DeepLearning.AI'),
      course('Agent Skills with Anthropic', 'https://www.deeplearning.ai/courses/agent-skills-with-anthropic', 'DeepLearning.AI'),
      course('Building toward Computer Use with Anthropic', 'https://www.deeplearning.ai/courses/building-toward-computer-use-with-anthropic', 'DeepLearning.AI'),
      course('Anthropic on Coursera', 'https://www.coursera.org/partners/anthropic', 'Coursera'),
    ],
  },
]

/**
 * Per-week recommended external course/material (real links, where one clearly
 * maps). Weeks not listed simply fall back to the general tracks above.
 */
export const WEEK_COURSES: Record<number, ResourceLink[]> = {
  1: [
    course('Anthropic Academy — API / developer track', 'https://anthropic.skilljar.com/', 'Anthropic Academy'),
    repo('anthropic-quickstarts', 'https://github.com/anthropics/anthropic-quickstarts'),
  ],
  2: [
    course('DeepLearning.AI — Claude Code (agentic coding)', 'https://www.deeplearning.ai/courses/claude-code-a-highly-agentic-coding-assistant', 'DeepLearning.AI'),
  ],
  3: [
    repo('Prompt-engineering interactive tutorial (9 chapters)', 'https://github.com/anthropics/prompt-eng-interactive-tutorial'),
    course('Anthropic Academy — model & API courses', 'https://anthropic.skilljar.com/', 'Anthropic Academy'),
  ],
  4: [repo('anthropics/courses — tool use & MCP', 'https://github.com/anthropics/courses')],
  5: [repo('anthropic-cookbook — RAG & embeddings notebooks', 'https://github.com/anthropics/anthropic-cookbook')],
  6: [
    site('Building effective agents (Anthropic research)', 'https://www.anthropic.com/research/building-effective-agents', 'Anthropic'),
    course('DeepLearning.AI — Agent Skills with Anthropic', 'https://www.deeplearning.ai/courses/agent-skills-with-anthropic', 'DeepLearning.AI'),
  ],
  7: [course('Anthropic Academy — API, safety & deployment tracks', 'https://anthropic.skilljar.com/', 'Anthropic Academy')],
}
