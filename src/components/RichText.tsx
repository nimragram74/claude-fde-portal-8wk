import { Fragment } from 'react'

/**
 * Renders a string with `backtick` spans as inline code and **bold** as strong.
 * Keeps content data plain-string while still allowing light formatting.
 */
export function RichText({ text }: { text: string }) {
  // Split on `code` first, then on **bold** within non-code segments.
  const parts = text.split(/(`[^`]+`)/g)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={i} className="inline-code">
              {part.slice(1, -1)}
            </code>
          )
        }
        const bold = part.split(/(\*\*[^*]+\*\*)/g)
        return (
          <Fragment key={i}>
            {bold.map((b, j) =>
              b.startsWith('**') && b.endsWith('**') ? (
                <strong key={j} className="font-semibold text-ink dark:text-plum-soft">
                  {b.slice(2, -2)}
                </strong>
              ) : (
                <Fragment key={j}>{b}</Fragment>
              ),
            )}
          </Fragment>
        )
      })}
    </>
  )
}
