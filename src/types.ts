// ============================================================================
//  Curriculum type system — the contract every week data file conforms to.
// ============================================================================

export type ResourceKind =
  | 'docs' // official Anthropic docs
  | 'cookbook' // Anthropic cookbook / code sample
  | 'article' // blog / research / news
  | 'video' // a video search or playlist
  | 'course' // Udemy / Coursera / DeepLearning.AI etc.
  | 'tool' // a tool / console / SDK
  | 'search' // a safe pre-filled search link (won't 404)

export interface ResourceLink {
  label: string
  url: string
  kind: ResourceKind
  /** Human label for provenance, e.g. "Anthropic docs", "YouTube", "Udemy". */
  source?: string
}

export interface QuizQuestion {
  q: string
  /** Answer options, plain text. */
  options: string[]
  /** Zero-based index of the correct option. */
  answer: number
  /** Explanation shown after answering. */
  why: string
}

export interface CodeSnippet {
  title?: string
  /** Language hint for the label, e.g. "python", "bash", "typescript". */
  lang: string
  code: string
}

export interface Lab {
  title: string
  /** Ordered, actionable steps. May contain `backtick` inline code. */
  steps: string[]
  /** The objective completion check. */
  doneWhen: string
  /** Optional starter code / commands the learner can copy. */
  starter?: CodeSnippet[]
  /** Optional nudges when stuck. */
  hints?: string[]
  /** Optional harder stretch goals. */
  stretch?: string[]
}

export interface Day {
  /** e.g. "1.1" */
  id: string
  /** e.g. "Mon" */
  dow: string
  /** e.g. "~7 hrs" */
  hours: string
  focus: string
  learn: {
    intro?: string
    steps: string[]
    resources: ResourceLink[]
  }
  lab: Lab
  quiz: QuizQuestion[]
  tools: string[]
  keyTakeaways?: string[]
}

export interface Week {
  id: number
  /** e.g. "FND-100 · Foundations" */
  code: string
  title: string
  goal: string
  /** Claude stack layer, e.g. "Developer Platform · cross-cutting" */
  layer: string
  /** Belt anchor, e.g. "White (Basecamp)" */
  belt: string
  /** Belt swatch color (hex). */
  beltColor: string
  /** Week header accent color (hex). */
  accent: string
  /** "By the end of this week you can…" bullets. */
  outcomes: string[]
  /** Friday ship deliverable name. */
  shipTitle: string
  days: Day[]
  /** Optional week-level extra resources (books, deep dives). */
  resources?: ResourceLink[]
}
