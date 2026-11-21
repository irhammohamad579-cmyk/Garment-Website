import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import Reveal from "./Reveal"

const PREVIEW_LIMIT = 6

function Products() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState(["All"])
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const whatsappNumber = "94767408454"

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

  const visibleProducts = filteredProducts.slice(0, PREVIEW_LIMIT)
  const hasMore = filteredProducts.length > PREVIEW_LIMIT

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
    <section id="products" className="section-pad relative overflow-hidden bg-sand/60">
      <div className="gold-hairline absolute inset-x-0 top-0" />
      <div className="glow-orb -right-32 top-10 hidden h-[26rem] w-[26rem] lg:block" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="section-kicker">Our Products</div>
            <h2 className="section-title mt-5">A collection built for <em>everyday demand.</em></h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Browse the latest products and contact us directly for availability, colours, bulk orders and pricing.
            </p>
          </div>
        </Reveal>

        {!loading && !error && products.length > 0 && (
          <div className="mt-10 flex gap-2.5 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
                className={`whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-bold transition duration-300 ${
                  activeCategory === category
                    ? "bg-navy text-gold-light shadow-lg shadow-navy/25 ring-1 ring-gold/60"
                    : "border border-navy/10 bg-white text-slate-600 hover:-translate-y-0.5 hover:border-gold hover:text-gold-deep"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="overflow-hidden rounded-3xl border border-gold/20 bg-white">
                <div className="skeleton public-skeleton aspect-[4/5]" />
                <div className="space-y-3 p-6">
                  <div className="skeleton public-skeleton h-3 w-1/3 rounded" />
                  <div className="skeleton public-skeleton h-6 w-3/4 rounded" />
                  <div className="skeleton public-skeleton h-4 w-full rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && <p className="mt-12 rounded-2xl bg-red-50 p-5 text-center text-sm font-medium text-red-700">{error}</p>}

        {!loading && !error && products.length === 0 && (
          <div className="mt-12 rounded-3xl border border-dashed border-gold/50 bg-white p-12 text-center">
            <p className="font-display text-3xl font-semibold text-navy">No products available at the moment.</p>
            <p className="mt-2 text-sm text-slate-500">Please check back soon.</p>
          </div>
        )}

        {!loading && !error && visibleProducts.length > 0 && (
          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleProducts.map((product, index) => (
              <Reveal key={product.id} delay={(index % 4) * 90}>
                <article className="product-card group h-full overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-[0_10px_30px_-20px_rgba(14,27,51,0.35)]">
                  <button type="button" onClick={() => setSelectedProduct(product)} className="block w-full text-left">
                    <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                      {product.image_url ? (
                        <img src={product.image_url} alt={product.name} className="zoom-img h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-slate-400">No Image</div>
                      )}
                      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-ink/75 to-transparent" />
                      <div className="absolute left-4 top-4">
                        <span className={`rounded-full px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider shadow-lg backdrop-blur ${
                          product.available ? "bg-emerald-500/95 text-white" : "bg-red-500/95 text-white"
                        }`}>
                          {product.available ? "Available" : "Out of Stock"}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                        <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-gold-light">{product.category}</span>
                        <span className="translate-x-2 text-xs font-semibold opacity-0 transition duration-500 group-hover:translate-x-0 group-hover:opacity-100">View details →</span>
                      </div>
                    </div>
                  </button>

                  <div className="p-6">
                    <h3 className="font-display text-2xl font-semibold leading-tight text-navy">{product.name}</h3>
                    <div className="mt-3 h-px w-10 bg-gold transition-all duration-500 group-hover:w-20" />
                    {product.product_colors?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {product.product_colors.map((color) => (
                          <span key={color.id} className="inline-flex items-center gap-2 rounded-full bg-ivory px-2.5 py-1.5 text-xs font-semibold text-slate-600 ring-1 ring-navy/5">
                            <span className="h-3.5 w-3.5 rounded-full border border-slate-300" style={{ backgroundColor: color.color_value }} />
                            {color.color_name}
                          </span>
                        ))}
                      </div>
                    )}
                    <button type="button" onClick={() => handleInquiry(product)} className="btn-navy mt-6 w-full px-4 py-3.5 text-sm">
                      Inquire About This <span className="btn-arrow">→</span>
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}

        {!loading && !error && filteredProducts.length > 0 && hasMore && (
          <Reveal className="mt-14 flex justify-center">
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-8 py-3.5 text-sm font-bold text-gold-light shadow-lg shadow-navy/25 transition duration-300 hover:-translate-y-0.5 hover:bg-navy-ink"
            >
              View All Bags
              <span className="transition duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        )}
      </div>

      {selectedProduct && (
        <div className="modal-backdrop fixed inset-0 z-[70] flex items-center justify-center bg-navy-ink/85 p-4 backdrop-blur-md" onClick={() => setSelectedProduct(null)}>
          <div className="modal-panel max-h-[92vh] w-full max-w-4xl overflow-auto rounded-[2rem] border border-gold/30 bg-ivory shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="grid md:grid-cols-2">
              <div className="min-h-[360px] bg-sand">
                <img src={selectedProduct.image_url} alt={selectedProduct.name} className="h-full min-h-[360px] w-full object-cover" />
              </div>
              <div className="p-7 sm:p-10">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="section-kicker">{selectedProduct.category}</p>
                    <h3 className="mt-3 font-display text-4xl font-semibold leading-tight text-navy">{selectedProduct.name}</h3>
                  </div>
                  <button type="button" onClick={() => setSelectedProduct(null)} className="rounded-full border border-navy/10 bg-white px-3.5 py-2 text-xl leading-none text-slate-600 transition hover:rotate-90 hover:border-gold hover:text-gold-deep" aria-label="Close">×</button>
                </div>

                <span className={`mt-5 inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${selectedProduct.available ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                  {selectedProduct.available ? "Available / In Stock" : "Currently Out of Stock"}
                </span>

                {selectedProduct.description && <p className="mt-6 leading-8 text-slate-600">{selectedProduct.description}</p>}

                {selectedProduct.product_colors?.length > 0 && (
                  <div className="mt-7">
                    <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-navy">Available colours</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedProduct.product_colors.map((color) => (
                        <span key={color.id} className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-3 py-2 text-sm text-slate-600">
                          <span className="h-4 w-4 rounded-full border border-slate-300" style={{ backgroundColor: color.color_value }} />
                          {color.color_name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <button type="button" onClick={() => handleInquiry(selectedProduct)} className="flex-1 rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-900/10 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-600">
                    Ask on WhatsApp
                  </button>
                  <button type="button" onClick={() => setSelectedProduct(null)} className="rounded-xl border border-navy/15 bg-white px-5 py-3.5 text-sm font-bold text-navy transition hover:border-gold hover:text-gold-deep">
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
