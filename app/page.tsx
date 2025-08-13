import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Staff from '@/components/Staff'
import Map from '@/components/Map'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Staff />
      <Map />
      <Footer />
    </main>
  )
}
