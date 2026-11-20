import Reveal from "./Reveal"

function About() {
  // "10+ Years Experience" and "500+ Product Designs" are already shown in the
  // Hero, so only the two figures that appear nowhere else are highlighted here.
  const stats = [
    ["10+", "Years Experience"],
    ["500+", "Product Designs"],
    ["100+", "Customers"],
    ["100%", "Care & Commitment"],
  ].slice(2)

  return (
    <section id="about" className="section-pad relative overflow-hidden bg-ivory">
      <div className="glow-orb -right-32 top-20 hidden h-96 w-96 lg:block" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal>
          <div className="section-kicker">About Lead Bag</div>
        </Reveal>
        <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
          <Reveal delay={100}>
            <h2 className="section-title max-w-3xl">
              Manufacturing bags with <em>purpose, consistency and care.</em>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="border-l border-gold/60 pl-6 text-base leading-8 text-slate-600 sm:text-lg">
              We focus on practical products, reliable production and long-term relationships with retailers and businesses.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">

          <Reveal variant="reveal-right" delay={150}>
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-gold-deep">Who we are</p>
            <h3 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-navy sm:text-5xl">
              From production floor to <em className="font-medium text-gold-deep">finished bag.</em>
            </h3>
            <div className="mt-6 h-px w-20 bg-gradient-to-r from-gold to-transparent" />
            <p className="mt-6 text-[17px] leading-8 text-slate-600 first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:font-semibold first-letter:leading-[0.85] first-letter:text-gold-deep">
              Lead Bag (Pvt) Ltd is focused on manufacturing and supplying quality bags for different customer needs. Our aim is to deliver practical, reliable and well-made products while maintaining strong relationships with our customers.
            </p>
            <p className="mt-4 text-[17px] leading-8 text-slate-600">
              We pay attention to the journey from production and quality checking through to final delivery, helping every order meet the agreed requirements.
            </p>

            <div className="mt-9 grid grid-cols-2 gap-4">
              {stats.map(([value, label]) => (
                <div key={label} className="group relative overflow-hidden rounded-2xl border border-gold/30 bg-white p-6 shadow-sm transition duration-500 hover:-translate-y-1 hover:border-gold hover:shadow-[0_20px_40px_-24px_rgba(201,149,36,0.7)]">
                  <div className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-gold to-gold-light transition-transform duration-500 group-hover:scale-x-100" />
                  <div className="font-display text-4xl font-semibold text-navy">{value}</div>
                  <div className="mt-1 text-sm font-semibold text-slate-600">{label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default About
