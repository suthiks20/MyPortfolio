import { useLayoutEffect, useRef, useState, useCallback } from 'react'
import {
  Heart,
  Mail,
  MessageCircle,
  Phone,
  Send,
  Loader2,
  Check,
  ArrowLeft,
  Rss,
  Briefcase,
  Handshake,
  User,
  FileDown,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { gsap, REDUCED_MOTION } from '../lib/gsap'
import { LINKS } from '../lib/data'
import { Section, Divider, RippleButton } from './ui'

const EMAIL = LINKS.email

const SUBJECT_PILLS = [
  { key: 'freelance', label: 'Freelance Project', icon: Briefcase },
  { key: 'collab', label: 'Collaboration', icon: Handshake },
  { key: 'job', label: 'Job Opportunity', icon: Rss },
  { key: 'other', label: 'Other', icon: User },
]

function Contact() {
  const ref = useRef(null)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    purpose: 'freelance',
    name: '',
    email: '',
    subject: '',
    body: '',
    file: null,
  })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  const update = useCallback((key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
  }, [])

  const fileChange = (e) => {
    setForm((f) => ({ ...f, file: e.target.files?.[0] || null }))
  }

  const bodyLen = form.body.length
  const bodyMax = 500

  const nextStep = () => setStep((s) => Math.min(s + 1, 3))
  const prevStep = () => setStep((s) => Math.max(s - 1, 1))

  const handleSend = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.body.trim()) {
      setError('Please fill in all required fields.')
      return
    }
    setError(null)
    setLoading(true)

    const mailtoParams = new URLSearchParams()
    mailtoParams.set('to', EMAIL)
    mailtoParams.set('subject', form.subject.replace(/\s+/g, ' ').trim())

    const lines = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Purpose: ${SUBJECT_PILLS.find((p) => p.key === form.purpose)?.label || form.purpose}`,
      `---`,
      form.body,
    ]
    mailtoParams.set('body', lines.join('%0D%0A'))

    if (form.file) {
      mailtoParams.set(
        'body',
        lines.join('%0D%0A') +
          '%0D%0A%0D%0A[ATTACHMENT: ' +
          form.file.name +
          ' — please attach this file before sending.]',
      )
    }

    setLoading(false)
    setSent(true)
    // Open Gmail compose directly — body param uses spaces, Gmail renders it cleanly.
    const gParams = new URLSearchParams()
    gParams.set('fs', '1')
    gParams.set('to', EMAIL)
    gParams.set('su', form.subject.replace(/\s+/g, ' ').trim())
    const bodyText = lines.join(' ')
    gParams.set('body', bodyText)
    if (form.file) {
      gParams.set('body', bodyText + ' [ATTACHMENT: ' + form.file.name + ' — please attach before sending.]')
    }
    window.location.href = `https://mail.google.com/mail/?view=cm&${gParams.toString()}`
  }

  const letsTalkGmail = () => {
    const params = new URLSearchParams()
    params.set('fs', '1')
    params.set('to', EMAIL)
    params.set('su', `Let's build something extraordinary`)
    window.location.href = `https://mail.google.com/mail/?view=cm&${params.toString()}`
  }

  useLayoutEffect(() => {
    if (REDUCED_MOTION) return undefined
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: ref.current, start: 'top 62%', toggleActions: 'play none none reverse' },
      })
      tl.fromTo(
        '.cta-headline',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'elastic.out(1, 0.55)' },
      )
        .fromTo('.cta-divider', { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: 'power2.inOut' }, '-=0.3')
        .fromTo(
          '.cta-detail',
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.15 },
          '-=0.15',
        )
        .fromTo(
          '.cta-social',
          { rotate: -360, opacity: 0 },
          { rotate: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
          '-=0.2',
        )
        .fromTo(
          '.cta-btn',
          { y: 34, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(1.8)' },
          '-=0.3',
        )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <Section id="contact" className="flex-col justify-center" ref={ref}>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07] blur-[170px] bg-[radial-gradient(circle_at_center,#00d9ff_0%,#ff006e_50%,transparent_75%)]"
      />

      <div className="container-x relative w-full text-center">
        <p className="cta-headline font-display text-[clamp(40px,9vw,84px)] font-black leading-[1.1] text-ink text-center">
          LET&apos;S BUILD SOMETHING
          <br />
          <span className="bg-linear-to-r from-cyan via-magenta to-lime bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(255,0,110,0.35)]">
            EXTRAORDINARY.
          </span>
        </p>

        <Divider className="cta-divider mx-auto mt-10 sm:mt-12 w-[min(600px,90%)] origin-left" />

        {/* CONTACT INFO */}
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-16">
          <a href={`mailto:${EMAIL}`} className="cta-detail group flex items-center gap-4">
            <Mail className="text-cyan transition-transform duration-150 group-hover:scale-110" size={22} />
            <span className="font-mono text-base sm:text-xl text-ink/85 transition-colors duration-150 group-hover:text-cyan">
              {EMAIL}
            </span>
          </a>
          <span className="h-8 w-px bg-white/15 hidden sm:block" />
          <a href={`tel:${LINKS.phone}`} className="cta-detail group flex items-center gap-4">
            <Phone className="text-magenta transition-transform duration-150 group-hover:scale-110" size={22} />
            <span className="font-mono text-base sm:text-xl text-ink/85 transition-colors duration-150 group-hover:text-magenta">
              +91 {LINKS.phone}
            </span>
          </a>
        </div>

        {/* SOCIAL ICONS */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="cta-social glass flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full text-ink/80 transition-all duration-150 hover:scale-110 hover:text-cyan hover:shadow-[0_0_24px_rgba(0,217,255,0.45)]"
          >
            <LinkedinIcon size={18} sm:size={22} />
          </a>
          <a
            href={LINKS.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="cta-social glass flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full text-ink/80 transition-all duration-150 hover:scale-110 hover:text-magenta hover:shadow-[0_0_24px_rgba(255,0,110,0.45)]"
          >
            <GithubIcon size={18} sm:size={22} />
          </a>
          <a
            href="/ai.pdf%20(4)%20(1).pdf"
            download
            className="cta-social glass flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full text-ink/80 transition-all duration-150 hover:scale-110 hover:text-lime hover:shadow-[0_0_24px_rgba(132,204,22,0.45)]"
            aria-label="Download Resume"
          >
            <FileDown size={18} sm:size={22} />
          </a>
        </div>

        {/* MULTI-STEP FORM */}
        <div className="mt-12 flex flex-col items-center gap-6">
          {/* step indicator */}
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-ink/40">
            {[1, 2, 3].map((s) => (
              <span
                key={s}
                className={`h-1.5 w-1.5 rounded-full ${step >= s ? 'bg-cyan shadow-[0_0_10px_rgba(0,217,255,0.7)]' : 'bg-white/15'}`}
              />
            ))}
            <span className="ml-1.5 text-ink/30">
              Step {step} of 3
            </span>
          </div>

          {/* avatar + status */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-1.5 rounded-full opacity-30 blur-sm" style={{ background: 'conic-gradient(from 0deg, #00d9ff, #ff006e, #84cc16, #00d9ff)' }} />
              <div className="relative h-12 w-12 sm:h-14 sm:w-14 overflow-hidden rounded-full border-2 border-bg shadow-[0_0_18px_rgba(0,217,255,0.3)]">
                <img
                  src="/images/suthikshan.jpg"
                  alt="Suthikshan K"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="absolute -right-0.5 -bottom-0.5 flex h-3 w-3 sm:h-4 sm:w-4 items-center justify-center rounded-full bg-lime/90 shadow-[0_0_10px_#84cc16]">
                <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white animate-pulse" />
              </span>
            </div>
            <div className="text-left">
              <p className="font-display text-sm font-bold text-ink">Suthikshan K</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-lime">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-lime mr-1.5 align-middle shadow-[0_0_6px_#84cc16]" />
                Open to work
              </p>
            </div>
          </div>

          {/* form panel */}
          <form
            onSubmit={handleSend}
            className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 sm:p-8 shadow-[0_0_40px_rgba(0,217,255,0.06)]"
          >
            {/* STEP 3: confirmation */}
            {sent && (
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-cyan/40 bg-cyan/10 shadow-[0_0_24px_rgba(0,217,255,0.3)]">
                  <Check size={28} className="text-cyan" strokeWidth={3} />
                </div>
                <div>
                  <p className="font-display text-xl font-bold text-ink">Message ready to send!</p>
                  <p className="mt-1 font-mono text-sm text-ink/50">
                    Gmail is opening with your message pre-filled.
                    Review and hit Send — it will be delivered to {EMAIL}.
                  </p>
                  {form.file && (
                    <p className="mt-1 font-mono text-xs text-amber-400/80">
                      Don&apos;t forget to attach: {form.file.name}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false)
                      setStep(1)
                      setForm({ purpose: 'freelance', name: '', email: '', subject: '', body: '', file: null })
                    }}
                    className="btn-ghost flex items-center gap-2"
                  >
                    <ArrowLeft size={14} /> Send another
                  </button>
                  <a href="#top" className="btn-ghost flex items-center gap-2">
                    Back to portfolio
                  </a>
                </div>
              </div>
            )}

            {/* STEP 1 + 2: form */}
            {!sent && (
              <>
                {error && (
                  <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-mono text-red-400 shadow-[0_0_18px_rgba(255,0,110,0.2)]">
                    {error}
                  </div>
                )}

                {/* intro */}
                <p className="mb-5 flex items-center gap-2 font-mono text-sm text-ink/60">
                  <span className="text-cyan">👋</span>
                  Hi! I&apos;m reaching out about{' '}
                  <span className="font-semibold text-ink/80">
                    {SUBJECT_PILLS.find((p) => p.key === form.purpose)?.label || 'your project'}
                  </span>
                  .
                </p>

                {step === 1 && (
                  <div className="flex flex-col gap-4">
                    <p className="font-display text-lg font-bold text-ink/90">What are you reaching out about?</p>

                    <div className="grid gap-3">
                      {SUBJECT_PILLS.map((p) => {
                        const Icon = p.icon
                        const active = form.purpose === p.key
                        return (
                          <button
                            key={p.key}
                            type="button"
                            onClick={() => {
                              setForm((f) => ({ ...f, purpose: p.key }))
                              setError(null)
                            }}
                            className={`relative flex w-full items-center gap-3 rounded-xl border px-5 py-4 text-left transition-all duration-150 ${
                              active
                                ? 'border-cyan/60 bg-cyan/8 shadow-[0_0_18px_rgba(0,217,255,0.2)]'
                                : 'border-white/8 bg-white/[0.02] hover:border-white/18 hover:bg-white/[0.04]'
                            }`}
                          >
                            {active && (
                              <span className="absolute right-4 flex h-5 w-5 items-center justify-center rounded-full bg-cyan shadow-[0_0_10px_rgba(0,217,255,0.5)]">
                                <Check size={12} strokeWidth={3} className="text-bg" />
                              </span>
                            )}
                            <Icon
                              size={18}
                              className={active ? 'text-cyan' : 'text-ink/40 group-hover:text-cyan/70'}
                            />
                            <span
                              className={`font-display text-sm font-bold ${active ? 'text-ink' : 'text-ink/60'}`}
                            >
                              {p.label}
                            </span>
                          </button>
                        )
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={nextStep}
                      className="mt-2 w-full btn-primary py-3.5"
                    >
                      Continue
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div className="flex flex-col gap-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block font-mono text-xs uppercase tracking-[0.3em] text-ink/50">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={update('name')}
                          placeholder="Your name"
                          className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-ink placeholder:text-ink/30 outline-none transition focus:border-cyan/50 focus:shadow-[0_0_18px_rgba(0,217,255,0.2)]"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block font-mono text-xs uppercase tracking-[0.3em] text-ink/50">
                          Your Email
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={update('email')}
                          placeholder="you@example.com"
                          className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-ink placeholder:text-ink/30 outline-none transition focus:border-cyan/50 focus:shadow-[0_0_18px_rgba(0,217,255,0.2)]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block font-mono text-xs uppercase tracking-[0.3em] text-ink/50">
                        Subject
                      </label>
                      <input
                        type="text"
                        required
                        value={form.subject}
                        onChange={update('subject')}
                        placeholder="Let's build something extraordinary"
                        className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-ink placeholder:text-ink/30 outline-none transition focus:border-cyan/50 focus:shadow-[0_0_18px_rgba(0,217,255,0.2)]"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block font-mono text-xs uppercase tracking-[0.3em] text-ink/50">
                        Message
                      </label>
                      <textarea
                        required
                        rows={4}
                        maxLength={bodyMax}
                        value={form.body}
                        onChange={update('body')}
                        placeholder="Tell me about your project..."
                        className="h-28 w-full resize-y rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-ink placeholder:text-ink/30 outline-none transition focus:border-cyan/50 focus:shadow-[0_0_18px_rgba(0,217,255,0.2)]"
                      />
                      <div className="mt-1.5 flex items-center justify-between">
                        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/30">
                          Max {bodyMax} characters
                        </p>
                        <p
                          className={`font-mono text-xs ${
                            bodyLen > bodyMax * 0.9
                              ? 'text-amber-400'
                              : bodyLen === bodyMax
                              ? 'text-magenta'
                              : 'text-ink/40'
                          }`}
                        >
                          {bodyLen} / {bodyMax}
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block font-mono text-xs uppercase tracking-[0.3em] text-ink/50">
                        Attach a File (optional)
                      </label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        onChange={fileChange}
                        accept="image/*,application/pdf,text/*"
                        className="h-11 w-full cursor-pointer rounded-xl border border-dashed border-white/10 bg-white/[0.02] px-4 text-ink/70 transition hover:border-cyan/40"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="btn-ghost flex items-center gap-2 py-3"
                      >
                        <ArrowLeft size={14} /> Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading || !form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.body.trim()}
                        className="ml-auto btn-primary flex items-center gap-2 py-3"
                      >
                        {loading && <Loader2 className="h-4 w-4 animate-spin text-ink/70" />}
                        {!loading && <Send size={14} className="transition-transform duration-150 group-hover:scale-110" />}
                        {loading ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </form>

          {/* CTA buttons (visible when not sent) */}
          {!sent && (
            <div className="flex flex-col items-center gap-3 mt-2 sm:flex-row sm:items-center sm:justify-center sm:gap-5">
              <RippleButton href={`mailto:${EMAIL}`} className="cta-btn btn-primary w-full sm:w-auto">
                <Mail size={15} /> Email
              </RippleButton>
              <RippleButton onClick={letsTalkGmail} className="cta-btn btn-ghost w-full sm:w-auto">
                <MessageCircle size={15} /> Let&apos;s Talk
              </RippleButton>
            </div>
          )}

          <p className="cta-detail mt-16 flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-ink/40 animate-footer-pulse">
            Made with <Heart size={12} className="text-magenta" fill="currentColor" /> using React + Vite ·
            Deployed on Vercel
          </p>
        </div>
      </div>
    </Section>
  )
}

export default Contact
