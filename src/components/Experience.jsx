import { useLayoutEffect, useRef } from 'react'
import { Briefcase } from 'lucide-react'
import { gsap, REDUCED_MOTION } from '../lib/gsap'
import { EXPERIENCE } from '../lib/data'
import { Section, SectionTag } from './ui'
import Tilt from './Tilt'

function Experience() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (REDUCED_MOTION) return undefined
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.exp-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.6,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        },
      )
      gsap.fromTo(
        '.exp-dot',
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: 'back.out(2.2)',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        },
      )
      gsap.fromTo(
        '.exp-card',
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 62%',
            toggleActions: 'play none none reverse',
          },
        },
      )
      gsap.fromTo(
        '.exp-card > *',
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 58%',
            toggleActions: 'play none none reverse',
          },
        },
      )
      gsap.fromTo(
        '.exp-sep',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.15,
          stagger: 0.1,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 55%',
            toggleActions: 'play none none reverse',
          },
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <Section id="experience" ref={ref}>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-48 top-1/4 h-[560px] w-[560px] rounded-full bg-magenta/6 blur-[170px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-[480px] w-[480px] rounded-full bg-cyan/5 blur-[160px]"
      />

      <div className="container-x section-pad w-full">
        <SectionTag index="03" label="Experience" />
        <h2 className="mt-6 font-display text-5xl font-black text-ink drop-shadow-[0_0_24px_rgba(0,217,255,0.25)]">
          EXPERIENCE
        </h2>

        <div className="relative mt-14 max-w-4xl">
          {/* glow beam behind spine */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-[13px] top-0 w-12 -translate-x-1/2 rounded-full bg-cyan/15 blur-2xl"
          />
          {/* timeline spine */}
          <div className="exp-line absolute bottom-4 left-[13px] top-4 w-[2px] origin-top bg-linear-to-b from-cyan via-magenta to-lime shadow-[0_0_14px_rgba(0,217,255,0.6)]" />

          {EXPERIENCE.map((job, i) => (
            <div key={job.company}>
              <div className="exp-card relative pl-16 pb-12">
                <span className="exp-dot absolute left-[5px] top-2 h-[18px] w-[18px] rounded-full border-2 border-magenta bg-bg animate-pulse-glow" />

                <p className="exp-date font-mono text-xs uppercase tracking-[0.3em] text-cyan drop-shadow-[0_0_12px_rgba(0,217,255,0.8)] transition-all duration-150 hover:drop-shadow-[0_0_22px_rgba(0,217,255,1)] hover:text-ink">
                  {job.date}
                </p>

                <Tilt max={4} scale={1.02} className="mt-4">
                <div className="group rounded-2xl border border-cyan/20 bg-white/[0.03] p-7 backdrop-blur-sm transition-all duration-200 ease-out hover:scale-[1.03] hover:border-cyan/50 hover:shadow-[0_0_44px_rgba(0,217,255,0.4),0_0_20px_rgba(255,0,110,0.15)]">
                  <h3 className="font-display text-3xl font-extrabold tracking-wide text-ink transition-colors duration-150 group-hover:text-cyan">
                    {job.company}
                  </h3>
                  <p className="mt-1 flex items-center gap-2 text-lg font-semibold text-magenta glow-text-magenta">
                    <Briefcase size={16} /> {job.role}
                  </p>

                  <ul className="mt-5 space-y-2 text-ink/70">
                    {job.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan shadow-[0_0_6px_#00d9ff]" />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 font-mono text-sm text-ink/45">
                    <span className="text-lime drop-shadow-[0_0_8px_rgba(132,204,22,0.6)]">Tech:</span> {job.tech}
                  </p>
                </div>
                </Tilt>
              </div>

              {i < EXPERIENCE.length - 1 && (
                <div className="exp-sep ml-16 mb-8 h-px origin-left border-t border-dashed border-white/15" />
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default Experience