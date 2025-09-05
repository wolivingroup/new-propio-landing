import Hero1 from '@/blocks/hero-1'
import Hero4 from '@/blocks/hero-4'
import { BenefitsSection } from '@/components/benefits-section'
import { FeaturesSection } from '@/components/features-section'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { ImmersiveCTA } from '@/components/immersive-cta'
import { InteractiveShowcase } from '@/components/interactive-showcase'
import { ParallaxTestimonials } from '@/components/parallax-testimonials'
import { PricingSection } from '@/components/pricing-section'
import { ScrollAnimation } from '@/components/scroll-animation'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <Hero1 />
        <Hero4 />
        <ScrollAnimation animation="fade-up">
          <FeaturesSection />
        </ScrollAnimation>
        <InteractiveShowcase />
        <ScrollAnimation animation="fade-left" delay={100}>
          <BenefitsSection />
        </ScrollAnimation>
        <ParallaxTestimonials />
        <ScrollAnimation animation="scale-in" delay={100}>
          <PricingSection />
        </ScrollAnimation>
        <ImmersiveCTA />
      </main>
      <Footer />
    </div>
  )
}
