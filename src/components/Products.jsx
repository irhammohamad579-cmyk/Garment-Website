import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

function Products() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState(["All"])
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const whatsappNumber = "94776501169"

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from("products")
        .select(`*, product_colors (id, color_name, color_value)`)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching products:", error)
        setError("Unable to load products right now.")
        setLoading(false)
        return
      }

      const rows = data || []
      setProducts(rows)
      setCategories(["All", ...new Set(rows.map((product) => product.category).filter(Boolean))])
      setLoading(false)
    }

    fetchProducts()
  }, [])

  const filteredProducts = activeCategory === "All"
    ? products
    : products.filter((product) => product.category === activeCategory)

  const handleInquiry = (product) => {
    const colors = product.product_colors?.map((color) => color.color_name).join(", ")
      || product.color
      || "Not specified"

    const message = `Hello Lead Bag, I am interested in this product.

Product: ${product.name}
Category: ${product.category}
Available Colors: ${colors}

Could you please provide more details and pricing?`

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    )
  }

  return (
    <section id="products" className="section-pad bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="section-kicker">Our Products</div>
            <h2 className="section-title mt-3">A collection built for everyday demand.</h2>
            <p className="mt-5 max-w-2xl leading-8 text-slate-600">
              Browse the latest products and contact us directly for availability, colours, bulk orders and pricing.
            </p>
          </div>
          {!loading && products.length > 0 && (
            <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">
              {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
            </div>
          )}
        </div>

        {!loading && !error && products.length > 0 && (
          <div className="mt-10 flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition ${
                  activeCategory === category
                    ? "bg-slate-950 text-white shadow-lg"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
                <div className="skeleton aspect-[4/5]" />
                <div className="space-y-3 p-6">
                  <div className="skeleton h-3 w-1/3 rounded" />
                  <div className="skeleton h-6 w-3/4 rounded" />
                  <div className="skeleton h-4 w-full rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && <p className="mt-12 rounded-2xl bg-red-50 p-5 text-center text-sm font-medium text-red-700">{error}</p>}

        {!loading && !error && products.length === 0 && (
          <div className="mt-12 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="text-lg font-semibold text-slate-800">No products available at the moment.</p>
            <p className="mt-2 text-sm text-slate-500">Please check back soon.</p>
          </div>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <article key={product.id} className="product-card group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <button type="button" onClick={() => setSelectedProduct(product)} className="block w-full text-left">
                  <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-slate-400">No Image</div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute left-4 top-4">
                      <span className={`rounded-full px-3 py-1.5 text-xs font-bold shadow-lg backdrop-blur ${
                        product.available ? "bg-emerald-500/95 text-white" : "bg-red-500/95 text-white"
                      }`}>
                        {product.available ? "Available" : "Out of Stock"}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                      <span className="text-xs font-bold uppercase tracking-[0.16em]">{product.category}</span>
                      <span className="text-xs font-semibold opacity-90">View details →</span>
                    </div>
                  </div>
                </button>

                <div className="p-5">
                  <h3 className="text-xl font-black text-slate-950">{product.name}</h3>
                  {product.product_colors?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {product.product_colors.map((color) => (
                        <span key={color.id} className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-600">
                          <span className="h-3.5 w-3.5 rounded-full border border-slate-300" style={{ backgroundColor: color.color_value }} />
                          {color.color_name}
                        </span>
                      ))}
                    </div>
                  )}
                  <button type="button" onClick={() => handleInquiry(product)} className="mt-5 w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700">
                    Inquire About This
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}>
          <div className="max-h-[92vh] w-full max-w-4xl overflow-auto rounded-[2rem] bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="grid md:grid-cols-2">
              <div className="min-h-[360px] bg-slate-100">
                <img src={selectedProduct.image_url} alt={selectedProduct.name} className="h-full min-h-[360px] w-full object-cover" />
              </div>
              <div className="p-7 sm:p-9">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="section-kicker">{selectedProduct.category}</p>
                    <h3 className="mt-2 text-3xl font-black text-slate-950">{selectedProduct.name}</h3>
                  </div>
                  <button type="button" onClick={() => setSelectedProduct(null)} className="rounded-full bg-slate-100 px-3 py-2 text-xl text-slate-600 hover:bg-slate-200" aria-label="Close">×</button>
                </div>

                <span className={`mt-5 inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${selectedProduct.available ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                  {selectedProduct.available ? "Available / In Stock" : "Currently Out of Stock"}
                </span>

                {selectedProduct.description && <p className="mt-6 leading-8 text-slate-600">{selectedProduct.description}</p>}

                {selectedProduct.product_colors?.length > 0 && (
                  <div className="mt-7">
                    <p className="text-sm font-bold text-slate-900">Available colours</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedProduct.product_colors.map((color) => (
                        <span key={color.id} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-600">
                          <span className="h-4 w-4 rounded-full border border-slate-300" style={{ backgroundColor: color.color_value }} />
                          {color.color_name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button type="button" onClick={() => handleInquiry(selectedProduct)} className="flex-1 rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-bold text-white hover:bg-emerald-600">
                    Ask on WhatsApp
                  </button>
                  <button type="button" onClick={() => setSelectedProduct(null)} className="rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-50">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Products
