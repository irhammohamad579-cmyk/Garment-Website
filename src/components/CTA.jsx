import Reveal from "./Reveal"

function CTA() {
  return (
    <section className="bg-navy-deep px-5 py-10 sm:px-6">
      <Reveal variant="reveal-scale" className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-gold/40 bg-gradient-to-br from-navy via-navy-deep to-navy-ink px-7 py-14 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] sm:px-12 lg:px-16 lg:py-16">
          <div className="glow-orb -right-16 -top-24 h-80 w-80" />
          <div className="glow-orb -bottom-32 left-1/4 h-72 w-72 opacity-60" />
          <div className="grain absolute inset-0 opacity-70" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-light to-transparent" />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="section-kicker !text-gold-light">Let's work together</p>
              <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">Need bags for your <em className="font-medium text-gold-light">shop or business?</em></h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">Tell us what you need and we'll help you discuss designs, colours, quantities and supply options.</p>
            </div>
            <a href="#contact" className="btn-gold btn-cta-pulse px-8 py-4 text-sm">
              Start an Inquiry <span className="btn-arrow">→</span>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export default CTA
