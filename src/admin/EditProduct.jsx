import { useState } from "react"
import { supabase } from "../lib/supabaseClient"

function EditProduct({ product, onProductUpdated, onCancel }) {
  const [name, setName] = useState(product.name || "")

  const [category, setCategory] = useState(
    product.category || "School Bags"
  )

  const [description, setDescription] = useState(
    product.description || ""
  )

  const [available, setAvailable] = useState(
    product.available ?? true
  )

  const [image, setImage] = useState(null)

  /*
    Load colors from product_colors.

    If this is an old product that doesn't have
    product_colors yet, use the old color field.
  */
  const [colors, setColors] = useState(() => {
    if (product.product_colors?.length > 0) {
      return product.product_colors.map((color) => ({
        id: color.id,
        name: color.color_name,
        value: color.color_value || "#000000",
      }))
    }

    if (product.color) {
      return product.color
        .split(",")
        .map((colorName) => ({
          name: colorName.trim(),
          value: "#000000",
        }))
    }

    return []
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // -----------------------------
  // ADD COLOR
  // -----------------------------
  const addColor = () => {
    setColors((current) => [
      ...current,
      {
        name: "",
        value: "#000000",
      },
    ])
  }

  // -----------------------------
  // REMOVE COLOR
  // -----------------------------
  const removeColor = (index) => {
    setColors((current) =>
      current.filter((_, i) => i !== index)
    )
  }

  // -----------------------------
  // UPDATE COLOR NAME
  // -----------------------------
  const updateColorName = (index, value) => {
    setColors((current) =>
      current.map((color, i) =>
        i === index
          ? {
              ...color,
              name: value,
            }
          : color
      )
    )
  }

  // -----------------------------
  // UPDATE COLOR VALUE
  // -----------------------------
  const updateColorValue = (index, value) => {
    setColors((current) =>
      current.map((color, i) =>
        i === index
          ? {
              ...color,
              value,
            }
          : color
      )
    )
  }

  // -----------------------------
  // SAVE PRODUCT
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")

    // Validate name
    if (!name.trim()) {
      setError("Please enter a product name.")
      return
    }

    // Validate category
    if (!category.trim()) {
      setError("Please select a category.")
      return
    }

    // Require at least one color
    if (colors.length === 0) {
      setError("Please add at least one product color.")
      return
    }

    // Make sure every color has a name
    const invalidColor = colors.some(
      (color) => !color.name.trim()
    )

    if (invalidColor) {
      setError("Please enter a name for every color.")
      return
    }

    setLoading(true)
    let newImagePath = null

    try {
      // --------------------------------
      // IMAGE
      // --------------------------------

      let imageUrl = product.image_url

      if (image) {
        const fileExt = image.name
          .split(".")
          .pop()
          .toLowerCase()

        const fileName = `${crypto.randomUUID()}.${fileExt}`

        const { error: uploadError } =
          await supabase.storage
            .from("product-images")
            .upload(fileName, image)

        if (uploadError) {
          throw uploadError
        }

        newImagePath = fileName

        const {
          data: { publicUrl },
        } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName)

        imageUrl = publicUrl
      }

      // --------------------------------
      // UPDATE PRODUCT
      // --------------------------------

      const { error: updateError } =
        await supabase
          .from("products")
          .update({
            name: name.trim(),
            category: category.trim(),

            // Keep old field for compatibility
            color: colors
              .map((color) => color.name.trim())
              .join(", "),

            description: description.trim(),
            image_url: imageUrl,
            available,
            updated_at: new Date().toISOString(),
          })
          .eq("id", product.id)

      if (updateError) {
        throw updateError
      }

      // --------------------------------
      // DELETE OLD COLORS
      // --------------------------------

      const { error: deleteColorsError } =
        await supabase
          .from("product_colors")
          .delete()
          .eq("product_id", product.id)

      if (deleteColorsError) {
        throw deleteColorsError
      }

      // --------------------------------
      // INSERT NEW COLORS
      // --------------------------------

      const colorRows = colors.map((color) => ({
        product_id: product.id,
        color_name: color.name.trim(),
        color_value: color.value,
      }))

      const { error: insertColorsError } =
        await supabase
          .from("product_colors")
          .insert(colorRows)

      if (insertColorsError) {
        throw insertColorsError
      }

      // --------------------------------
      // GET UPDATED PRODUCT
      // --------------------------------

      const {
        data: updatedProduct,
        error: fetchError,
      } = await supabase
        .from("products")
        .select(`
          *,
          product_colors (
            id,
            color_name,
            color_value
          )
        `)
        .eq("id", product.id)
        .single()

      if (fetchError) {
        throw fetchError
      }

      // --------------------------------
      // DELETE OLD IMAGE
      // --------------------------------

      if (
        image &&
        product.image_url &&
        imageUrl !== product.image_url
      ) {
        try {
          const oldUrl = new URL(
            product.image_url
          )

          const oldPath = oldUrl.pathname.split(
            "/product-images/"
          )[1]

          if (oldPath) {
            await supabase.storage
              .from("product-images")
              .remove([oldPath])
          }
        } catch (imageError) {
          console.error(
            "Error deleting old image:",
            imageError
          )
        }
      }

      // --------------------------------
      // SUCCESS
      // --------------------------------

      onProductUpdated(updatedProduct)

    } catch (err) {
      console.error(
        "Error updating product:",
        err
      )

      // If a new image was uploaded but something
      // failed afterward, try to remove it.
      if (newImagePath) {
        try {
          await supabase.storage
            .from("product-images")
            .remove([newImagePath])
        } catch (cleanupError) {
          console.error(
            "Image cleanup failed:",
            cleanupError
          )
        }
      }

      setError(
        err.message ||
          "Failed to update product."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">

      {/* -------------------------------- */}
      {/* HEADER */}
      {/* -------------------------------- */}

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-gray-900">
          Edit Product
        </h2>

        <p className="text-gray-600 mt-1">
          Update product information, colors,
          image and availability.
        </p>

      </div>

      {/* -------------------------------- */}
      {/* ERROR */}
      {/* -------------------------------- */}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* -------------------------------- */}
        {/* PRODUCT NAME */}
        {/* -------------------------------- */}

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Enter product name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />

        </div>

        {/* -------------------------------- */}
        {/* CATEGORY */}
        {/* -------------------------------- */}

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-black"
          >

            <option value="School Bags">
              School Bags
            </option>

            <option value="Travel Bags">
              Travel Bags
            </option>

            <option value="Ladies Bags">
              Ladies Bags
            </option>

            <option value="Backpacks">
              Backpacks
            </option>

            <option value="Other">
              Other
            </option>

          </select>

        </div>

        {/* -------------------------------- */}
        {/* CURRENT IMAGE */}
        {/* -------------------------------- */}

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Product Image
          </label>

          {product.image_url && (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-48 h-48 object-cover rounded-lg border mb-4"
            />
          )}

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Replace Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(
                e.target.files?.[0] || null
              )
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />

          <p className="text-xs text-gray-500 mt-2">
            Leave this empty if you want to keep
            the current image.
          </p>

        </div>

        {/* -------------------------------- */}
        {/* COLORS */}
        {/* -------------------------------- */}

        <div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">

            <div>

              <label className="block text-sm font-medium text-gray-700">
                Product Colors
              </label>

              <p className="text-xs text-gray-500 mt-1">
                Add, remove or change the available
                colors.
              </p>

            </div>

            <button
              type="button"
              onClick={addColor}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
            >
              + Add Color
            </button>

          </div>

          {colors.length === 0 ? (

            <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">

              <p className="text-gray-500">
                No colors added.
              </p>

              <button
                type="button"
                onClick={addColor}
                className="mt-3 text-sm font-medium text-black underline"
              >
                Add a color
              </button>

            </div>

          ) : (

            <div className="space-y-4">

              {colors.map((color, index) => (

                <div
                  key={color.id || index}
                  className="border border-gray-200 rounded-xl p-4"
                >

                  <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 items-center">

                    {/* COLOR PICKER */}

                    <div className="flex items-center gap-3">

                      <input
                        type="color"
                        value={color.value}
                        onChange={(e) =>
                          updateColorValue(
                            index,
                            e.target.value
                          )
                        }
                        className="w-14 h-14 cursor-pointer rounded-lg border border-gray-300 p-1"
                        title="Choose color"
                      />

                      <span
                        className="w-10 h-10 rounded-full border border-gray-300"
                        style={{
                          backgroundColor:
                            color.value,
                        }}
                      />

                    </div>

                    {/* NAME + HEX */}

                    <div className="space-y-2">

                      <input
                        type="text"
                        value={color.name}
                        onChange={(e) =>
                          updateColorName(
                            index,
                            e.target.value
                          )
                        }
                        placeholder="Color name e.g. Red"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                      />

                      <input
                        type="text"
                        value={color.value}
                        onChange={(e) =>
                          updateColorValue(
                            index,
                            e.target.value
                          )
                        }
                        placeholder="#000000"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-black"
                      />

                    </div>

                    {/* REMOVE */}

                    <button
                      type="button"
                      onClick={() =>
                        removeColor(index)
                      }
                      className="text-red-600 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* -------------------------------- */}
        {/* DESCRIPTION */}
        {/* -------------------------------- */}

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            rows="5"
            placeholder="Enter product description"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />

        </div>

        {/* -------------------------------- */}
        {/* AVAILABILITY */}
        {/* -------------------------------- */}

        <div className="border border-gray-200 rounded-lg p-4">

          <label className="flex items-center gap-3 cursor-pointer">

            <input
              type="checkbox"
              checked={available}
              onChange={(e) =>
                setAvailable(
                  e.target.checked
                )
              }
              className="w-5 h-5"
            />

            <div>

              <p className="font-medium text-gray-900">
                Product Available
              </p>

              <p className="text-sm text-gray-500">
                Customers can see this product
                as available.
              </p>

            </div>

          </label>

        </div>

        {/* -------------------------------- */}
        {/* BUTTONS */}
        {/* -------------------------------- */}

        <div className="flex flex-col sm:flex-row gap-3 pt-4">

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  )
}

export default EditProduct