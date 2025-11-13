import Link from "next/link"
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer id="footer" className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img src="/sis-logo.png" alt="SIS - Safety Industrial Supplies" className="h-12 w-auto" />
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Leading the industrial revolution with premium solutions, cutting-edge technology, and unparalleled
              expertise in industrial supply chain management.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-blue-600 rounded-xl transition-all"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-blue-600 rounded-xl transition-all"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-blue-600 rounded-xl transition-all"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-slate-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/trade" className="text-slate-300 hover:text-white transition-colors">
                  Trade Accounts
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="text-slate-300 hover:text-white transition-colors">
                  Delivery Information
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-slate-300 hover:text-white transition-colors">
                  Returns Policy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-slate-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/category/personal-protective-equipment"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Personal Protective Equipment
                </Link>
              </li>
              <li>
                <Link href="/category/hi-vis-workwear" className="text-slate-300 hover:text-white transition-colors">
                  High Visibility Workwear
                </Link>
              </li>
              <li>
                <Link href="/category/flame-retardant" className="text-slate-300 hover:text-white transition-colors">
                  Flame Retardant
                </Link>
              </li>
              <li>
                <Link href="/category/footwear" className="text-slate-300 hover:text-white transition-colors">
                  Footwear
                </Link>
              </li>
              <li>
                <Link href="/category/corporate-clothing" className="text-slate-300 hover:text-white transition-colors">
                  Corporate Clothing
                </Link>
              </li>
              <li>
                <Link href="/category/womens-workwear" className="text-slate-300 hover:text-white transition-colors">
                  Women&#39;s Workwear
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Get in Touch</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-400" />
                <span className="text-slate-300">0844 692 0692</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-400" />
                <span className="text-slate-300 text-sm">orders@sisupplies.co.uk</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-orange-400 mt-1" />
                <span className="text-slate-300">
                  SIS Industrial Supplies
                  <br />
                  Unit 8, Ravenhurst Court,
                  <br />
                  Birchwood Industrial Estate,
                  <br />
                  Warrington,
                  <br />
                  WA3 6PN
                </span>
              </div>
            </div>

            <h5 className="font-semibold mb-2 text-white">Stay Updated</h5>
            <p className="text-slate-300 text-sm mb-3">Get the latest safety innovations and exclusive offers</p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 rounded-xl backdrop-blur-sm"
              />
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">© 2025 Safety Industrial Supplies. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-slate-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-slate-400 hover:text-white text-sm transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/cookies" className="text-slate-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
