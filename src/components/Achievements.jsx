import { useLayoutEffect, useRef } from 'react'
import { Trophy } from 'lucide-react'
import { gsap, REDUCED_MOTION } from '../lib/gsap'
import { ACHIEVEMENTS } from '../lib/data'
import { Section, SectionTag } from './ui'
import Tilt from './Tilt'

function Achievements() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (REDUCED_MOTION) return undefined
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ach-title',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 70%', toggleActions: 'play none none reverse' },
        },
      )
      gsap.fromTo(
        '.ach-card',
        { xPercent: -70, rotation: -10, opacity: 0 },
        {
          xPercent: 0,
          rotation: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: ref.current, start: 'top 62%', toggleActions: 'play none none reverse' },
        },
      )
      gsap.fromTo(
        '.ach-icon',
        { scale: 0 },
        {
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(2.5)',
          scrollTrigger: { trigger: ref.current, start: 'top 58%', toggleActions: 'play none none reverse' },
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <Section id="achievements" ref={ref}>
      <div className="container-x section-pad w-full">
        <SectionTag index="05" label="Achievements" />
        <h2 className="ach-title mt-6 font-display text-5xl font-black text-ink drop-shadow-[0_0_24px_rgba(255,0,110,0.25)]">
          ACHIEVEMENTS
        </h2>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {ACHIEVEMENTS.map((a) => (
            <Tilt key={a.title} max={7} scale={1.04} className="col-span-1">
            <div
              className="ach-card card-glow glass group flex h-full cursor-pointer flex-col items-center rounded-2xl px-6 py-9 text-center hover:scale-105 hover:border-cyan/40 hover:shadow-[0_0_36px_rgba(0,217,255,0.25),0_0_36px_rgba(255,0,110,0.15)]"
              onMouseDown={(e) => e.currentTarget.classList.add('animate-badge-pulse')}
              onAnimationEnd={(e) => e.currentTarget.classList.remove('animate-badge-pulse')}
            >
              <span className="ach-icon flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-cyan/15 to-magenta/15 text-3xl animate-float-glow">
                {a.icon}
              </span>
              <p className="mt-4 sm:mt-6 font-display text-lg font-extrabold tracking-wide text-ink">{a.title}</p>
              <p className="mt-1 sm:mt-2 flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-cyan">
                <Trophy size={12} /> {a.subtitle}
              </p>
            </div>
            </Tilt>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default Achievements