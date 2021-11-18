import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useState
} from 'react'

import runmode, { getLanguage } from '../../runmode'

type Tokens = {
  text: string
  style: string | null
}[]

interface RemarkCodeProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}

export default function RemarkCode({ className, children }: RemarkCodeProps) {
  const [spans, setSpans] = useState<Tokens>([])

  const langName = (className || '').substring(9)

  useEffect(() => {
    getLanguage(langName).then(language => {
      if (!language) return

      const body = children instanceof Array ? children[0] : null
      const tokens: Tokens = []
      runmode(
        body as string,
        language,
        (text: string, style: string | null, _from: number, _to: number) => {
          tokens.push({ text, style })
        }
      )
      setSpans(tokens)
    })
  }, [children])

  if (spans.length === 0) return <code>{children}</code>

  return (
    <code>
      {spans.map((span, i) => (
        <span key={i} className={span.style || ''}>
          {span.text}
        </span>
      ))}
    </code>
  )
}
