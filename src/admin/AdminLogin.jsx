import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"

function AdminLogin() {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: isAdmin } = await supabase.rpc("is_admin")
        if (isAdmin) {
          navigate("/admin/dashboard", { replace: true })
          return
        }
      }
      setLoading(false)
    }
    checkSession()
  }, [navigate])

  const handleLogin = async (event) => {
    event.preventDefault()
    setError("")
    setLoading(true)

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (loginError) {
      setError("Login failed. Please check your email and password.")
      setLoading(false)
      return
    }

    const { data: isAdmin, error: adminError } = await supabase.rpc("is_admin")

    if (adminError || !isAdmin) {
      await supabase.auth.signOut()
      setError("This account does not have administrator access.")
      setLoading(false)
      return
    }

    navigate("/admin/dashboard", { replace: true })
  }

  if (loading) {
    return (
      <div className="admin-shell flex min-h-screen items-center justify-center px-5">
        <div className="admin-panel p-8 text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          <p className="mt-4 text-sm font-semibold text-slate-600">Preparing secure login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-shell flex min-h-screen items-center justify-center px-5 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 lg:grid-cols-2">
        <div className="relative hidden overflow-hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(37,99,235,.45),transparent_35%)]" />
          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 font-black">LB</div>
            <p className="mt-8 text-xs font-bold uppercase tracking-[.25em] text-blue-300">Private area</p>
            <h1 className="mt-3 text-4xl font-black leading-tight">Lead Bag<br />Administration</h1>
            <p className="mt-5 max-w-sm leading-7 text-slate-400">Manage products, colours, availability and celebration photos from one place.</p>
          </div>
          <p className="relative text-xs text-slate-500">Authorised administrators only.</p>
        </div>

        <div className="p-7 sm:p-10">
          <a href="/" className="text-sm font-bold text-slate-500 hover:text-blue-700">← Back to website</a>
          <div className="mt-10">
            <p className="text-sm font-bold uppercase tracking-[.2em] text-blue-600">Welcome back</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">Sign in to your dashboard</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">Use the administrator account created for Lead Bag.</p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label htmlFor="admin-email" className="form-label">Email address</label>
              <input id="admin-email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" placeholder="admin@example.com" />
            </div>
            <div>
              <label htmlFor="admin-password" className="form-label">Password</label>
              <input id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" placeholder="Enter your password" />
            </div>

            {location.state?.denied && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">This account is signed in, but it is not registered as an administrator.</div>
            )}

            {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</div>}

            <button type="submit" disabled={loading} className="w-full rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
              {loading ? "Signing in..." : "Sign In Securely"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
