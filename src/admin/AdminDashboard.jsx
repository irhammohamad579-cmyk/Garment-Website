import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import AdminLayout from "./AdminLayout"

function AdminDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({ products: 0, available: 0, celebrations: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      const [productsResult, celebrationsResult] = await Promise.all([
        supabase.from("products").select("id, available"),
        supabase.from("celebrations").select("id"),
      ])

      const products = productsResult.data || []
      setStats({
        products: products.length,
        available: products.filter((product) => product.available).length,
        celebrations: celebrationsResult.data?.length || 0,
      })
      setLoading(false)
    }

    load()
  }, [])

  return (
    <AdminLayout title="Dashboard" subtitle="Overview">
      <div className="mb-7 rounded-[1.75rem] bg-slate-950 p-7 text-white shadow-xl sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-300">Good to see you</p>
            <h2 className="mt-2 text-2xl font-black sm:text-3xl">Welcome to Lead Bag Admin</h2>
            <p className="mt-2 text-sm text-slate-400">{user?.email}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
            Your public website updates from this dashboard.
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["Products", stats.products, "Manage your catalogue", "🛍️"],
          ["Available", stats.available, "Currently in stock", "✓"],
          ["Celebrations", stats.celebrations, "Gallery moments", "✦"],
        ].map(([label, value, text, icon]) => (
          <div key={label} className="admin-panel p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500">{label}</p>
                <p className="mt-2 text-3xl font-black text-slate-950">{loading ? "—" : value}</p>
                <p className="mt-1 text-xs text-slate-500">{text}</p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">{icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <button type="button" onClick={() => navigate("/admin/products")} className="admin-panel group p-7 text-left transition hover:-translate-y-1 hover:border-blue-200">
          <div className="flex items-center justify-between">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl">🛍️</span>
            <span className="text-xl text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600">→</span>
          </div>
          <h3 className="mt-6 text-xl font-black text-slate-950">Manage Products</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">Add products, upload photos, manage colours, edit descriptions and switch availability.</p>
        </button>

        <button type="button" onClick={() => navigate("/admin/celebrations")} className="admin-panel group p-7 text-left transition hover:-translate-y-1 hover:border-blue-200">
          <div className="flex items-center justify-between">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl">✦</span>
            <span className="text-xl text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600">→</span>
          </div>
          <h3 className="mt-6 text-xl font-black text-slate-950">Manage Celebrations</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">Add event photos, update titles and descriptions, or remove old gallery items.</p>
        </button>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard
