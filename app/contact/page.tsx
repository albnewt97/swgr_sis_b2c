import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactUsSection } from "@/components/contact-us-section"

export const metadata = {
  title: "Contact Us - SIS Industrial Supplies",
  description:
    "Get in touch with SIS Industrial Supplies. Find our locations across the UK and contact our expert team for PPE and safety equipment inquiries.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ContactUsSection />
      </main>
      <Footer />
    </div>
  )
}
