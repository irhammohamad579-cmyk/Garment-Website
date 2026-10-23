import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"

function AdminLayout({ title, subtitle, children }) {
  const navigate = useNavigate()

  const logout = async () => {
    await supabase.auth.signOut()
    navigate("/admin", { replace: true })
  }

  return (
    <div className="admin-shell min-h-screen">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-6">
          <button type="button" onClick={() => navigate("/admin/dashboard")} className="flex items-center gap-3 text-left">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white shadow-lg">LB</span>
            <span>
              <span className="block text-sm font-black text-slate-950">Lead Bag Admin</span>
              <span className="block text-[10px] font-bold uppercase tracking-[.18em] text-slate-500">{subtitle}</span>
            </span>
          </button>

          <div className="flex items-center gap-2">
            <button type="button" onClick={() => navigate("/")} className="hidden rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 sm:block">
              View Website
            </button>
            <button type="button" onClick={logout} className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-10">
        <div className="mb-7">
          <p className="text-sm font-bold uppercase tracking-[.2em] text-blue-600">Administration</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">{title}</h1>
        </div>
        {children}
      </main>
    </div>
  )
}

export default AdminLayout
