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
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { ShoppingCartIcon, X } from 'lucide-react'
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
  const [isLoading, setIsLoading] = useState(false)
  const [orderCreated, setOrderCreated] = useState(false)
  const [iframeUrl, setIframeUrl] = useState('')

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

  const validateDiscountCode = (code: string) => {
    if (code.toUpperCase() === DISCOUNT_COUPON) {
      const discountAmount = (plan.price * DISCOUNT_PERCENTAGE) / 100
      setAppliedDiscount(discountAmount)
      setIsDiscountValid(true)
      return true
    }
    setAppliedDiscount(0)
    setIsDiscountValid(false)
    return false
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
      <DialogContent className="!max-w-7xl w-full max-h-[90vh] bg-zinc-900">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center sr-only">
            Completar Compra
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 mt-1">
          {/* Left Column - Form */}
          <div className="space-y-8 overflow-y-auto max-h-[70vh]">
            {/* Buyer Data Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-semibold mb-4">
                Datos del comprador
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
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
                    <h3 className="text-lg font-semibold mb-4">
                      Datos de facturación
                    </h3>

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

                  {/* Discount Code Section */}
                  <div className="pt-6 px-2">
                    <FormField
                      control={form.control}
                      name="discountCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Código de descuento</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input
                                placeholder="Introduce tu código de descuento"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e)
                                  if (e.target.value === '') {
                                    setAppliedDiscount(0)
                                    setIsDiscountValid(false)
                                  }
                                }}
                              />
                            </FormControl>
                            <Button
                              type="button"
                              className="bg-primary text-primary-foreground hover:bg-primary/90"
                              onClick={() =>
                                validateDiscountCode(field.value || '')
                              }
                            >
                              Aplicar
                            </Button>
                          </div>
                          {isDiscountValid && (
                            <p className="text-sm text-green-600">
                              ¡Código de descuento aplicado! (
                              {DISCOUNT_PERCENTAGE}% de descuento)
                            </p>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full max-w-sm mx-auto mt-10 mb-4 g-primary hover:bg-primary/90 flex items-center gap-2"
                    size="lg"
                  >
                    {isLoading ? 'Procesando...' : 'Continuar con el pago'}
                    <ShoppingCartIcon />
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

          {/* Right Column - Purchase Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="rounded-lg p-6 px-8 pt-0"
          >
            <h3 className="text-2xl font-semibold mb-6">
              Detalle de tu compra
            </h3>

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
              <div className="flex justify-between text-lg font-bold">
                <span>Monto Total</span>
                <span>Bs{total.toFixed(2)}</span>
              </div>

              <p className="text-xs text-muted-foreground">Incluye IVA (13%)</p>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
