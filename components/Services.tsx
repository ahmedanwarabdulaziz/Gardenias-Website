'use client'

import { ChevronDown, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

interface Service {
  name: string
  description: string
  duration: string
  price: string
}

interface Category {
  id: string
  title: string
  subtitle: string
  services: Service[]
}

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('osteopathy')

  const categories: Category[] = [
    {
      id: 'osteopathy',
      title: 'Osteopathy & Manual Therapy',
      subtitle: 'Restoring comfort and mobility with skilled, hands-on care.',
             services: [
         {
           name: 'Osteopathic Session',
           description: 'Gentle, targeted techniques to relieve pain, restore movement, and support your body\'s natural healing.',
           duration: '60-90 minutes',
           price: 'Starting from $120'
         },
         {
           name: 'RMT Integrated Manual Therapy with Kinesiology Taping',
           description: 'Comprehensive therapy and expert taping for faster recovery, support, and lasting relief.',
           duration: '75-90 minutes',
           price: 'Starting from $140'
         },
         {
           name: 'Remedial Massage (Deep Muscle Techniques)',
           description: 'Deep, focused treatment for stubborn tension and injury—feel stronger and freer.',
           duration: '60-90 minutes',
           price: 'Starting from $110'
         }
       ]
    },
    {
      id: 'massage',
      title: 'Massage Therapy',
      subtitle: 'Relax, recharge, and rediscover well-being in caring hands.',
             services: [
         {
           name: 'Massage Therapy',
           description: 'Classic session for total relaxation and muscle relief—restore peace to your body and mind.',
           duration: '60-90 minutes',
           price: 'Starting from $95'
         },
         {
           name: 'Lymphatic Drainage Massage',
           description: 'Gentle cleansing to reduce swelling, boost immunity, and leave you feeling lighter.',
           duration: '60-75 minutes',
           price: 'Starting from $105'
         },
         {
           name: 'Deep Hot Stone Massage',
           description: 'Warm stones and soothing touch melt away tension and invite deep calm.',
           duration: '75-90 minutes',
           price: 'Starting from $125'
         },
         {
           name: 'Traditional Thai Massage',
           description: 'Stretch and movement techniques for improved flexibility and balanced energy.',
           duration: '60-90 minutes',
           price: 'Starting from $100'
         },
         {
           name: 'Pre and Postnatal Massage',
           description: 'Specialized comfort and support for every stage of motherhood.',
           duration: '60-75 minutes',
           price: 'Starting from $110'
         },
         {
           name: '(TMJ) Massage Therapy',
           description: 'Targeted relief for jaw tension and headaches—bring comfort back.',
           duration: '45-60 minutes',
           price: 'Starting from $85'
         },
         {
           name: 'Cupping Massage',
           description: 'Massage and cupping combined for deep circulation, detox, and renewal.',
           duration: '60-75 minutes',
           price: 'Starting from $115'
         },
         {
           name: 'Acupressure Massage Therapy',
           description: 'Precise point therapy to release pain and restore inner balance.',
           duration: '60-75 minutes',
           price: 'Starting from $95'
         }
       ]
    },
    {
      id: 'reflexology',
      title: 'Reflexology',
      subtitle: 'Holistic healing for lasting calm from head to toe.',
             services: [
         {
           name: 'Certified Hand Reflexology Treatment',
           description: 'Relieve tension and refresh hard-working hands—support total health.',
           duration: '45-60 minutes',
           price: 'Starting from $75'
         },
         {
           name: 'Certified Foot Reflexology Treatment',
           description: 'Soothe tired feet, boost circulation, and restore harmony throughout your body.',
           duration: '60-75 minutes',
           price: 'Starting from $85'
         },
         {
           name: 'RMT Foot Reflexology Massage',
           description: 'Focused pressure for deeper relaxation, reset your energy.',
           duration: '60-75 minutes',
           price: 'Starting from $90'
         },
         {
           name: 'Scalp Reflexology Massage (Indie Head Massage)',
           description: 'Release stress, ease headaches, and enjoy tranquil mind and body.',
           duration: '30-45 minutes',
           price: 'Starting from $65'
         }
       ]
    },
    {
      id: 'acupuncture',
      title: 'Acupuncture & Naturopathic Care',
      subtitle: 'Natural therapies for lasting vitality and balance.',
             services: [
         {
           name: 'Registered Acupuncture Session',
           description: 'Personalized treatment to restore balance and ease pain—ancient wisdom, modern care.',
           duration: '60-90 minutes',
           price: 'Starting from $130'
         },
         {
           name: 'Integrated Acupuncture Treatment Session',
           description: 'Holistic approach for deeper healing and everyday wellness.',
           duration: '75-90 minutes',
           price: 'Starting from $150'
         },
         {
           name: 'Registered Acupuncturist (Wet Cupping/Hijamah)',
           description: 'Cleansing cupping therapy for pain, detox, and renewed health.',
           duration: '60-75 minutes',
           price: 'Starting from $120'
         },
         {
           name: 'Naturopathic Initial Assessment & Treatment',
           description: 'Thorough assessment and gentle natural care to help you thrive.',
           duration: '90-120 minutes',
           price: 'Starting from $180'
         },
         {
           name: 'Naturopathic Integrative Therapy – Follow-Up Visit',
           description: 'Advanced techniques (massage, cupping, hot stones)—ongoing support for your journey.',
           duration: '60-75 minutes',
           price: 'Starting from $140'
         },
         {
           name: 'Naturopath Treatment (Follow-up visit)',
           description: 'Continued care, guidance, and holistic strategies for true well-being.',
           duration: '45-60 minutes',
           price: 'Starting from $110'
         }
       ]
    }
  ]

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gardenias-green mb-6">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of therapeutic services designed to restore your health, 
            enhance your well-being, and provide lasting relief.
          </p>
        </div>

        {/* Mobile: Category Banners with Accordion */}
        <div className="md:hidden space-y-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Category Banner */}
              <div className="relative h-48">
                                 <Image
                   src={
                     category.id === 'massage' ? "/img/pic019.png" : 
                     category.id === 'reflexology' ? "/img/pic020.png" : 
                     "/img/pic003.png"
                   }
                   alt={category.title}
                   fill
                   className="object-cover"
                 />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                  <p className="text-green-100 text-sm">{category.subtitle}</p>
                </div>
              </div>
              
              {/* Services Accordion */}
              <div className="p-4">
                <button
                  onClick={() => setActiveCategory(activeCategory === category.id ? '' : category.id)}
                  className="w-full flex items-center justify-between py-3 text-gardenias-green hover:text-green-700 transition-colors duration-200"
                >
                  <span className="font-semibold">View Services</span>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform duration-200 ${
                      activeCategory === category.id ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {activeCategory === category.id && (
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    {category.services.map((service, index) => (
                                             <div key={index} className="flex space-x-4 min-h-40 border border-gray-200 rounded-lg p-3">
                         <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                           <Image
                             src="/img/pic009.png"
                             alt={service.name}
                             fill
                             className="object-cover"
                           />
                         </div>
                                                  <div className="flex-1 flex flex-col justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gardenias-green mb-2 text-sm leading-tight">{service.name}</h4>
                              <p className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-3">{service.description}</p>
                            </div>
                                                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                               <span>⏱️ {service.duration}</span>
                               <span className="font-medium text-gardenias-green">{service.price}</span>
                             </div>
                             <div className="flex space-x-2">
                               <button className="flex-1 bg-gardenias-green text-white py-1.5 px-3 rounded-lg text-xs font-medium hover:bg-green-700 transition-colors duration-200">
                                 Book Now
                               </button>
                               <button className="flex-1 border border-gardenias-green text-gardenias-green py-1.5 px-3 rounded-lg text-xs font-medium hover:bg-gardenias-green hover:text-white transition-colors duration-200">
                                 Learn More
                               </button>
                             </div>
                          </div>
                       </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

                 {/* Desktop: Category Banners with Expandable Content */}
         <div className="hidden md:block space-y-6">
           {categories.map((category) => (
             <div key={category.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
               {/* Category Banner - Clickable */}
               <button
                 onClick={() => setActiveCategory(activeCategory === category.id ? '' : category.id)}
                 className="w-full relative h-64 hover:opacity-95 transition-opacity duration-200"
               >
                 <Image
                   src={
                     category.id === 'massage' ? "/img/pic019.png" : 
                     category.id === 'reflexology' ? "/img/pic020.png" : 
                     "/img/pic003.png"
                   }
                   alt={category.title}
                   fill
                   className="object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                 <div className="absolute bottom-8 left-8 right-8 text-left">
                   <h3 className="text-4xl font-bold text-white mb-3">{category.title}</h3>
                   <p className="text-xl text-green-100 mb-4">{category.subtitle}</p>
                   <div className="flex items-center text-white">
                     <span className="font-medium">View Services</span>
                     <ChevronDown 
                       className={`w-6 h-6 ml-2 transition-transform duration-200 ${
                         activeCategory === category.id ? 'rotate-180' : ''
                       }`} 
                     />
                   </div>
                 </div>
               </button>
               
               {/* Services Grid - Expandable */}
               {activeCategory === category.id && (
                 <div className="p-8 border-t border-gray-200">
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     {category.services.map((service, index) => (
                                               <div key={index} className="flex space-x-6 group hover:bg-gray-50 p-6 rounded-lg transition-colors duration-200 min-h-56 border border-gray-200">
                          <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden shadow-md">
                            <Image
                              src="/img/pic009.png"
                              alt={service.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                          </div>
                          <div className="flex-1 flex flex-col justify-between">
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-gardenias-green mb-3 group-hover:text-green-700 transition-colors duration-200 leading-tight">
                                {service.name}
                              </h4>
                              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">{service.description}</p>
                            </div>
                                                        <div className="flex items-center justify-between mb-4">
                               <span className="text-sm text-gray-500">⏱️ {service.duration}</span>
                               <span className="font-semibold text-gardenias-green">{service.price}</span>
                             </div>
                             <div className="flex space-x-3">
                               <button className="bg-gardenias-green text-white py-2 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200">
                                 Book Now
                               </button>
                               <button className="border border-gardenias-green text-gardenias-green py-2 px-6 rounded-lg font-medium hover:bg-gardenias-green hover:text-white transition-colors duration-200">
                                 Learn More
                               </button>
                             </div>
                          </div>
                        </div>
                     ))}
                   </div>
                 </div>
               )}
             </div>
           ))}
         </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-gardenias-green to-green-700 rounded-xl p-8 text-white shadow-xl">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
              Book your session today and take the first step towards better health and well-being.
            </p>
            <button className="bg-white text-gardenias-green px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg">
              Book Your Session
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
