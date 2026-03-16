import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Work from '@/components/sections/Work'
import Experience from '@/components/sections/Experience'
import MotionSection from '@/components/sections/MotionSection'
import About from '@/components/sections/About'
import Testimonials from '@/components/sections/Testimonials'
import CursorFollower from '@/components/ui/CursorFollower'

export default function Home() {
  return (
    <>
      <CursorFollower />
      <Header />
      <main>
        <Hero />
        <Work />
        <Experience />
        <MotionSection />
        <About />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}
