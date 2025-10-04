'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { plans } from '@/lib/plans'
import { cn } from '@/lib/utils'
import NumberFlow from '@number-flow/react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Check,
  Shield,
  Sparkles,
  Star,
  Store as StoreIcon,
  Zap,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import { StarsBackground } from '../animate-ui/components/backgrounds/stars'
import { BuyDialog } from '../buy-dialog'

const transformPlans = (plansData: typeof plans) => {
  const icons = [Star, Zap, Shield] // Icons for the three plans

  return plansData.map((plan, index) => ({
    id: plan.value,
    name: plan.name,
    icon: icons[index],
    price: {
      monthly: plan.pricing.priceValue,
      yearly: plan.pricing.priceValue,
    },
    description: `Plan ${plan.name.toLowerCase()} con todas las funcionalidades incluidas.`,
    features: plan.list,
    cta: plan.action,
    popular: index === 1,
  }))
}

export default function SimplePricing() {
  const { resolvedTheme } = useTheme()
  const [frequency, setFrequency] = useState<string>('monthly')
  const [mounted, setMounted] = useState(false)
  const [isBuyDialogOpen, setIsBuyDialogOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<{
    id: string
    name: string
    price: number
    originalPrice?: number
    discount?: number
  } | null>(null)

  const handleBuyClick = (plan: {
    id: string
    name: string
    price: { monthly: number | string; yearly: number | string }
    cta: string
  }) => {
    const transformedPlan = transformPlans(plans).find((p) => p.id === plan.id)
    if (transformedPlan) {
      setSelectedPlan({
        id: transformedPlan.id,
        name: transformedPlan.name,
        price: transformedPlan.price[
          frequency as keyof typeof transformedPlan.price
        ] as number,
        originalPrice: transformedPlan.price[
          frequency as keyof typeof transformedPlan.price
        ] as number,
        discount: 0,
      })
      setIsBuyDialogOpen(true)
    }
  }

  return (
    <section
      className="not-prose relative flex w-full flex-col gap-16 overflow-hidden px-4 pt-24 pb-10 md:py-24 text-center sm:px-8"
      id="pricing"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-primary/10 absolute -top-[10%] left-[50%] h-[40%] w-[60%] -translate-x-1/2 rounded-full blur-3xl" />
        <div className="bg-primary/5 absolute -right-[10%] -bottom-[10%] h-[40%] w-[40%] rounded-full blur-3xl" />
        <div className="bg-primary/5 absolute -bottom-[10%] -left-[10%] h-[40%] w-[40%] rounded-full blur-3xl" />
      </div>

      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center space-y-2">
          <Badge
            variant="outline"
            className="border-primary/20 bg-primary/5 mb-4 rounded-full px-4 py-1 text-sm font-medium"
          >
            <Sparkles className="text-primary mr-1 h-3.5 w-3.5 animate-pulse" />
            Planes de Precios
          </Badge>

          <StarsBackground
            starColor={resolvedTheme === 'dark' ? '#FFF' : '#000'}
            className={cn(
              'absolute inset-0 -z-10 flex items-center justify-center rounded-xl',
              'dark:bg-[radial-gradient(ellipse_at_bottom,_#262626_0%,_#000_100%)] bg-[radial-gradient(ellipse_at_bottom,_#f5f5f5_0%,_#fff_100%)]',
            )}
          />

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold sm:text-5xl text-balance"
          >
            Elige el plan perfecto{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              para tu negocio
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground max-w-md pt-2 text-lg"
          >
            Precios simples y transparentes que crecen con tu negocio. Sin
            comisiones ocultas, sin sorpresas.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Tabs
            defaultValue={frequency}
            onValueChange={setFrequency}
            className="bg-muted/30 dark:bg-muted inline-block rounded-full p-1 shadow-sm"
          >
            <TabsList className="bg-transparent gap-1">
              <TabsTrigger
                value="monthly"
                className="data-[state=active]:bg-background dark:data-[state=active]:bg-primary rounded-full transition-all duration-300 data-[state=active]:shadow-sm"
              >
                Mensual
              </TabsTrigger>
              <TabsTrigger
                value="yearly"
                className="group data-[state=active]:bg-background dark:data-[state=active]:bg-primary rounded-full transition-all duration-300 data-[state=active]:shadow-sm"
              >
                <span>Anual</span>
                <Badge
                  variant="secondary"
                  className="bg-primary/10 dark:group-data-[state=active]:bg-secondary/50 dark:group-data-[state=active]:text-white text-primary hover:bg-primary/15 ml-2"
                >
                  Ahorro
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        <div className="mt-8 grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
          {transformPlans(plans).map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className="flex h-full w-full"
            >
              <Card
                className={cn(
                  'bg-card/10 relative h-full w-full text-left transition-all duration-[400ms] hover:-translate-y-3 hover:shadow-lg hover:scale-[1.02]',
                  plan.popular
                    ? 'border-primary/50 dark:shadow-primary/10 shadow-md border-2'
                    : 'hover:border-primary/50 dark:border-primary/20',
                  plan.popular &&
                    'from-primary/[0.03] bg-gradient-to-b to-transparent',
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 right-0 left-0 mx-auto w-fit z-50">
                    <Badge className="bg-primary text-primary-foreground rounded-full px-4 py-1 shadow-sm">
                      <Sparkles className="mr-1 h-3.5 w-3.5" />
                      Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className={cn('pb-4', plan.popular && 'pt-8')}>
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        'flex h-8 w-8 mr-1 items-center justify-center rounded-full',
                        'bg-primary/10 text-primary',
                      )}
                    >
                      <plan.icon className="h-4 w-4" />
                    </div>
                    <CardTitle
                      className={cn(
                        'text-xl font-bold',
                        plan.popular && 'text-primary',
                      )}
                    >
                      {plan.name}
                    </CardTitle>
                  </div>
                  <CardDescription className="mt-3 space-y-2">
                    <p className="text-sm">{plan.description}</p>
                    <div className="pt-2">
                      {typeof plan.price[
                        frequency as keyof typeof plan.price
                      ] === 'number' ? (
                        <div className="flex items-baseline">
                          <NumberFlow
                            className={cn(
                              'text-3xl font-bold',
                              plan.popular ? 'text-primary' : 'text-foreground',
                            )}
                            format={{
                              style: 'currency',
                              currency: 'BOB',
                              maximumFractionDigits: 0,
                            }}
                            value={
                              plan.price[
                                frequency as keyof typeof plan.price
                              ] as number
                            }
                          />
                          <span className="text-muted-foreground ml-1 text-sm">
                            /mes
                          </span>
                        </div>
                      ) : (
                        <span
                          className={cn(
                            'text-2xl font-bold',
                            plan.popular ? 'text-primary' : 'text-foreground',
                          )}
                        >
                          {plan.price[frequency as keyof typeof plan.price]}
                        </span>
                      )}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3 pb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.div
                      key={`${plan.id}-feature-${featureIndex}`}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.5 + featureIndex * 0.05,
                      }}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div
                        className={cn(
                          'flex h-5 w-5 items-center justify-center rounded-full',
                          plan.popular
                            ? 'bg-primary/10 text-primary'
                            : 'bg-secondary text-secondary-foreground',
                        )}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <span
                        className={
                          plan.popular
                            ? 'text-foreground'
                            : 'text-muted-foreground'
                        }
                      >
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button
                    id={plan.id}
                    variant={plan.popular ? 'default' : 'outline'}
                    className={cn(
                      'w-full font-medium transition-all duration-300',
                      plan.popular
                        ? 'bg-primary hover:bg-primary/90 hover:shadow-primary/20 hover:shadow-md'
                        : 'hover:border-primary/30 hover:bg-primary/5 hover:text-primary',
                    )}
                    onClick={() => handleBuyClick(plan)}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </CardFooter>

                {plan.popular ? (
                  <>
                    <div className="from-primary/[0.05] pointer-events-none absolute right-0 bottom-0 left-0 h-1/2 rounded-b-lg bg-gradient-to-t to-transparent" />
                    <div className="border-primary/20 pointer-events-none absolute inset-0 rounded-lg border" />
                  </>
                ) : (
                  <div className="hover:border-primary/10 pointer-events-none absolute inset-0 rounded-lg border border-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center md:mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-muted-foreground">
            ¿Necesitas algo diferente?{' '}
            <motion.a
              href="/"
              className="text-primary hover:underline font-medium"
              whileHover={{ scale: 1.05 }}
            >
              Contáctanos para un plan personalizado
            </motion.a>
          </p>
        </motion.div>
      </div>

      {selectedPlan && (
        <BuyDialog
          isOpen={isBuyDialogOpen}
          onClose={() => {
            setIsBuyDialogOpen(false)
            setSelectedPlan(null)
          }}
          plan={selectedPlan}
        />
      )}
    </section>
  )
}
