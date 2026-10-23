import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

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
    <section id="celebrations" className="section-pad overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="section-kicker">Life at Lead Bag</div>
          <h2 className="section-title mt-3">Moments worth celebrating.</h2>
          <p className="mt-5 leading-8 text-slate-600">
            Beyond the products, these are the people, milestones and moments that make our journey special.
          </p>
        </div>

        {loading ? (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => <div key={item} className="skeleton aspect-[4/3] rounded-[2rem]" />)}
          </div>
        ) : celebrations.length === 0 ? (
          <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
            <div className="text-4xl">✦</div>
            <p className="mt-4 font-semibold text-slate-800">Our celebration gallery is coming soon.</p>
            <p className="mt-2 text-sm text-slate-500">Check back for team events and special moments.</p>
          </div>
        ) : (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {celebrations.map((celebration, index) => (
              <button
                key={celebration.id}
                type="button"
                onClick={() => setSelected(celebration)}
                className={`group relative overflow-hidden rounded-[2rem] bg-slate-100 text-left shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-2xl ${index === 0 ? "sm:row-span-2" : ""}`}
              >
                <div className={`${index === 0 ? "aspect-[4/5] sm:h-full" : "aspect-[4/3]"} overflow-hidden`}>
                  <img src={celebration.image_url} alt={celebration.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-6 pt-20 text-white">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-black">{celebration.title}</h3>
                      {celebration.description && <p className="mt-1 line-clamp-2 text-sm text-white/75">{celebration.description}</p>}
                    </div>
                    <span className="shrink-0 rounded-full bg-white/15 px-3 py-2 text-xs font-bold backdrop-blur-md">View</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="relative max-h-[92vh] max-w-5xl overflow-hidden rounded-[2rem] bg-black shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <img src={selected.image_url} alt={selected.title} className="max-h-[78vh] w-auto max-w-full object-contain" />
            <div className="bg-slate-950 p-5 text-white">
              <h3 className="text-xl font-black">{selected.title}</h3>
              {selected.description && <p className="mt-1 text-sm text-slate-400">{selected.description}</p>}
            </div>
            <button type="button" onClick={() => setSelected(null)} className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-2 text-xl text-white backdrop-blur" aria-label="Close">×</button>
          </div>
        </div>
      )}
    </section>
  )
}

export default Celebrations
