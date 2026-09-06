import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * 3D tilt container — rotates toward the cursor (rotateX / rotateY),
 * springs back on mouse leave. Purely transform-based, GPU-friendly.
 */
export default function Tilt({
  children,
  className = '',
  max = 8,
  scale = 1.03,
  perspective = 900,
  as = 'div',
  ...rest
}) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), {
    stiffness: 220,
    damping: 22,
  })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), {
    stiffness: 220,
    damping: 22,
  })
  const hoverScale = useSpring(useTransform(x, [-0.5, 0.5], [1, scale]), {
    stiffness: 180,
    damping: 20,
  })

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const Comp = motion[as]
  return (
    <Comp
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, scale: hoverScale, transformPerspective: perspective }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      {...rest}
    >
      {children}
    </Comp>
  )
}