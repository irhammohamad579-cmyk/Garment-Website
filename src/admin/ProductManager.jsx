import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import AddProduct from "./AddProduct"

function ProductManager() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")

  useEffect(() => {
    let cancelled = false

    const loadProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`*, product_colors (id, color_name, color_value)`)
        .order("created_at", { ascending: false })

      if (cancelled) return

      if (error) {
        console.error("Error fetching products:", error)
        setLoading(false)
        return
      }

      setProducts(data || [])
      setLoading(false)
    }

    loadProducts()

    return () => {
      cancelled = true
    }
  }, [])

  const categories = useMemo(
    () => ["All", ...new Set(products.map((product) => product.category).filter(Boolean))],
    [products]
  )

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase()
    return products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category
      const matchesSearch = !query || [product.name, product.category, product.description]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query))
      return matchesCategory && matchesSearch
    })
  }, [products, search, category])

  const handleProductAdded = (newProduct) => {
    setProducts((current) => [newProduct, ...current])
    setShowAddProduct(false)
  }

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return

    const product = products.find((item) => item.id === productId)

    try {
      const { error } = await supabase.from("products").delete().eq("id", productId)
      if (error) throw error

      if (product?.image_url) {
        try {
          const url = new URL(product.image_url)
          const path = url.pathname.split("/product-images/")[1]
          if (path) await supabase.storage.from("product-images").remove([path])
        } catch (imageError) {
          console.error("Error removing product image:", imageError)
        }
      }

      setProducts((current) => current.filter((item) => item.id !== productId))
    } catch (error) {
      console.error("Error deleting product:", error)
      alert("Failed to delete product.")
    }
  }

  if (loading) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="admin-panel overflow-hidden">
            <div className="skeleton aspect-[4/3]" />
            <div className="space-y-3 p-5"><div className="skeleton h-5 w-2/3 rounded" /><div className="skeleton h-4 w-1/2 rounded" /></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="admin-panel p-5 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-950">Product catalogue</h2>
            <p className="mt-1 text-sm text-slate-500">Keep your public product catalogue fresh without touching code.</p>
          </div>
          <button type="button" onClick={() => setShowAddProduct(true)} className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/10 hover:bg-blue-800">
            + Add Product
          </button>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto]">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="form-input" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-input md:w-48">
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
      </div>

      {showAddProduct && (
        <AddProduct onProductAdded={handleProductAdded} onCancel={() => setShowAddProduct(false)} />
      )}

      {products.length === 0 ? (
        <div className="admin-panel p-12 text-center">
          <div className="text-4xl">🛍️</div>
          <h3 className="mt-4 font-black text-slate-900">No products yet</h3>
          <p className="mt-2 text-sm text-slate-500">Add your first product to start building the catalogue.</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="admin-panel p-12 text-center">
          <h3 className="font-black text-slate-900">No matching products</h3>
          <p className="mt-2 text-sm text-slate-500">Try another search or category.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <article key={product.id} className="admin-panel overflow-hidden transition hover:-translate-y-1">
              <div className="relative aspect-[4/3] bg-slate-100">
                <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
                <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${product.available ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}`}>
                  {product.available ? "Available" : "Out of Stock"}
                </span>
              </div>
              <div className="p-5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-blue-600">{product.category}</p>
                <h3 className="mt-1 text-lg font-black text-slate-950">{product.name}</h3>

                {product.product_colors?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {product.product_colors.map((color) => (
                      <span key={color.id} className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-2 py-1 text-[11px] font-semibold text-slate-600">
                        <span className="h-3 w-3 rounded-full border border-slate-300" style={{ backgroundColor: color.color_value }} />
                        {color.color_name}
                      </span>
                    ))}
                  </div>
                )}

                {product.description && <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">{product.description}</p>}

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => navigate(`/admin/products/edit/${product.id}`)} className="rounded-xl bg-slate-950 px-3 py-2.5 text-sm font-bold text-white hover:bg-blue-700">Edit</button>
                  <button type="button" onClick={() => handleDelete(product.id)} className="rounded-xl border border-red-200 px-3 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50">Delete</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductManager
