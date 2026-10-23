
import { useState } from "react"

const links = [
  ["Home", "#home"],
  ["About Us", "#about"],
  ["Products", "#products"],
  ["Celebrations", "#celebrations"],
  ["Contact Us", "#contact"],
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white shadow-sm">
      <div className="mx-auto flex h-[100px] max-w-7xl items-center justify-between px-3 sm:h-[112px] sm:px-6 lg:h-[120px]">

        {/* Brand Logo and Name */}
        <a
          href="#home"
          onClick={() => setIsMenuOpen(false)}
          className="group flex min-w-0 shrink items-center gap-2 sm:gap-4"
        >
          {/* Larger Logo */}
          <div className="flex h-[100px] w-[100px] shrink-0 items-center justify-center transition duration-300 group-hover:-rotate-3 sm:h-[100px] sm:w-[100px] lg:h-[92px] lg:w-[92px]">
            <img
              src="/images/logo_G2.png"
              alt="Lead Bag logo"
              className="h-full w-full object-contain mix-blend-multiply"
            />
          </div>

          {/* Brand Name and Tagline */}
          <div className="flex w-[200px] min-w-0 flex-col items-start justify-center sm:w-[250px] lg:w-[300px]">

            {/* Bigger Lead Bag Image */}
            <img
              src="/LeadName1.png"
              alt="Lead Bag (Pvt) Ltd"
              className="h-auto w-full object-contain"
            />

            {/* Tagline */}
            <span className="mt-1 whitespace-nowrap bg-gradient-to-r from-amber-500 via-orange-500 to-amber-700 bg-clip-text text-[9px] font-extrabold uppercase tracking-[0.12em] text-transparent sm:text-[11px] sm:tracking-[0.2em] lg:text-xs">
              Travelers' Choice
            </span>

          </div>
          
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="nav-link whitespace-nowrap text-base font-semibold text-slate-600 transition-colors hover:text-amber-600"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://wa.me/94776501169?text=Hello%20Lead%20Bag%2C%20I%20would%20like%20to%20make%20an%20inquiry."
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-emerald-500 px-4 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-600 xl:px-5 xl:text-base"
          >
            WhatsApp
          </a>

          <a
            href="#contact"
            className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-800 xl:px-6 xl:text-base"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-2xl text-slate-800 shadow-sm transition hover:bg-slate-50 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? "×" : "☰"}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white shadow-xl lg:hidden">
          <nav className="mx-auto max-w-7xl px-5 py-4">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-xl px-4 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-amber-50 hover:text-amber-700"
              >
                {label}
              </a>
            ))}

            <a
              href="https://wa.me/94776501169?text=Hello%20Lead%20Bag%2C%20I%20would%20like%20to%20make%20an%20inquiry."
              target="_blank"
              rel="noreferrer"
              className="mt-2 block rounded-xl bg-emerald-500 px-4 py-3.5 text-center text-sm font-bold text-white"
            >
              Chat on WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar