import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, REDUCED_MOTION } from '../lib/gsap'
import { SKILLS } from '../lib/data'
import { Section, SectionTag } from './ui'
import Tilt from './Tilt'

function Skills() {
  const ref = useRef(null)
  const [tooltip, setTooltip] = useState(null)

  useLayoutEffect(() => {
    if (REDUCED_MOTION) return undefined
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skill-title',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 70%', toggleActions: 'play none none reverse' },
        },
      )
      gsap.fromTo(
        '.skill-cat-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.25,
          ease: 'power2.inOut',
          stagger: 0.08,
          scrollTrigger: { trigger: ref.current, start: 'top 66%', toggleActions: 'play none none reverse' },
        },
      )
      gsap.fromTo(
        '.skill-badge',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.35,
          stagger: 0.06,
          ease: 'back.out(1.7)',
          clearProps: 'transform',
          scrollTrigger: { trigger: ref.current, start: 'top 60%', toggleActions: 'play none none reverse' },
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  const itemLabel = (item) => (typeof item === 'string' ? item : item.name)
  const itemDesc = (item) => (typeof item === 'string' ? '' : item.desc)

  return (
    <Section id="skills" ref={ref}>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-44 bottom-0 h-[540px] w-[540px] rounded-full bg-lime/5 blur-[160px]"
      />

      {/* tooltip */}
      {tooltip && (
        <div
          className="fixed z-40 max-w-[260px] rounded-xl border border-cyan/30 bg-[#151821]/95 px-4 py-3 shadow-[0_0_30px_rgba(0,217,255,0.25)] backdrop-blur-xl"
          style={{ top: tooltip.y + 12, left: tooltip.x }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">{tooltip.label}</p>
          <p className="mt-1 text-sm text-ink/80">{tooltip.desc}</p>
        </div>
      )}

      <div className="container-x section-pad w-full">
        <SectionTag index="04" label="Skills & Tech Stack" />
        <h2 className="skill-title mt-6 font-display text-5xl font-black text-ink drop-shadow-[0_0_24px_rgba(132,204,22,0.25)]">
          SKILLS &amp; TECH
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-16 md:gap-y-14">
          {SKILLS.map((group) => (
            <div key={group.category}>
              <div className="flex items-center gap-5">
                <h3 className="font-display text-xl font-bold uppercase tracking-[0.2em] text-ink/85">
                  {group.category}
                </h3>
                <span className="skill-cat-line h-px w-20 origin-left bg-linear-to-r from-cyan to-transparent shadow-[0_0_8px_rgba(0,217,255,0.6)]" />
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {group.items.map((item) => {
                  const label = itemLabel(item)
                  const desc = itemDesc(item)
                  return (
                    <Tilt key={label} max={8} scale={1.06} className="inline-block">
                      <span
                        className="skill-badge pill cursor-default select-none group"
                        onMouseEnter={(e) => {
                          if (desc) {
                            const r = e.currentTarget.getBoundingClientRect()
                            setTooltip({
                              label,
                              desc,
                              x: r.left + r.width / 2,
                              y: r.top,
                            })
                          }
                        }}
                        onMouseLeave={() => setTooltip(null)}
                        onMouseDown={(e) => e.currentTarget.classList.add('animate-badge-pulse')}
                        onAnimationEnd={(e) => e.currentTarget.classList.remove('animate-badge-pulse')}
                      >
                        {label}
                      </span>
                    </Tilt>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default Skills