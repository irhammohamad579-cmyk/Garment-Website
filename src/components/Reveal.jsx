import { useEffect, useRef } from "react"

/**
 * Presentational wrapper: fades/slides its children in when they scroll into view.
 * Purely visual (adds a class) — it never changes the wrapped content or its logic.
 */
function Reveal({ as: Tag = "div", delay = 0, variant = "", className = "", style, children, ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible")
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible")
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${variant} ${className}`.trim()}
      style={{ "--d": `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default Reveal
