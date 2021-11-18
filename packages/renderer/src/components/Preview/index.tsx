import React, { createElement } from 'react'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkReact from 'remark-react'
import { defaultSchema } from 'hast-util-sanitize'

import 'github-markdown-css/github-markdown.css'
import './preview.css'

import RemarkCode from '../RemarkCode'

const schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code || []), 'className']
  }
}

interface PreviewProps {
  doc: string
}

export default function Preview({ doc }: PreviewProps) {
  const md = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkReact, {
      createElement,
      sanitize: schema,
      remarkReactComponents: {
        code: RemarkCode
      }
    })
    .processSync(doc).result

  return <div className="preview markdown-body">{md}</div>
}
