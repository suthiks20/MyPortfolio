import { useLayoutEffect, useRef } from 'react'
import { gsap, REDUCED_MOTION } from '../lib/gsap'
import { ABOUT_TECH } from '../lib/data'
import { Section, SectionTag, Divider } from './ui'
import Tilt from './Tilt'

const BIO =
  'Mechanical engineer by training. Full-stack builder by passion. I create AI-augmented applications that solve real problems.'

const BIO_LINES = [
  { key: 'name', text: 'Suthikshan K', cls: 'font-display text-4xl font-extrabold text-ink' },
  { key: 'line1', text: 'B.E Mech Eng + CS', cls: 'text-lg font-medium text-ink/80' },
  { key: 'line2', text: 'PSG iTech (8.10 CGPA)', cls: 'text-lg font-medium text-ink/80' },
  { key: 'line3', text: 'Graduating May 2027', cls: 'text-lg font-medium text-cyan' },
  { key: 'line4', text: 'Currently building trust verification + AI auth systems', cls: 'text-base font-medium text-ink/60' },
]

const STATS = [
  { value: '8.10', label: 'CGPA' },
  { value: '5+', label: 'Projects' },
  { value: '3', label: 'Internships' },
]

function About() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (REDUCED_MOTION) return undefined
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: ref.current, start: 'top 62%', toggleActions: 'play none none reverse' },
      })
      tl.fromTo(
        '.about-creative',
        { xPercent: -120, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 0.4 },
      )
        .fromTo(
          '.about-developer',
          { xPercent: 120, opacity: 0 },
          { xPercent: 0, opacity: 1, duration: 0.4 },
          '-=0.15',
        )
        .fromTo('.about-divider', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power2.inOut' }, '-=0.1')
        .fromTo('.about-tagline', { opacity: 0 }, { opacity: 1, duration: 1 }, '-=0.15')
        .fromTo(
          '.about-avatar',
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.6)' },
          '-=0.5',
        )
        .fromTo(
          '.about-stat',
          { scale: 0.7, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, stagger: 0.1, ease: 'back.out(2)', clearProps: 'transform' },
          '-=0.35',
        )
        .fromTo(
          '.about-bio-char',
          { opacity: 0 },
          { opacity: 1, duration: 0.02, stagger: 0.012, ease: 'none' },
          '-=0.3',
        )
        .fromTo(
          '.about-bio-line',
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.08 },
          '-=0.4',
        )
        .fromTo(
          '.about-pill',
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'back.out(1.7)', clearProps: 'transform' },
          '-=0.25',
        )
        .fromTo('.about-caption', { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.2')

      // profile parallax — 0.3x scroll speed
      gsap.fromTo(
        '.about-parallax',
        { yPercent: -4 },
        {
          yPercent: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <Section id="about" ref={ref}>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-cyan/5 blur-[160px]"
      />        <div className="container-x section-pad w-full">
        <div className="grid grid-cols-12 items-center gap-x-6 md:gap-x-10 gap-y-16">
          {/* LEFT — words + stats + typewriter bio */}
          <div className="col-span-12 md:col-span-4 flex flex-col items-center gap-y-6">
            <SectionTag index="02" label="Creative Developer" className="justify-center" />
            <h2 className="about-creative mt-10 font-display text-6xl font-black leading-[0.95] text-outline text-center">
              CREATIVE
            </h2>
            <h2 className="about-developer font-display text-6xl font-black leading-[0.95] text-magenta glow-text-magenta text-center">
              DEVELOPER
            </h2>

            <Divider className="about-divider mt-8 origin-left mx-auto w-[min(350px,55%)]" />

            <div className="mt-8 flex items-end justify-center gap-8">
              {STATS.map((s) => (
                <div key={s.label} className="about-stat">
                  <p className="font-display text-4xl font-black text-cyan drop-shadow-[0_0_20px_rgba(0,217,255,0.6)]">
                    {s.value}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50">{s.label}</p>
                </div>
              ))}
            </div>

            <p className="mt-10 max-w-sm font-mono text-sm leading-relaxed text-ink/55 text-center">
              {BIO.split('').map((ch, i) => (
                <span key={i} className="about-bio-char">
                  {ch === ' ' ? '\u00A0' : ch}
                </span>
              ))}
            </p>
          </div>

          {/* CENTER — profile photo */}
          <div className="col-span-12 md:col-span-4 flex flex-col items-center">
            <div className="relative">
              <div className="about-parallax relative">
                <Tilt max={10} scale={1.04} className="about-avatar relative h-64 w-64 sm:h-80 sm:w-80 overflow-hidden">
                  {/* soft ambient glow behind the image — blends into dark bg */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-30 blur-xl animate-pulse-soft"
                    style={{
                      background:
                        'radial-gradient(circle at 50% 50%, rgba(0,217,255,0.25) 0%, rgba(255,0,110,0.12) 50%, transparent 80%)',
                    }}
                  />
                  <img
                    src="/images/suthikshan.jpg"
                    alt="Suthikshan K"
                    className="relative z-10 h-full w-full object-cover animate-avatar-glow"
                    style={{
                      // Chameleon blend: soft radial fade at edges so the image
                      // dissolves into the dark #0a0a0a background with no hard circle.
                      maskImage:
                        'radial-gradient(ellipse 75% 75% at 50% 50%, rgba(0,0,0,1) 35%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0) 100%)',
                      WebkitMaskImage:
                        'radial-gradient(ellipse 75% 75% at 50% 50%, rgba(0,0,0,1) 35%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0) 100%)',
                      filter: 'drop-shadow(0 0 28px rgba(0,217,255,0.2))',
                    }}
                  />
                </Tilt>
              </div>
              {/* caption removed per user request — keep the glowing photo standalone */}
            </div>
          </div>

          {/* RIGHT — tagline + identity + tech pills */}
          <div className="col-span-12 md:col-span-4 flex flex-col items-center gap-y-6">
            <p className="about-tagline font-display text-2xl font-bold leading-snug text-ink/90 text-center">
              I build digital worlds where{' '}
              <span className="text-cyan drop-shadow-[0_0_18px_rgba(0,217,255,0.6)]">design</span> meets{' '}
              <span className="text-lime drop-shadow-[0_0_18px_rgba(132,204,22,0.5)]">code</span>.
            </p>

            <div className="mt-10 space-y-1.5 text-center">
              {BIO_LINES.map((line) => (
                <p key={line.key} className={`about-bio-line ${line.cls}`} style={{ textAlign: 'center' }}>
                  {line.text}
                </p>
              ))}
            </div>

            <div className="mt-8 flex max-w-xs flex-wrap justify-center gap-3">
              {ABOUT_TECH.map((t) => (
                <span key={t} className="about-pill pill">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default About