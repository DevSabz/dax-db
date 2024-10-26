'use client'

import { Info, ImageIcon } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Define types for better type checking
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
    <div className="w-80 bg-gray-100 p-4 overflow-auto">
      <h2 className="text-xl font-bold mb-4">Measure Context</h2>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        {snippet ? (
          <div className="space-y-4">
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
                <div className="bg-gray-200 rounded-md p-4 flex items-center justify-center">
                  <ImageIcon className="h-16 w-16 text-gray-400" />
                  <p className="text-sm text-gray-500 ml-2">Image placeholder</p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Display when no snippet is selected
          <Card className="flex flex-col items-center justify-center p-6 h-full bg-gray-50 border-2 border-dashed">
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