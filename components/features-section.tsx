"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Store, Zap, Shield, BarChart3, Palette, Globe } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const features = [
  {
    icon: Store,
    title: "Multitenant Avanzado",
    description:
      "Gestiona múltiples tiendas desde un solo panel. Cada tienda con su propio dominio, diseño y configuración.",
  },
  {
    icon: Zap,
    title: "Rendimiento Optimizado",
    description: "Infraestructura de alta velocidad que garantiza tiempos de carga rápidos y experiencia fluida.",
  },
  {
    icon: Shield,
    title: "Seguridad Empresarial",
    description: "Protección SSL, copias de seguridad automáticas y cumplimiento de estándares de seguridad.",
  },
  {
    icon: BarChart3,
    title: "Analytics Avanzados",
    description: "Métricas detalladas de ventas, comportamiento de usuarios y rendimiento de productos.",
  },
  {
    icon: Palette,
    title: "Personalización Total",
    description: "Editor visual intuitivo para personalizar el diseño sin conocimientos técnicos.",
  },
  {
    icon: Globe,
    title: "Alcance Global",
    description: "Soporte multi-idioma, múltiples monedas y integración con pasarelas de pago internacionales.",
  },
]

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="features" className="py-24 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">
            Todo lo que necesitas para <span className="text-primary">triunfar online</span>
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
            Propio combina potencia empresarial con simplicidad de uso. Todas las herramientas profesionales en una sola
            plataforma.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="border-border hover:shadow-lg transition-all duration-300 h-full">
                <CardHeader>
                  <motion.div
                    className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <feature.icon className="h-6 w-6 text-primary" />
                  </motion.div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
