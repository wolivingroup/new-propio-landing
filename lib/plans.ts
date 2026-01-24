export interface PlanType {
  name: string
  value: string
  pricing: {
    priceValue: number
    stockPriceValue?: number
    hotsale?: {
      priceValue: number
      validUntil: string
    }
  }
  serviceFee: string
  paymentFee: string
  list: string[]
  action: string
  actionVariant: 'filled' | 'outline'
}

export const baseMonthlyPlanPrice = 99

export const plans: PlanType[] = [
  {
    name: 'Mensual',
    value: 'monthly',
    pricing: {
      priceValue: baseMonthlyPlanPrice,
    },
    serviceFee: '+ Comision por venta exitosa (3%)',
    paymentFee: '',
    list: [
      'Tienda online personalizada',
      'Gestión de productos ilimitada',
      'Formularios personalizados',
      'Reportes en tiempo real sobre tus ventas',
      'Pasarela de pagos integrada',
      'Funciones de recojo en tienda',
      'Tracking de entregas',
      'Soporte básico',
    ],
    action: 'Comprar',
    actionVariant: 'filled',
  },
  {
    name: 'Anual',
    value: 'yearly',
    pricing: {
      priceValue: 900,
      stockPriceValue: baseMonthlyPlanPrice * 12,
      hotsale: {
        priceValue: 853,
        validUntil: '6 de agosto',
      },
    },
    serviceFee: '+ Comision por venta exitosa (3%)',
    paymentFee: '',
    list: [
      'Tienda online personalizada',
      'Gestión de productos ilimitada',
      'Formularios personalizados',
      'Reportes en tiempo real sobre tus ventas',
      'Pasarela de pagos integrada',
      'Funciones de recojo en tienda',
      'Tracking de entregas',
      'Soporte básico',
    ],
    action: 'Comprar',
    actionVariant: 'outline',
  },
  {
    name: 'Mensual (30 Bs)',
    value: 'special',
    pricing: {
      priceValue: 30,
    },
    serviceFee: '+ Comision por venta exitosa (3%)',
    paymentFee: '',
    list: [
      'Tienda online personalizada',
      'Gestión de productos ilimitada',
      'Formularios personalizados',
      'Reportes en tiempo real sobre tus ventas',
      'Pasarela de pagos integrada',
      'Funciones de recojo en tienda',
      'Tracking de entregas',
      'Soporte básico',
    ],
    action: 'Comprar',
    actionVariant: 'filled',
  },
]
