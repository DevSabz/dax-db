"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { SnippetCardComponent } from "./snippet-card"

interface Snippet {
  id: number
  title: string
  description: string
  code: string
  formattedCode?: string
  context?: string
  implementation?: string
}

interface SnippetListProps {
  snippets: Snippet[]
  selectedSnippet: number | null
  setSelectedSnippet: (id: number) => void
}

export function SnippetListComponent({ snippets, selectedSnippet, setSelectedSnippet }: SnippetListProps) {
  return (
    <div className="flex-1 bg-white overflow-hidden flex flex-col border-r">
      <header className="text-gray-800 p-4 flex items-center border-b">
        <h2 className="text-xl font-bold">&nbsp;</h2>
      </header>
      <ScrollArea className="flex-grow">
        <div className="p-4 space-y-4">
          {snippets.map((snippet) => (
            <SnippetCardComponent
              key={snippet.id}
              snippet={snippet}
              isSelected={selectedSnippet === snippet.id}
              onSelect={(selected) => {
                if (selected) {
                  setSelectedSnippet(snippet.id)
                } else {
                  setSelectedSnippet(null)
                }
              }}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}