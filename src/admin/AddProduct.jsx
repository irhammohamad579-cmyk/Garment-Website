import { useState } from "react"
import { supabase } from "../lib/supabaseClient"

function AddProduct({ onProductAdded, onCancel }) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("School Bags")
  const [description, setDescription] = useState("")
  const [available, setAvailable] = useState(true)
  const [image, setImage] = useState(null)

  const [colors, setColors] = useState([])
  const [colorName, setColorName] = useState("")
  const [colorValue, setColorValue] = useState("#000000")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const addColor = () => {
    const trimmedName = colorName.trim()

    if (!trimmedName) {
      setError("Please enter a color name.")
      return
    }

    const alreadyExists = colors.some(
      (color) =>
        color.name.toLowerCase() === trimmedName.toLowerCase()
    )

    if (alreadyExists) {
      setError("This color has already been added.")
      return
    }

    setColors((currentColors) => [
      ...currentColors,
      {
        name: trimmedName,
        value: colorValue,
      },
    ])

    setColorName("")
    setColorValue("#000000")
    setError("")
  }

  const removeColor = (indexToRemove) => {
    setColors((currentColors) =>
      currentColors.filter(
        (_, index) => index !== indexToRemove
      )
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")

    if (!image) {
      setError("Please select a product image.")
      return
    }

    if (colors.length === 0) {
      setError("Please add at least one product color.")
      return
    }

    setLoading(true)

    try {
      // Upload product image
      const fileExt = image.name.split(".").pop()
      const fileName = `${crypto.randomUUID()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, image)

      if (uploadError) {
        throw uploadError
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName)

      // Create product
      const {
        data: product,
        error: insertError,
      } = await supabase
        .from("products")
        .insert([
          {
            name,
            category,
            description,
            image_url: publicUrl,
            available,
          },
        ])
        .select()
        .single()

      if (insertError) {
        throw insertError
      }

      // Create product colors
      const colorRows = colors.map((color) => ({
        product_id: product.id,
        color_name: color.name,
        color_value: color.value,
      }))

      const { error: colorError } = await supabase
        .from("product_colors")
        .insert(colorRows)

      if (colorError) {
        // Remove the product if color creation failed
        await supabase
          .from("products")
          .delete()
          .eq("id", product.id)

        throw colorError
      }

      // Return product with colors to ProductManager
      onProductAdded({
        ...product,
        product_colors: colors.map((color, index) => ({
          id: `new-${index}`,
          product_id: product.id,
          color_name: color.name,
          color_value: color.value,
        })),
      })

      // Reset form
      setName("")
      setCategory("School Bags")
      setDescription("")
      setAvailable(true)
      setImage(null)
      setColors([])
      setColorName("")
      setColorValue("#000000")

      const imageInput =
        document.getElementById("product-image")

      if (imageInput) {
        imageInput.value = ""
      }

      onCancel()
    } catch (err) {
      console.error("Error adding product:", err)
      setError(
        err.message || "Failed to add product."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Add Product
        </h2>

        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 hover:text-black"
        >
          Cancel
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        {/* Product Photo */}
        <div>
          <label className="block font-medium mb-2">
            Product Photo
          </label>

          <input
            id="product-image"
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files[0])
            }
            required
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Product Name */}
        <div>
          <label className="block font-medium mb-2">
            Product Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Example: School Bag 05"
            required
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-2">
            Category
          </label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full border rounded-lg px-4 py-2"
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
          </select>
        </div>

        {/* Colors */}
        <div>
          <label className="block font-medium mb-2">
            Product Colors
          </label>

          <div className="border rounded-xl p-4">

            {/* Add Color */}
            <div className="flex flex-col sm:flex-row gap-3">

              <input
                type="text"
                value={colorName}
                onChange={(e) =>
                  setColorName(e.target.value)
                }
                placeholder="Color name (e.g. Black)"
                className="flex-1 border rounded-lg px-4 py-2"
              />

              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={colorValue}
                  onChange={(e) =>
                    setColorValue(e.target.value)
                  }
                  className="w-12 h-10 p-1 border rounded-lg cursor-pointer"
                />

                <button
                  type="button"
                  onClick={addColor}
                  className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
                >
                  + Add Color
                </button>
              </div>

            </div>

            {/* Color List */}
            {colors.length > 0 && (
              <div className="mt-5 space-y-3">

                <p className="text-sm font-medium text-gray-600">
                  Added Colors
                </p>

                {colors.map((color, index) => (
                  <div
                    key={`${color.name}-${index}`}
                    className="flex items-center justify-between border rounded-lg px-4 py-3"
                  >

                    <div className="flex items-center gap-3">

                      <span
                        className="w-7 h-7 rounded-full border border-gray-300"
                        style={{
                          backgroundColor:
                            color.value,
                        }}
                      />

                      <div>
                        <p className="font-medium">
                          {color.name}
                        </p>

                        <p className="text-xs text-gray-500">
                          {color.value}
                        </p>
                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        removeColor(index)
                      }
                      className="text-red-600 text-sm hover:text-red-800"
                    >
                      Remove
                    </button>

                  </div>
                ))}

              </div>
            )}

          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-2">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Short description about the bag"
            rows="4"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* Availability */}
        <div className="flex items-center gap-3">

          <input
            id="available"
            type="checkbox"
            checked={available}
            onChange={(e) =>
              setAvailable(e.target.checked)
            }
            className="w-5 h-5"
          />

          <label
            htmlFor="available"
            className="font-medium"
          >
            Available / In Stock
          </label>

        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50"
          >
            {loading
              ? "Adding Product..."
              : "Add Product"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="border px-6 py-3 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

        </div>

      </form>
    </div>
  )
}

export default AddProduct