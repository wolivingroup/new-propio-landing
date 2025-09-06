'use client'

import { Button } from '@/components/ui/button'
import { motion, useInView } from 'framer-motion'
import { Rocket, TrendingUp, Users } from 'lucide-react'
import { useRef } from 'react'

const benefits = [
  {
    icon: TrendingUp,
    title: 'Crece sin límites',
    description:
      'Escala tu negocio desde 0 hasta millones de productos sin preocuparte por la infraestructura.',
  },
  {
    icon: Users,
    title: 'Para todo tipo de negocio',
    description:
      'Desde emprendedores individuales hasta grandes empresas. Propio se adapta a tu tamaño.',
  },
  {
    icon: Rocket,
    title: 'Lanza en minutos',
    description:
      'Configura tu tienda completa en menos de 10 minutos. Sin complicaciones técnicas.',
  },
]

const stats = [
  { number: '10,000+', label: 'Tiendas activas' },
  { number: '99.9%', label: 'Uptime garantizado' },
  { number: '24/7', label: 'Soporte técnico' },
  { number: '0%', label: 'Comisiones por venta' },
]

export function BenefitsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="benefits" className="py-24" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden md:overflow-x-visible">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-balance mb-6"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
            >
              ¿Por qué elegir <span className="text-primary">Propio</span>?
            </motion.h2>

            <motion.p
              className="text-xl text-muted-foreground text-pretty mb-8"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Más que una plataforma de e-commerce, somos tu socio tecnológico
              para el crecimiento digital. Diseñado por emprendedores, para
              emprendedores.
            </motion.p>

            <div className="space-y-6 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -30 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
                  }
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <benefit.icon className="h-5 w-5 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="text-lg px-8">
                Descubre todas las ventajas
              </Button>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 gap-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-2xl bg-card border border-border"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <motion.div
                  className="text-3xl sm:text-4xl font-bold text-primary mb-2"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.6 + index * 0.1,
                    type: 'spring',
                    stiffness: 200,
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
