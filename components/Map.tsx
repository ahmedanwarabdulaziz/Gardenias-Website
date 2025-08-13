'use client'

import { MapPin, Phone, Mail, Clock, Car } from 'lucide-react'

const Map = () => {
  const handleOpenMaps = () => {
    const address = encodeURIComponent('348 Bronte St. S Unit 12, Milton, ON L9T 5B6, Canada')
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank')
  }

  const handleGetDirections = () => {
    const address = encodeURIComponent('348 Bronte St. S Unit 12, Milton, ON L9T 5B6, Canada')
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, '_blank')
  }

  const handleStreetView = () => {
    const address = encodeURIComponent('348 Bronte St. S Unit 12, Milton, ON L9T 5B6, Canada')
    window.open(`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${address}`, '_blank')
  }

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gardenias-green mb-6">
            Visit Our Clinic
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conveniently located in Milton, Ontario, we're here to provide you with exceptional healthcare services in a welcoming environment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Map Container */}
          <div className="relative h-full">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full flex flex-col">
              {/* Map Placeholder - Replace with actual map integration */}
              <div className="flex-1 relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.2685813778!2d-79.8831843!3d43.508225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b5c5c5c5c5c5c%3A0x5c5c5c5c5c5c5c5c!2s348%20Bronte%20St%20S%20Unit%2012%2C%20Milton%2C%20ON%20L9T%205B6%2C%20Canada!5e0!3m2!1sen!2sca!4v1703123456789!5m2!1sen!2sca"
                  width="100%" 
                  height="100%" 
                  style={{border:0}} 
                  allowFullScreen={true}
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>
              
              {/* Map Controls */}
              <div className="p-6 bg-white border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={handleGetDirections}
                      className="flex items-center space-x-2 text-gardenias-green hover:text-green-700 transition-colors duration-200"
                    >
                      <Car className="w-4 h-4" />
                      <span className="text-sm font-medium">Directions</span>
                    </button>
                    <button 
                      onClick={handleStreetView}
                      className="flex items-center space-x-2 text-gardenias-green hover:text-green-700 transition-colors duration-200"
                    >
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-medium">Street View</span>
                    </button>
                  </div>
                  <button 
                    onClick={handleOpenMaps}
                    className="bg-gardenias-green text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium"
                  >
                    Open in Maps
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="space-y-8 h-full flex flex-col">
            {/* Address Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 flex-1">
              <div className="flex items-start space-x-4 h-full">
                <div className="bg-gardenias-green/10 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-gardenias-green" />
                </div>
                <div className="flex-1 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Our Location</h3>
                    <p className="text-gray-600 leading-relaxed">
                      348 Bronte St. S<br />
                      Unit 12<br />
                      Milton, ON L9T 5B6<br />
                      Canada
                    </p>
                  </div>
                  <button 
                    onClick={handleGetDirections}
                    className="mt-4 text-gardenias-green hover:text-green-700 transition-colors duration-200 font-medium"
                  >
                    Get Directions →
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 flex-1">
              <div className="flex items-start space-x-4 h-full">
                <div className="bg-gardenias-green/10 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-gardenias-green" />
                </div>
                <div className="flex-1 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <a href="tel:+16473286563" className="text-gray-600 hover:text-gardenias-green transition-colors duration-200">
                          +1 (647) 328-6563
                        </a>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <a href="mailto:info@gardeniashealthcare.com" className="text-gray-600 hover:text-gardenias-green transition-colors duration-200">
                          info@gardeniashealthcare.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 flex-1">
              <div className="flex items-start space-x-4 h-full">
                <div className="bg-gardenias-green/10 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-gardenias-green" />
                </div>
                <div className="flex-1 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Business Hours</h3>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span className="font-medium">8:00 AM - 8:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span className="font-medium">9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span className="font-medium">10:00 AM - 4:00 PM</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-gardenias-green font-medium">
                        📞 Emergency appointments available outside business hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Parking & Accessibility */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 flex-1">
              <div className="h-full flex flex-col justify-between">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Parking & Accessibility</h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gardenias-green rounded-full"></div>
                    <span>Free parking available on-site</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gardenias-green rounded-full"></div>
                    <span>Wheelchair accessible entrance</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gardenias-green rounded-full"></div>
                    <span>Elevator access to all floors</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gardenias-green rounded-full"></div>
                    <span>Public transit accessible (TTC)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gardenias-green to-green-700 rounded-2xl p-8 text-white shadow-xl">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Visit Us?
            </h3>
            <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
              Book your appointment today and experience our professional healthcare services in our state-of-the-art facility.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-gardenias-green px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg">
                Book Appointment
              </button>
              <button 
                onClick={handleGetDirections}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gardenias-green transition-colors duration-200"
              >
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Map
