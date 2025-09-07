'use client'

import type React from 'react'

import { Button } from '@/components/ui/button'
import { motion, useInView, useMotionValue } from 'framer-motion'
import { ArrowRight, Rocket, Sparkles, Zap } from 'lucide-react'
import { useRef } from 'react'
import { TiltCard } from './gsap/tilt-card'

export function ImmersiveCTA() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      const x = event.clientX - rect.left - rect.width / 2
      const y = event.clientY - rect.top - rect.height / 2
      mouseX.set(x)
      mouseY.set(y)
    }
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="py-32 relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10"
    >
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <TiltCard className="max-w-5xl mx-auto text-center" maxTilt={4}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center rounded-full glass-effect px-6 py-3 text-sm font-medium mb-8 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 morphing-gradient opacity-20"
              animate={{ rotate: 360 }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'linear',
              }}
            />
            <Sparkles className="mr-2 h-4 w-4 relative z-10" />
            <span className="relative z-10">
              ¡Únete a la revolución del e-commerce!
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-balance mb-8 relative"
          >
            <span className="block">¿Listo para</span>
            <motion.span
              className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeInOut',
              }}
              style={{ backgroundSize: '200% 200%' }}
            >
              dominar el mercado?
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-2xl text-muted-foreground text-pretty mb-12 max-w-3xl mx-auto"
          >
            Únete a Propio y descubre por qué somos la plataforma de e-commerce
            que está transformando negocios en toda Latinoamérica.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <Button
                size="lg"
                className="text-xl px-10 py-6 relative overflow-hidden"
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center">
                  <Rocket className="mr-3 h-6 w-6" />
                  Crear mi tienda gratis
                  <ArrowRight className="ml-3 h-6 w-6" />
                </span>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="text-xl px-10 py-6 glass-effect border-primary/20 hover:border-primary/40 bg-transparent"
              >
                <Zap className="mr-3 h-6 w-6" />
                Ver demo en vivo
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm"
          >
            {[
              { icon: '✅', text: 'Sin tarjeta de crédito' },
              { icon: '⚡', text: 'Configuración en 5 minutos' },
              { icon: '🇪🇸', text: 'Soporte en español 24/7' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="flex items-center justify-center gap-3 p-4 rounded-lg glass-effect"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-muted-foreground font-medium">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </TiltCard>
      </div>
    </section>
  )
}
