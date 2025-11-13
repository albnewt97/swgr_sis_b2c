"use client"

import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const categories = [
  {
    name: "All Products",
    href: "/products",
  },
  {
    name: "Hi Vis",
    href: "/products?category=Hi Vis Workwear",
    subCategories: [
      { name: "Bib & Brace", href: "/products?category=Hi Vis Workwear&subCategory=bib-and-brace" },
      { name: "Bodywarmers", href: "/products?category=Hi Vis Workwear&subCategory=bodywarmers" },
      { name: "Coveralls", href: "/products?category=Hi Vis Workwear&subCategory=coveralls" },
      { name: "Fleeces", href: "/products?category=Hi Vis Workwear&subCategory=fleeces" },
      { name: "Jackets", href: "/products?category=Hi Vis Workwear&subCategory=jackets" },
      { name: "Polos", href: "/products?category=Hi Vis Workwear&subCategory=polos" },
      { name: "T-Shirts", href: "/products?category=Hi Vis Workwear&subCategory=t-shirts" },
      { name: "Trousers", href: "/products?category=Hi Vis Workwear&subCategory=trousers" },
      { name: "Softshells", href: "/products?category=Hi Vis Workwear&subCategory=softshells" },
      { name: "Sweatshirts", href: "/products?category=Hi Vis Workwear&subCategory=sweatshirts" },
      { name: "Waistcoats / Vests", href: "/products?category=Hi Vis Workwear&subCategory=waistcoats-vests" },
    ],
  },
  {
    name: "Flame Retardant",
    href: "/products?category=Flame Retardant",
  },
  {
    name: "Footwear",
    href: "/products?category=Footwear",
    subCategories: [
      { name: "Boots", href: "/products?category=Footwear&subCategory=boots" },
      { name: "Wellingtons", href: "/products?category=Footwear&subCategory=wellingtons" },
    ],
  },
  {
    name: "PPE",
    href: "/products?category=Personal Protective Equipment",
    subCategories: [
      {
        name: "Backpacks and Holdalls",
        href: "/products?category=Personal Protective Equipment&subCategory=backpacks-and-holdalls",
      },
      { name: "Ear Defenders", href: "/products?category=Personal Protective Equipment&subCategory=ear-defenders" },
      { name: "Eyewear", href: "/products?category=Personal Protective Equipment&subCategory=eyewear" },
      { name: "Face Masks", href: "/products?category=Personal Protective Equipment&subCategory=face-masks" },
      { name: "Gloves", href: "/products?category=Personal Protective Equipment&subCategory=gloves" },
      { name: "Headtorches", href: "/products?category=Personal Protective Equipment&subCategory=headtorches" },
      { name: "Helmets", href: "/products?category=Personal Protective Equipment&subCategory=helmets" },
      { name: "Thermal", href: "/products?category=Personal Protective Equipment&subCategory=thermal" },
    ],
  },
  {
    name: "Corporate Clothing",
    href: "/products?category=Corporate Clothing",
  },
  {
    name: "Women's Workwear",
    href: "/products?category=Womens Workwear",
  },
  {
    name: "Sustainable",
    href: "/products?category=Sustainable Workwear",
  },
  {
    name: "Brands",
    href: "/products",
    subCategories: [
      { name: "Beeswift", href: "/products?brand=beeswift" },
      { name: "Pulsar", href: "/products?brand=pulsar" },
      { name: "Leo", href: "/products?brand=leo" },
      { name: "Portwest", href: "/products?brand=portwest" },
      { name: "Bolle", href: "/products?brand=bolle" },
      { name: "MSA", href: "/products?brand=msa" },
      { name: "Goliath", href: "/products?brand=goliath" },
      { name: "Buckbootz", href: "/products?brand=buckbootz" },
      { name: "Dunlop", href: "/products?brand=dunlop" },
      { name: "JSP", href: "/products?brand=jsp" },
      { name: "ATG", href: "/products?brand=atg" },
      { name: "Prestige", href: "/products?brand=prestige" },
      { name: "Uneek", href: "/products?brand=uneek" },
      { name: "Regatta", href: "/products?brand=regatta" },
      { name: "Traffi", href: "/products?brand=traffi" },
      { name: "Castle", href: "/products?brand=castle" },
      { name: "Centurion", href: "/products?brand=centurion" },
    ],
  },
  {
    name: "Clearance",
    href: "/products?category=Clearance",
  },
]

export function CategoryMenu() {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-blue-600 shadow-md">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-start space-x-1 overflow-x-auto py-0">
          {categories.map((category) => {
            const hasSubCategories = category.subCategories && category.subCategories.length > 0

            if (hasSubCategories) {
              return (
                <DropdownMenu key={category.name}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-white/20 hover:text-white rounded-none border-b-2 border-transparent hover:border-white transition-all font-medium whitespace-nowrap h-12 px-4"
                    >
                      {category.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 max-h-96 overflow-y-auto">
                    <DropdownMenuItem asChild>
                      <Link href={category.href} className="cursor-pointer font-semibold">
                        View All {category.name}
                      </Link>
                    </DropdownMenuItem>
                    {category.subCategories!.map((sub) => (
                      <DropdownMenuItem key={sub.name} asChild>
                        <Link href={sub.href} className="cursor-pointer">
                          {sub.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            }

            return (
              <Link key={category.name} href={category.href}>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/20 hover:text-white rounded-none border-b-2 border-transparent hover:border-white transition-all font-medium whitespace-nowrap h-12 px-4"
                >
                  {category.name}
                </Button>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
