import { useState } from "react"
import Reveal from "./Reveal"

function Contact() {
  const [name, setName] = useState("")
  const [shop, setShop] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    const whatsappMessage = `Hello Lead Bag, I would like to make an inquiry.

Name: ${name}
Shop / Business Name: ${shop}
Phone Number: ${phone}

Message:
${message}`

    window.open(`https://wa.me/94767408454?text=${encodeURIComponent(whatsappMessage)}`, "_blank")
  }

  return (
    <section id="contact" className="section-pad relative overflow-hidden bg-sand/60">
      <div className="gold-hairline absolute inset-x-0 top-0" />
      <div className="glow-orb -left-32 bottom-10 hidden h-[26rem] w-[26rem] lg:block" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal className="max-w-3xl">
          <div className="section-kicker">Contact Us</div>
          <h2 className="section-title mt-5">Let's talk about your <em>requirements.</em></h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">Questions, quotations, bulk orders or product inquiries — send us a message and we'll continue the conversation on WhatsApp.</p>
        </Reveal>

        <div className="mt-14 grid gap-7 lg:grid-cols-[.8fr_1.2fr]">
          <Reveal variant="reveal-left" className="relative overflow-hidden rounded-[2rem] border border-gold/30 bg-gradient-to-br from-navy via-navy-deep to-navy-ink p-7 text-white shadow-[0_40px_70px_-35px_rgba(14,27,51,0.8)] sm:p-10">
            <div className="glow-orb -right-20 -top-20 h-64 w-64" />
            <div className="relative">
              <div className="text-xs font-extrabold uppercase tracking-[0.24em] text-gold-light">Direct contact</div>
              <h3 className="mt-3 font-display text-4xl font-semibold">Reach Lead Bag</h3>
              <p className="mt-4 leading-7 text-slate-300">Contact us directly for product information, bulk orders, quotations and business inquiries.</p>

              <div className="mt-9 space-y-5">
                {[
                  ["📍", "Address", "No. 09, P.R. De Silva Mawatha, Balapitiya, Sri Lanka"],
                  ["📞", "Phone", "+94 76 740 8454"],
                  ["💬", "WhatsApp", "Chat with us on WhatsApp"],
                  ["✉", "Email", "leadbagpvtltd@gmail.com"],
                ].map(([icon, label, value]) => (
                  <div key={label} className="group flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-white/5 text-lg transition duration-300 group-hover:border-gold group-hover:bg-gold/15">{icon}</div>
                    <div>
                      <div className="text-sm font-bold text-gold-light">{label}</div>
                      {label === "Phone" ? (
                        <a href="tel:+94767408454" className="mt-1 block text-sm text-slate-300 transition hover:text-white">{value}</a>
                      ) : label === "WhatsApp" ? (
                        <a href="https://wa.me/94767408454" target="_blank" rel="noreferrer" className="mt-1 block text-sm text-slate-300 transition hover:text-white">{value}</a>
                      ) : label === "Email" ? (
                        <a href="mailto:info@leadbag.lk" className="mt-1 block text-sm text-slate-300 transition hover:text-white">{value}</a>
                      ) : (
                        <div className="mt-1 text-sm text-slate-300">{value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-9 rounded-2xl border border-gold/25 bg-white/[0.04] p-5">
                <div className="text-sm font-bold text-white">Business inquiries</div>
                <p className="mt-2 text-sm leading-6 text-slate-300">For faster assistance, include the product name, required quantity and preferred colours.</p>
              </div>
            </div>
          </Reveal>

          <Reveal variant="reveal-right" delay={120} className="rounded-[2rem] border border-gold/25 bg-white p-7 shadow-[0_40px_70px_-40px_rgba(14,27,51,0.45)] sm:p-10">
            <h3 className="font-display text-4xl font-semibold text-navy">Send an inquiry</h3>
            <p className="mt-2 text-sm text-slate-500">Your message will open directly in WhatsApp.</p>
            <div className="mt-5 h-px w-16 bg-gradient-to-r from-gold to-transparent" />

            <form onSubmit={handleSubmit} className="contact-form mt-8 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="form-label">Name</label>
                <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name" className="form-input" />
              </div>
              <div>
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="+94 XX XXX XXXX" className="form-input" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="shop" className="form-label">Shop / Business Name</label>
                <input id="shop" type="text" value={shop} onChange={(e) => setShop(e.target.value)} placeholder="Your shop or business name" className="form-input" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea id="message" rows="6" value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="Tell us what you need..." className="form-input resize-none" />
              </div>
              <button type="submit" className="btn-gold sm:col-span-2 px-6 py-4 text-sm">
                Open WhatsApp Inquiry <span className="btn-arrow">→</span>
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Contact
