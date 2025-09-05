"use client"

import type React from "react"

import { motion, useInView, useMotionValue } from "framer-motion"
import { useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Zap, Globe, Smartphone, Palette, BarChart3 } from "lucide-react"

const showcaseItems = [
  {
    icon: ShoppingCart,
    title: "E-commerce Avanzado",
    description: "Gestión completa de inventario y ventas",
    color: "from-orange-500 to-red-500",
    delay: 0,
  },
  {
    icon: Zap,
    title: "Velocidad Extrema",
    description: "Carga en menos de 2 segundos",
    color: "from-yellow-500 to-orange-500",
    delay: 0.1,
  },
  {
    icon: Globe,
    title: "Multi-región",
    description: "Presencia global automática",
    color: "from-blue-500 to-purple-500",
    delay: 0.2,
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Optimizado para dispositivos móviles",
    color: "from-green-500 to-blue-500",
    delay: 0.3,
  },
  {
    icon: Palette,
    title: "Personalización Total",
    description: "Diseña tu tienda única",
    color: "from-purple-500 to-pink-500",
    delay: 0.4,
  },
  {
    icon: BarChart3,
    title: "Analytics Avanzados",
    description: "Insights en tiempo real",
    color: "from-indigo-500 to-purple-500",
    delay: 0.5,
  },
]

export function InteractiveShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      mouseX.set(event.clientX - rect.left)
      mouseY.set(event.clientY - rect.top)
    }
  }

  return (
    <section className="py-32 relative overflow-hidden" ref={containerRef} onMouseMove={handleMouseMove}>
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute inset-0 morphing-gradient opacity-5" />

      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full floating-animation" />
      <div className="absolute top-40 right-20 w-16 h-16 bg-accent/10 rounded-lg floating-animation-delayed rotate-45" />
      <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-secondary/10 rounded-full floating-animation-delayed-2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 glass-effect">
            ✨ Tecnología de Vanguardia
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            Experimenta el{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              futuro del e-commerce
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Descubre las características revolucionarias que hacen de Propio la plataforma más avanzada del mercado
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {showcaseItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: item.delay,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -10,
                  rotateY: 5,
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="group perspective-1000"
              >
                <Card className="p-8 h-full glass-effect border-0 relative overflow-hidden transform-gpu">
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    animate={{
                      scale: hoveredIndex === index ? 1.1 : 1,
                      rotate: hoveredIndex === index ? 2 : 0,
                    }}
                  />

                  <motion.div
                    className="relative z-10"
                    animate={{
                      rotateY: hoveredIndex === index ? 360 : 0,
                      scale: hoveredIndex === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} p-4 mb-6 shadow-lg`}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-3 relative z-10">{item.title}</h3>
                  <p className="text-muted-foreground text-lg relative z-10">{item.description}</p>

                  <motion.div
                    className="absolute inset-0 rounded-lg border-2 border-transparent"
                    animate={{
                      borderColor: hoveredIndex === index ? "hsl(var(--primary))" : "transparent",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
