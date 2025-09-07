import Hero1 from '@/blocks/hero-1'
import Hero4 from '@/blocks/hero-4'
import { BenefitsSection } from '@/components/benefits-section'
import { FeaturesSection } from '@/components/features-section'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { ImmersiveCTA } from '@/components/immersive-cta'
import { InteractiveShowcase } from '@/components/interactive-showcase'
import SimplePricing from '@/components/mvpblocks/simple-pricing'
import { ParallaxTestimonials } from '@/components/parallax-testimonials'
import { ScrollAnimation } from '@/components/scroll-animation'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="lg:mt-0 mt-12">
        <Hero1 />
        <Hero4 />
        <HeroSection />
        <ScrollAnimation animation="fade-up">
          <FeaturesSection />
        </ScrollAnimation>
        <InteractiveShowcase />
        <ScrollAnimation animation="fade-left" delay={100}>
          <BenefitsSection />
        </ScrollAnimation>
        <ParallaxTestimonials />
        <ScrollAnimation animation="scale-in" delay={100}>
          <SimplePricing />
        </ScrollAnimation>
        <ImmersiveCTA />
      </main>
      <Footer />
    </div>
  )
}
