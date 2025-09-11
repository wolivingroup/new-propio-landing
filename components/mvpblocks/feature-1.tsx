'use client'
import { cn } from '@/lib/utils'
import { motion, useInView } from 'framer-motion'
import {
  Book,
  Code,
  Paintbrush,
  PlusCircle,
  Rocket,
  Terminal,
} from 'lucide-react'
import { useRef } from 'react'
import { StaggerOnScroll } from '../gsap/stagger-on-scroll'

const features = [
  {
    icon: <Code className="h-6 w-6" />,
    title: 'Developer-Friendly',
    desc: 'Tailored for developers to create and iterate fast, with minimal overhead and maximum flexibility.',
  },
  {
    icon: <Terminal className="h-6 w-6" />,
    title: 'CLI Support',
    desc: 'Command-line interface support for seamless development and workflow integration.',
  },
  {
    icon: <Paintbrush className="h-6 w-6" />,
    title: 'Easily Customizable',
    desc: 'Every block is built to be editable. From layout to logic, style to structure—make it your own.',
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: 'v0 Support',
    desc: 'Launch fast with confidence. Perfect for MVPs, prototypes, and weekend projects.',
  },
  {
    icon: <Book className="h-6 w-6" />,
    title: 'Full Documentation',
    desc: 'Comprehensive documentation to understand every feature and maximize your development experience.',
  },
  {
    icon: <PlusCircle className="h-6 w-6" />,
    title: 'Contribute Yours',
    desc: 'Add your own blocks to the library and become part of the MVPBlocks community.',
  },
]

export default function Feature1() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section className="relative py-14" ref={containerRef}>
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="relative mx-auto max-w-2xl sm:text-center">
          <div className="relative z-10">
            <motion.h3
              className="font-geist mt-4 text-3xl font-normal tracking-tighter sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: -50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              Todo para <span className="text-primary">triunfar online</span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
              className="font-geist text-foreground/60 mt-3"
            >
              Propio combina potencia empresarial con simplicidad de uso. Todas
              las herramientas profesionales en una sola plataforma.
            </motion.p>
          </div>
          <div
            className="absolute inset-0 mx-auto h-44 max-w-xs blur-[118px]"
            style={{
              background:
                'linear-gradient(152.92deg, rgba(192, 15, 102, 0.2) 4.54%, rgba(235, 124, 50, 0.26) 34.2%, rgba(220, 70, 0, 0.331) 77.55%)',
            }}
          />
        </div>
        <hr className="bg-foreground/30 mx-auto mt-5 h-px w-1/2" />
        <div className="relative mt-12">
          <StaggerOnScroll
            effect="random"
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((item, idx) => (
              <motion.li
                key={item.title}
                className={cn(
                  'group z-30 w-full cursor-pointer overflow-hidden transform-gpu relative gap-3 flex flex-col rounded-xl border bg-transparent p-4 [box-shadow:0_-20px_80px_-20px_#e4621030_inset]',
                  "before:absolute before:inset-0 before:rounded-[inherit] before:content-['']",
                  "after:absolute after:inset-0 after:rounded-[inherit] after:content-['']",
                )}
                whileHover={{ scale: 1.01 }}
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
                  type: 'keyframes',
                }}
                style={
                  {
                    '--card-color': 'oklch(0.65 0.18 45.2)',
                  } as React.CSSProperties
                }
              >
                {/* Moving Border */}
                <div
                  className="absolute inset-0 overflow-hidden rounded-[inherit]"
                  style={{
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    padding: '2px',
                  }}
                >
                  <div
                    className="absolute inset-[-200%] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        'conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 340deg, var(--card-color) 360deg)',
                      animation: 'spin 4s linear infinite',
                    }}
                  />
                </div>

                <div className="text-primary w-fit transform-gpu rounded-full border p-4 [box-shadow:0_-20px_80px_-20px_#e4611028_inset] dark:[box-shadow:0_-20px_80px_-20px_#e4611028_inset]">
                  {item.icon}
                </div>
                <h4 className="font-geist text-lg font-bold tracking-tighter">
                  {item.title}
                </h4>
                <p className="text-gray-500">{item.desc}</p>
              </motion.li>
            ))}
          </StaggerOnScroll>
        </div>
      </div>
    </section>
  )
}
