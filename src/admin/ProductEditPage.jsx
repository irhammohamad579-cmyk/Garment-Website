import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import EditProduct from "./EditProduct"
import AdminLayout from "./AdminLayout"

function ProductEditPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`*, product_colors (id, color_name, color_value)`)
        .eq("id", id)
        .single()

      if (error) {
        console.error("Error fetching product:", error)
        setError("Failed to load product.")
      } else {
        setProduct(data)
      }
      setLoading(false)
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="admin-shell flex min-h-screen items-center justify-center px-5">
        <div className="admin-panel p-8 text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          <p className="mt-4 font-semibold text-slate-600">Loading product...</p>
        </div>
      </div>
    )
  }

  return (
    <AdminLayout title="Edit Product" subtitle="Product Editor">
      {error || !product ? (
        <div className="admin-panel p-7">
          <p className="font-semibold text-red-600">{error || "Product not found."}</p>
          <button type="button" onClick={() => navigate("/admin/products")} className="mt-5 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white">Back to Products</button>
        </div>
      ) : (
        <EditProduct
          product={product}
          onProductUpdated={() => navigate("/admin/products")}
          onCancel={() => navigate("/admin/products")}
        />
      )}
    </AdminLayout>
  )
}

export default ProductEditPage
