"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const plans = [
  {
    name: "Starter",
    price: "Gratis",
    description: "Perfect para empezar tu primer negocio online",
    features: ["Hasta 100 productos", "1 tienda online", "Plantillas básicas", "Soporte por email", "SSL incluido"],
    cta: "Empezar Gratis",
    popular: false,
  },
  {
    name: "Professional",
    price: "$29",
    period: "/mes",
    description: "Para negocios en crecimiento que necesitan más potencia",
    features: [
      "Productos ilimitados",
      "Hasta 5 tiendas",
      "Plantillas premium",
      "Soporte prioritario",
      "Analytics avanzados",
      "Integraciones API",
    ],
    cta: "Prueba 14 días gratis",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Personalizado",
    description: "Soluciones a medida para grandes empresas",
    features: [
      "Tiendas ilimitadas",
      "Soporte dedicado 24/7",
      "Personalización completa",
      "SLA garantizado",
      "Integración personalizada",
      "Consultoría incluida",
    ],
    cta: "Contactar Ventas",
    popular: false,
  },
]

export function PricingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="pricing" className="py-24" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">
            Planes que se adaptan a <span className="text-primary">tu crecimiento</span>
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
            Comienza gratis y escala según creces. Sin sorpresas, sin comisiones ocultas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Card
                className={`relative border-border h-full ${
                  plan.popular ? "border-primary shadow-lg" : "hover:shadow-lg transition-shadow duration-300"
                }`}
              >
                {plan.popular && (
                  <motion.div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      Más Popular
                    </span>
                  </motion.div>
                )}

                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <motion.div
                    className="mt-4"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1, type: "spring", stiffness: 200 }}
                  >
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </motion.div>
                  <CardDescription className="text-base mt-4">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, delay: 0.5 + featureIndex * 0.05 }}
                      >
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"} size="lg">
                      {plan.cta}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-muted-foreground">
            ¿Necesitas algo diferente?{" "}
            <motion.a href="#" className="text-primary hover:underline font-medium" whileHover={{ scale: 1.05 }}>
              Contáctanos para un plan personalizado
            </motion.a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
