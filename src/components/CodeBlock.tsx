import { useState } from 'react'
import type { CodeSnippet } from '../types'
import { IconCopy, IconCheck } from './icons'

/** Extremely lightweight token highlighter — good enough for short snippets. */
function highlight(code: string, lang: string): string {
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  if (lang === 'bash' || lang === 'sh') {
    html = html.replace(/(^|\n)(#[^\n]*)/g, (_m, a, c) => `${a}<span class="tok-com">${c}</span>`)
    html = html.replace(/(&quot;[^&]*?&quot;|'[^']*?')/g, '<span class="tok-str">$1</span>')
    return html
  }

  const kw = /\b(import|from|def|return|if|else|elif|for|while|in|class|const|let|var|function|async|await|new|export|with|as|try|except|True|False|None|null|true|false)\b/g
  const str = /(&quot;.*?&quot;|'.*?'|`.*?`|f&quot;.*?&quot;)/g
  const com = /(#[^\n]*|\/\/[^\n]*)/g
  const fn = /\b([a-zA-Z_]\w*)(?=\()/g

  html = html.replace(com, '<span class="tok-com">$1</span>')
  html = html.replace(str, '<span class="tok-str">$1</span>')
  html = html.replace(kw, '<span class="tok-key">$1</span>')
  html = html.replace(fn, '<span class="tok-fn">$1</span>')
  return html
}

export function CodeBlock({ snippet }: { snippet: CodeSnippet }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch {
      /* ignore */
    }
  }
  return (
    <div className="mt-2 overflow-hidden rounded-[10px] border border-[#372b48]">
      <div className="flex items-center justify-between bg-[#1a1424] px-3 py-1.5">
        <span className="mono text-[10.5px] font-semibold uppercase tracking-wider text-plum-soft">
          {snippet.title || snippet.lang}
        </span>
        <button
          onClick={copy}
          className="flex items-center gap-1 rounded px-2 py-1 text-[11px] text-plum-soft transition hover:text-white"
        >
          {copied ? <IconCheck className="h-3.5 w-3.5" /> : <IconCopy className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="codeblock !mt-0 !rounded-none !border-0">
        <code dangerouslySetInnerHTML={{ __html: highlight(snippet.code, snippet.lang) }} />
      </pre>
    </div>
  )
}
