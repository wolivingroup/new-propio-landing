'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { useRef } from 'react'

const testimonials = [
  {
    name: 'María González',
    role: 'Fundadora de Boutique Luna',
    content:
      'Propio transformó completamente mi negocio. En 3 meses aumenté mis ventas un 300% y ahora tengo presencia internacional.',
    avatar: '/placeholder.svg?height=60&width=60',
    rating: 5,
    sales: '+300%',
    color: 'from-pink-500 to-rose-500',
  },
  {
    name: 'Carlos Mendoza',
    role: 'CEO de TechStore MX',
    content:
      'La facilidad de uso es increíble. Migré de otra plataforma en solo 2 días y mis clientes notaron la diferencia inmediatamente.',
    avatar: '/placeholder.svg?height=60&width=60',
    rating: 5,
    sales: '+150%',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Ana Rodríguez',
    role: 'Directora de Artesanías del Sur',
    content:
      'El soporte en español es excepcional. Siempre hay alguien disponible para ayudarme a crecer mi negocio artesanal.',
    avatar: '/placeholder.svg?height=60&width=60',
    rating: 5,
    sales: '+200%',
    color: 'from-green-500 to-emerald-500',
  },
]

export function ParallaxTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -30])

  const transforms = [y1, y2, y3]

  return (
    <section
      ref={containerRef}
      className="py-32 relative overflow-hidden"
      id="testimonials"
    >
      <div className="absolute inset-0 gradient-mesh" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            Historias de{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              éxito real
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Descubre cómo emprendedores como tú han transformado sus negocios
            con Propio
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              style={{ y: transforms[index] }}
              initial={{ opacity: 0, rotateY: -15, z: -100 }}
              animate={isInView ? { opacity: 1, rotateY: 0, z: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: 'easeOut',
              }}
              whileHover={{
                rotateY: 5,
                z: 50,
                transition: { duration: 0.3 },
              }}
              className="group perspective-1000"
            >
              <Card className="p-8 h-full glass-effect border-0 relative overflow-hidden transform-gpu">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <motion.div
                  className="absolute top-4 right-4 opacity-10"
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                  }}
                >
                  <Quote className="w-16 h-16 text-primary" />
                </motion.div>

                <div className="relative z-10">
                  <motion.div
                    className="flex gap-1 mb-6"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={isInView ? { scale: 1, rotate: 0 } : {}}
                        transition={{
                          delay: 0.7 + index * 0.1 + i * 0.1,
                          type: 'spring',
                          stiffness: 200,
                        }}
                      >
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </motion.div>

                  <blockquote className="text-lg mb-6 text-pretty leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        src={testimonial.avatar || '/placeholder.svg'}
                      />
                      <AvatarFallback>
                        {testimonial.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                    <motion.div
                      className={`px-3 py-1 rounded-full bg-gradient-to-r ${testimonial.color} text-white text-sm font-bold`}
                      animate={{
                        scale: [1, 1.05, 1],
                        boxShadow: [
                          '0 0 0 0 rgba(0,0,0,0)',
                          '0 0 0 4px rgba(0,0,0,0.1)',
                          '0 0 0 0 rgba(0,0,0,0)',
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: index * 0.5,
                      }}
                    >
                      {testimonial.sales}
                    </motion.div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
