"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Search, Filter, Star, Heart, Grid, List } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 1199,
    originalPrice: 1299,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 2847,
    category: "Smartphones",
    brand: "Apple",
    inStock: true,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    price: 1099,
    originalPrice: 1199,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 1923,
    category: "Smartphones",
    brand: "Samsung",
    inStock: true,
    badge: "New",
  },
  {
    id: 3,
    name: "MacBook Pro 16-inch M3",
    price: 2499,
    originalPrice: 2699,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 1523,
    category: "Laptops",
    brand: "Apple",
    inStock: true,
    badge: "Hot",
  },
  {
    id: 4,
    name: "Dell XPS 13",
    price: 1299,
    originalPrice: 1499,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 892,
    category: "Laptops",
    brand: "Dell",
    inStock: true,
    badge: "Sale",
  },
  {
    id: 5,
    name: "Sony WH-1000XM5",
    price: 349,
    originalPrice: 399,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 3241,
    category: "Audio",
    brand: "Sony",
    inStock: true,
    badge: "Popular",
  },
  {
    id: 6,
    name: "AirPods Pro 2nd Gen",
    price: 229,
    originalPrice: 249,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 4521,
    category: "Audio",
    brand: "Apple",
    inStock: false,
    badge: "Out of Stock",
  },
  {
    id: 7,
    name: 'Samsung 65" OLED TV',
    price: 1899,
    originalPrice: 2199,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 892,
    category: "TVs",
    brand: "Samsung",
    inStock: true,
    badge: "Deal",
  },
  {
    id: 8,
    name: "PlayStation 5",
    price: 499,
    originalPrice: 499,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 5632,
    category: "Gaming",
    brand: "Sony",
    inStock: true,
    badge: "Gaming",
  },
]

const categories = ["All", "Smartphones", "Laptops", "Audio", "TVs", "Gaming"]
const brands = ["All", "Apple", "Samsung", "Sony", "Dell"]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedBrands, setSelectedBrands] = useState([])
  const [priceRange, setPriceRange] = useState([0, 3000])
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState("grid")
  const [showInStockOnly, setShowInStockOnly] = useState(false)

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
        const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand)
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
        const matchesStock = !showInStockOnly || product.inStock

        return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesStock
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return a.price - b.price
          case "price-high":
            return b.price - a.price
          case "rating":
            return b.rating - a.rating
          case "name":
            return a.name.localeCompare(b.name)
          default:
            return 0
        }
      })
  }, [searchTerm, selectedCategory, selectedBrands, priceRange, sortBy, showInStockOnly])

  const handleBrandChange = (brand, checked) => {
    if (checked) {
      setSelectedBrands((prev) => [...prev, brand])
    } else {
      setSelectedBrands((prev) => prev.filter((b) => b !== brand))
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
              <span className="text-xl font-bold">TechVault</span>
            </Link>

            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 space-y-6">
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full border-gray-700 text-gray-300 bg-transparent">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-gray-900 border-gray-800">
                  <SheetHeader>
                    <SheetTitle className="text-white">Filters</SheetTitle>
                  </SheetHeader>
                  {/* Mobile filter content would go here */}
                </SheetContent>
              </Sheet>
            </div>

            <div className="hidden lg:block space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Label key={category} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="text-blue-600"
                      />
                      <span className="text-gray-300">{category}</span>
                    </Label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h3 className="font-semibold mb-3">Brands</h3>
                <div className="space-y-2">
                  {brands
                    .filter((brand) => brand !== "All")
                    .map((brand) => (
                      <Label key={brand} className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={(checked) => handleBrandChange(brand, checked)}
                        />
                        <span className="text-gray-300">{brand}</span>
                      </Label>
                    ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={3000}
                    min={0}
                    step={50}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* In Stock Only */}
              <div>
                <Label className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox checked={showInStockOnly} onCheckedChange={setShowInStockOnly} />
                  <span className="text-gray-300">In Stock Only</span>
                </Label>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">Products</h1>
                <p className="text-gray-400">{filteredProducts.length} products found</p>
              </div>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border border-gray-700 rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300 group"
                >
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                          viewMode === "grid" ? "h-64" : "h-48"
                        }`}
                      />
                      {product.badge && (
                        <Badge
                          className={`absolute top-3 left-3 ${
                            product.badge === "Out of Stock" ? "bg-red-600" : "bg-blue-600"
                          } text-white`}
                        >
                          {product.badge}
                        </Badge>
                      )}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-400">({product.reviews})</span>
                    </div>

                    <h3 className="font-semibold text-white mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-sm text-gray-400 mb-3">
                      {product.brand} • {product.category}
                    </p>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-bold text-white">${product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 pt-0">
                    <Button
                      className={`w-full ${
                        product.inStock ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-600 cursor-not-allowed"
                      }`}
                      disabled={!product.inStock}
                    >
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No products found matching your criteria.</p>
                <Button
                  variant="outline"
                  className="mt-4 border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("All")
                    setSelectedBrands([])
                    setPriceRange([0, 3000])
                    setShowInStockOnly(false)
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
