function Hero() {
  return (
    <section id="home" className="relative isolate flex min-h-[720px] items-center overflow-hidden bg-slate-950 pt-[76px]">
      <video
        src="/media/hero-bags.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-slate-950/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(37,99,235,.34),transparent_34%),linear-gradient(90deg,#020617_5%,rgba(2,6,23,.78)_45%,rgba(2,6,23,.35)_100%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-24 sm:px-6 lg:py-32">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-200 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-blue-400" />
            Quality Bag Manufacturing
          </div>

          <h1 className="text-5xl font-black leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-8xl">
            Bags made for
            <span className="block bg-gradient-to-r from-blue-300 via-blue-500 to-cyan-300 bg-clip-text text-transparent">
              real business.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-200 sm:text-xl">
            LEAD Bag (Pvt) Ltd manufactures practical, quality bags for retailers and businesses across Sri Lanka — with dependable service from production to delivery.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#products" className="rounded-xl bg-blue-600 px-7 py-4 text-center text-sm font-bold text-white shadow-xl shadow-blue-950/30 transition hover:-translate-y-1 hover:bg-blue-500">
              Explore Products <span className="ml-2">→</span>
            </a>
            <a href="#contact" className="rounded-xl border border-white/20 bg-white/10 px-7 py-4 text-center text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/15">
              Talk to Our Team
            </a>
          </div>

          <div className="mt-14 grid max-w-2xl grid-cols-3 border-t border-white/15 pt-7">
            {[
              ["10+", "Years Experience"],
              ["500+", "Product Designs"],
              ["Sri Lanka", "Islandwide Supply"],
            ].map(([value, label]) => (
              <div key={label} className="border-r border-white/10 pl-4 first:pl-0 last:border-0">
                <div className="text-xl font-black text-white sm:text-2xl">{value}</div>
                <div className="mt-1 text-xs text-slate-300 sm:text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center text-white/50 sm:flex">
        <span className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-9 w-6 rounded-full border border-white/30 p-1">
          <span className="mx-auto block h-2 w-1 rounded-full bg-white/70 animate-bounce" />
        </span>
      </div>
    </section>
  )
}

export default Hero
