"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const brands = [
  { name: "Bollé Safety", logo: "/brands/bolle.png" },
  { name: "Centurion", logo: "/brands/centurion.jpg" },
  { name: "Black Knight", logo: "/brands/black-knight.png" },
  { name: "Beeswift", logo: "/brands/beeswift.png" },
  { name: "Castle Clothing", logo: "/brands/castle.jpg" },
  { name: "Goliath Footwear", logo: "/brands/goliath.jpg" },
  { name: "ATG Gloves", logo: "/brands/atg.png" },
  { name: "Alpha Solway", logo: "/brands/alpha.jpg" },
  { name: "Dunlop", logo: "/brands/dunlop.png" },
  { name: "Buckbootz", logo: "/brands/buckbootz.png" },
  { name: "Prestige Leisure UK", logo: "/brands/prestige.jpg" },
  { name: "MSA Safety", logo: "/brands/msa.png" },
  { name: "Leo Workwear", logo: "/brands/leo.png" },
  { name: "Pulsar", logo: "/brands/pulsar.png" },
  { name: "Regatta Professional", logo: "/brands/regatta.png" },
  { name: "Lighthouse", logo: "/brands/lighthouse.png" },
  { name: "Portwest", logo: "/brands/portwest.png" },
  { name: "JSP", logo: "/brands/jsp.jpg" },
  { name: "Hercules", logo: "/brands/hercules.png" },
  { name: "Traffi", logo: "/brands/traffi.jpg" },
  { name: "Uneek", logo: "/brands/uneek.png" },
  { name: "Gore-Tex", logo: "/brands/goretex.png" },
]

export function BrandShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 5

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (brands.length - itemsPerView + 1))
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (brands.length - itemsPerView + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + brands.length - itemsPerView + 1) % (brands.length - itemsPerView + 1))
  }

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Trusted Brands</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We partner with the world&#39;s leading safety equipment manufacturers to bring you the highest quality
            products
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {brands.map((brand, index) => (
                <div key={index} className="flex-shrink-0 w-1/5 px-4">
                  <Card className="p-6 h-32 flex items-center justify-center hover:shadow-lg transition-shadow cursor-pointer group">
                    <img
                      src={brand.logo || "/placeholder.svg"}
                      alt={`${brand.name} logo`}
                      className="max-h-16 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg hover:bg-slate-50 h-10 w-10"
            onClick={prevSlide}
            aria-label="Previous brands"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg hover:bg-slate-50 h-10 w-10"
            onClick={nextSlide}
            aria-label="Next brands"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <div className="text-center mt-8">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl bg-transparent"
              >
                View All Brands
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
                  All Trusted Brands
                </DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {brands.map((brand, index) => (
                  <Card
                    key={index}
                    className="p-6 h-32 flex items-center justify-center hover:shadow-lg transition-shadow cursor-pointer group"
                  >
                    <img
                      src={brand.logo || "/placeholder.svg"}
                      alt={`${brand.name} logo`}
                      className="max-h-16 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  )
}
