import { useEffect, useState } from "react"
import AddCelebration from "./AddCelebration"
import EditCelebration from "./EditCelebration"
import { supabase } from "../lib/supabaseClient"

function CelebrationManager() {
  const [celebrations, setCelebrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddCelebration, setShowAddCelebration] = useState(false)
  const [editingCelebration, setEditingCelebration] = useState(null)
  const [search, setSearch] = useState("")

  useEffect(() => {
    let cancelled = false

    const loadCelebrations = async () => {
      const { data, error } = await supabase
        .from("celebrations")
        .select("*")
        .order("created_at", { ascending: false })

      if (cancelled) return

      if (error) {
        console.error("Error fetching celebrations:", error)
        setLoading(false)
        return
      }

      setCelebrations(data || [])
      setLoading(false)
    }

    loadCelebrations()

    return () => {
      cancelled = true
    }
  }, [])

  const filtered = celebrations.filter((item) => {
    const q = search.trim().toLowerCase()
    return !q || `${item.title} ${item.description || ""}`.toLowerCase().includes(q)
  })

  const handleCelebrationAdded = (newItem) => {
    setCelebrations((current) => [newItem, ...current])
    setShowAddCelebration(false)
  }

  const handleCelebrationUpdated = (updatedItem) => {
    setCelebrations((current) => current.map((item) => item.id === updatedItem.id ? updatedItem : item))
    setEditingCelebration(null)
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this celebration?")) return

    const celebration = celebrations.find((item) => item.id === id)
    const { error } = await supabase.from("celebrations").delete().eq("id", id)

    if (error) {
      console.error("Error deleting celebration:", error)
      alert("Failed to delete celebration.")
      return
    }

    if (celebration?.image_url) {
      try {
        const url = new URL(celebration.image_url)
        const path = url.pathname.split("/celebration-images/")[1]
        if (path) await supabase.storage.from("celebration-images").remove([path])
      } catch (imageError) {
        console.error("Error removing celebration image:", imageError)
      }
    }

    setCelebrations((current) => current.filter((item) => item.id !== id))
  }

  if (loading) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((item) => <div key={item} className="admin-panel overflow-hidden"><div className="skeleton aspect-video" /><div className="p-5"><div className="skeleton h-5 w-2/3 rounded" /></div></div>)}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="admin-panel p-5 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-950">Celebration gallery</h2>
            <p className="mt-1 text-sm text-slate-500">Add the moments you want customers to see on the public website.</p>
          </div>
          <button type="button" onClick={() => { setShowAddCelebration(true); setEditingCelebration(null) }} className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/10 hover:bg-blue-800">
            + Add Celebration
          </button>
        </div>
        <div className="mt-5">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search gallery..." className="form-input" />
        </div>
      </div>

      {showAddCelebration && <AddCelebration onCelebrationAdded={handleCelebrationAdded} onCancel={() => setShowAddCelebration(false)} />}
      {editingCelebration && <EditCelebration celebration={editingCelebration} onCelebrationUpdated={handleCelebrationUpdated} onCancel={() => setEditingCelebration(null)} />}

      {celebrations.length === 0 ? (
        <div className="admin-panel p-12 text-center">
          <div className="text-4xl">✦</div>
          <h3 className="mt-4 font-black text-slate-900">No celebrations yet</h3>
          <p className="mt-2 text-sm text-slate-500">Add the first company event or celebration photo.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="admin-panel p-12 text-center"><p className="font-bold text-slate-800">No matching celebrations.</p></div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((celebration) => (
            <article key={celebration.id} className="admin-panel overflow-hidden transition hover:-translate-y-1">
              <div className="aspect-video bg-slate-100">
                <img src={celebration.image_url} alt={celebration.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-black text-slate-950">{celebration.title}</h3>
                {celebration.description && <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">{celebration.description}</p>}
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => { setEditingCelebration(celebration); setShowAddCelebration(false) }} className="rounded-xl bg-slate-950 px-3 py-2.5 text-sm font-bold text-white hover:bg-blue-700">Edit</button>
                  <button type="button" onClick={() => handleDelete(celebration.id)} className="rounded-xl border border-red-200 px-3 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50">Delete</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default CelebrationManager
