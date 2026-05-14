import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="page-shell flex flex-col">
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
      </main>
      <Footer />
    </div>
  )
}
