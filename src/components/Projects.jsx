import { useLayoutEffect, useRef } from 'react'
import { ArrowUpRight, Check, ExternalLink, Mail, Sparkles } from 'lucide-react'
import { gsap, REDUCED_MOTION } from '../lib/gsap'
import { PROJECTS, LINKS } from '../lib/data'
import { Section, SectionTag, Divider, RippleButton } from './ui'
import { GithubIcon } from './BrandIcons'
import Tilt from './Tilt'

/* ---------------------------------- themed visuals ---------------------------------- */

function TrustPulseVisual() {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 100% at 20% 15%, rgba(0,217,255,0.18) 0%, transparent 55%), radial-gradient(110% 100% at 85% 90%, rgba(255,0,110,0.16) 0%, transparent 55%)',
        }}
      />
      <div className="bg-grid absolute inset-0 opacity-30" />

      {/* face silhouette */}
      <svg viewBox="0 0 200 200" className="absolute left-1/2 top-1/2 h-[92%] -translate-x-1/2 -translate-y-1/2 opacity-20">
        <circle cx="100" cy="84" r="40" fill="none" stroke="#00d9ff" strokeWidth="2" />
        <path d="M34 212c6-40 34-60 66-60s60 20 66 60" fill="none" stroke="#00d9ff" strokeWidth="2" />
      </svg>

      {/* liveness ring */}
      <div className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/25 shadow-[0_0_30px_rgba(0,217,255,0.2)] animate-pulse-soft" />

      {/* fingerprint */}
      <svg
        viewBox="0 0 120 150"
        className="absolute left-1/2 top-1/2 h-[80%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_16px_rgba(0,217,255,0.7)]"
      >
        <defs>
          <linearGradient id="fpGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#00d9ff" />
            <stop offset="1" stopColor="#ff006e" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#fpGrad)" strokeWidth="3" opacity="0.95">
          <ellipse cx="60" cy="66" rx="46" ry="58" />
          <ellipse cx="60" cy="66" rx="33" ry="47" opacity="0.85" />
          <ellipse cx="60" cy="66" rx="20" ry="36" opacity="0.7" />
          <ellipse cx="60" cy="66" rx="7" ry="25" opacity="0.55" />
          <path d="M60 4v18M60 110v36" strokeLinecap="round" />
        </g>
      </svg>

      {/* scanner line */}
      <div className="absolute left-1/2 top-0 h-full w-[58%] -translate-x-1/2 overflow-hidden">
        <div className="absolute inset-0 animate-scan">
          <div className="mx-auto h-12 w-11/12 rounded-full bg-linear-to-b from-transparent via-cyan/50 to-transparent blur-[3px]" />
        </div>
      </div>
    </div>
  )
}

const BUILDINGS = [52, 84, 64, 110, 74, 130, 58, 96, 68]

function CivicFlowVisual() {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 100% at 15% 10%, rgba(132,204,22,0.16) 0%, transparent 55%), radial-gradient(110% 100% at 85% 92%, rgba(0,217,255,0.16) 0%, transparent 55%)',
        }}
      />
      <div className="bg-grid absolute inset-0 opacity-30" />

      {/* city skyline */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-2.5 px-10 pb-4">
        {BUILDINGS.map((h, i) => (
          <div
            key={i}
            className="w-[22px] animate-rise rounded-t-sm border border-cyan/25 bg-cyan/10 shadow-[0_0_14px_rgba(0,217,255,0.15)]"
            style={{ height: h, animationDelay: `${(i % 4) * 0.45}s`, animationDuration: '3.4s' }}
          />
        ))}
      </div>

      {/* glowing issue pins */}
      <span className="absolute left-[27%] top-[30%] h-3.5 w-3.5 rounded-full bg-magenta shadow-[0_0_16px_rgba(255,0,110,0.9)] animate-pulse-soft" />
      <span
        className="absolute left-[47%] top-[20%] h-3 w-3 rounded-full bg-cyan shadow-[0_0_14px_rgba(0,217,255,0.9)] animate-pulse-soft"
        style={{ animationDelay: '0.7s' }}
      />
      <span
        className="absolute left-[66%] top-[34%] h-3 w-3 rounded-full bg-magenta shadow-[0_0_14px_rgba(255,0,110,0.8)] animate-pulse-soft"
        style={{ animationDelay: '1.2s' }}
      />

      {/* routing lines */}
      <svg viewBox="0 0 600 400" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d="M150 262 C 210 185, 255 175, 300 130" fill="none" stroke="#84cc16" strokeWidth="2.5" strokeDasharray="7 7" className="animate-dash" />
        <path d="M300 130 C 345 118, 385 150, 430 205" fill="none" stroke="#00d9ff" strokeWidth="2" strokeDasharray="7 7" className="animate-dash" style={{ animationDelay: '0.6s' }} />
      </svg>

      {/* routing status chip */}
      <div className="glass absolute left-[9%] top-[12%] rounded-lg px-3 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-lime animate-floaty">
        severity → auto-routing
      </div>
    </div>
  )
}

function CurriSyncVisual() {
  const steps = [
    { label: 'submitted', delay: 0.3 },
    { label: 'reviewed', delay: 0.85 },
    { label: 'approved', delay: 1.4 },
  ]
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 100% at 18% 12%, rgba(255,0,110,0.16) 0%, transparent 55%), radial-gradient(110% 100% at 85% 90%, rgba(168,85,247,0.16) 0%, transparent 55%)',
        }}
      />
      <div className="bg-grid absolute inset-0 opacity-30" />

      {/* 3D document stack */}
      <div className="absolute left-[13%] top-1/2 -translate-y-1/2" style={{ perspective: '900px' }}>
        <div className="relative h-56 w-44" style={{ transform: 'rotateY(22deg) rotateX(8deg)', transformStyle: 'preserve-3d' }}>
          <div className="absolute inset-0 rounded-xl border border-white/10 bg-[#14161d] shadow-2xl" style={{ transform: 'translateZ(-30px) rotate(-5deg)' }} />
          <div className="absolute inset-0 rounded-xl border border-white/10 bg-[#181b24] shadow-2xl" style={{ transform: 'translateZ(-15px) rotate(-2deg)' }} />
          <div className="absolute inset-0 rounded-xl border border-magenta/40 bg-[#1d2029] p-5 shadow-[0_0_28px_rgba(255,0,110,0.25)]">
            <div className="h-2 w-14 rounded bg-ink/30" />
            <div className="mt-3 h-2 w-20 rounded bg-ink/20" />
            <div className="mt-6 space-y-2.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-2 rounded bg-ink/10" style={{ width: `${80 - i * 15}%` }} />
              ))}
            </div>
            <div className="mt-7 flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lime/20 text-lime animate-pop" style={{ animationDelay: '0.6s' }}>
                <Check size={11} strokeWidth={3} />
              </span>
              <span className="font-mono text-[9px] tracking-[0.2em] text-lime">approved</span>
            </div>
          </div>
        </div>
      </div>

      {/* approval flow */}
      <div className="absolute right-[9%] top-1/2 -translate-y-1/2">
        <div className="glass flex flex-col items-center gap-3 rounded-xl px-5 py-4 shadow-[0_0_24px_rgba(0,217,255,0.15)]">
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-cyan animate-floaty">
            <Mail size={14} /> pdf trigger
            <ArrowUpRight size={12} className="text-lime" />
          </span>
          {steps.map((s) => (
            <div key={s.label} className="flex items-center gap-2.5">
              <span
                className="flex h-6 w-6 items-center justify-center rounded-full border border-lime/60 bg-lime/15 text-lime animate-pop"
                style={{ animationDelay: `${s.delay}s` }}
              >
                <Check size={12} strokeWidth={3} />
              </span>
              <span className="w-20 font-mono text-[9px] uppercase tracking-[0.2em] text-ink/50">{s.label}</span>
            </div>
          ))}
          <span className="mt-1 font-mono text-[9px] text-ink/40">role-based · JWT</span>
        </div>
      </div>
    </div>
  )
}

const MODULE_COLORS = ['#00d9ff', '#ff006e', '#84cc16', '#3b82f6', '#a855f7', '#f59e0b', '#00d9ff', '#ff006e', '#84cc16']

function AmsVisual() {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 100% at 18% 12%, rgba(59,130,246,0.18) 0%, transparent 55%), radial-gradient(110% 100% at 85% 90%, rgba(0,217,255,0.16) 0%, transparent 55%)',
        }}
      />
      <div className="bg-grid absolute inset-0 opacity-30" />

      {/* isometric apartment block */}
      <div className="absolute left-[15%] top-1/2 -translate-y-1/2">
        <div
          className="grid grid-cols-3 gap-2.5"
          style={{ transform: 'rotateX(55deg) rotateZ(45deg)', transformStyle: 'preserve-3d' }}
        >
          {MODULE_COLORS.map((c, i) => (
            <div
              key={i}
              className="h-14 w-14 rounded-md border border-white/20"
              style={{ background: `${c}26`, boxShadow: `0 0 18px ${c}55, inset 0 0 12px ${c}22` }}
            />
          ))}
        </div>
      </div>

      {/* AI copilot orb */}
      <div className="absolute right-[19%] top-[17%] h-16 w-16 rounded-full bg-linear-to-br from-cyan to-magenta blur-[1px] shadow-[0_0_36px_rgba(0,217,255,0.8)] animate-pulse-soft" />
      <div className="absolute right-[19%] top-[17%] h-16 w-16 rounded-full border border-cyan/50 shadow-[0_0_24px_rgba(0,217,255,0.4)] animate-pulse-soft" style={{ animationDelay: '0.5s' }} />

      {/* connection lines */}
      <svg viewBox="0 0 600 400" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d="M420 110 C 360 140, 300 170, 235 200" fill="none" stroke="#00d9ff" strokeWidth="1.5" strokeDasharray="6 6" className="animate-dash" />
        <path d="M420 110 C 385 165, 340 205, 270 240" fill="none" stroke="#ff006e" strokeWidth="1.5" strokeDasharray="6 6" className="animate-dash" style={{ animationDelay: '0.5s' }} />
        <path d="M420 110 C 390 100, 350 105, 315 118" fill="none" stroke="#84cc16" strokeWidth="1.5" strokeDasharray="6 6" className="animate-dash" style={{ animationDelay: '1s' }} />
      </svg>

      {/* llama 3.1 indicator */}
      <div className="glass absolute bottom-[11%] left-[9%] flex items-center gap-2 rounded-lg px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan animate-floaty">
        <Sparkles size={12} className="text-magenta" /> llama 3.1 · copilot
      </div>
    </div>
  )
}

function BearingVisual() {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 100% at 18% 12%, rgba(132,204,22,0.16) 0%, transparent 55%), radial-gradient(110% 100% at 85% 90%, rgba(34,211,238,0.16) 0%, transparent 55%)',
        }}
      />
      <div className="bg-grid absolute inset-0 opacity-30" />

      {/* outer race with orbiting balls */}
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-lime/30 animate-spin-slow" style={{ animationDuration: '18s' }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 -ml-[7px] -mt-[7px] h-3.5 w-3.5 rounded-full bg-lime shadow-[0_0_10px_rgba(132,204,22,0.9)]"
            style={{ transform: `rotate(${i * 45}deg) translateY(-121px)` }}
          />
        ))}
      </div>

      {/* health arcs */}
      <svg viewBox="0 0 260 260" className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2">
        <circle cx="130" cy="130" r="120" fill="none" stroke="rgba(132,204,22,0.55)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="754 754" strokeDashoffset="211" transform="rotate(-90 130 130)" />
        <circle cx="130" cy="130" r="98" fill="none" stroke="rgba(0,217,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeDasharray="616 616" strokeDashoffset="308" transform="rotate(-90 130 130)" />
        <circle cx="130" cy="130" r="76" fill="none" stroke="rgba(255,0,110,0.5)" strokeWidth="2" strokeLinecap="round" strokeDasharray="478 478" strokeDashoffset="344" transform="rotate(-90 130 130)" />
      </svg>

      {/* rotating bearing core */}
      <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-cyan/50 shadow-[0_0_30px_rgba(0,217,255,0.5)] animate-spin-slow" style={{ animationDuration: '7s', animationDirection: 'reverse' }}>
        <div className="absolute inset-3 rounded-full border border-magenta/40" />
        <div className="absolute inset-[26px] rounded-full border border-dashed border-cyan/40" />
        <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-cyan to-lime shadow-[0_0_18px_rgba(0,217,255,0.8)]" />
      </div>

      {/* CNN wave */}
      <svg viewBox="0 0 240 60" className="absolute bottom-[10%] left-[8%] h-14 w-48 opacity-85">
        <polyline
          points="0,30 20,26 40,34 60,22 80,38 100,20 120,36 140,24 160,34 180,22 200,30 220,26 240,32"
          fill="none"
          stroke="#84cc16"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="6 6"
          className="animate-dash"
        />
      </svg>

      {/* fault sparkles */}
      <span className="absolute right-[17%] top-[19%] h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_10px_#00d9ff] animate-pop" style={{ animationDelay: '0.3s' }} />
      <span className="absolute right-[13%] top-[28%] h-2 w-2 rounded-full bg-lime shadow-[0_0_12px_#84cc16] animate-pop" style={{ animationDelay: '0.9s' }} />
      <span className="absolute right-[24%] top-[38%] h-1.5 w-1.5 rounded-full bg-magenta shadow-[0_0_10px_#ff006e] animate-pop" style={{ animationDelay: '1.5s' }} />
    </div>
  )
}

function ThemedVisual({ project }) {
  switch (project.id) {
    case 'trustpulse':
      return <TrustPulseVisual />
    case 'civicflow':
      return <CivicFlowVisual />
    case 'currisync':
      return <CurriSyncVisual />
    case 'ams':
      return <AmsVisual />
    case 'bearing':
      return <BearingVisual />
    default:
      return null
  }
}

/* ---------------------------------- card shell ---------------------------------- */

function ProjectVisual({ project }) {
  const [from] = project.accent
  const glow = { boxShadow: `0 40px 110px -30px ${from}55, 0 30px 80px -40px rgba(0,0,0,0.9)` }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0d12]" style={glow}>
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-white/8 px-5 py-3.5">
        <span className="h-3 w-3 rounded-full bg-magenta/80" />
        <span className="h-3 w-3 rounded-full bg-ink/25" />
        <span className="h-3 w-3 rounded-full bg-lime/80" />
        <div className="ml-4 flex-1 truncate rounded-md bg-white/5 px-3 py-1 font-mono text-[11px] text-ink/40">
          {project.domain}
        </div>
      </div>

      {/* parallax viewport */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="pv-inner absolute -inset-[10%]">
          <ThemedVisual project={project} />

          {/* status card */}
          <div className="glass absolute bottom-[9%] right-[6%] rounded-xl px-5 py-4 shadow-[0_0_24px_rgba(0,217,255,0.15)]">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-lime animate-pulse-soft shadow-[0_0_8px_#84cc16]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50">{project.status}</span>
            </div>
            <p className="mt-1.5 font-display text-xl font-bold glow-text-cyan" style={{ color: from }}>
              {project.statusValue}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------- section ---------------------------------- */

function ProjectSection({ project }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (REDUCED_MOTION) return undefined
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        },
      )
      gsap.fromTo(
        '.proj-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        },
      )
      gsap.fromTo(
        '.proj-divider',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.4,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 66%',
            toggleActions: 'play none none reverse',
          },
        },
      )
      gsap.fromTo(
        '.proj-text > *',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
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
        '.proj-pill',
        { y: 22, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.35,
          stagger: 0.08,
          ease: 'back.out(1.8)',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 58%',
            toggleActions: 'play none none reverse',
          },
        },
      )
      gsap.fromTo(
        '.pv-inner',
        { yPercent: -5 },
        {
          yPercent: 5,
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
    <Section id={`project-${project.id}`} ref={ref}>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.06] blur-[160px]"
        style={{ background: `radial-gradient(circle, ${project.accent[0]}, transparent 70%)` }}
      />

      <div className="container-x section-pad w-full">
        <div className="grid grid-cols-12 items-center gap-14">
          {/* visual — left */}
          <div className="proj-card relative col-span-12 md:col-span-6">
            <div
              aria-hidden
              className="absolute -inset-4 rounded-[28px] opacity-70 blur-2xl animate-pulse-soft"
              style={{ background: `radial-gradient(60% 60% at 50% 50%, ${project.accent[0]}33, transparent 70%)` }}
            />
            <Tilt max={5} scale={1.015} className="relative">
              <ProjectVisual project={project} />
            </Tilt>
          </div>

          {/* copy — right */}
          <div className="proj-text col-span-12 md:col-span-6">
            <SectionTag index={project.index} label={project.name} className="sm:block sm:items-start" />
            <h3 className="mt-6 sm:mt-8 font-display text-4xl sm:text-5xl md:text-6xl font-black leading-none text-ink drop-shadow-[0_0_24px_rgba(0,217,255,0.25)] text-center sm:text-left">
              {project.name}
            </h3>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-ink/70 text-center sm:text-left">{project.tagline}</p>

            <div className="mt-4 sm:mt-8 flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3">
              {project.tech.map((t) => (
                <span key={t} className="proj-pill pill">
                  {t}
                </span>
              ))}
            </div>

            <blockquote
              className="mt-4 sm:mt-8 border-l-2 pl-4 sm:pl-6 font-mono text-xs sm:text-sm leading-relaxed text-ink/55 text-center sm:text-left"
              style={{ borderColor: project.accent[0], boxShadow: `-8px 0 18px -10px ${project.accent[0]}66` }}
            >
              “{project.quote}”
            </blockquote>

            {project.description && (
              <p className="mt-3 sm:mt-6 text-xs sm:text-sm leading-relaxed text-ink/60 text-center sm:text-left">{project.description}</p>
            )}

            <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 sm:gap-5">
              <RippleButton href={project.live} target="_blank" rel="noreferrer" className="btn-primary w-full sm:w-auto">
                <ExternalLink size={15} /> Live
              </RippleButton>
              <RippleButton href={LINKS.github} target="_blank" rel="noreferrer" className="btn-ghost w-full sm:w-auto">
                <GithubIcon size={15} /> GitHub
              </RippleButton>
            </div>
          </div>
        </div>

        <Divider slim className="proj-divider mt-16 origin-left" />
      </div>
    </Section>
  )
}

function Projects() {
  return (
    <>
      {PROJECTS.map((project) => (
        <ProjectSection key={project.id} project={project} />
      ))}
    </>
  )
}

export default Projects