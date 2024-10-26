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
    <div className="flex-1 p-4 overflow-hidden relative">
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="space-y-4 pb-16">
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
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </div>
  )
}