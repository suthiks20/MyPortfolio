import { useLayoutEffect, useRef } from 'react'
import { gsap, REDUCED_MOTION } from '../lib/gsap'
import Tilt from './Tilt'

const SUB_LINES = [
  'Full-stack engineer building',
  'AI-augmented systems with honest',
  'deployable tech.',
]

function Hero() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (REDUCED_MOTION) return undefined
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(
        '.hero-title-part',
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, delay: 0.15 },
      )
        .fromTo(
          '.hero-divider',
          { scaleX: 0 },
          { scaleX: 1, duration: 0.6, ease: 'power2.inOut' },
          '-=0.25',
        )
        .fromTo(
          '.hero-sub > span',
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
          '-=0.15',
        )
        .fromTo(
          '.hero-hint',
          { opacity: 0 },
          { opacity: 1, duration: 0.7 },
          '+=0.5',
        )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* backdrop */}
      <div aria-hidden className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_78%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[44%] h-[420px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.05] blur-[110px]"
        style={{ background: 'radial-gradient(ellipse, #00d9ff 0%, rgba(0,217,255,0.4) 42%, transparent 72%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-[12%] h-[560px] w-[560px] rounded-full bg-cyan/8 blur-[160px] animate-floaty-slow"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 right-[8%] h-[620px] w-[620px] rounded-full bg-magenta/8 blur-[170px] animate-floaty"
      />

      <Tilt max={2.2} scale={1} perspective={1200} className="relative w-full">
      <div className="container-x py-16 sm:py-20 sm:py-28 text-center">
        <p className="hero-title-part mono-label mb-10 justify-center">
          <span className="text-magenta">$</span> Full-stack engineer — AI systems
        </p>

        <h1 className="hero-title-part font-display font-black leading-none tracking-tight drop-shadow-[0_0_42px_rgba(0,217,255,0.3)]">
          <span className="block text-[clamp(48px,10vw,96px)] text-ink text-center">
            PORTFOLIO{' '}
            <span className="text-cyan drop-shadow-[0_0_28px_rgba(0,217,255,0.85)]">✖</span>{' '}
            DEVELOPER
          </span>
        </h1>

        <div className="hero-divider mx-auto mt-12 w-[min(640px,80%)] origin-left" />

        <p className="hero-sub mt-10 font-display text-xl sm:text-2xl font-medium leading-snug text-ink/75 text-center">
          {SUB_LINES.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>
      </Tilt>

      <div className="hero-hint absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 opacity-0 md:hidden">
        <div className="animate-scroll-bounce">
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-ink/30 p-1.5 shadow-[0_0_12px_rgba(0,217,255,0.25)]">
            <span className="h-2 w-1 rounded-full bg-cyan shadow-[0_0_8px_#00d9ff] animate-scroll-wheel" />
          </div>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.45em] text-ink/50 animate-pulse-soft glow-text-cyan">
          Scroll
        </span>
      </div>
    </section>
  )
}

export default Hero