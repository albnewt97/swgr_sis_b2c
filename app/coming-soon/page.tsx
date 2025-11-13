"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, ArrowRight, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { subscribeToNewsletter } from "@/app/actions/newsletter"
// import { subscribeToNewsletterKV } from "@/app/actions/newsletter-kv" // Use this for Vercel KV

export default function ComingSoonPage() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      // Use the basic version (in-memory)
      const result = await subscribeToNewsletter(email)

      // Or use KV version (persistent storage)
      // const result = await subscribeToNewsletterKV(email)

      if (result.success) {
        setStatus("success")
        setMessage(result.message || "Thank you! We'll keep you updated.")
        setEmail("")

        // Reset after 5 seconds
        setTimeout(() => {
          setStatus("idle")
          setMessage("")
        }, 5000)
      } else {
        setStatus("error")
        setMessage(result.error || "Something went wrong. Please try again.")

        // Reset error after 5 seconds
        setTimeout(() => {
          setStatus("idle")
          setMessage("")
        }, 5000)
      }
    } catch (error) {
      setStatus("error")
      setMessage("Network error. Please check your connection and try again.")

      setTimeout(() => {
        setStatus("idle")
        setMessage("")
      }, 5000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <img src="/sis-logo.png" alt="SIS - Industrial Supplies" className="h-12 w-auto" />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
                Industrial Supplies
              </h1>
              <p className="text-xs text-slate-400">Your Trusted Safety Supplier</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="max-w-4xl w-full text-center">
            {/* Logo and Badge */}
            <div className="mb-8 animate-fade-in">
              <div className="inline-block bg-gradient-to-r from-orange-500/20 to-blue-600/20 backdrop-blur-sm border border-orange-500/30 rounded-full px-6 py-2 mb-6">
                <span className="text-orange-400 font-semibold">🚀 Coming Soon</span>
              </div>

              <h2 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-blue-600 bg-clip-text text-transparent animate-gradient">
                  Building Something
                </span>
                <br />
                <span className="text-white">Extraordinary</span>
              </h2>

              <p className="text-xl md:text-2xl text-slate-300 mb-4 max-w-3xl mx-auto leading-relaxed">
                We're crafting a revolutionary platform for industrial safety supplies. Get ready for an unparalleled
                experience in PPE and workwear.
              </p>

              
            </div>

            {/* Email Signup */}
            <Card className="bg-white/5 backdrop-blur-lg border-white/10 max-w-2xl mx-auto mb-12">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Be the First to Know</h3>
                <p className="text-slate-300 mb-6">
                  Join our exclusive list and get early access, special launch offers, and updates on our progress.
                </p>

                {status === "success" ? (
                  <div className="flex items-center justify-center gap-3 text-green-400 text-lg py-8 animate-fade-in">
                    <CheckCircle className="h-6 w-6" />
                    <span>{message}</span>
                  </div>
                ) : (
                  <>
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={status === "loading"}
                        className="flex-1 h-14 bg-white/10 border-white/20 text-white placeholder:text-slate-400 rounded-xl backdrop-blur-sm disabled:opacity-50"
                      />
                      <Button
                        type="submit"
                        size="lg"
                        disabled={status === "loading"}
                        className="h-14 px-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                      >
                        {status === "loading" ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                            Subscribing...
                          </>
                        ) : (
                          <>
                            Notify Me
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </form>

                    {status === "error" && (
                      <div className="flex items-center justify-center gap-2 text-red-400 text-sm animate-fade-in">
                        <AlertCircle className="h-4 w-4" />
                        <span>{message}</span>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            {/* Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Lightning Fast</h4>
                  <p className="text-slate-400 text-sm">Blazing fast product search and seamless checkout experience</p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Premium Quality</h4>
                  <p className="text-slate-400 text-sm">
                    Certified PPE and safety equipment from trusted global brands
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Best Prices</h4>
                  <p className="text-slate-400 text-sm">Competitive pricing with exclusive launch discounts</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-orange-400" />
                <a href="tel:08446920692" className="hover:text-white transition-colors">
                  0844 692 0692
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-orange-400" />
                <a href="mailto:orders@sisupplies.co.uk" className="hover:text-white transition-colors">
                  orders@sisupplies.co.uk
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-orange-400" />
                <span>Warrington, UK</span>
              </div>
            </div>

            <div className="text-sm text-slate-400">
              © {new Date().getFullYear()} SIS Industrial Supplies. All rights reserved.
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  )
}
