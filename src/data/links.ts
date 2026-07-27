import type { ResourceLink } from '../types'

// ============================================================================
//  Link helpers.
//  - `doc`, `cookbook`, `article`, `tool` point at REAL, canonical URLs.
//  - `ytSearch`, `udemySearch`, `courseraSearch`, `webSearch` build
//    pre-filled SEARCH links that are guaranteed not to 404 — we never invent
//    a specific video id or course slug that might be dead.
// ============================================================================

export const doc = (label: string, path: string): ResourceLink => ({
  label,
  url: path.startsWith('http') ? path : `https://docs.anthropic.com/en/${path.replace(/^\//, '')}`,
  kind: 'docs',
  source: 'Anthropic docs',
})

export const cookbook = (label: string, path = ''): ResourceLink => ({
  label,
  url: `https://github.com/anthropics/anthropic-cookbook${path ? '/blob/main/' + path.replace(/^\//, '') : ''}`,
  kind: 'cookbook',
  source: 'Anthropic Cookbook',
})

export const article = (label: string, url: string, source = 'Anthropic'): ResourceLink => ({
  label,
  url,
  kind: 'article',
  source,
})

export const tool = (label: string, url: string, source = ''): ResourceLink => ({
  label,
  url,
  kind: 'tool',
  source,
})

export const ytSearch = (query: string, label?: string): ResourceLink => ({
  label: label ?? `Video: ${query}`,
  url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
  kind: 'video',
  source: 'YouTube search',
})

export const udemySearch = (query: string, label?: string): ResourceLink => ({
  label: label ?? `Udemy: ${query}`,
  url: `https://www.udemy.com/courses/search/?q=${encodeURIComponent(query)}`,
  kind: 'course',
  source: 'Udemy search',
})

export const courseraSearch = (query: string, label?: string): ResourceLink => ({
  label: label ?? `Coursera: ${query}`,
  url: `https://www.coursera.org/search?query=${encodeURIComponent(query)}`,
  kind: 'course',
  source: 'Coursera search',
})

export const dlai = (label = 'DeepLearning.AI short courses'): ResourceLink => ({
  label,
  url: 'https://www.deeplearning.ai/short-courses/',
  kind: 'course',
  source: 'DeepLearning.AI',
})

export const webSearch = (query: string, label?: string): ResourceLink => ({
  label: label ?? `Search: ${query}`,
  url: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
  kind: 'search',
  source: 'Web search',
})

// Canonical anchors reused across weeks.
export const LINKS = {
  intro: doc('Intro to Claude', 'docs/intro-to-claude'),
  models: doc('Models overview', 'docs/about-claude/models/overview'),
  messages: doc('Messages API', 'api/messages'),
  systemPrompts: doc('System prompts', 'docs/build-with-claude/prompt-engineering/system-prompts'),
  streaming: doc('Streaming', 'docs/build-with-claude/streaming'),
  vision: doc('Vision', 'docs/build-with-claude/vision'),
  promptEng: doc('Prompt engineering overview', 'docs/build-with-claude/prompt-engineering/overview'),
  xml: doc('Use XML tags', 'docs/build-with-claude/prompt-engineering/use-xml-tags'),
  cot: doc('Chain of thought', 'docs/build-with-claude/prompt-engineering/chain-of-thought'),
  prefill: doc('Prefill Claude’s response', 'docs/build-with-claude/prompt-engineering/prefill-claudes-response'),
  toolUse: doc('Tool use overview', 'docs/build-with-claude/tool-use/overview'),
  extThinking: doc('Extended thinking', 'docs/build-with-claude/extended-thinking'),
  caching: doc('Prompt caching', 'docs/build-with-claude/prompt-caching'),
  batch: doc('Message Batches API', 'docs/build-with-claude/batch-processing'),
  embeddings: doc('Embeddings', 'docs/build-with-claude/embeddings'),
  citations: doc('Citations', 'docs/build-with-claude/citations'),
  evals: doc('Develop tests & evals', 'docs/test-and-evaluate/develop-tests'),
  jailbreaks: doc('Mitigate jailbreaks', 'docs/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks'),
  claudeCode: doc('Claude Code overview', 'docs/claude-code/overview'),
  agentSdk: doc('Claude Agent SDK', 'api/agent-sdk/overview'),
  mcpDocs: doc('MCP (Anthropic docs)', 'docs/mcp'),
  bedrock: doc('Claude on Amazon Bedrock', 'api/claude-on-amazon-bedrock'),
  vertex: doc('Claude on Google Vertex AI', 'api/claude-on-vertex-ai'),
  cookbook: cookbook('Anthropic Cookbook'),
  mcpSite: article('modelcontextprotocol.io', 'https://modelcontextprotocol.io/introduction', 'MCP'),
  effectiveAgents: article('Building effective agents', 'https://www.anthropic.com/research/building-effective-agents', 'Anthropic research'),
  agentSkills: article('Agent Skills', 'https://www.anthropic.com/news/agent-skills', 'Anthropic'),
  artifacts: article('Artifacts', 'https://www.anthropic.com/news/artifacts', 'Anthropic'),
  claudeProduct: article('Claude', 'https://www.anthropic.com/claude', 'Anthropic'),
  aup: article('Usage Policy', 'https://www.anthropic.com/legal/aup', 'Anthropic'),
  rsp: article('Responsible Scaling Policy', 'https://www.anthropic.com/responsible-scaling-policy', 'Anthropic'),
  privacy: article('Privacy & data usage', 'https://privacy.anthropic.com/', 'Anthropic'),
  console: tool('Anthropic Console', 'https://console.anthropic.com/', 'Console'),
  quickstart: doc('Quickstarts', 'docs/get-started'),
} as const
