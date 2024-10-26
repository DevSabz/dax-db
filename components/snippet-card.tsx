"use client"

import { useState } from "react"
import { Copy, Check, Paintbrush } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

const DAX_FORMATTER_URL = 'https://www.daxformatter.com'

interface Snippet {
  id: number
  title: string
  description: string
  code: string
}

interface SnippetCardProps {
  snippet: Snippet
  isSelected: boolean
  onSelect: (selected: boolean) => void
}

export function SnippetCardComponent({ snippet, isSelected, onSelect }: SnippetCardProps) {
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [formattedHTML, setFormattedHTML] = useState<string>("")
  const [isFormatting, setIsFormatting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const copyToClipboard = async (id: number, code: string) => {
    let textToCopy = code
    if (formattedHTML) {
      const temp = document.createElement('div')
      temp.innerHTML = formattedHTML
      textToCopy = temp.textContent || temp.innerText || code
    }
    await navigator.clipboard.writeText(textToCopy)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const formatDAXCode = async () => {
    setIsFormatting(true)
    setError(null)

    try {
      const cleanCode = encodeURIComponent(snippet.code.trim())
      const url = `${DAX_FORMATTER_URL}/?fx=${cleanCode}&r=US&embed=1`

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'text/html',
        }
      })

      if (!response.ok) {
        throw new Error(`DAX Formatter API error: ${response.status}`)
      }

      const html = await response.text()

      // Extract the content of the <body> tag
      const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)
      if (!bodyMatch) {
        throw new Error('Could not find body content in response')
      }

      const bodyContent = bodyMatch[1]

      // Find the div with class "result"
      const resultMatch = bodyContent.match(/<div class="result">([\s\S]*?)<\/div>/)
      if (!resultMatch) {
        throw new Error('Could not find formatted code in response')
      }

      // Extract the logo/watermark
      const logoMatch = bodyContent.match(/<a href="https:\/\/www\.daxformatter\.com\/"[^>]*>([\s\S]*?)<\/a>/)
      const logoHtml = logoMatch ? logoMatch[0] : ''

      setFormattedHTML(`${resultMatch[1]}<div class="mt-4">${logoHtml}</div>`)
    } catch (error) {
      console.error('Error formatting DAX code:', error)
      setError(`Failed to format DAX code: ${error.message}`)
      setFormattedHTML("") // Clear any partial formatting
    } finally {
      setIsFormatting(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">{snippet.title}</CardTitle>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Details</span>
          <Switch
            checked={isSelected}
            onCheckedChange={onSelect}
          />
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm mb-2">{snippet.description}</CardDescription>
        <div className="relative bg-white p-4 rounded-md">
          {formattedHTML ? (
            <div
              dangerouslySetInnerHTML={{ __html: formattedHTML }}
              className="font-mono"
            />
          ) : (
            <pre className="whitespace-pre-wrap break-words font-mono">
              {snippet.code}
            </pre>
          )}
          <div className="absolute top-2 right-2 flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={formatDAXCode}
              disabled={isFormatting}
            >
              {isFormatting ? (
                <Paintbrush className="h-4 w-4 animate-spin" />
              ) : (
                <Paintbrush className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(snippet.id, snippet.code)}
              disabled={isFormatting}
            >
              {copiedId === snippet.id ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        {error && (
          <p className="text-red-500 mt-2 text-sm">{error}</p>
        )}
      </CardContent>
    </Card>
  )
}