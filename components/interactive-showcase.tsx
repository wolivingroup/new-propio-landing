'use client'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { motion, useInView } from 'framer-motion'
import {
  BarChart3,
  Globe,
  Palette,
  ShoppingCart,
  Smartphone,
  Zap,
} from 'lucide-react'
import { useRef, useState } from 'react'
import { FlipReveal, FlipRevealItem } from './gsap/flip-reveal'
import { StaggerOnScroll } from './gsap/stagger-on-scroll'

import { PillTabs } from './ui/pill-tabs'

const showcaseItems = [
  {
    icon: ShoppingCart,
    title: 'E-commerce Avanzado',
    description: 'Gestión completa de inventario y ventas',
    color: 'from-orange-500 to-red-500',
    delay: 0,
  },
  {
    icon: Zap,
    title: 'Velocidad Extrema',
    description: 'Carga en menos de 2 segundos',
    color: 'from-yellow-500 to-orange-500',
    delay: 0.1,
  },
  {
    icon: Globe,
    title: 'Multi-región',
    description: 'Presencia global automática',
    color: 'from-blue-500 to-purple-500',
    delay: 0.2,
  },
  {
    icon: Smartphone,
    title: 'Mobile First',
    description: 'Optimizado para dispositivos móviles',
    color: 'from-green-500 to-blue-500',
    delay: 0.3,
  },
  {
    icon: Palette,
    title: 'Personalización Total',
    description: 'Diseña tu tienda única',
    color: 'from-purple-500 to-pink-500',
    delay: 0.4,
  },
  {
    icon: BarChart3,
    title: 'Analytics Avanzados',
    description: 'Insights en tiempo real',
    color: 'from-indigo-500 to-purple-500',
    delay: 0.5,
  },
]

export function InteractiveShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  const [key, setKey] = useState('all')
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-32 relative overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute inset-0 morphing-gradient opacity-5" />

      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full floating-animation" />
      <div className="absolute top-40 right-20 w-16 h-16 bg-accent/10 rounded-lg floating-animation-delayed rotate-45" />
      <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-secondary/10 rounded-full floating-animation-delayed-2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 glass-effect">
            ✨ Tecnología de Vanguardia
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            Experimenta el{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              futuro del e-commerce
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Descubre las características revolucionarias que hacen de Propio la
            plataforma más avanzada del mercado
          </p>
        </motion.div>

        <div className="w-full grid grid-cols-1 2xl:grid-cols-[1fr_auto] mx-auto gap-10 overflow-x-hidden">
          <StaggerOnScroll
            effect="slideInRight"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-auto xl:h-[494px] gap-4 max-w-4xl mx-auto"
          >
            {showcaseItems.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className="group perspective-1000 max-w-max mx-auto max-h-max h-[230px]"
                >
                  <Card className="p-6 pb-0 h-full glass-effect w-[280px] max-h-[230px] gap-4 border-0 relative overflow-hidden transform-gpu">
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                      animate={{
                        scale: hoveredIndex === index ? 1.02 : 1,
                        rotate: hoveredIndex === index ? 2 : 0,
                      }}
                    />

                    <motion.div
                      className="relative z-10"
                      animate={{
                        scale: hoveredIndex === index ? 1.02 : 1,
                      }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                    >
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} p-4 mb-2 shadow-lg`}
                      >
                        <Icon className="w-full h-full text-white" />
                      </div>
                    </motion.div>

                    <h3 className="text-xl font-bold relative z-10">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-base text-light relative z-10">
                      {item.description}
                    </p>
                  </Card>
                </motion.div>
              )
            })}
          </StaggerOnScroll>

          <div className="flex min-h-100 sm:min-h-120 lg:min-w-[416px] flex-col items-center gap-8 mt-5 lg:mt-0 w-max mx-auto">
            <PillTabs onTabChange={(e) => setKey(e)} />

            <FlipReveal
              className="grid grid-cols-3 gap-3 sm:gap-4"
              keys={[key]}
              showClass="flex"
              hideClass="hidden"
            >
              <FlipRevealItem flipKey="shirt">
                <img
                  src="https://images.unsplash.com/photo-1696086152504-4843b2106ab4?q=80&w=300"
                  alt="Shirt"
                  className="size-20 rounded-md sm:size-28 xl:size-32"
                />
              </FlipRevealItem>
              <FlipRevealItem flipKey="goggles">
                <img
                  src="https://images.unsplash.com/photo-1648688135643-2716ec8f4b24?q=80&w=300"
                  alt="Goggles"
                  className="size-20 rounded-md sm:size-28 xl:size-32"
                />
              </FlipRevealItem>
              <FlipRevealItem flipKey="shoes">
                <img
                  src="https://images.unsplash.com/photo-1631984564919-1f6b2313a71c?q=80&w=300"
                  alt="Shoes"
                  className="size-20 rounded-md sm:size-28 xl:size-32"
                />
              </FlipRevealItem>
              <FlipRevealItem flipKey="goggles">
                <img
                  src="https://images.unsplash.com/photo-1632168844625-b22d7b1053c0?q=80&w=300"
                  alt="Goggles"
                  className="size-20 rounded-md sm:size-28 xl:size-32"
                />
              </FlipRevealItem>
              <FlipRevealItem flipKey="shirt">
                <img
                  src="https://images.unsplash.com/photo-1583656346517-4716a62e27b7?q=80&w=300"
                  alt="Shirt"
                  className="size-20 rounded-md sm:size-28 xl:size-32"
                />
              </FlipRevealItem>
              <FlipRevealItem flipKey="shoes">
                <img
                  src="https://images.unsplash.com/photo-1596480370804-cff0eed14888?q=80&w=300"
                  alt="Shoes"
                  className="size-20 rounded-md sm:size-28 xl:size-32"
                />
              </FlipRevealItem>
              <FlipRevealItem flipKey="shirt">
                <img
                  src="https://images.unsplash.com/photo-1740711152088-88a009e877bb?q=80&w=300"
                  alt="Goggles"
                  className="size-20 rounded-md sm:size-28 xl:size-32"
                />
              </FlipRevealItem>{' '}
              <FlipRevealItem flipKey="shoes">
                <img
                  src="https://images.unsplash.com/photo-1696086152508-1711cc7bcc9d?q=80&w=300"
                  alt="Shoes"
                  className="size-20 rounded-md sm:size-28 xl:size-32"
                />
              </FlipRevealItem>
              <FlipRevealItem flipKey="goggles">
                <img
                  src="https://images.unsplash.com/photo-1684790369514-f292d2dffc11?q=80&w=300"
                  alt="Goggles"
                  className="size-20 rounded-md sm:size-28 xl:size-32"
                />
              </FlipRevealItem>
            </FlipReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
