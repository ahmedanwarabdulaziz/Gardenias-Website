import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from 'lucide-react'
import Image from 'next/image'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const services = [
    'Swedish Massage',
    'Deep Tissue Massage',
    'Hot Stone Therapy',
    'Aromatherapy',
    'Sports Massage',
    'Prenatal Massage',
  ]

  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Our Therapists', href: '#therapists' },
    { name: 'Services', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
    { name: 'Book Appointment', href: '#book' },
  ]

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/Gardeniashealthcare' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/gardeniashealthcare.clinic?igsh=MzJ6cnRkZncyeWV6' },
    { name: 'Google', icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
    ), href: 'https://share.google/MHEsMcfFE7lNRrOoX' },
  ]

  return (
    <footer className="bg-gardenias-green text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <Image
                  src="/img/001.png"
                  alt="Gardenias Healthcare Logo"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Gardenias</h3>
                <p className="text-sm text-green-100">Healthcare</p>
              </div>
            </div>
            
            <p className="text-green-100 leading-relaxed">
              Dedicated to providing exceptional massage therapy services that promote healing, 
              relaxation, and overall wellness for our valued clients.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-green-100 hover:text-white transition-colors duration-200"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-green-100 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                <div>
                  <p className="text-green-100">348 Bronte St. S</p>
                  <p className="text-green-100">Unit 12, Milton, ON L9T 5B6</p>
                  <p className="text-green-100">Canada</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-white flex-shrink-0" />
                <a
                  href="tel:+16473286563"
                  className="text-green-100 hover:text-white transition-colors duration-200"
                >
                  +1 (647) 328-6563
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-white flex-shrink-0" />
                <a
                  href="mailto:info@gardenias-healthcare.net"
                  className="text-green-100 hover:text-white transition-colors duration-200"
                >
                  info@gardenias-healthcare.net
                </a>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                <div>
                  <p className="text-green-100">Mon - Fri: 8:00 AM - 8:00 PM</p>
                  <p className="text-green-100">Sat - Sun: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-4">
            <h4 className="text-xl font-semibold text-white">
              Stay Updated with Our Newsletter
            </h4>
            <p className="text-green-100 max-w-md mx-auto">
              Get the latest wellness tips, special offers, and updates from Gardenias Healthcare.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-green-200 focus:outline-none focus:border-white/40"
              />
              <button className="bg-white text-gardenias-green px-6 py-3 rounded-full hover:bg-green-50 transition-colors duration-200 font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-green-100 text-sm">
              © {currentYear} Gardenias Healthcare. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-green-100 hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-green-100 hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-green-100 hover:text-white transition-colors duration-200">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
