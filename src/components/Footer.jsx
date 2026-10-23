function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_.7fr_.9fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-1.5 shadow-lg shadow-blue-900/10 transition group-hover:-rotate-3">
              <img
                src="/images/logo.png"
                alt="LEAD logo"
                className="h-full w-full object-contain"
              />
              </div>
              <div>
                <div className="font-black">LEAD Bag</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">(Pvt) Ltd</div>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">Quality bag manufacturing and reliable supply for retailers, businesses and customers across Sri Lanka.</p>
          </div>

          <div>
            <h3 className="font-bold">Explore</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <a className="block hover:text-white" href="#about">About Us</a>
              <a className="block hover:text-white" href="#products">Products</a>
              <a className="block hover:text-white" href="#celebrations">Celebrations</a>
              <a className="block hover:text-white" href="#contact">Contact</a>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Get in touch</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <a className="block hover:text-white" href="tel:+94776501169">+94 77 650 1169</a>
              <a className="block hover:text-white" href="mailto:info@leadbag.lk">info@leadbag.lk</a>
              <a className="block hover:text-white" href="https://wa.me/94776501169" target="_blank" rel="noreferrer">WhatsApp</a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Lead Bag (Pvt) Ltd. All rights reserved.</p>
          <p>Quality bags. Built with care.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
