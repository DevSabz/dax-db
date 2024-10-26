"use client"

import { useState, useEffect } from "react"
import { createClient } from '@supabase/supabase-js'
import { Linkedin, Heart, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarComponent } from "./sidebar"
import { SnippetListComponent } from "./snippet-list"
import { SnippetDetailsComponent } from "./snippet-details"

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function DAXSnippets() {
  const [snippets, setSnippets] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedSubcategory, setSelectedSubcategory] = useState("All")
  const [selectedSnippet, setSelectedSnippet] = useState(null)

  useEffect(() => {
    fetchSnippets()
  }, [])

  async function fetchSnippets() {
    const { data, error } = await supabase
      .from('snippets')
      .select('*')

    if (error) {
      console.error('Error fetching snippets:', error)
    } else {
      setSnippets(data)
    }
  }

  const handleSnippetSelect = (id) => {
    const snippet = snippets.find(s => s.id === id)
    setSelectedSnippet(snippet)
  }

  const filteredSnippets = snippets.filter(snippet =>
    (selectedCategory === "All" || snippet.category === selectedCategory) &&
    (selectedSubcategory === "All" || snippet.subcategory === selectedSubcategory) &&
    (snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.code.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarComponent
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSubcategory={selectedSubcategory}
        setSelectedSubcategory={setSelectedSubcategory}
      />
      <div className="flex flex-col flex-1 overflow-hidden">


        {/* Main content */}
        <div className="flex flex-1 overflow-hidden">
          <SnippetListComponent
            snippets={filteredSnippets}
            selectedSnippet={selectedSnippet?.id}
            setSelectedSnippet={handleSnippetSelect}
          />
          <SnippetDetailsComponent snippet={selectedSnippet} />
        </div>

        {/* Footer */}
        <footer className="bg-gray-100 py-2 px-4 flex justify-between items-center text-sm text-gray-600">
          <span> © 2024 | Built by: Sabastian Chetty</span>
          <div className="flex items-center space-x-4">
            <a href="https://www.linkedin.com/in/sabastian-chetty" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              <Linkedin className="h-5 w-5" />
            </a>
            <Button variant="outline" size="sm" className="flex items-center">
              <Heart className="h-4 w-4 mr-2" />
              Donate
            </Button>
          </div>
        </footer>
      </div>
    </div>
  )
}