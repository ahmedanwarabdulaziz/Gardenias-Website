'use client'

import { ArrowRight, Star } from 'lucide-react'
import Image from 'next/image'

const Hero = () => {
  return (
         <section id="home" className="relative min-h-screen md:min-h-screen min-h-[80vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
                 <Image
           src="/img/pic002.png"
           alt="Professional massage therapy session"
           fill
           className="object-cover object-right md:object-center"
           priority
         />
                 <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70"></div>
      </div>

             {/* Content */}
       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                   <div className="flex items-center justify-center min-h-screen md:min-h-screen min-h-[80vh] py-20">
           {/* Centered Content */}
                                               <div className="text-white space-y-8 text-center max-w-4xl">
             <div className="space-y-4">
                              {/* Star Rating - Hidden on mobile, shown on desktop */}
                              <div className="hidden md:flex items-center justify-center space-x-2">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                                    <span className="text-lg font-medium">5.0 (300+ Reviews)</span>
                </div>
               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <h1 className="text-4xl sm:text-5xl lg:text-8xl font-bold leading-tight drop-shadow-lg bg-gradient-to-r from-gardenias-green via-white to-gardenias-green bg-clip-text text-transparent">
                        <span className="block">Give Your Body</span>
                        <span className="block">What It Deserves</span>
                      </h1>
               
                                                                                                                                                                                                                                                <p className="text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
                     Experience personalized, evidence-based therapies in a calm, welcoming environment. Our skilled team is dedicated to helping you find relief, restore balance, and achieve lasting well-being. Discover the difference that expert hands and genuine care can make—your health starts here.
                   </p>
             </div>

                          

                          {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gardenias-green text-white px-8 py-4 rounded-full hover:bg-green-700 transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-2 group">
                  <span>Book Your Session</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                
                <button className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 font-semibold text-lg">
                  View Services
                </button>
              </div>

                          {/* Star Rating - Shown on mobile, hidden on desktop */}
                          <div className="md:hidden flex items-center justify-center space-x-2">
                            <div className="flex space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="text-lg font-medium">5.0 (300+ Reviews)</span>
                          </div>

                          {/* Trust Indicators */}
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-300">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Same-day appointments available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Insurance accepted</span>
                </div>
              </div>
           </div>
         </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
