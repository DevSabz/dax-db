'use client'

import { Info, ImageIcon } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Snippet {
  id: number
  title: string
  context: string
  implementation: string
}

interface SnippetDetailsProps {
  snippet: Snippet | null
}

export function SnippetDetailsComponent({ snippet }: SnippetDetailsProps) {
  return (
    <div className="w-80 bg-white overflow-hidden flex flex-col">
      <h2 className="text-xl font-bold p-4 border-b">Measure Context</h2>
      <ScrollArea className="flex-1">
        {snippet ? (
          <div className="p-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{snippet.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-sm text-gray-600 mb-4">{snippet.context}</p>
                <h3 className="font-semibold mb-2">Implementation</h3>
                <p className="text-sm text-gray-600 mb-4">{snippet.implementation}</p>
                <h3 className="font-semibold mb-2">Power BI Example</h3>
                <div className="bg-gray-100 rounded-md p-4 flex items-center justify-center">
                  <ImageIcon className="h-16 w-16 text-gray-400" />
                  <p className="text-sm text-gray-500 ml-2">Image placeholder</p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="m-4 flex flex-col items-center justify-center p-6 h-[calc(100vh-8rem)] bg-gray-50 border-2 border-dashed">
            <Info className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-center text-lg font-semibold text-gray-500">No Measure Selected</p>
            <p className="text-center text-gray-400 mt-2">
              Toggle the switch on a measure card to view its details here.
            </p>
          </Card>
        )}
      </ScrollArea>
    </div>
  )
}