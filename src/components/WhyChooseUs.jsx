import Reveal from "./Reveal"

function WhyChooseUs() {
  const features = [
    ["01", "Quality Materials", "Suitable and reliable materials selected for practical, durable products."],
    ["02", "Bulk Order Capacity", "A production process designed to support retailer and business orders."],
    ["03", "Timely Delivery", "We work around agreed requirements and delivery expectations."],
    ["04", "Competitive Pricing", "Practical pricing while keeping the expected level of quality."],
  ]

  return (
    <section className="section-pad relative overflow-hidden bg-navy-deep text-white">
      <div className="grain absolute inset-0 opacity-60" />
      <div className="glow-orb -left-20 top-0 h-[28rem] w-[28rem]" />
      <div className="gold-hairline absolute inset-x-0 top-0" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <div className="section-kicker !text-gold-light">Why Lead Bag</div>
            <h2 className="section-title on-dark mt-5">A reliable partner for your <em>next order.</em></h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">
              We combine manufacturing experience with a straightforward approach to quality, service and supply.
            </p>
            <a href="#contact" className="btn-ghost on-dark link-arrow mt-9 px-6 py-3.5 text-sm">
              Discuss your requirements <span className="btn-arrow">→</span>
            </a>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {features.map(([number, title, description], index) => (
              <Reveal key={number} delay={index * 110}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm transition duration-500 hover:-translate-y-1.5 hover:border-gold/50 hover:bg-white/[0.07] hover:shadow-[0_30px_60px_-30px_rgba(201,149,36,0.45)]">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/10 blur-2xl transition duration-500 group-hover:bg-gold/25" />
                  <div className="relative flex items-center justify-between">
                    <span className="font-display text-3xl font-semibold text-gold-light">{number}</span>
                    <span className="h-2 w-2 rounded-full bg-gold transition duration-500 group-hover:scale-150 group-hover:shadow-[0_0_14px_3px_rgba(201,149,36,0.6)]" />
                  </div>
                  <h3 className="relative mt-10 font-display text-2xl font-semibold">{title}</h3>
                  <p className="relative mt-3 text-sm leading-7 text-slate-300">{description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
