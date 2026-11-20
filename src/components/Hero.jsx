function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[760px] items-center overflow-hidden bg-ivory pt-[100px] sm:pt-[112px] lg:pt-[120px]"
    >
      {/*
        Background video: starts below the navbar (so the face isn't hidden),
        sits on the right and is shown at full clarity. Only its left edge fades into ivory.
      */}
      <div className="fade-in absolute bottom-0 right-0 top-[100px] w-full sm:top-[112px] lg:top-[120px] lg:w-[62%] lg:[-webkit-mask-image:linear-gradient(to_right,transparent,#000_26%)] lg:[mask-image:linear-gradient(to_right,transparent,#000_26%)]" style={{ "--d": "150ms" }}>
        <video
          src="/media/hero-bags.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover object-[50%_12%]"
        />
      </div>

      {/* Mobile only: light layer so the text stays readable over the video */}
      <div className="absolute inset-0 bg-ivory/70 lg:hidden" />

      {/* Desktop: soft ivory behind the text only, nothing over the video */}
      <div className="absolute inset-y-0 left-0 hidden w-[58%] bg-gradient-to-r from-ivory via-ivory/85 to-transparent lg:block" />

      {/* Decorative gold glow + fine dot texture */}
      <div className="glow-orb float-slow -left-24 top-1/3 hidden h-96 w-96 lg:block" />
      <div className="grain absolute inset-0 -z-10 opacity-70" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-24 pt-24 sm:px-6 sm:pb-36 lg:py-32">
        <div className="max-w-3xl">
          <div
            className="rise-in mb-7 inline-flex items-center gap-3 rounded-full border border-gold/40 bg-white/80 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.24em] text-gold-deep shadow-sm backdrop-blur-md"
            style={{ "--d": "100ms" }}
          >
            <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_10px_2px_rgba(201,149,36,0.6)]" />
            Quality Bag Manufacturing
          </div>

          <h1 className="font-display text-[3.4rem] font-semibold leading-[0.96] tracking-tight text-navy sm:text-7xl lg:text-[6.5rem]">
            <span className="line-mask"><span style={{ "--d": "250ms" }}>Bags made for</span></span>
            <span className="line-mask">
              <span className="gold-text italic" style={{ "--d": "420ms" }}>
                real business.
              </span>
            </span>
          </h1>

          <p className="rise-in mt-8 max-w-2xl text-base leading-8 text-slate-700 sm:text-xl sm:leading-9" style={{ "--d": "700ms" }}>
            LEAD Bag (Pvt) Ltd manufactures practical, quality bags for retailers and businesses across Sri Lanka — with dependable service from production to delivery.
          </p>

          <div className="rise-in mt-10 flex flex-col gap-3 sm:flex-row" style={{ "--d": "880ms" }}>
            <a
              href="#products"
              className="btn-navy btn-cta-pulse px-8 py-4 text-sm"
            >
              Explore Products <span className="btn-arrow">→</span>
            </a>
            <a
              href="#contact"
              className="btn-ghost px-8 py-4 text-sm"
            >
              Talk to Our Team
            </a>
          </div>

          <div className="rise-in mt-14 grid max-w-2xl grid-cols-3 border-t border-gold/40 pt-7" style={{ "--d": "1050ms" }}>
            {[
              ["10+", "Years Experience"],
              ["500+", "Product Designs"],
              ["Sri Lanka", "Islandwide Supply"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="border-r border-navy/10 pl-4 first:pl-0 last:border-0"
              >
                <div className="font-display text-2xl font-semibold leading-tight text-navy min-[420px]:text-3xl sm:text-4xl">{value}</div>
                <div className="mt-1 text-xs font-medium text-slate-600 sm:text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        aria-label="Scroll to About section"
        className="fade-in absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center text-slate-500 transition-colors hover:text-gold-deep sm:flex"
        style={{ "--d": "1400ms" }}
      >
        <span className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-9 w-6 rounded-full border border-gold/60 p-1">
          <span className="mx-auto block h-2 w-1 animate-bounce rounded-full bg-gold" />
        </span>
      </a>
    </section>
  )
}

export default Hero
