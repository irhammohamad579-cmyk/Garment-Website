function About() {
  const stats = [
    ["10+", "Years Experience"],
    ["500+", "Product Designs"],
    ["100+", "Customers"],
    ["100%", "Care & Commitment"],
  ]

  return (
    <section id="about" className="section-pad bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="section-kicker">About Lead Bag</div>
        <div className="mt-3 grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
          <h2 className="section-title max-w-3xl">
            Manufacturing bags with <span className="text-blue-700">purpose, consistency and care.</span>
          </h2>
          <p className="text-base leading-8 text-slate-600">
            We focus on practical products, reliable production and long-term relationships with retailers and businesses.
          </p>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="group col-span-2 overflow-hidden rounded-[2rem]">
              <img src="/images/garment.jpg" alt="Lead Bag manufacturing facility" className="h-[330px] w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="group overflow-hidden rounded-[2rem]">
              <img src="/images/team.jpg" alt="Lead Bag team" className="h-52 w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="group overflow-hidden rounded-[2rem]">
              <img src="/images/working.jpg" alt="Bag manufacturing work" className="h-52 w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-700">Who we are</p>
            <h3 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              From production floor to finished bag.
            </h3>
            <p className="mt-6 leading-8 text-slate-600">
              Lead Bag (Pvt) Ltd is focused on manufacturing and supplying quality bags for different customer needs. Our aim is to deliver practical, reliable and well-made products while maintaining strong relationships with our customers.
            </p>
            <p className="mt-4 leading-8 text-slate-600">
              We pay attention to the journey from production and quality checking through to final delivery, helping every order meet the agreed requirements.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {stats.map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50/50">
                  <div className="text-2xl font-black text-blue-700">{value}</div>
                  <div className="mt-1 text-sm font-medium text-slate-600">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
