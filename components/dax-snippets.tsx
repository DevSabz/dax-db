"use client"

import { useState } from "react"
import { Search, Copy, Check, Plus, Info, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const categories = [
  {
    name: "Time Intelligence",
    subcategories: [
      "Year-to-Date (YTD)",
      "Quarter-to-Date (QTD)",
      "Month-to-Date (MTD)",
      "Previous Year/Month/Quarter Comparisons",
      "Moving Averages",
      "Rolling Periods",
      "Running Totals"
    ]
  },
  {
    name: "Aggregations",
    subcategories: [
      "Sum, Average, Min, Max",
      "Count and Distinct Count",
      "Weighted Averages",
      "Custom Aggregations (SUMX, AVERAGEX)"
    ]
  },
  {
    name: "Financial Calculations",
    subcategories: [
      "Profit and Loss (P&L)",
      "Gross Profit Margin",
      "Return on Investment (ROI)",
      "Net Present Value (NPV)",
      "Internal Rate of Return (IRR)",
      "Break-even Analysis"
    ]
  },
  {
    name: "Filtering",
    subcategories: [
      "Filter Context Manipulation (CALCULATE, FILTER)",
      "Conditional Aggregations",
      "Top N Filtering",
      "Dynamic Filtering with Slicer Interaction"
    ]
  },
  {
    name: "Ranking and Sorting",
    subcategories: [
      "Rank Measures (RANKX)",
      "Dynamic Sorting",
      "Percentile and Quartile Rankings"
    ]
  },
  {
    name: "Text Operations",
    subcategories: [
      "String Concatenation (CONCATENATE)",
      "Extracting Text (LEFT, MID, RIGHT)",
      "Searching and Replacing Text (SEARCH, SUBSTITUTE)",
      "Formatting Numbers and Dates as Text"
    ]
  },
  {
    name: "Conditional Logic",
    subcategories: [
      "IF Statements",
      "SWITCH for Multiple Conditions",
      "Error Handling (IFERROR)",
      "Nested Conditions"
    ]
  },
  {
    name: "Advanced Calculations",
    subcategories: [
      "Calculated Columns vs. Measures",
      "Iterative Functions (SUMX, AVERAGEX)",
      "Context Transition",
      "Calculating Ratios and Percentages"
    ]
  },
  {
    name: "Statistical Analysis",
    subcategories: [
      "Variance (VARX, STDEVX)",
      "Correlation and Covariance",
      "Linear Regression",
      "Percentile Calculations"
    ]
  },
  {
    name: "Date and Time Calculations",
    subcategories: [
      "Calculating Age from Date of Birth",
      "Time Durations (DATEDIFF)",
      "Dynamic Date Tables",
      "Time Zone Conversions"
    ]
  },
  {
    name: "Key Performance Indicators (KPIs)",
    subcategories: [
      "KPIs for Sales, Revenue, and Costs",
      "Traffic Light Indicators (Red, Yellow, Green)",
      "Variance Analysis (Target vs. Actual)"
    ]
  },
  {
    name: "Customer and Sales Insights",
    subcategories: [
      "Customer Retention/Churn Analysis",
      "Sales Forecasting",
      "Cohort Analysis",
      "Basket Analysis (Cross-selling Opportunities)"
    ]
  },
  {
    name: "Hierarchical Calculations",
    subcategories: [
      "Parent-Child Hierarchies (PATH function)",
      "Aggregating by Hierarchy Levels",
      "Drill-Through and Drill-Down Measures"
    ]
  },
  {
    name: "Geospatial Calculations",
    subcategories: [
      "Geographical Reporting",
      "Distance Calculation Between Locations",
      "Mapping Visualizations"
    ]
  },
  {
    name: "Budgeting and Forecasting",
    subcategories: [
      "Budget vs. Actual",
      "Forecasting Models",
      "Trend Analysis"
    ]
  },
  {
    name: "Data Transformation",
    subcategories: [
      "Data Normalization (LOG, Z-scores)",
      "Pivoting and Unpivoting Data",
      "Table Joins and Relationships"
    ]
  },
  {
    name: "Custom Visualizations",
    subcategories: [
      "Measures for Custom Charts (Waterfall, Gantt)",
      "Dynamic Axis/Legend Swapping",
      "Custom Tooltip Measures"
    ]
  },
  {
    name: "Security and Role-Based Access",
    subcategories: [
      "Row-Level Security (RLS)",
      "Dynamic User-Based Filters",
      "Auditing and Tracking User Interactions"
    ]
  },
  {
    name: "Inventory and Operations",
    subcategories: [
      "Stock Levels and Inventory Turnover",
      "Supplier Lead Time Analysis",
      "Capacity Utilization"
    ]
  },
  {
    name: "Human Resources (HR) Metrics",
    subcategories: [
      "Employee Turnover Rate",
      "Average Tenure",
      "Salary and Compensation Analysis"
    ]
  }
];


const initialSnippets = [
  {
    id: 1,
    title: "Year-to-Date Sales",
    description: "Calculates year-to-date sales",
    code: `YTD Sales = 
TOTALYTD(
    SUM(Sales[SalesAmount]),
    'Date'[Date]
)`,
    category: "Time Intelligence",
    subcategory: "Year-to-Date (YTD)",
    context: "This measure calculates the cumulative sales from the beginning of the year up to the current date. It's useful for comparing performance across different years.",
    implementation: "Ensure you have a 'Date' table with a continuous date column and a 'Sales' table with a 'SalesAmount' column. TOTALYTD automatically determines the year based on the current filter context."
  },
  {
    id: 2,
    title: "Total Sales",
    description: "Calculates the total sales amount.",
    code: `Total Sales = 
SUM(Sales[SalesAmount])`,
    category: "Aggregations",
    subcategory: "Sum, Average, Min, Max",
    context: "This basic measure sums up the sales amount for all records in the 'Sales' table. It's widely used for total sales calculation.",
    implementation: "Create this measure in your 'Sales' table. It aggregates the 'SalesAmount' column across the current filter context."
  },
  {
    id: 3,
    title: "Gross Profit Margin",
    description: "Calculates the gross profit margin as a percentage.",
    code: `Gross Profit Margin = 
DIVIDE(
    [Gross Profit],
    [Total Revenue],
    0
)`,
    category: "Financial Calculations",
    subcategory: "Gross Profit Margin",
    context: "This measure calculates the gross profit margin as a percentage. It divides the gross profit by the total revenue, handling division by zero with a default value of 0.",
    implementation: "You need to create two other measures for 'Gross Profit' and 'Total Revenue' before implementing this margin calculation."
  },
  {
    id: 4,
    title: "Filtered Sales",
    description: "Calculates total sales for a specific product category.",
    code: `Filtered Sales = 
CALCULATE(
    SUM(Sales[SalesAmount]),
    'Product'[Category] = "Bikes"
)`,
    category: "Filtering",
    subcategory: "Filter Context Manipulation",
    context: "This measure calculates total sales for a specific product category, in this case, 'Bikes'. CALCULATE changes the filter context to include only 'Bikes'.",
    implementation: "Ensure you have a 'Product' table related to the 'Sales' table. Modify the category name as needed."
  },
  {
    id: 5,
    title: "Rank Customers by Sales",
    description: "Ranks customers based on their total sales.",
    code: `Customer Rank = 
RANKX(
    ALL(Customer),
    [Total Sales]
)`,
    category: "Ranking and Sorting",
    subcategory: "Rank Measures",
    context: "This measure ranks customers based on their total sales, ignoring any filters applied to the 'Customer' table. The ranking is dynamic and changes with the filter context.",
    implementation: "You need a 'Customer' table and a 'Total Sales' measure in place before using this ranking measure."
  },
  {
    id: 6,
    title: "Customer Full Name",
    description: "Concatenates the first and last names of customers.",
    code: `Customer Full Name = 
CONCATENATE(
    Customer[FirstName],
    " " & Customer[LastName]
)`,
    category: "Text Operations",
    subcategory: "String Concatenation",
    context: "This measure concatenates the 'FirstName' and 'LastName' columns with a space in between to form a full name for each customer.",
    implementation: "Make sure the 'Customer' table has both 'FirstName' and 'LastName' columns. Adjust the space separator as necessary."
  },
  {
    id: 7,
    title: "Profitability Indicator",
    description: "Displays profitability status as a text based on profit.",
    code: `Profitability Status = 
SWITCH(
    TRUE(),
    [Profit] > 1000, "High",
    [Profit] > 500, "Medium",
    [Profit] > 0, "Low",
    "Loss"
)`,
    category: "Conditional Logic",
    subcategory: "SWITCH for Multiple Conditions",
    context: "This measure categorizes profitability into four levels based on the amount of profit: 'High', 'Medium', 'Low', or 'Loss'.",
    implementation: "You need a 'Profit' measure before implementing this. The SWITCH function evaluates conditions sequentially."
  },
  {
    id: 8,
    title: "Standard Deviation of Sales",
    description: "Calculates the standard deviation of sales amounts.",
    code: `Sales STDEV = 
STDEVX(
    Sales,
    Sales[SalesAmount]
)`,
    category: "Statistical Analysis",
    subcategory: "Variance and Standard Deviation",
    context: "This measure calculates the standard deviation of the 'SalesAmount' column across the 'Sales' table.",
    implementation: "Ensure the 'Sales' table contains numerical values in the 'SalesAmount' column for accurate calculation."
  },
  {
    id: 9,
    title: "Employee Tenure",
    description: "Calculates the tenure of an employee in years.",
    code: `Employee Tenure = 
DATEDIFF(
    Employee[HireDate],
    TODAY(),
    YEAR
)`,
    category: "Date and Time Calculations",
    subcategory: "Time Durations",
    context: "This measure calculates the tenure of an employee by subtracting the 'HireDate' from today's date, returning the result in years.",
    implementation: "Ensure the 'Employee' table has a 'HireDate' column. Adjust the units (YEAR) if needed for months or days."
  },
  {
    id: 10,
    title: "Variance to Budget",
    description: "Calculates the variance between actual and budgeted values.",
    code: `Variance to Budget = 
[Actual Sales] - [Budgeted Sales]`,
    category: "Key Performance Indicators (KPIs)",
    subcategory: "Variance Analysis",
    context: "This measure calculates the difference between actual sales and budgeted sales. Positive values indicate exceeding the budget, while negative values indicate falling short.",
    implementation: "You need to create measures for 'Actual Sales' and 'Budgeted Sales' before calculating the variance."
  }
];


// Simple DAX syntax highlighting function
const highlightDAX = (code: string) => {
  const keywords = ['TOTALYTD', 'SUM', 'CALCULATE', 'DATEADD', 'DIVIDE', 'FILTER', 'ALL', 'TOPN', 'COUNTROWS', 'AVERAGE', 'CALCULATETABLE']
  const functions = ['BLANK', 'TRUE', 'FALSE']

  return code.split(/\b/).map((token, index) => {
    if (keywords.includes(token)) {
      return `<span key=${index} style="color: #569cd6;">${token}</span>`
    } else if (functions.includes(token)) {
      return `<span key=${index} style="color: #4ec9b0;">${token}</span>`
    } else if (token.startsWith("'") && token.endsWith("'")) {
      return `<span key=${index} style="color: #ce9178;">${token}</span>`
    } else if (!isNaN(Number(token))) {
      return `<span key=${index} style="color: #b5cea8;">${token}</span>`
    }
    return token
  }).join('')
}

export function DaxSnippets() {
  const [snippets, setSnippets] = useState(initialSnippets)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedSubcategory, setSelectedSubcategory] = useState("All")
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [selectedSnippet, setSelectedSnippet] = useState<typeof initialSnippets[0] | null>(null)

  const filteredSnippets = snippets.filter(snippet =>
    (selectedCategory === "All" || snippet.category === selectedCategory) &&
    (selectedSubcategory === "All" || snippet.subcategory === selectedSubcategory) &&
    (snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.code.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const copyToClipboard = (id: number, code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-100 p-4 overflow-auto flex flex-col">
        <Input
          type="text"
          placeholder="Search DAX snippets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <ScrollArea className="flex-grow">
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
                {category.subcategories.map((subcategory) => (
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
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-auto">
        <h1 className="text-4xl font-bold mb-2">daxDB</h1>
        <div className="w-20 h-1 bg-primary mb-6"></div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="max-w-3xl space-y-4">
            {filteredSnippets.map(snippet => (
              <Card key={snippet.id} className="w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg">{snippet.title}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Details</span>
                    <Switch
                      checked={selectedSnippet?.id === snippet.id}
                      onCheckedChange={(checked) => {
                        setSelectedSnippet(checked ? snippet : null)
                      }}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm mb-2">{snippet.description}</CardDescription>
                  <div className="relative">
                    <pre className="p-4 bg-gray-800 rounded-md overflow-x-auto text-sm text-gray-300">
                      <code
                        dangerouslySetInnerHTML={{ __html: highlightDAX(snippet.code) }}
                      />
                    </pre>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(snippet.id, snippet.code)}
                    >
                      {copiedId === snippet.id ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 bg-gray-100 p-4 overflow-auto">
        <h2 className="text-xl font-bold mb-4">Measure Context</h2>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          {selectedSnippet ? (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{selectedSnippet.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-sm text-gray-600 mb-4">{selectedSnippet.context}</p>
                  <h3 className="font-semibold mb-2">Implementation</h3>
                  <p className="text-sm text-gray-600 mb-4">{selectedSnippet.implementation}</p>
                  <h3 className="font-semibold mb-2">Power BI Example</h3>
                  <div className="bg-gray-200 rounded-md p-4 flex items-center justify-center">
                    <ImageIcon className="h-16 w-16 text-gray-400" />
                    <p className="text-sm text-gray-500 ml-2">Image placeholder</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
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
    </div>
  )
}