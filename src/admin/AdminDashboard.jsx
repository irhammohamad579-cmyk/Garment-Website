import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import AdminLayout from "./AdminLayout"

function AdminDashboard() {
  const navigate = useNavigate()

  const [user, setUser] = useState(null)

  const [stats, setStats] = useState({
    products: 0,
    available: 0,
    outOfStock: 0,
    celebrations: 0,
  })

  const [recentProducts, setRecentProducts] = useState([])
  const [recentCelebrations, setRecentCelebrations] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let active = true

    const loadDashboard = async () => {
      try {
        setLoading(true)
        setError("")

        const { data: { user }, error: authError } =
          await supabase.auth.getUser()

        if (authError) throw authError

        const [
          productsResult,
          availableResult,
          outOfStockResult,
          celebrationsResult,
          recentProductsResult,
          recentCelebrationsResult,
        ] = await Promise.all([
          supabase
            .from("products")
            .select("id", { count: "exact", head: true }),

          supabase
            .from("products")
            .select("id", { count: "exact", head: true })
            .eq("available", true),

          supabase
            .from("products")
            .select("id", { count: "exact", head: true })
            .eq("available", false),

          supabase
            .from("celebrations")
            .select("id", { count: "exact", head: true }),

          supabase
            .from("products")
            .select("id, name, category, available, created_at")
            .order("created_at", { ascending: false })
            .limit(5),

          supabase
            .from("celebrations")
            .select("id, title, created_at")
            .order("created_at", { ascending: false })
            .limit(5),
        ])

        const results = [
          productsResult,
          availableResult,
          outOfStockResult,
          celebrationsResult,
          recentProductsResult,
          recentCelebrationsResult,
        ]

        const failedResult = results.find((result) => result.error)

        if (failedResult) throw failedResult.error

        if (!active) return

        setUser(user)

        setStats({
          products: productsResult.count || 0,
          available: availableResult.count || 0,
          outOfStock: outOfStockResult.count || 0,
          celebrations: celebrationsResult.count || 0,
        })

        setRecentProducts(recentProductsResult.data || [])
        setRecentCelebrations(recentCelebrationsResult.data || [])
      } catch (err) {
        console.error("Dashboard loading error:", err)

        if (active) {
          setError("Unable to load dashboard information. Please try again.")
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    loadDashboard()

    return () => {
      active = false
    }
  }, [])

  const statCards = [
    {
      label: "Total Products",
      value: stats.products,
      description: "Products in your catalogue",
      icon: "🛍️",
    },
    {
      label: "Available",
      value: stats.available,
      description: "Currently in stock",
      icon: "✓",
    },
    {
      label: "Out of Stock",
      value: stats.outOfStock,
      description: "Currently unavailable",
      icon: "!",
    },
    {
      label: "Celebrations",
      value: stats.celebrations,
      description: "Company gallery moments",
      icon: "✦",
    },
  ]

  const formatDate = (date) => {
    if (!date) return "Date unavailable"

    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <AdminLayout title="Dashboard" subtitle="Overview">

      {/* Welcome Section */}
      <div className="mb-7 overflow-hidden rounded-[1.75rem] bg-slate-950 p-7 text-white shadow-xl sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-300">
              Welcome back
            </p>

            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              Lead Bag Administration
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              {user?.email || "Administrator"}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
            Manage your business website from one place.
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="ml-2 font-bold underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => (
          <div key={stat.label} className="admin-panel p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500">
                  {stat.label}
                </p>

                <p className="mt-2 text-3xl font-black text-slate-950">
                  {loading ? "—" : stat.value}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {stat.description}
                </p>
              </div>

              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-lg text-blue-700">
                {stat.icon}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <div className="mb-5">
          <h3 className="text-xl font-black text-slate-950">
            Quick Actions
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Quickly access your website management tools.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="admin-panel group p-7 text-left transition hover:-translate-y-1 hover:border-blue-200"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl">
                🛍️
              </span>

              <span className="text-xl text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600">
                →
              </span>
            </div>

            <h3 className="mt-6 text-xl font-black text-slate-950">
              Manage Products
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Add new bags, upload photos, manage colours, update descriptions
              and change product availability.
            </p>

            <span className="mt-5 inline-block text-sm font-bold text-blue-700">
              Open Product Management →
            </span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/celebrations")}
            className="admin-panel group p-7 text-left transition hover:-translate-y-1 hover:border-blue-200"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl">
                ✦
              </span>

              <span className="text-xl text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600">
                →
              </span>
            </div>

            <h3 className="mt-6 text-xl font-black text-slate-950">
              Manage Celebrations
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Upload company event photos, edit celebration details and
              maintain your gallery.
            </p>

            <span className="mt-5 inline-block text-sm font-bold text-blue-700">
              Open Celebration Management →
            </span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        {/* Recent Products */}
        <div className="admin-panel p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-950">
                Recent Products
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Latest products added
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="text-sm font-bold text-blue-700 hover:text-blue-900"
            >
              View All →
            </button>
          </div>

          {loading ? (
            <p className="py-6 text-center text-sm text-slate-400">
              Loading products...
            </p>
          ) : recentProducts.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate-400">
              No products added yet.
            </p>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between gap-3 py-4"
                >
                  <div>
                    <p className="font-bold text-slate-800">
                      {product.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {product.category} · {formatDate(product.created_at)}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                      product.available
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {product.available ? "Available" : "Out of Stock"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Celebrations */}
        <div className="admin-panel p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-950">
                Recent Celebrations
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Latest gallery updates
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/celebrations")}
              className="text-sm font-bold text-blue-700 hover:text-blue-900"
            >
              View All →
            </button>
          </div>

          {loading ? (
            <p className="py-6 text-center text-sm text-slate-400">
              Loading celebrations...
            </p>
          ) : recentCelebrations.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate-400">
              No celebrations added yet.
            </p>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentCelebrations.map((celebration) => (
                <div
                  key={celebration.id}
                  className="flex items-center justify-between gap-3 py-4"
                >
                  <div>
                    <p className="font-bold text-slate-800">
                      {celebration.title}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {formatDate(celebration.created_at)}
                    </p>
                  </div>

                  <span className="text-lg text-blue-600">✦</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </AdminLayout>
  )
}

export default AdminDashboard