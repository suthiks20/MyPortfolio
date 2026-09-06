import { forwardRef, useRef } from 'react'

export const Section = forwardRef(function Section({ id, className = '', children }, ref) {
  return (
    <section
      ref={ref}
      id={id}
      className={`relative flex min-h-screen items-center overflow-hidden ${className}`}
    >
      {children}
    </section>
  )
})

export function SectionTag({ index, label, className = '' }) {
  return (
    <p className={`mono-label flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-4 ${className}`}>
      <span className="text-magenta">[{index}]</span>
      <span className="sm:inline">{label}</span>
      <span className="h-px w-full sm:w-16 bg-cyan/50 shadow-[0_0_8px_rgba(0,217,255,0.6)] sm:block" />
    </p>
  )
}

export function Divider({ slim = false, className = '' }) {
  return <div className={`${slim ? 'divider-slim' : 'divider'} ${className}`} />
}

export function RippleButton({ children, className = '', href, onClick, ...rest }) {
  const ref = useRef(null)

  const handleClick = (e) => {
    const host = ref.current
    if (host) {
      const rect = host.getBoundingClientRect()
      const d = Math.max(rect.width, rect.height)
      const span = document.createElement('span')
      span.className = 'ripple'
      span.style.width = `${d}px`
      span.style.height = `${d}px`
      span.style.left = `${e.clientX - rect.left - d / 2}px`
      span.style.top = `${e.clientY - rect.top - d / 2}px`
      host.appendChild(span)
      setTimeout(() => span.remove(), 700)
    }
    onClick?.(e)
  }

  if (href) {
    return (
      <a ref={ref} href={href} className={`ripple-host ${className}`} onClick={handleClick} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button ref={ref} type="button" className={`ripple-host ${className}`} onClick={handleClick} {...rest}>
      {children}
    </button>
  )
}