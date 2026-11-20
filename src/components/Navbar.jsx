import { useEffect, useState } from "react"

const links = [
  ["Home", "#home"],
  ["About Us", "#about"],
  ["Products", "#products"],
  ["Celebrations", "#celebrations"],
  ["Contact Us", "#contact"],
]

const TAGLINE = "TRAVELERS’ CHOICE"

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState("#home")

  // Visual only: highlight the nav link of the section currently in view.
  useEffect(() => {
    const sections = links
      .map(([, href]) => document.querySelector(href))
      .filter(Boolean)
    if (sections.length === 0 || typeof IntersectionObserver === "undefined") return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveLink(`#${entry.target.id}`)
        })
      },
      { rootMargin: "-40% 0px -55% 0px" }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/60 bg-navy-deep/95 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.55)] backdrop-blur-xl">
      {/* Fine gold line along the very top edge */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-light/80 to-transparent" />

      <div className="mx-auto flex h-[100px] max-w-7xl items-center justify-between px-3 sm:h-[112px] sm:px-6 lg:h-[120px]">

        {/* Brand Logo and Name */}
        <a
          href="#home"
          onClick={() => setIsMenuOpen(false)}
          className="group flex min-w-0 shrink items-center gap-1 sm:gap-2"
        >
          {/* Emblem */}
          <div className="flex h-[84px] w-[84px] shrink-0 items-center justify-center transition duration-500 group-hover:-rotate-3 group-hover:scale-105 sm:h-[92px] sm:w-[92px] lg:h-[92px] lg:w-[92px]">
            <img
              src="/images/logo_G2.png"
              alt="Lead Bag logo"
              className="h-full w-full object-contain drop-shadow-[0_6px_14px_rgba(201,149,36,0.35)]"
            />
          </div>

          {/* Name + Tagline (one column, one shared left edge) */}
          <div className="flex w-[200px] min-w-0 flex-col items-start justify-center sm:w-[250px] lg:w-[300px]">

            {/*
              Name image, cropped to the real letters.
              The PNG has transparent padding (~3% left, ~12% top/bottom),
              so we clip it: the box has the exact aspect ratio of the text,
              and the image is shifted up/left to cancel the padding.
              If it ever looks clipped or has leftover gap, tweak the three
              numbers below (width 105.75%, margin-left -3.31%, margin-top -12.43%).
            */}
            <div className="aspect-[2052/177] w-full overflow-hidden">
              <img
                src="/LeadName1_gold.png"
                alt="Lead Bag (Pvt) Ltd"
                className="block max-w-none"
                style={{
                  width: "105.75%",
                  marginLeft: "-3.31%",
                  marginTop: "-12.43%",
                }}
              />
            </div>

            {/* Tagline: starts exactly under the "L", ends under "G" */}
            <div
              className="tagline-glow mt-1.5 flex w-[77%] justify-between text-[10px] font-bold leading-none sm:mt-2 sm:text-xs lg:text-[13px]"
              aria-label="Travelers' Choice"
            >
              {TAGLINE.split("").map((ch, i) =>
                ch === " " ? (
                  <span key={i} aria-hidden="true" className="w-1.5" />
                ) : (
                  <span key={i} aria-hidden="true">{ch}</span>
                )
              )}
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex xl:gap-9" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              aria-current={activeLink === href ? "true" : undefined}
              className={`nav-link whitespace-nowrap text-[15px] font-semibold text-slate-200 hover:text-gold-light xl:text-base ${
                activeLink === href ? "is-active" : ""
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://wa.me/94767408454?text=Hello%20Lead%20Bag%2C%20I%20would%20like%20to%20make%20an%20inquiry."
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-emerald-400/40 bg-emerald-500/90 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-950/30 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-500 xl:px-5 xl:text-base"
          >
            WhatsApp
          </a>

          <a
            href="#contact"
            className="btn-gold px-5 py-3 text-sm xl:px-6 xl:text-base"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/40 bg-white/5 text-white shadow-sm transition hover:border-gold hover:bg-white/10 lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          <span className="relative block h-3.5 w-5" aria-hidden="true">
            <span className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${isMenuOpen ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1.5 h-0.5 w-5 rounded bg-current transition-all duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${isMenuOpen ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>

      {/* Mobile Navigation (always mounted so it can animate open/closed) */}
      <div
        id="mobile-navigation"
        className={`mobile-menu lg:hidden ${isMenuOpen ? "is-open" : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <div>
          <div className="border-t border-gold/30 bg-navy-deep">
            <nav className="mx-auto max-w-7xl px-5 py-4" aria-label="Mobile navigation">
              {links.map(([label, href], index) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                  tabIndex={isMenuOpen ? 0 : -1}
                  style={{ "--i": index }}
                  className={`block rounded-xl px-4 py-3.5 text-sm font-semibold tracking-wide hover:bg-white/10 hover:text-gold-light ${
                    activeLink === href ? "bg-white/5 text-gold-light" : "text-slate-200"
                  }`}
                >
                  {label}
                </a>
              ))}

              <a
                href="https://wa.me/94767408454?text=Hello%20Lead%20Bag%2C%20I%20would%20like%20to%20make%20an%20inquiry."
                target="_blank"
                rel="noreferrer"
                tabIndex={isMenuOpen ? 0 : -1}
                style={{ "--i": links.length }}
                className="mt-2 block rounded-xl bg-emerald-500 px-4 py-3.5 text-center text-sm font-bold text-white"
              >
                Chat on WhatsApp
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
