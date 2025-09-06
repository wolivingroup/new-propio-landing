import { PlayCircleIcon, ZapIcon } from 'lucide-react'

import { RevealText } from '@/components/gsap/reveal-text'
import { SpringButton } from '@/components/gsap/spring-button'
import { TextFallButton } from '@/components/gsap/text-fall-button'
import { TiltCard } from '@/components/gsap/tilt-card'

const avatars = [
  'https://github.com/vercel.png',
  'https://github.com/shadcn.png',
  'https://github.com/tailwindcss.png',
  'https://github.com/rauchg.png',
  'https://github.com/lucide-icons.png',
  'https://github.com/greensock.png',
  'https://github.com/radix-ui.png',
  'https://github.com/nextjs.png',
]

const Hero1 = () => {
  return (
    <main className="bg-gradient-to-br from-background via-card to-background min-h-[75vh] pt-16 flex items-center justify-center">
      <div className="container grid place-content-center overflow-hidden p-4 sm:p-6 lg:p-12 mx-auto">
        <div className="grid h-full grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="order-2 flex flex-col items-start lg:order-1">
            <div className="bg-muted flex items-center gap-1.5 rounded-full py-1 ps-1 pe-3 text-sm">
              <div className="bg-primary text-primary-foreground rounded-full p-1">
                <ZapIcon className="size-4" />
              </div>
              <p>Built for everyday speed</p>
            </div>

            <RevealText className="mt-3 text-2xl leading-[1.15] font-semibold sm:text-3xl lg:text-5xl">
              Smarter Workflows. Faster Results.{' '}
              <span className="text-primary">Better Clarity.</span>
            </RevealText>
            <p className="text-foreground/80 mt-3 max-w-lg max-sm:text-sm lg:mt-5">
              Plan and write faster with simple, focused tools built for action,
              growth, and everyday creative momentum across all your important
              projects.
            </p>
            <div className="mt-4 flex items-center justify-center lg:justify-start space-x-8 text-sm text-muted-foreground">
              {[
                'Sin comisiones por venta',
                'Escalabilidad ilimitada',
                'Soporte 24/7',
              ].map((text, index) => (
                <div key={text} className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                  {text}
                </div>
              ))}
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-3">
              <TextFallButton className="bg-primary text-primary-foreground cursor-pointer overflow-hidden rounded-full py-2 ps-4 pe-5 font-medium">
                Start Free Trial
              </TextFallButton>
              <SpringButton
                shaking={false}
                className="flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 font-medium shadow-none"
              >
                Watch Demo
                <PlayCircleIcon className="size-4.5" />
              </SpringButton>
            </div>
            <div className="mt-auto flex items-center gap-2 pt-4 lg:pt-6">
              <div className="flex -space-x-4 *:transition-all *:duration-300 *:hover:-translate-y-2">
                <img
                  src={avatars[0]}
                  alt="Avatar"
                  className="border-background size-10 rounded-full border-4 sm:size-12"
                />
                <img
                  src={avatars[1]}
                  alt="Avatar"
                  className="border-background size-10 rounded-full border-4 sm:size-12"
                />
                <img
                  src={avatars[2]}
                  alt="Avatar"
                  className="border-background size-10 rounded-full border-4 sm:size-12"
                />
              </div>
              <div>
                <p className="font-medium">12k+</p>
                <p className="text-muted-foreground line-clamp-1 text-sm leading-none max-sm:text-xs">
                  Trusted by teams and businesses
                </p>
              </div>
            </div>
          </div>

          <TiltCard
            wrapperClassName="order-1 lg:order-2"
            className="bg-foreground/5 rounded-md p-2"
          >
            <img
              src="https://images.unsplash.com/photo-1674027392842-29f8354e236c?w=1000"
              className="h-80 w-full rounded-md object-cover sm:h-90 lg:h-110"
              alt="Hero banner"
            />
          </TiltCard>
        </div>
      </div>
    </main>
  )
}

export default Hero1
