'use client'

import { ChevronDown, Star } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

interface StaffMember {
  id: string
  name: string
  title: string
  shortDescription: string
  fullBio: string
  image: string
  credentials: string
}

const Staff = () => {
  const [expandedBio, setExpandedBio] = useState<string | null>(null)

  const staffMembers: StaffMember[] = [
    {
      id: 'aiman',
      name: 'Aiman Elboghdadi',
      title: 'Licensed Massage Therapist',
      credentials: 'RMT',
      shortDescription: 'Patient-centered care using advanced modalities for pain relief, function, and relaxation.',
      fullBio: 'Licensed Massage Therapist Aiman Elboghdadi provides patient-centered care, guiding clients through personalized treatment options to address chronic conditions and promote wellness. Drawing on a comprehensive understanding of the body\'s musculoskeletal and soft tissue systems, Aiman integrates advanced modalities—such as therapeutic massage, trigger point therapy, and stretching techniques—to alleviate pain, restore function, and enhance relaxation. Committed to collaborative care, he works closely with each client to develop tailored plans that align with individual health goals and preferences. Whether seeking relief from a chronic issue or exploring a holistic approach to healthcare, clients can trust Aiman\'s expertise and compassionate support.',
      image: '/img/staff001.png'
    },
    {
      id: 'filiz',
      name: 'Filiz Isabela Ziya',
      title: 'Orthomolecular Medicine',
      credentials: 'Dr.',
      shortDescription: 'Empowering clients with tailored, medication-free strategies for mind and body health.',
      fullBio: 'Ziya brings a wealth of knowledge and a compassionate approach to our team. As a Naturopath she specializes in Orthomolecular Medicine. As a practitioner she empowers others towards a healthier, happier life using tailored medication-free strategies while combining her \'Heal Through Nutrition\' and Orthomolecular Medicine expertise. Filiz addresses root causes to restore balance, instil lasting habits, and optimize wellbeing. Filiz\'s expertise extends across multiple modalities, including Auto Immune Diseases, Mental Health, Digestive Issues, Obesity Management, Nutrition, Cognitive Behavioural Therapy (CBT Plus), Solution-Focused Brief Therapy (SFBT) and targeted support for digestive disorders and weight management.',
      image: '/img/staff002.png'
    },
    {
      id: 'yvonne',
      name: 'Yvonne Farquharson',
      title: 'Osteopath Therapist',
      credentials: '',
      shortDescription: 'Trained Osteopath specializing in structural and emotional balance through various holistic modalities.',
      fullBio: 'Yvonne is a trained Osteopath who graduated from the National Academy of Osteopathy in 2018. She specializes in using osteopathy to address both structural and emotional concerns, aiming to restore balance to each individual\'s energetic system. Yvonne\'s multidisciplinary background includes studies in Medicinal Herbalism, Holistic Nutrition, Aromatherapy (energy clearance techniques), Word Medicine, the Silva Mind Method, Energy Healing (Shungite Therapy), and Meditation/Breathing Techniques. She is currently pursuing her Doctor of Osteopathy degree. Yvonne is passionate about supporting clients with diverse health needs and incorporates daily deep breathing practices into her approach.',
      image: '/img/staff003.png'
    },
    {
      id: 'salma',
      name: 'Salma Elhamadan',
      title: 'Naturopathic Doctor',
      credentials: 'Dr.',
      shortDescription: 'Personalized, integrative care for chronic conditions, hormonal imbalances, and reproductive health.',
      fullBio: 'Dr. Salma Elhamadan is a licensed Naturopathic Doctor in Ontario and a graduate of the Canadian College of Naturopathic Medicine. With a strong clinical foundation as a consultant physician in obstetrics and gynecology, she offers personalized, integrative care for chronic conditions, hormonal imbalances, and reproductive and urological health for both men and women. Dr. Elhamadan combines natural therapies—such as botanical medicine, nutritional counselling, and lifestyle modifications—with evidence-based practices to create treatment plans tailored to each patient\'s unique needs. Her practical, supportive approach empowers patients to address root causes, restore balance, and optimize long-term well-being.',
      image: '/img/staff006.png'
    },
    {
      id: 'george',
      name: 'George Nakkash',
      title: 'Certified Reflexologist',
      credentials: 'RCRT',
      shortDescription: 'Promoting well-being through the therapeutic power of reflexology and holistic health.',
      fullBio: 'George Nakkash is a certified reflexologist dedicated to promoting physical and mental well-being through the therapeutic power of reflexology. By applying gentle pressure to specific points on the feet, hands, and ears, George helps relieve tension, improve circulation, and support the body\'s natural healing processes. His client-focused approach addresses stress relief, pain reduction, and overall relaxation, creating a calming experience tailored to each individual\'s needs. Passionate about holistic health, George combines technical expertise with compassionate care, guiding clients on their journey toward balance and vitality. Take the first step toward feeling refreshed and revitalized under his expert guidance.',
      image: '/img/staff005.png'
    },
    {
      id: 'ghada',
      name: 'Ghada Barsoum',
      title: 'Registered Massage Therapist',
      credentials: 'RMT',
      shortDescription: 'Expert in advanced, customized massage techniques for pain relief, mobility, and relaxation.',
      fullBio: 'Registered Massage Therapist Ghada Barsoum specializes in identifying and treating the root causes of discomfort using advanced, customized techniques. With an expert\'s eye for detail and extensive hands-on experience, Ghada skillfully eases muscle tension, improves mobility, and promotes deep relaxation. Her treatment plans combine therapeutic massage modalities—such as myofascial release, deep tissue work, and Swedish massage—to address each client\'s unique needs and goals. Known for her compassionate approach and commitment to ongoing learning, Ghada creates a supportive environment where clients feel empowered to enhance their wellness and recover more fully. Experience relief and rejuvenation under her expert care.',
      image: '/img/staff004.png'
    }
  ]

  return (
    <section id="staff" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gardenias-green mb-6">
            Meet Our Expert Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our dedicated professionals bring years of experience and specialized expertise to provide you with the highest quality care and personalized treatment plans.
          </p>
        </div>

                 {/* Staff Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {staffMembers.map((member, index) => (
             <div 
               key={member.id} 
               className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 staff-card"
               style={{ animationDelay: `${index * 100}ms` }}
             >
               {/* Staff Image */}
               <div className="relative h-64 overflow-hidden">
                 <Image
                   src={member.image}
                   alt={member.name}
                   fill
                   className="object-cover group-hover:scale-110 transition-transform duration-700"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                 
                 {/* Credentials Badge */}
                 {member.credentials && (
                   <div className="absolute top-4 left-4">
                     <span className="bg-gardenias-green text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                       {member.credentials}
                     </span>
                   </div>
                 )}
                 
                 {/* Hover Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-t from-gardenias-green/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               </div>

                             {/* Staff Info */}
               <div className="p-6 relative">
                 {/* Decorative Element */}
                 <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-gardenias-green to-green-400 rounded-full"></div>
                 
                 <div className="mb-4">
                   <h3 className="text-xl font-bold text-gardenias-green mb-1 group-hover:text-green-700 transition-colors duration-300">{member.name}</h3>
                   <p className="text-gray-600 font-medium">{member.title}</p>
                 </div>

                 <p className="text-gray-600 text-sm leading-relaxed mb-4">
                   {member.shortDescription}
                 </p>

                 {/* Read Full Bio Button */}
                 <button
                   onClick={() => setExpandedBio(expandedBio === member.id ? null : member.id)}
                   className="text-gardenias-green hover:text-green-700 font-medium text-sm flex items-center space-x-2 transition-all duration-300 hover:space-x-3 group"
                 >
                   <span className="relative">
                     Read Full Bio
                     <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gardenias-green group-hover:w-full transition-all duration-300"></span>
                   </span>
                   <ChevronDown
                     className={`w-4 h-4 transition-all duration-300 ${
                       expandedBio === member.id ? 'rotate-180' : ''
                     }`}
                   />
                 </button>

                 {/* Expanded Bio */}
                 {expandedBio === member.id && (
                   <div className="mt-4 pt-4 border-t border-gray-200 animate-fadeIn">
                     <p className="text-gray-600 text-sm leading-relaxed">
                       {member.fullBio}
                     </p>
                   </div>
                 )}
               </div>
            </div>
          ))}
        </div>

                 {/* Trust Indicators */}
         <div className="mt-20 text-center">
           <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-xl border border-gray-100 relative overflow-hidden">
             {/* Decorative Background Elements */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-gardenias-green/5 rounded-full -translate-y-16 translate-x-16"></div>
             <div className="absolute bottom-0 left-0 w-24 h-24 bg-gardenias-green/5 rounded-full translate-y-12 -translate-x-12"></div>
             
             <div className="relative z-10">
               <div className="flex items-center justify-center space-x-2 mb-6">
                 {[...Array(5)].map((_, i) => (
                   <Star key={i} className="w-7 h-7 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                 ))}
               </div>
               <h3 className="text-3xl font-bold text-gardenias-green mb-4">
                 Trusted by Hundreds of Clients
               </h3>
               <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                 Our team of certified professionals has helped countless individuals achieve better health and wellness through personalized care and proven therapeutic techniques.
               </p>
               
               {/* Stats */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                 <div className="text-center">
                   <div className="text-3xl font-bold text-gardenias-green mb-1">500+</div>
                   <div className="text-gray-600 text-sm">Happy Clients</div>
                 </div>
                 <div className="text-center">
                   <div className="text-3xl font-bold text-gardenias-green mb-1">15+</div>
                   <div className="text-gray-600 text-sm">Years Experience</div>
                 </div>
                 <div className="text-center">
                   <div className="text-3xl font-bold text-gardenias-green mb-1">100%</div>
                   <div className="text-gray-600 text-sm">Certified Team</div>
                 </div>
               </div>
             </div>
           </div>
         </div>
      </div>
    </section>
  )
}

export default Staff
