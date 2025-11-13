import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutUsSection } from "@/components/about-us-section"

export const metadata = {
  title: "About Us - SIS Industrial Supplies",
  description:
    "Learn about SIS Industrial Supplies, a leading retailer of PPE, workwear, and safety equipment with over 25 years of industry experience.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <AboutUsSection />
      </main>
      <Footer />
    </div>
  )
}
