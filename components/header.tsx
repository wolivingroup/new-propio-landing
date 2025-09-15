'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  RippleButton,
  RippleButtonRipples,
} from './animate-ui/components/buttons/ripple'
import { ThemeTogglerButton } from './animate-ui/components/buttons/theme-toggler'

const SECTIONS = [
  {
    id: 'features',
    label: 'Características',
  },
  {
    id: 'benefits',
    label: 'Beneficios',
  },
  {
    id: 'testimonials',
    label: 'Testimonios',
  },
  {
    id: 'pricing',
    label: 'Precios',
  },
]

export function Header() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      setSelectedSection(sectionId)
    }
    setIsMenuOpen(false)
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 50 }}
    >
      <motion.div
        className={cn(
          'mx-auto transition-all duration-500 ease-out',
          isScrolled ? 'max-w-7xl' : 'max-w-full',
        )}
        animate={{
          marginTop: isScrolled ? '12px' : '0px',
        }}
      >
        <motion.div
          className="border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-500 ease-out"
          animate={{
            borderRadius: isScrolled ? '12px' : '0px',
            boxShadow: isScrolled
              ? '0 10px 25px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)'
              : 'none',
            borderWidth: isScrolled ? '1px' : '0px 0px 1px 0px',
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Image
                  src="/propio.svg"
                  alt="Propio"
                  width={100}
                  height={100}
                />
              </div>

              <nav className="hidden md:block">
                <div className="relative ml-10 flex items-baseline space-x-8">
                  {SECTIONS.map((section, index) =>
                    section.id === selectedSection ? (
                      <motion.button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className="relative text-foreground hover:text-primary transition-colors text-sm"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: index * 0.1,
                          type: 'spring',
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <motion.span
                          layoutId="underline"
                          className="absolute left-0 top-full z-50 block h-[3px] w-full rounded-sm bg-primary"
                        />
                        {section.label}
                      </motion.button>
                    ) : (
                      <motion.button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className="relative text-foreground hover:text-primary transition-colors text-sm"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: index * 0.1,
                          type: 'spring',
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        {section.label}
                      </motion.button>
                    ),
                  )}
                </div>
              </nav>

              {/* Desktop CTA and Theme Toggle */}
              <div className="hidden md:flex items-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ThemeTogglerButton
                    modes={['light', 'dark']}
                    variant="ghost"
                    className="dark:hover:text-white"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.5,
                    type: 'spring',
                    stiffness: 400,
                    damping: 10,
                  }}
                >
                  <RippleButton variant="default" className="rounded-sm">
                    Empezar ahora
                    <RippleButtonRipples />
                  </RippleButton>
                </motion.div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center space-x-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setTheme(theme === 'light' ? 'dark' : 'light')
                    }
                  >
                    <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Cambiar tema</span>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <AnimatePresence mode="wait">
                      {isMenuOpen ? (
                        <motion.div
                          key="close"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <X className="h-6 w-6" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="menu"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Menu className="h-6 w-6" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  className="md:hidden"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border">
                    {[
                      { id: 'features', label: 'Características' },
                      { id: 'benefits', label: 'Beneficios' },
                      { id: 'testimonials', label: 'Testimonios' },
                      { id: 'pricing', label: 'Precios' },
                    ].map((item, index) => (
                      <motion.button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className="block w-full text-left px-3 py-2 text-foreground text-base hover:text-primary transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item.label}
                      </motion.button>
                    ))}
                    <motion.div
                      className="px-3 py-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Button className="w-full">Empieza Ahora</Button>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </motion.header>
  )
}
