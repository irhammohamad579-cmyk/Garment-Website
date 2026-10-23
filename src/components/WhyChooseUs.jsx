function WhyChooseUs() {
  const features = [
    ["01", "Quality Materials", "Suitable and reliable materials selected for practical, durable products."],
    ["02", "Bulk Order Capacity", "A production process designed to support retailer and business orders."],
    ["03", "Timely Delivery", "We work around agreed requirements and delivery expectations."],
    ["04", "Competitive Pricing", "Practical pricing while keeping the expected level of quality."],
  ]

  return (
    <section className="section-pad bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <div className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400">Why Lead Bag</div>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">A reliable partner for your next order.</h2>
            <p className="mt-5 max-w-lg leading-8 text-slate-400">
              We combine manufacturing experience with a straightforward approach to quality, service and supply.
            </p>
            <a href="#contact" className="mt-8 inline-flex rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15">
              Discuss your requirements →
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {features.map(([number, title, description]) => (
              <div key={number} className="group rounded-3xl border border-white/10 bg-white/[0.05] p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.08]">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-blue-400">{number}</span>
                  <span className="h-2 w-2 rounded-full bg-blue-400 transition group-hover:scale-150" />
                </div>
                <h3 className="mt-10 text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
