import { useEffect, useRef } from 'react'
import { ScrollTrigger } from '../lib/gsap'
import { LINKS } from '../lib/data'
import { GithubIcon, LinkedinIcon } from './BrandIcons'

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-bg/70 backdrop-blur-md">
      <div className="container-x flex items-center justify-between py-4">
        <a href="#hero" className="flex items-center gap-3 font-mono text-sm tracking-[0.3em] text-ink">
          <span className="inline-block h-2.5 w-2.5 rounded-[3px] bg-cyan shadow-[0_0_12px_#00d9ff]" />
          SUTHIKSHAN&nbsp;K
        </a>
        <div className="flex items-center gap-7">
          <span className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.25em] text-lime">
            <span className="h-2 w-2 rounded-full bg-lime animate-pulse-green" />
            Open to work
          </span>
          <div className="flex items-center gap-4">
            <a
              href={LINKS.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-ink/60 transition-colors duration-150 hover:text-cyan"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-ink/60 transition-colors duration-150 hover:text-cyan"
            >
              <LinkedinIcon size={18} />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export function ScrollProgress() {
  const bar = useRef(null)

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: () => ScrollTrigger.maxScroll(window),
      onUpdate: (self) => {
        if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`
      },
    })
    return () => st.kill()
  }, [])

  return (
    <div
      ref={bar}
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-linear-to-r from-cyan via-magenta to-lime shadow-[0_0_12px_rgba(0,217,255,0.8)]"
      style={{ transform: 'scaleX(0)' }}
    />
  )
}