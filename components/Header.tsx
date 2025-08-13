'use client'

import { useState } from 'react'
import { Menu, X, Phone, MapPin, Hand, Heart, Footprints, Leaf, Facebook, Instagram } from 'lucide-react'
import Image from 'next/image'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Therapists', href: '#therapists' },
    { name: 'Contact', href: '#contact' },
  ]

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/Gardeniashealthcare' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/gardeniashealthcare.clinic?igsh=MzJ6cnRkZncyeWV6' },
    { name: 'Google', icon: () => (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
    ), href: 'https://share.google/MHEsMcfFE7lNRrOoX' },
  ]

  const serviceCategories = [
    {
      id: 'osteopathy',
      name: 'Osteopathy & Manual Therapy',
      icon: Hand,
      services: [
        'Osteopathic Session',
        'RMT Integrated Manual Therapy',
        'Remedial Massage'
      ]
    },
    {
      id: 'massage',
      name: 'Massage Therapy',
      icon: Heart,
      services: [
        'Massage Therapy',
        'Lymphatic Drainage',
        'Deep Hot Stone Massage',
        'Traditional Thai Massage',
        'Pre and Postnatal Massage',
        'TMJ Massage Therapy',
        'Cupping Massage',
        'Acupressure Massage'
      ]
    },
    {
      id: 'reflexology',
      name: 'Reflexology',
      icon: Footprints,
      services: [
        'Hand Reflexology',
        'Foot Reflexology',
        'RMT Foot Reflexology',
        'Scalp Reflexology'
      ]
    },
    {
      id: 'acupuncture',
      name: 'Acupuncture & Naturopathic',
      icon: Leaf,
      services: [
        'Registered Acupuncture',
        'Integrated Acupuncture',
        'Wet Cupping/Hijamah',
        'Naturopathic Assessment',
        'Naturopathic Therapy',
        'Naturopath Follow-up'
      ]
    }
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gardenias-green/95 backdrop-blur-sm shadow-lg border-b border-green-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-3">
                <Image
                  src="/img/001.png"
                  alt="Gardenias Healthcare Logo"
                  width={64}
                  height={64}
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <h1 className="text-2xl font-bold text-white">Gardenias <span className="text-sm font-normal text-green-100">Healthcare</span></h1>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white hover:text-green-200 transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Contact Info - Desktop */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-green-100">
              <Phone className="w-4 h-4" />
              <a href="tel:+16473286563" className="text-sm hover:text-white transition-colors duration-200">
                +1 (647) 328-6563
              </a>
            </div>
            <button className="bg-white text-gardenias-green px-6 py-2 rounded-full hover:bg-green-50 transition-colors duration-200 font-medium shadow-md">
              Book Now
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-green-200 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Service Categories Row - Desktop */}
        <div className="hidden lg:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-3">
              {/* Service Categories */}
              <div className="flex space-x-4">
                {serviceCategories.map((category) => {
                  const IconComponent = category.icon
                  return (
                    <div
                      key={category.id}
                      className="relative group"
                      onMouseEnter={() => setActiveDropdown(category.id)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white hover:text-green-200 transition-all duration-200 py-2 px-4 rounded-lg border border-white/20 hover:border-white/40">
                        <IconComponent className="w-4 h-4" />
                        <span className="text-sm font-medium">{category.name}</span>
                      </button>
                      
                      {/* Dropdown Menu */}
                      {activeDropdown === category.id && (
                        <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                          <div className="px-4 py-2 border-b border-gray-100">
                            <h3 className="font-semibold text-gardenias-green text-sm">{category.name}</h3>
                          </div>
                          <div className="py-2">
                            {category.services.map((service, index) => (
                              <a
                                key={index}
                                href="#services"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-gardenias-green transition-colors duration-200"
                              >
                                {service}
                              </a>
                            ))}
                          </div>
                          <div className="px-4 py-2 border-t border-gray-100">
                            <a
                              href="#services"
                              className="text-sm font-medium text-gardenias-green hover:text-green-700 transition-colors duration-200"
                            >
                              View All Services →
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Social Media Icons */}
              <div className="flex items-center space-x-3">
                <span className="text-white/70 text-xs font-medium mr-2">Follow Us:</span>
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
                    aria-label={social.name}
                  >
                    {social.name === 'Google' ? (
                      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    ) : (
                      <social.icon className="w-4 h-4 text-white" />
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gardenias-green border-t border-green-600">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-white hover:text-green-200 transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              {/* Mobile Service Categories */}
              <div className="pt-4 border-t border-green-600">
                <h3 className="px-3 py-2 text-sm font-semibold text-green-100">Our Services</h3>
                {serviceCategories.map((category) => {
                  const IconComponent = category.icon
                  return (
                    <div key={category.id} className="px-3 py-2">
                      <div className="flex items-center space-x-2 text-white">
                        <IconComponent className="w-4 h-4" />
                        <span className="text-sm">{category.name}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
              
              <div className="pt-4 space-y-2">
                <div className="flex items-center space-x-2 text-green-100 px-3">
                  <Phone className="w-4 h-4" />
                  <a href="tel:+16473286563" className="text-sm hover:text-white transition-colors duration-200">
                    +1 (647) 328-6563
                  </a>
                </div>
                <button className="w-full mx-3 bg-white text-gardenias-green px-6 py-2 rounded-full hover:bg-green-50 transition-colors duration-200 font-medium shadow-md">
                  Book Now
                </button>
                
                {/* Mobile Social Media Icons */}
                <div className="pt-4 border-t border-green-600">
                  <div className="px-3 py-2">
                    <h3 className="text-sm font-semibold text-green-100 mb-3">Follow Us</h3>
                    <div className="flex space-x-4">
                      {socialLinks.map((social) => (
                        <a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
                          aria-label={social.name}
                        >
                          {social.name === 'Google' ? (
                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                          ) : (
                            <social.icon className="w-5 h-5 text-white" />
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
