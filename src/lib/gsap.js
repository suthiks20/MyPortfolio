import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const REDUCED_MOTION =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Re-measure triggers once web fonts have swapped in so positions stay accurate.
if (typeof window !== 'undefined' && document.fonts?.ready) {
  document.fonts.ready.then(() => ScrollTrigger.refresh())
}

export { gsap, ScrollTrigger }