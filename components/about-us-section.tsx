import { Shield, Truck, Award, Users, Sparkles, HeadphonesIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Shield,
    title: "Safety Critical Expertise",
    description: "Highly qualified industry experts with significant experience in safety-critical industries",
  },
  {
    icon: Sparkles,
    title: "Dynamic Branding",
    description: "In-house bespoke branding services for uniquely tailored PPE and industrial supplies",
  },
  {
    icon: Award,
    title: "Leading Brands",
    description: "Wide range of high-performance apparel and equipment from trusted manufacturers",
  },
  {
    icon: Truck,
    title: "Fast UK Delivery",
    description: "Stores and delivery centres throughout the UK for rapid PPE deployment",
  },
  {
    icon: Users,
    title: "Industry Specialists",
    description: "Serving rail, engineering, construction, and various safety-critical sectors",
  },
  {
    icon: HeadphonesIcon,
    title: "Expert Support",
    description: "Practical advice and support to ensure workforce safety and compliance",
  },
]

export function AboutUsSection() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent mb-0">
            About Us 
          </h2>
          
          
        </div>

        {/* Main Image */}
        <div className="mb-16 rounded-3xl overflow-hidden shadow-2xl">
          <img
            src="/about-us-collage.jpg"
            alt="SIS Industrial Supplies - Specialist workwear supplier showcasing embroidery services, hi-vis clothing, branded delivery van, and retail store"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/20">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Specialist Industrial Supplies (SIS) is a{" "}
              <span className="font-semibold text-slate-900">
                leading retailer of PPE, workwear, safety equipment, hi-visibility (hi-vis) clothing, footwear and other
                industrial supplies
              </span>
              . Our dynamic in-house branding supports companies working in safety critical environments with bespoke
              branded PPE and industrial supplies as soon as they are required, uniquely tailored to the organisation.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Our stores and delivery centres deliver PPE throughout the UK, and our sales team of highly qualified
              industry experts, who have significant experience in the safety-critical industries, are on-hand to offer
              practical advice and support to ensure all workforces are safe and compliant.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              We stock a{" "}
              <span className="font-semibold text-slate-900">
                wide range of high-performance apparel, industrial supplies, hi-vis PPE workwear and safety equipment
              </span>
              , from a variety of leading brands and at a price point that is right for you and your organisation. We
              supply a range of businesses in various industries, including rail, engineering and construction, and our
              industry knowledge means that we offer a comprehensive range of health and safety products and equipment
              that are integral to the success of any organisation through a robust and collaborative procurement and
              supply chain system.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed">
              Our online store is designed to give you{" "}
              <span className="font-semibold text-slate-900">
                almost instant access to PPE when you need it – with fast delivery
              </span>
              . We have a wider range available – if you do not see what you need on our website, please message us
              through our contact form and we will be in touch to see how we can help you.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-slate-900 mb-12">Why Choose SIS?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-2">{feature.title}</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Closing Statement */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-orange-500 to-blue-600 rounded-3xl p-12 text-white shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">Ready to Work With You</h3>
            <p className="text-xl mb-8 text-orange-100 max-w-3xl mx-auto">
              Here at Specialist Industrial Supplies, we are ready to work with you to ensure you and your team are safe
              and compliant.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
