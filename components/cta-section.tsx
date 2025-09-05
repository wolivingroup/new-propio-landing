import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
            <Sparkles className="mr-2 h-4 w-4" />
            ¡Únete a miles de emprendedores exitosos!
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance mb-6">
            ¿Listo para hacer crecer tu <span className="text-primary">negocio online</span>?
          </h2>

          <p className="text-xl text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto">
            Únete a Propio hoy y descubre por qué somos la plataforma de e-commerce preferida por emprendedores en toda
            Latinoamérica.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="text-lg px-8">
              Crear mi tienda gratis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              Hablar con un experto
            </Button>
          </div>

          <div className="mt-8 text-sm text-muted-foreground">
            ✅ Sin tarjeta de crédito • ✅ Configuración en 5 minutos • ✅ Soporte en español
          </div>
        </div>
      </div>
    </section>
  )
}
