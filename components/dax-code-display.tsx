"use client"

import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface DAXCodeDisplayProps {
  code: string
}

export default function DAXCodeDisplay({ code }: DAXCodeDisplayProps) {
  const customStyle = {
    backgroundColor: '#1E1E1E',
    padding: '1rem',
    borderRadius: '4px',
    fontSize: '14px',
    lineHeight: '1.5',
    margin: '0',
    whiteSpace: 'pre-wrap',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word',
  }

  return (
    <div className="relative rounded-md overflow-hidden bg-[#1E1E1E]">
      <SyntaxHighlighter
        language="dax"
        style={{
          ...vscDarkPlus,
          'pre[class*="language-"]': {
            ...vscDarkPlus['pre[class*="language-"]'],
            backgroundColor: '#1E1E1E',
            whiteSpace: 'pre-wrap',
          },
          'code[class*="language-"]': {
            ...vscDarkPlus['code[class*="language-"]'],
            backgroundColor: '#1E1E1E',
            whiteSpace: 'pre-wrap',
          },
        }}
        customStyle={customStyle}
        showLineNumbers={true}
        wrapLines={true}
        lineProps={{
          style: {
            whiteSpace: 'pre-wrap',
            wordBreak: 'keep-all',
            overflowWrap: 'break-word'
          }
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}