"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function BrandsRange() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-orange-500 to-blue-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Can&#39;t Find What You&#39;re Looking For?</h3>
            <p className="text-xl mb-8 text-orange-100">
              We work with various brands worldwide. If you can&#39;t find what you are looking for, contact our
              specialists today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#contact">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-semibold px-8">
                  Contact Specialist
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
