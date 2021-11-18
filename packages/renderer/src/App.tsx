import React, { useCallback, useState } from 'react'

import './app.css'
import Editor from './components/Editor'
import Preview from './components/Preview'

export default function App() {
  const [doc, setDoc] = useState<string>('# Hello, World!')

  const handleDocChange = useCallback(newDoc => {
    setDoc(newDoc)
  }, [])

  return (
    <div className="app">
      <Editor doc={doc} onChange={handleDocChange} />
      <Preview doc={doc} />
    </div>
  )
}
