"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Shield, Truck, Award } from "lucide-react"
import { Button } from "@/components/ui/button"

type SlideId = "sis" | "clearance" | "delivery"
type Slide = { id: SlideId; image: string; alt: string }

const slides: Slide[] = [
  {
    id: "sis",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SIS%20Banner-01-6ow6IHyStekk3PKd8f7rWbSZqntcNR.jpg",
    alt: "SIS showroom and branding collage",
  },
  {
    id: "clearance",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Clearance%20Banner-01-01-EtCpYLcFB5YEoNwDhVbNvL591woQW2.jpg",
    alt: "Clearance sale banner - Discounts up to 50%",
  },
  {
    id: "delivery",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Delivery%20Banner-01-01-T88UzyAuqn3y2AOyU99FHdvsDrT4ay.jpg",
    alt: "SIS delivery van with worker - UK wide delivery",
  },
]

export function HeroSection() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 7000)
    return () => clearInterval(t)
  }, [])

  const goto = (i: number) => setCurrent(i)
  const next = () => setCurrent((p) => (p + 1) % slides.length)
  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length)

  return (
    <section className="relative w-full overflow-hidden">
      {/* Slider viewport with fixed aspect ratio */}
      <div className="relative w-full" style={{ paddingTop: "37.2%" }}>
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
            aria-hidden={i !== current}
          >
            <img
              src={slide.image || "/placeholder.svg"}
              alt={slide.alt}
              className="absolute inset-0 w-full h-full object-contain bg-black"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/35 via-black/15 to-black/5" />

            {/* Slide-specific CTAs */}
            <div className="absolute left-[2.5%] right-[2.5%] bottom-[8%] sm:bottom-[9%] md:bottom-[10%] lg:bottom-[10%] pointer-events-none">
              <div className="pointer-events-auto">
                {slide.id === "sis" && (
                  <div className="flex flex-wrap gap-3">
                    <Link href="/products">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                      >
                        Explore Products
                      </Button>
                    </Link>
                    <Link href="/about">
                      <Button
                        size="lg"
                        variant="outline"
                        className="bg-white/90 hover:bg-white border-2 border-white rounded-xl font-semibold backdrop-blur-sm"
                      >
                        About Us
                      </Button>
                    </Link>
                  </div>
                )}

                {slide.id === "clearance" && (
                  <Link href="/products?category=Clearance">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all px-8"
                    >
                      Shop Now
                    </Button>
                  </Link>
                )}

                {slide.id === "delivery" && (
                  <Link href="/products">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all px-8"
                    >
                      Shop Now
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Controls */}
        <button
          aria-label="Previous banner"
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/90 hover:text-white bg-black/10 hover:bg-black/20 rounded-full h-11 w-11 backdrop-blur-sm z-10"
        >
          <ChevronLeft className="mx-auto h-6 w-6" />
        </button>
        <button
          aria-label="Next banner"
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/90 hover:text-white bg-black/10 hover:bg-black/20 rounded-full h-11 w-11 backdrop-blur-sm z-10"
        >
          <ChevronRight className="mx-auto h-6 w-6" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goto(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-3 h-3 rounded-full transition-colors ${i === current ? "bg-white" : "bg-white/60"}`}
            />
          ))}
        </div>
      </div>

      {/* Trust strip */}
      <div className="bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-slate-700">Industry Leading Safety Standards</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Truck className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-slate-700">Free Delivery on Orders Over £300</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Award className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-slate-700">25+ Years Industry Experience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
