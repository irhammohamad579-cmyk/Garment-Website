import { useState } from "react"

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

    window.open(`https://wa.me/94776501169?text=${encodeURIComponent(whatsappMessage)}`, "_blank")
  }

  return (
    <section id="contact" className="section-pad bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="max-w-3xl">
          <div className="section-kicker">Contact Us</div>
          <h2 className="section-title mt-3">Let's talk about your requirements.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">Questions, quotations, bulk orders or product inquiries — send us a message and we'll continue the conversation on WhatsApp.</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
          <div className="rounded-[2rem] bg-slate-950 p-7 text-white sm:p-9">
            <div className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">Direct contact</div>
            <h3 className="mt-3 text-2xl font-black">Reach Lead Bag</h3>
            <p className="mt-4 leading-7 text-slate-400">Contact us directly for product information, bulk orders, quotations and business inquiries.</p>

            <div className="mt-9 space-y-5">
              {[
                ["📍", "Address", "Company Address Here, Sri Lanka"],
                ["📞", "Phone", "+94 77 650 1169"],
                ["💬", "WhatsApp", "Chat with us on WhatsApp"],
                ["✉", "Email", "info@leadbag.lk"],
              ].map(([icon, label, value]) => (
                <div key={label} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lg">{icon}</div>
                  <div>
                    <div className="text-sm font-bold">{label}</div>
                    {label === "Phone" ? (
                      <a href="tel:+94776501169" className="mt-1 block text-sm text-slate-400 hover:text-white">{value}</a>
                    ) : label === "WhatsApp" ? (
                      <a href="https://wa.me/94776501169" target="_blank" rel="noreferrer" className="mt-1 block text-sm text-slate-400 hover:text-white">{value}</a>
                    ) : label === "Email" ? (
                      <a href="mailto:info@leadbag.lk" className="mt-1 block text-sm text-slate-400 hover:text-white">{value}</a>
                    ) : (
                      <div className="mt-1 text-sm text-slate-400">{value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-9 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="text-sm font-bold text-white">Business inquiries</div>
              <p className="mt-2 text-sm leading-6 text-slate-400">For faster assistance, include the product name, required quantity and preferred colours.</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-900/5 sm:p-9">
            <h3 className="text-2xl font-black text-slate-950">Send an inquiry</h3>
            <p className="mt-2 text-sm text-slate-500">Your message will open directly in WhatsApp.</p>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
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
              <button type="submit" className="sm:col-span-2 rounded-xl bg-emerald-500 px-6 py-4 text-sm font-black text-white shadow-lg shadow-emerald-900/10 transition hover:-translate-y-0.5 hover:bg-emerald-600">
                Open WhatsApp Inquiry →
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
