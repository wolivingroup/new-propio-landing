'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { ChevronUp, ShoppingCartIcon, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

// Discount coupon constant
const DISCOUNT_COUPON = 'CASHPAYMENT'
const DISCOUNT_PERCENTAGE = 20 // 20% discount

// Types
export type PlanPurchaseType = {
  firstName: string
  lastName: string
  email: string
  createdAt: number
  phone: {
    code: string
    value: number | string
  }
  plan:
    | {
        name: string
        duration: number
        price: number
      }
    | undefined
  companyName: string
  bill: {
    billNit: number | string
    billName: string
  }
  paymentMethod: 'cash' | 'wolipay'
  discountCode?: string
  discountType?: 'referral' | 'sales' | 'special'
  referralData?: CodeType
}

export type CodeType = {
  active: boolean
  referralCode: string
  userId: string
  createdAt: number
  id: string
  amountDiscount: number
  commission: number
}

// Payment response types
export type PlanPurchaseResponseType = {
  iframe: {
    code: number
    body?: {
      iFrameUrl: string
    }
  }
  paymentStatus?: 'success' | 'pending' | 'failed'
}

// Zod validation schema
const buyFormSchema = z.object({
  firstName: z.string().min(1, 'El nombre es requerido'),
  lastName: z.string().min(1, 'El apellido es requerido'),
  email: z.string().email('Email inválido'),
  phone: z.object({
    code: z.string().min(1, 'Código de país requerido'),
    value: z.string().min(1, 'Número de teléfono requerido'),
  }),
  companyName: z.string().min(1, 'El nombre de la empresa es requerido'),
  bill: z.object({
    billNit: z.string().min(1, 'El NIT es requerido'),
    billName: z.string().min(1, 'La razón social es requerida'),
  }),
  paymentMethod: z.enum(['cash', 'wolipay']),
  discountCode: z.string().optional(),
})

type BuyFormData = z.infer<typeof buyFormSchema>

// Payment service function
const generatePlanOrder = async (
  body: PlanPurchaseType,
): Promise<PlanPurchaseResponseType> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CLOUD_FUNCTIONS_URL}/createPaymentOrder`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  )

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json()
}

interface BuyDialogProps {
  isOpen: boolean
  onClose: () => void
  plan: {
    id: string
    name: string
    price: number
    originalPrice?: number
    discount?: number
  }
}

export function BuyDialog({ isOpen, onClose, plan }: BuyDialogProps) {
  const [appliedDiscount, setAppliedDiscount] = useState(0)
  const [isDiscountValid, setIsDiscountValid] = useState(false)
  const [isValidatingDiscount, setIsValidatingDiscount] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [orderCreated, setOrderCreated] = useState(false)
  const [iframeUrl, setIframeUrl] = useState('')
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false)

  const form = useForm<BuyFormData>({
    resolver: zodResolver(buyFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: {
        code: '+591',
        value: '',
      },
      companyName: '',
      bill: {
        billNit: '',
        billName: '',
      },
      paymentMethod: 'wolipay',
      discountCode: '',
    },
  })

  const validateDiscountCode = async (code: string) => {
    if (!code.trim()) {
      toast.error('Por favor ingresa un código de descuento')
      return
    }

    setIsValidatingDiscount(true)

    // Simulated API call - replace with actual DB fetch later
    const validateCodePromise = new Promise<{
      valid: boolean
      discount: number
    }>((resolve, reject) => {
      setTimeout(() => {
        if (code.toUpperCase() === DISCOUNT_COUPON) {
          resolve({ valid: true, discount: DISCOUNT_PERCENTAGE })
        } else {
          reject(new Error('Código de descuento inválido'))
        }
      }, 1000) // Simulate network delay
    })

    toast.promise(validateCodePromise, {
      loading: 'Validando código...',
      success: (data) => {
        const discountAmount = (plan.price * data.discount) / 100
        setAppliedDiscount(discountAmount)
        setIsDiscountValid(true)
        return `¡Código aplicado! ${data.discount}% de descuento`
      },
      error: (err) => {
        setAppliedDiscount(0)
        setIsDiscountValid(false)
        return err.message || 'Código inválido'
      },
    })

    try {
      await validateCodePromise
    } catch {
      // Error already handled by toast.promise
    } finally {
      setIsValidatingDiscount(false)
    }
  }

  const onSubmit = async (data: BuyFormData) => {
    console.log('onSubmit function called!')
    console.log('Form data received:', data)

    setIsLoading(true)
    const loadingToast = toast.loading('Procesando pago...')

    try {
      const durationDict = {
        monthly: 30,
        biannual: 180,
        yearly: 365,
        special: 30,
      }

      const purchaseData: PlanPurchaseType = {
        ...data,
        createdAt: new Date().getTime(),
        plan: {
          name: plan.name,
          duration: durationDict[plan.id as keyof typeof durationDict] || 30,
          price: plan.price,
        },
        discountCode: data.discountCode || '',
        discountType: isDiscountValid ? 'sales' : undefined,
      }

      console.log('Purchase data:', purchaseData)
      console.log('Applied discount:', appliedDiscount)

      const res = await generatePlanOrder(purchaseData)

      toast.dismiss(loadingToast)

      if (res.iframe.code === 200) {
        setIframeUrl(res.iframe.body?.iFrameUrl || '')
        setOrderCreated(true)
        toast.success('Orden creada exitosamente')
      } else if (res.paymentStatus === 'success') {
        setIframeUrl('')
        setOrderCreated(true)
        toast.success('Pago procesado exitosamente')
      } else {
        toast.error('Contactar soporte.')
        console.error(res.iframe)
      }
    } catch (error) {
      toast.dismiss(loadingToast)
      toast.error('Error al procesar el pago')
      console.error('Payment error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const onError = (errors: Record<string, unknown>) => {
    console.log('Form validation errors:', errors)
  }

  const subtotal = plan.price
  const discount = appliedDiscount
  const total = subtotal - discount

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="!max-w-6xl w-[98vw] lg:w-[95vw] max-h-[95vh] lg:max-h-[90vh] dark:bg-zinc-950 dark:border-zinc-700 p-0 overflow-hidden"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="sr-only">
          <DialogTitle className="text-2xl font-bold text-center">
            Completar Compra
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col lg:flex-row h-full max-h-[95vh] lg:max-h-[90vh]">
          {/* Left Column - Form */}
          <div className="flex-1 space-y-4 lg:space-y-6 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {/* Buyer Data Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl lg:text-2xl font-semibold mb-2">
                Datos del comprador
              </h3>
              <div className="border-b border-zinc-200 dark:border-zinc-700 mb-3 lg:mb-4" />
              <p className="text-sm text-muted-foreground mb-4 lg:mb-6 pt-3 pb-1">
                Completa los siguientes datos para continuar:
              </p>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit, onError)}
                  className="space-y-6"
                >
                  {/* Names Row */}
                  <div className="grid grid-cols-2 gap-4 px-2">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Nombres <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ingresa tus nombres"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Apellidos{' '}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ingresa tus apellidos"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="px-2 space-y-6">
                    {/* Phone */}
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Número de celular{' '}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input
                                placeholder="+591"
                                value={field.value.code}
                                onChange={(e) =>
                                  field.onChange({
                                    ...field.value,
                                    code: e.target.value,
                                  })
                                }
                                className="w-20"
                              />
                            </FormControl>
                            <FormControl>
                              <Input
                                placeholder="Ingresa tu número de celular"
                                value={field.value.value}
                                onChange={(e) =>
                                  field.onChange({
                                    ...field.value,
                                    value: e.target.value,
                                  })
                                }
                                className="flex-1"
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Correo electrónico{' '}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Ingresa tu correo electrónico"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Company Name */}
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Nombre de empresa{' '}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ingresa el nombre de tu empresa"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Billing Data Section */}
                  <div className="pt-6 px-2">
                    <h3 className="text-lg font-semibold mb-2">
                      Datos de facturación
                    </h3>
                    <div className="border-b border-zinc-200 dark:border-zinc-700 mb-4" />

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="bill.billNit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              NIT <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Ingresa el NIT" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="bill.billName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Razón social{' '}
                              <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Ingresa la razón social"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-8 mb-20 lg:mb-4 h-13 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all duration-300"
                    size="lg"
                  >
                    {isLoading ? 'Procesando...' : 'Continuar con el pago'}
                    <ShoppingCartIcon className="h-6 w-6" />
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>

          {/* Payment iframe modal */}
          {orderCreated && iframeUrl && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="relative w-full h-[90vh] bg-white dark:bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="text-xl font-semibold">Completar Pago</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setOrderCreated(false)
                      setIframeUrl('')
                    }}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <iframe
                  src={iframeUrl}
                  className="w-full h-[calc(100%-4rem)] border-0 rounded-lg rounded-t-none"
                  title="Payment iframe"
                />
              </div>
            </div>
          )}

          {/* Right Column - Purchase Details (Desktop Only) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="hidden lg:flex w-[420px] lg:w-[500px] shrink-0 bg-zinc-100 dark:bg-zinc-900 p-8 flex-col justify-start overflow-y-auto"
          >
            <h3 className="text-2xl font-semibold mb-2">
              Detalle de tu compra
            </h3>
            <div className="border-b border-zinc-200 dark:border-zinc-700 mb-6" />

            {/* Plan Details */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Plan:</span>
                <span className="font-medium">{plan.name}</span>
              </div>

              <Separator />

              {/* Subtotal */}
              <div className="flex justify-between">
                <span>Total parcial</span>
                <span>Bs{subtotal.toFixed(2)}</span>
              </div>

              {/* Discount */}
              <div className="flex justify-between">
                <span>Descuentos</span>
                <span className={discount > 0 ? 'text-primary' : ''}>
                  {discount > 0 ? `-Bs${discount.toFixed(2)}` : 'Bs0.00'}
                </span>
              </div>

              <Separator />

              {/* Total */}
              <div className="flex justify-between items-center pt-2">
                <div>
                  <span className="text-base font-medium">Monto Total</span>
                  <p className="text-xs text-muted-foreground">
                    Incluye IVA (13%)
                  </p>
                </div>
                <span className="text-3xl font-bold">Bs{total.toFixed(2)}</span>
              </div>

              {/* Discount Code Section */}
              <div className="pt-6 mt-4 border-t border-border">
                <span className="text-sm font-medium text-muted-foreground block mb-3">
                  Código de descuento
                </span>
                <div className="flex gap-3">
                  <Input
                    placeholder="Introduce tu código"
                    aria-label="Código de descuento"
                    value={form.watch('discountCode') || ''}
                    onChange={(e) => {
                      form.setValue('discountCode', e.target.value)
                      if (e.target.value === '') {
                        setAppliedDiscount(0)
                        setIsDiscountValid(false)
                      }
                    }}
                    className="flex-1"
                    disabled={isValidatingDiscount}
                  />
                  <Button
                    type="button"
                    className="rounded-full px-8 h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() =>
                      validateDiscountCode(form.watch('discountCode') || '')
                    }
                    disabled={isValidatingDiscount}
                  >
                    {isValidatingDiscount ? 'Validando...' : 'Validar'}
                  </Button>
                </div>
                {isDiscountValid && (
                  <p className="text-sm text-green-500 mt-2 font-medium">
                    ¡Código aplicado! ({DISCOUNT_PERCENTAGE}% de descuento)
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Mobile Floating Bar + Sheet */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
            <Sheet open={isMobileSheetOpen} onOpenChange={setIsMobileSheetOpen}>
              <SheetTrigger asChild>
                <motion.div
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  className="bg-zinc-100 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-700 px-4 py-3 cursor-pointer shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Total a pagar
                        </p>
                        <p className="text-lg font-bold">
                          Bs{total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        Plan {plan.name}
                      </p>
                      {discount > 0 && (
                        <p className="text-xs text-primary font-medium">
                          -Bs{discount.toFixed(2)} descuento
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </SheetTrigger>
              <SheetContent
                side="bottom"
                className="rounded-t-3xl max-h-[75vh] overflow-y-auto px-6 pb-8"
              >
                <SheetHeader className="pb-2 pt-2">
                  <div className="w-12 h-1.5 bg-zinc-300 dark:bg-zinc-600 rounded-full mx-auto mb-4" />
                  <SheetTitle className="text-lg font-semibold text-left">
                    Detalle de tu compra
                  </SheetTitle>
                </SheetHeader>

                <div className="space-y-3 pb-4">
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-sm text-muted-foreground">Plan:</span>
                    <span className="font-medium text-sm">{plan.name}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between py-1 text-sm">
                    <span>Total parcial</span>
                    <span>Bs{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between py-1 text-sm">
                    <span>Descuentos</span>
                    <span
                      className={discount > 0 ? 'text-primary font-medium' : ''}
                    >
                      {discount > 0 ? `-Bs${discount.toFixed(2)}` : 'Bs0.00'}
                    </span>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center py-2">
                    <div>
                      <span className="text-sm font-medium">Monto Total</span>
                      <p className="text-xs text-muted-foreground">
                        Incluye IVA (13%)
                      </p>
                    </div>
                    <span className="text-xl font-bold">
                      Bs{total.toFixed(2)}
                    </span>
                  </div>

                  {/* Discount Code Section - Mobile */}
                  <div className="pt-3 border-t border-border">
                    <span className="text-xs font-medium text-muted-foreground block mb-2">
                      Código de descuento
                    </span>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Tu código"
                        aria-label="Código de descuento"
                        value={form.watch('discountCode') || ''}
                        onChange={(e) => {
                          form.setValue('discountCode', e.target.value)
                          if (e.target.value === '') {
                            setAppliedDiscount(0)
                            setIsDiscountValid(false)
                          }
                        }}
                        className="flex-1 h-10 text-sm"
                        disabled={isValidatingDiscount}
                      />
                      <Button
                        type="button"
                        className="rounded-full px-5 h-10 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-sm"
                        onClick={() =>
                          validateDiscountCode(form.watch('discountCode') || '')
                        }
                        disabled={isValidatingDiscount}
                      >
                        {isValidatingDiscount ? '...' : 'Validar'}
                      </Button>
                    </div>
                    {isDiscountValid && (
                      <p className="text-sm text-green-500 mt-2 font-medium">
                        ¡Código aplicado! ({DISCOUNT_PERCENTAGE}% de descuento)
                      </p>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
