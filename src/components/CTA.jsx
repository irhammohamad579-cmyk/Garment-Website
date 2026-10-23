function CTA() {
  return (
    <section className="bg-slate-950 px-5 py-6 sm:px-6">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-700 to-blue-950 px-7 py-12 shadow-2xl sm:px-12 lg:px-16 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-200">Let's work together</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight text-white sm:text-4xl">Need bags for your shop or business?</h2>
            <p className="mt-4 max-w-2xl leading-7 text-blue-100">Tell us what you need and we'll help you discuss designs, colours, quantities and supply options.</p>
          </div>
          <a href="#contact" className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-4 text-sm font-black text-blue-700 shadow-xl transition hover:-translate-y-1 hover:bg-blue-50">
            Start an Inquiry →
          </a>
        </div>
      </div>
    </section>
  )
}

export default CTA
