import React, { useCallback, useEffect } from 'react'

import './editor.css'
import useCodemirror from '../../use/codemirror'

interface EditorProps {
  doc: string
  onChange: (doc: string) => void
}

export default function Editor({ doc, onChange }: EditorProps) {
  const handleChange = useCallback(
    state => onChange(state.doc.toString()),
    [onChange]
  )

  const [refContainer, editorView] = useCodemirror<HTMLDivElement>({
    initialDoc: doc,
    onChange: handleChange
  })

  useEffect(() => {
    if (!editorView) return
  }, [editorView])

  return <div className="editor-wrapper" ref={refContainer}></div>
}
