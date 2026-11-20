import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import Reveal from "./Reveal"

function Celebrations() {
  const [celebrations, setCelebrations] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCelebrations = async () => {
      const { data, error } = await supabase
        .from("celebrations")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching celebrations:", error)
        setLoading(false)
        return
      }

      setCelebrations(data || [])
      setLoading(false)
    }

    fetchCelebrations()
  }, [])

  return (
    <section id="celebrations" className="section-pad relative overflow-hidden bg-ivory">
      <div className="glow-orb -left-28 top-24 hidden h-96 w-96 lg:block" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="section-kicker is-centered">Life at Lead Bag</div>
          <h2 className="section-title mt-5">Moments worth <em>celebrating.</em></h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Beyond the products, these are the people, milestones and moments that make our journey special.
          </p>
        </Reveal>

        {loading ? (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => <div key={item} className="skeleton public-skeleton aspect-[4/3] rounded-[2rem]" />)}
          </div>
        ) : celebrations.length === 0 ? (
          <div className="mx-auto mt-14 max-w-2xl rounded-3xl border border-dashed border-gold/50 bg-white p-12 text-center">
            <div className="text-4xl text-gold">✦</div>
            <p className="mt-4 font-display text-3xl font-semibold text-navy">Our celebration gallery is coming soon.</p>
            <p className="mt-2 text-sm text-slate-500">Check back for team events and special moments.</p>
          </div>
        ) : (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {celebrations.map((celebration, index) => (
              <Reveal key={celebration.id} variant="reveal-scale" delay={(index % 3) * 110} className={index === 0 ? "sm:row-span-2" : ""}>
                <button
                  type="button"
                  onClick={() => setSelected(celebration)}
                  className="group relative block h-full w-full overflow-hidden rounded-[2rem] bg-sand text-left shadow-[0_20px_50px_-30px_rgba(14,27,51,0.55)] ring-1 ring-gold/0 transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_40px_70px_-30px_rgba(14,27,51,0.6)] hover:ring-gold/60"
                >
                  <div className={`${index === 0 ? "aspect-[4/5] sm:aspect-auto sm:h-full" : "aspect-[4/3]"} overflow-hidden`}>
                    <img src={celebration.image_url} alt={celebration.title} className="zoom-img h-full w-full object-cover" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-ink/90 via-navy-ink/40 to-transparent p-6 pt-24 text-white">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <div className="mb-2 h-px w-8 bg-gold transition-all duration-500 group-hover:w-16" />
                        <h3 className="font-display text-2xl font-semibold leading-tight">{celebration.title}</h3>
                        {celebration.description && <p className="mt-1 line-clamp-2 text-sm text-white/75">{celebration.description}</p>}
                      </div>
                      <span className="shrink-0 rounded-full border border-gold/50 bg-white/10 px-3.5 py-2 text-xs font-bold text-gold-light backdrop-blur-md transition duration-300 group-hover:bg-gold group-hover:text-navy-deep">View</span>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div className="modal-backdrop fixed inset-0 z-[80] flex items-center justify-center bg-navy-ink/92 p-4 backdrop-blur-md" onClick={() => setSelected(null)}>
          <div className="modal-panel relative max-h-[92vh] max-w-5xl overflow-hidden rounded-[2rem] border border-gold/30 bg-black shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <img src={selected.image_url} alt={selected.title} className="max-h-[78vh] w-auto max-w-full object-contain" />
            <div className="border-t border-gold/30 bg-navy-ink p-6 text-white">
              <h3 className="font-display text-2xl font-semibold">{selected.title}</h3>
              {selected.description && <p className="mt-1 text-sm text-slate-300">{selected.description}</p>}
            </div>
            <button type="button" onClick={() => setSelected(null)} className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/60 px-3.5 py-2 text-xl leading-none text-white backdrop-blur transition hover:rotate-90 hover:border-gold hover:text-gold-light" aria-label="Close">×</button>
          </div>
        </div>
      )}
    </section>
  )
}

export default Celebrations
