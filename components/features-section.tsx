'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { motion, useInView } from 'framer-motion'
import { BarChart3, Globe, Palette, Shield, Store, Zap } from 'lucide-react'
import { useRef } from 'react'
import { StaggerOnScroll } from './gsap/stagger-on-scroll'

const features = [
  {
    icon: Store,
    title: 'Multitenant Avanzado',
    description:
      'Gestiona múltiples tiendas desde un solo panel. Cada tienda con su propio dominio, diseño y configuración.',
  },
  {
    icon: Zap,
    title: 'Rendimiento Optimizado',
    description:
      'Infraestructura de alta velocidad que garantiza tiempos de carga rápidos y experiencia fluida.',
  },
  {
    icon: Shield,
    title: 'Seguridad Empresarial',
    description:
      'Protección SSL, copias de seguridad automáticas y cumplimiento de estándares de seguridad.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Avanzados',
    description:
      'Métricas detalladas de ventas, comportamiento de usuarios y rendimiento de productos.',
  },
  {
    icon: Palette,
    title: 'Personalización Total',
    description:
      'Editor visual intuitivo para personalizar el diseño sin conocimientos técnicos.',
  },
  {
    icon: Globe,
    title: 'Alcance Global',
    description:
      'Soporte multi-idioma, múltiples monedas y integración con pasarelas de pago internacionales.',
  },
]

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="features" className="py-24 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 md:overflow-x-visible overflow-x-hidden">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">
            Todo lo que necesitas para{' '}
            <span className="text-primary">triunfar online</span>
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
            Propio combina potencia empresarial con simplicidad de uso. Todas
            las herramientas profesionales en una sola plataforma.
          </p>
        </motion.div>

        <StaggerOnScroll
          className="my-24 grid w-full grid-cols-2 max-w-max mx-auto gap-4 md:gap-6 lg:grid-cols-3"
          effect="random"
        >
          {features.map((feature, index) => (
            <div key={index}>
              <Card className="group max-w-[400px] mx-auto relative overflow-hidden border-0 bg-gradient-to-br from-primary/90 via-primary/60 to-primary/40 hover:from-orange-400 hover:via-orange-500 hover:to-red-400 transition-all duration-500 h-full shadow-lg hover:shadow-xl hover:shadow-orange-500/25 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

                <div className="absolute top-4 right-4 w-2 h-2 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100" />
                <div className="absolute bottom-6 left-6 w-1 h-1 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200" />
                <div className="absolute top-1/2 right-8 w-1.5 h-1.5 bg-white/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300" />

                <CardHeader className="relative z-10">
                  <motion.div
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4 border border-white/30"
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    transition={{
                      duration: 0.3,
                      type: 'spring',
                      stiffness: 300,
                    }}
                  >
                    <feature.icon className="h-6 w-6 text-white drop-shadow-lg" />
                  </motion.div>
                  <CardTitle className="text-xl text-white font-bold drop-shadow-md">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-base leading-relaxed text-white/90 drop-shadow-sm">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          ))}
        </StaggerOnScroll>
      </div>
    </section>
  )
}
