import { useEffect, useState } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"

function AdminGuard() {
  const location = useLocation()
  const [status, setStatus] = useState("checking")

  useEffect(() => {
    let active = true

    const checkAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        if (active) setStatus("unauthenticated")
        return
      }

      const { data: isAdmin, error } = await supabase.rpc("is_admin")

      if (!active) return

      if (error || !isAdmin) {
        console.error("Admin verification failed:", error)
        setStatus("forbidden")
        return
      }

      setStatus("allowed")
    }

    checkAdmin()

    return () => {
      active = false
    }
  }, [location.pathname])

  if (status === "checking") {
    return (
      <div className="admin-shell flex min-h-screen items-center justify-center px-6">
        <div className="admin-panel w-full max-w-sm p-8 text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          <p className="font-semibold text-slate-900">Checking admin access...</p>
          <p className="mt-1 text-sm text-slate-500">Please wait a moment.</p>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return <Navigate to="/admin" replace state={{ from: location.pathname }} />
  }

  if (status === "forbidden") {
    return <Navigate to="/admin" replace state={{ denied: true }} />
  }

  return <Outlet />
}

export default AdminGuard
