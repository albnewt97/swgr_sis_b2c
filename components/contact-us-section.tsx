import { MapPin, Phone, Mail, Building2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const locations = [
  {
    city: "Glasgow",
    name: "SIS Industrial Supplies",
    address: ["270 Petershill Road", "Glasgow", "G21 4AY"],
    status: "active",
  },
  {
    city: "Warrington",
    name: "SIS Industrial Supplies",
    address: ["Unit 8, Ravenhurst Court", "Birchwood Industrial Estate", "Warrington", "WA3 6PN"],
    status: "active",
  },
  {
    city: "Carlisle",
    name: "SIS Industrial Supplies",
    address: ["Address TBC"],
    status: "coming-soon",
  },
  {
    city: "London",
    name: "SIS Industrial Supplies",
    address: ["Address TBC"],
    status: "coming-soon",
  },
]

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our expert team",
    detail: "0844 692 0692",
    link: "tel:08446920692",
  },
  {
    icon: Mail,
    title: "Customer Support",
    description: "For product orders and support",
    detail: "orders@sisupplies.co.uk",
    link: "mailto:orders@sisupplies.co.uk",
  },
  {
    icon: Mail,
    title: "Accounts & Finance",
    description: "For billing and payment inquiries",
    detail: "accounts@sisupplies.co.uk",
    link: "mailto:accounts@sisupplies.co.uk",
  },
  {
    icon: Mail,
    title: "General Queries",
    description: "For all other inquiries",
    detail: "sis@sw-gr.com",
    link: "mailto:sis@sw-gr.com",
  },
]

export function ContactUsSection() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent mb-6">
            Contact Us
          </h2>
          <p className="text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
            Our stores and delivery centres deliver PPE throughout the UK, and our sales team of highly qualified
            industry experts, who have significant experience in the safety-critical industries, are on-hand to offer
            practical advice and support to ensure all workforces are safe and compliant.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-slate-900 mb-12">Get In Touch</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-slate-50 hover:from-orange-50 hover:to-blue-50"
                >
                  <CardContent className="p-6 flex flex-col items-center text-center h-full">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-blue-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2 min-h-[3rem] flex items-center">{method.title}</h4>
                    <p className="text-sm text-slate-600 mb-4 min-h-[2.5rem]">{method.description}</p>
                    <a
                      href={method.link}
                      className="text-orange-500 hover:text-blue-600 font-semibold transition-colors break-words text-sm mt-auto"
                    >
                      {method.detail}
                    </a>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Two Column Layout: Locations & Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Locations */}
          <div>
            <h3 className="text-3xl font-bold text-slate-900 mb-8">Our Locations</h3>
            <div className="space-y-6">
              {locations.map((location, index) => (
                <Card
                  key={index}
                  className={`border-0 bg-gradient-to-br from-white to-slate-50 ${
                    location.status === "coming-soon" ? "opacity-75" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-blue-600 flex items-center justify-center">
                          <Building2 className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xl font-bold text-slate-900">{location.city}</h4>
                          {location.status === "coming-soon" && (
                            <span className="text-xs font-semibold text-orange-500 bg-orange-50 px-3 py-1 rounded-full">
                              Coming Soon
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-medium text-slate-700 mb-2">{location.name}</p>
                        <div className="flex items-start space-x-2 text-slate-600">
                          <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-orange-500" />
                          <div className="text-sm">
                            {location.address.map((line, i) => (
                              <div key={i}>{line}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-3xl font-bold text-slate-900 mb-8">Send Us a Message</h3>
            <Card className="border-0 bg-gradient-to-br from-white to-slate-50 shadow-xl">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">
                        First Name *
                      </label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        required
                        className="border-slate-300 focus:border-orange-500 rounded-xl"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">
                        Last Name *
                      </label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        required
                        className="border-slate-300 focus:border-orange-500 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@company.com"
                      required
                      className="border-slate-300 focus:border-orange-500 rounded-xl"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+44 1234 567890"
                      className="border-slate-300 focus:border-orange-500 rounded-xl"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                      Company Name
                    </label>
                    <Input
                      id="company"
                      type="text"
                      placeholder="Your Company Ltd"
                      className="border-slate-300 focus:border-orange-500 rounded-xl"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="How can we help you?"
                      required
                      className="border-slate-300 focus:border-orange-500 rounded-xl"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your requirements..."
                      rows={6}
                      required
                      className="border-slate-300 focus:border-orange-500 rounded-xl resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white rounded-xl font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
