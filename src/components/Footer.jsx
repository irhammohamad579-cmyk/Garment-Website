function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-ink text-white">
      <div className="gold-hairline absolute inset-x-0 top-0" />
      <div className="grain absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_.7fr_.9fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-[88px] w-[88px] shrink-0 items-center justify-center">
                <img
                  src="/images/logo_G2.png"
                  alt="LEAD logo"
                  className="h-full w-full object-contain drop-shadow-[0_6px_14px_rgba(201,149,36,0.3)]"
                />
              </div>
              <div>
                <div className="font-display text-3xl font-semibold tracking-wide">LEAD Bag</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">(Pvt) Ltd</div>
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm leading-7 text-slate-400">Quality bag manufacturing and reliable supply for retailers, businesses and customers across Sri Lanka.</p>
          </div>

          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.24em] text-gold-light">Explore</h3>
            <div className="mt-5 space-y-3 text-sm text-slate-400">
              <a className="block w-fit transition duration-300 hover:translate-x-1 hover:text-gold-light" href="#about">About Us</a>
              <a className="block w-fit transition duration-300 hover:translate-x-1 hover:text-gold-light" href="#products">Products</a>
              <a className="block w-fit transition duration-300 hover:translate-x-1 hover:text-gold-light" href="#celebrations">Celebrations</a>
              <a className="block w-fit transition duration-300 hover:translate-x-1 hover:text-gold-light" href="#contact">Contact</a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.24em] text-gold-light">Get in touch</h3>
            <div className="mt-5 space-y-3 text-sm text-slate-400">
              <a className="block w-fit transition duration-300 hover:translate-x-1 hover:text-gold-light" href="tel:+94767408454">+94 76 740 8454</a>
              <a className="block w-fit transition duration-300 hover:translate-x-1 hover:text-gold-light" href="leadbagpvtltd@gmail.com">leadbagpvtltd@gmail.com</a>
              <a className="block w-fit transition duration-300 hover:translate-x-1 hover:text-gold-light" href="https://wa.me/94767408454" target="_blank" rel="noreferrer">WhatsApp</a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-gold/20 pt-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Lead Bag (Pvt) Ltd. All rights reserved.</p>
          <p className="font-display text-base italic text-gold/90">Quality bags. Built with care.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
