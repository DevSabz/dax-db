'use client'

import React, { useState, useEffect } from 'react'
import { Search, Plus, Code } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface SidebarProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  selectedSubcategory: string
  setSelectedSubcategory: (subcategory: string) => void
}

interface Category {
  name: string
  subcategory: string[]
}

export function SidebarComponent({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory
}: SidebarProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('name, subcategory')
        .order('name')

      if (error) throw error

      const groupedCategories = data.reduce((acc: Record<string, string[]>, item) => {
        if (!acc[item.name]) {
          acc[item.name] = []
        }
        const subcategories = Array.isArray(item.subcategory) ? item.subcategory : [item.subcategory]
        acc[item.name].push(...subcategories)
        return acc
      }, {})

      const categoriesArray = Object.entries(groupedCategories).map(([name, subcategory]) => ({
        name,
        subcategory
      }))

      setCategories(categoriesArray)
    } catch (error) {
      console.error('Error fetching categories:', error)
      setError('Failed to fetch categories. Please try again later.')
    }
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="w-64 bg-white overflow-hidden flex flex-col border-r">
      {/* Header */}
      <header className="text-gray-800 p-4 flex items-center border-b">
        <Code className="h-5 w-5 mr-2 text-blue-600" />
        <h1 className="text-xl font-bold">Dax Snippets</h1>
      </header>

      <ScrollArea className="flex-grow">
        <div className="p-4 space-y-4">
          <Input
            type="text"
            placeholder="Search DAX snippets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <h2 className="text-xl font-bold">Categories</h2>
          <Button
            variant={selectedCategory === "All" ? "default" : "ghost"}
            className="w-full justify-start mb-2"
            onClick={() => {
              setSelectedCategory("All")
              setSelectedSubcategory("All")
            }}
          >
            All Categories
          </Button>
          {categories.map((category) => (
            <Collapsible key={category.name} className="mb-2">
              <CollapsibleTrigger asChild>
                <Button
                  variant={selectedCategory === category.name ? "default" : "ghost"}
                  className="w-full justify-between"
                >
                  {category.name}
                  <Plus className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-4 mt-2">
                {category.subcategory.map((subcategory) => (
                  <Button
                    key={subcategory}
                    variant={selectedSubcategory === subcategory ? "default" : "ghost"}
                    className="w-full justify-start mb-1 text-sm"
                    onClick={() => {
                      setSelectedCategory(category.name)
                      setSelectedSubcategory(subcategory)
                    }}
                  >
                    {subcategory}
                  </Button>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}