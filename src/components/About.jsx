import Reveal from "./Reveal"

function About() {
  const stats = [
    ["100+", "Customers"],
    ["100%", "Care & Commitment"],
  ]

  return (
    <section id="about" className="section-pad relative overflow-hidden bg-ivory">
      <div className="glow-orb -right-32 top-20 hidden h-96 w-96 lg:block" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">

        {/* Section Heading */}
        <Reveal>
          <div className="section-kicker">About Lead Bag</div>
        </Reveal>

        <div className="mt-5 max-w-4xl">
          <Reveal delay={100}>
            <h2 className="section-title">
              Manufacturing bags with{" "}
              <em>purpose, consistency and care.</em>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              We focus on practical products, reliable production and long-term
              relationships with retailers and businesses.
            </p>
          </Reveal>
        </div>

        {/* About Content - same left edge as the heading */}
        <div className="mt-16 max-w-4xl">

          <Reveal delay={150}>

            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-gold-deep">
              Who we are
            </p>

            <h3 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-navy sm:text-5xl">
              From production floor to{" "}
              <em className="font-medium text-gold-deep">
                finished bag.
              </em>
            </h3>

            <div className="mt-6 h-px w-20 bg-gradient-to-r from-gold to-transparent" />

            <p className="mt-6 text-[17px] leading-8 text-slate-600">
              Lead Bag (Pvt) Ltd is focused on manufacturing and supplying
              quality bags for different customer needs. Our aim is to deliver
              practical, reliable and well-made products while maintaining
              strong relationships with our customers.
            </p>

            <p className="mt-4 text-[17px] leading-8 text-slate-600">
              We pay attention to the journey from production and quality
              checking through to final delivery, helping every order meet
              the agreed requirements.
            </p>

          </Reveal>

          {/* Statistics */}
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">

            {stats.map(([value, label], index) => (
              <Reveal key={label} delay={index * 100} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-2xl border border-gold/30 bg-white p-7 shadow-sm transition duration-500 hover:-translate-y-1 hover:border-gold hover:shadow-[0_20px_40px_-24px_rgba(201,149,36,0.7)]">

                  <div className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-gold to-gold-light transition-transform duration-500 group-hover:scale-x-100" />

                  <div className="font-display text-4xl font-semibold text-navy">
                    {value}
                  </div>

                  <div className="mt-1 text-sm font-semibold text-slate-600">
                    {label}
                  </div>

                </div>
              </Reveal>
            ))}

          </div>

        </div>
      </div>
    </section>
  )
}

export default About
