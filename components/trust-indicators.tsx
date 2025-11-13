import { Shield, Truck, Award, Users, Clock, CheckCircle } from 'lucide-react'

const indicators = [
  {
    icon: Shield,
    title: 'Premium Certified',
    description: 'All products exceed international standards with premium certifications'
  },
  {
    icon: Truck,
    title: 'Express Logistics',
    description: 'Premium delivery service with real-time tracking and priority handling'
  },
  {
    icon: Award,
    title: '25+ Years Excellence',
    description: 'Industry-leading expertise serving Fortune 500 companies since 1998'
  },
  {
    icon: Users,
    title: 'Elite Client Base',
    description: 'Trusted by 10,000+ premium enterprises across Europe and beyond'
  },
  {
    icon: Clock,
    title: 'Expert Consultation',
    description: 'Dedicated technical specialists providing personalized industrial solutions'
  },
  {
    icon: CheckCircle,
    title: 'Premium Guarantee',
    description: 'Comprehensive warranty and premium support on all industrial solutions'
  }
]

export function TrustIndicators() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent mb-4">
            Why Industry Leaders Choose SIS
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Setting new standards in industrial excellence through innovation, quality, and unmatched service delivery
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {indicators.map((indicator, index) => {
            const Icon = indicator.icon
            return (
              <div key={index} className="text-center group p-6 rounded-2xl hover:bg-gradient-to-br hover:from-orange-50 hover:to-blue-50 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-blue-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <Icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{indicator.title}</h3>
                <p className="text-slate-600 leading-relaxed">{indicator.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
