import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { gsap, ScrollTrigger, REDUCED_MOTION } from '../lib/gsap'
import { Section, SectionTag, Divider } from './ui'

const INTERNSHIP_CERTS = [
  {
    company: 'BLUEKODE SOLUTIONS',
    role: 'SOFTWARE DEVELOPER',
    period: 'MAY 2026 – JUL 2026',
    image: '/images/internship-certicifates/internship certicifates_page-0001.jpg',
    category: 'INTERNSHIP CERTIFICATES',
  },
  {
    company: 'APPIN TECHNOLOGY',
    role: 'AI/ML ENGINEER',
    period: 'APR 2025 – MAY 2025',
    image: '/images/internship-certicifates/internship certicifates_page-0002.jpg',
    category: 'INTERNSHIP CERTIFICATES',
  },
  {
    company: 'ARTIFI TECH',
    role: 'FULL-STACK DEVELOPER',
    period: 'FEB 2025 – MAR 2025',
    image: '/images/internship-certicifates/internship certicifates_page-0003.jpg',
    category: 'INTERNSHIP CERTIFICATES',
  },
]

const SKILL_CERTS = [
  {
    company: 'ACMEGRADE',
    role: 'DATA SCIENCE',
    period: 'COMPLETED',
    image: '/images/certificates/certificates_page-0001.jpg',
    category: 'SKILL CERTIFICATIONS',
  },
  {
    company: 'NPTEL',
    role: 'DATA SCIENCE ADVANCED',
    period: 'COMPLETED',
    image: '/images/certificates/certificates_page-0002.jpg',
    category: 'SKILL CERTIFICATIONS',
  },
  {
    company: 'ACCENTURE',
    role: 'DATA ANALYTICS',
    period: 'COMPLETED',
    image: '/images/certificates/certificates_page-0003.jpg',
    category: 'SKILL CERTIFICATIONS',
  },
  {
    company: 'DEPARTMENT OF SCIENCE AND TECHNOLOGY',
    role: 'C PROGRAMMING',
    period: 'COMPLETED',
    image: '/images/certificates/certificates_page-0004.jpg',
    category: 'SKILL CERTIFICATIONS',
  },
]

function CertCard({ cert, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="cert-card relative flex h-full cursor-pointer touch-none flex-col rounded-xl border border-cyan/30 bg-[#13131a]/90 backdrop-blur-[12px] shadow-[0_0_15px_rgba(0,217,255,0.18)] transition-colors duration-150 hover:border-cyan/70 hover:shadow-[0_0_28px_#00d9ff,0_0_16px_#ff006e]"
      onClick={() => onClick?.(cert)}
      onTouchStart={(e) => { e.preventDefault(); onClick?.(cert) }}
    >
      <div className="relative flex-1 min-h-0">
        <img
          src={cert.image}
          alt={`${cert.company} certificate`}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </div>
      <div className="mt-2 flex flex-col text-center">          <p className="font-display text-xs sm:text-sm font-bold text-ink">{cert.company}</p>
        <p className="text-xs text-cyan">{cert.role}</p>
        <p className="mt-1 font-mono text-[10px] text-ink/40">{cert.period}</p>
      </div>
    </motion.div>
  )
}

function Carousel({ group, onClick }) {
  const scrollRef = useRef(null)

  const scrollDelta = (dx) => {
    if (!scrollRef.current) return
    const max = scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 2
    const next = Math.max(0, Math.min(scrollRef.current.scrollLeft + dx, max))
    gsap.to(scrollRef.current, { scrollLeft: next, duration: 0.45, ease: 'power3.out' })
  }

  return (
    <div
      ref={scrollRef}
      className="relative flex snap-x snap-mandatory overflow-x-auto overflow-y-clip scroll-smooth scrollbar-hide -mx-2 px-2"
    >
      <div className="flex gap-4 sm:gap-6 px-1 py-4">
        {group.map((cert) => (
          <CertCard key={cert.image} cert={cert} onClick={onClick} />
        ))}
      </div>
      <button
        type="button"
        onClick={() => scrollDelta(-260)}
        className="absolute left-0 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#1a1a22]/60 text-cyan transition hover:scale-110 hover:shadow-[0_0_16px_rgba(0,217,255,0.5)]"
      >
        <ChevronLeft size={15} />
      </button>
      <button
        type="button"
        onClick={() => scrollDelta(260)}
        className="absolute right-0 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#1a1a22]/60 text-cyan transition hover:scale-110 hover:shadow-[0_0_16px_rgba(0,217,255,0.5)]"
      >
        <ChevronRight size={15} />
      </button>
      <div className="pointer-events-none absolute left-0 right-0 top-1/2 flex -translate-y-1/2 justify-center gap-1.5">
        <span className="h-1 w-1 rounded-full bg-ink/30" />
        <span className="h-1 w-1 rounded-full bg-cyan" />
        <span className="h-1 w-1 rounded-full bg-ink/30" />
      </div>
    </div>
  )
}

function Lightbox({ cert, onClose }) {
  if (!cert) return null
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.88 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.32 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/78 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className="relative max-w-[960px] w-full rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,217,255,0.4)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex-1 bg-[#151821]">
          <img
            src={cert.image}
            alt={`${cert.company} certificate`}
            className="h-full w-full"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col gap-4 p-6">
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyan">{cert.category}</p>
            <button
              type="button"
              onClick={onClose}
              className="group flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-ink/70 transition hover:border-cyan hover:text-cyan hover:shadow-[0_0_14px_rgba(0,217,255,0.4)]"
            >
              <X size={16} strokeWidth={2.5} />
            </button>
          </div>
          <p className="font-display text-2xl font-bold text-ink">{cert.company}</p>
          <p className="text-md text-muted">{cert.role}</p>
          <p className="font-mono text-sm text-ink/60">{cert.period}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Certificates() {
  const ref = useRef(null)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    if (REDUCED_MOTION) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cert-section-tag',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
            scrub: 0.25,
          },
        },
      )
      gsap.fromTo(
        '.cert-title',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 66%',
            toggleActions: 'play none none reverse',
            scrub: 0.25,
          },
        },
      )
      gsap.fromTo(
        '.cert-cat-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.25,
          stagger: 0.1,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 62%',
            toggleActions: 'play none none reverse',
            scrub: 0.25,
          },
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  const openCert = (cert) => setLightbox(cert)
  const closeCert = () => setLightbox(null)

  return (
    <Section id="certificates" ref={ref}>
      <div className="container-x section-pad w-full">
        <SectionTag index="06" label="CERTIFICATES & CREDENTIALS" className="cert-section-tag" />
        <h2 className="cert-title mt-4 font-display text-4xl font-black text-ink">CERTIFICATES &amp; CREDENTIALS</h2>
        <div className="mt-2 h-px w-24 origin-left bg-linear-to-r from-cyan to-transparent shadow-[0_0_10px_rgba(0,217,255,0.7)] cert-cat-line" />

        <div className="mt-12">
          <h3 className="text-lg font-bold uppercase tracking-[0.2em] text-ink/85">INTERNSHIP CERTIFICATES</h3>
          <Divider className="mt-2 h-px bg-white/10" />
          <Carousel group={INTERNSHIP_CERTS} onClick={openCert} />
        </div>

        <div className="mt-14">
          <h3 className="text-lg font-bold uppercase tracking-[0.2em] text-ink/85">SKILL CERTIFICATIONS</h3>
          <Divider className="mt-2 h-px bg-white/10" />
          <Carousel group={SKILL_CERTS} onClick={openCert} />
        </div>

        <AnimatePresence>
          <Lightbox cert={lightbox} onClose={closeCert} />
        </AnimatePresence>
      </div>
    </Section>
  )
}

