"use client"

import type React from "react"
import { useCart } from "@/hooks/use-cart"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Search, ShoppingCart, User, Menu, ChevronRight, Phone, Mail, Info, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type SubItem = { label: string; href: string }
type NavItem = { label: string; href?: string; subItems?: SubItem[] }

const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/['']/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()

const navItems: NavItem[] = [
  {
    label: "Hi Vis Workwear",
    href: `/products?category=Hi Vis Workwear`,
    subItems: [
      "Bib & Brace",
      "Bodywarmers",
      "Coveralls",
      "Fleeces",
      "Jackets",
      "Polos",
      "T-Shirts",
      "Trousers",
      "Softshells",
      "Sweatshirts",
      "Waistcoats / Vests",
    ].map((l) => ({ label: l, href: `/products?category=Hi Vis Workwear&subCategory=${slugify(l)}` })),
  },
  {
    label: "Flame Retardant",
    href: `/products?category=Flame Retardant`,
  },
  {
    label: "Footwear",
    href: `/products?category=Footwear`,
    subItems: ["Boots", "Wellingtons"].map((l) => ({
      label: l,
      href: `/products?category=Footwear&subCategory=${slugify(l)}`,
    })),
  },
  {
    label: "Personal Protective Equipment",
    href: `/products?category=Personal Protective Equipment`,
    subItems: [
      "Backpacks and Holdalls",
      "Ear Defenders",
      "Eyewear",
      "Face Masks",
      "Gloves",
      "Headtorches",
      "Helmets",
      "Thermal",
    ].map((l) => ({
      label: l,
      href: `/products?category=Personal Protective Equipment&subCategory=${slugify(l)}`,
    })),
  },
  { label: "Corporate Clothing", href: `/products?category=Corporate Clothing` },
  { label: "Women's Workwear", href: `/products?category=Womens Workwear` },
  { label: "Sustainable Workwear", href: `/products?category=Sustainable Workwear` },
  {
    label: "Brands",
    href: "/products",
    subItems: [
      "Beeswift",
      "Pulsar",
      "Leo",
      "Portwest",
      "Orbit",
      "Gore-Tex",
      "Bolle",
      "MSA",
      "Goliath",
      "Buckler Bootz",
      "Dunlop",
      "JSP",
      "ATG Gloves",
      "Prestige",
      "Uneek",
      "Regatta",
      "Traffi",
      "Castle",
      "Centurion",
      "Led Lenser",
    ].map((b) => ({ label: b, href: `/products?brand=${slugify(b)}` })),
  },
  { label: "Clearance", href: "/products?category=Clearance" },
]

export function Header() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const { cart } = useCart()
  const cartItemCount = cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className="w-full border-b bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-slate-900 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <a href="tel:08446920692" className="hover:text-blue-300 transition-colors">
                0844 692 0692
              </a>
            </div>
            <div className="hidden sm:flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <a href="mailto:orders@sisupplies.co.uk" className="hover:text-blue-300 transition-colors">
                orders@sisupplies.co.uk
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/about" className="flex items-center space-x-1 hover:text-blue-300 transition-colors">
              <Info className="h-4 w-4" />
              <span className="hidden md:inline">About Us</span>
            </Link>
            <Link href="/contact" className="flex items-center space-x-1 hover:text-blue-300 transition-colors">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden md:inline">Contact Us</span>
            </Link>
            <Link href="/client-login" className="hover:text-blue-300 transition-colors">
              Client Login
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-blue-50 transition-all"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[320px] sm:w-[400px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-left text-xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {/* Quick Links */}
                <div className="border-b pb-4">
                  <Link
                    href="/about"
                    className="flex items-center space-x-3 py-3 px-2 text-base font-medium hover:text-orange-500 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Info className="h-5 w-5" />
                    <span>About Us</span>
                  </Link>
                  <Link
                    href="/contact"
                    className="flex items-center space-x-3 py-3 px-2 text-base font-medium hover:text-orange-500 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span>Contact Us</span>
                  </Link>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2 px-2">Shop by Category</h3>
                  <Accordion type="single" collapsible className="w-full">
                    {navItems.map((item, index) => {
                      const hasChildren = item.subItems && item.subItems.length > 0

                      if (!hasChildren) {
                        return (
                          <div key={item.label} className="border-b">
                            <Link
                              href={item.href || "#"}
                              className="flex items-center justify-between py-4 px-2 text-sm font-medium hover:text-orange-500 transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              {item.label}
                              <ChevronRight className="h-4 w-4" />
                            </Link>
                          </div>
                        )
                      }

                      return (
                        <AccordionItem key={item.label} value={`item-${index}`}>
                          <AccordionTrigger className="text-sm font-medium hover:text-orange-500 transition-colors">
                            {item.label}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2 pl-4">
                              {item.subItems!.map((sub) => (
                                <Link
                                  key={sub.label}
                                  href={sub.href}
                                  className="block py-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {sub.label}
                                </Link>
                              ))}
                              {item.href && (
                                <Link
                                  href={item.href}
                                  className="block py-2 text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
                                  onClick={() => setIsOpen(false)}
                                >
                                  View All {item.label}
                                </Link>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      )
                    })}
                  </Accordion>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 flex-shrink-0">
            <img src="/sis-logo.png" alt="SIS - Industrial Supplies" className="h-10 md:h-12 w-auto" />
            <div className="hidden lg:block">
              <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
                Industrial Supplies
              </h1>
              <p className="text-xs md:text-sm text-slate-600 font-light">Your Trusted Safety Supplier</p>
            </div>
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <form onSubmit={handleSearch} className="relative w-full">
              <Input
                type="text"
                placeholder="Search for safety equipment, PPE, tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-14 py-3 h-auto w-full border-2 border-slate-200 focus:border-orange-500 rounded-xl bg-white/80 backdrop-blur-sm transition-colors"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg transition-all"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link href="/account">
              <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-orange-50 transition-colors">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative hover:bg-orange-50 transition-colors">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-orange-500 to-orange-600">
                  {cartItemCount}
                </Badge>
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-14 py-3 h-auto w-full rounded-xl border-2 border-slate-200"
            />
            <Button type="submit" size="sm" className="absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-lg">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </header>
  )
}
