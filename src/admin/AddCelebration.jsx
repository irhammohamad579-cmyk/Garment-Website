import { useState } from "react"
import { supabase } from "../lib/supabaseClient"

function AddCelebration({ onCelebrationAdded, onCancel }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")

    if (!title.trim()) {
      setError("Please enter a celebration title.")
      return
    }

    if (!image) {
      setError("Please select a celebration image.")
      return
    }

    setLoading(true)

    try {
      // 1. Create unique file name
      const fileExt = image.name.split(".").pop()

      const fileName = `${crypto.randomUUID()}.${fileExt}`

      // 2. Upload image
      const { error: uploadError } = await supabase.storage
        .from("celebration-images")
        .upload(fileName, image)

      if (uploadError) {
        throw uploadError
      }

      // 3. Get public image URL
      const {
        data: { publicUrl },
      } = supabase.storage
        .from("celebration-images")
        .getPublicUrl(fileName)

      // 4. Insert celebration into database
      const { data, error: insertError } = await supabase
        .from("celebrations")
        .insert({
          title: title.trim(),
          description: description.trim(),
          image_url: publicUrl,
        })
        .select()
        .single()

      if (insertError) {
        throw insertError
      }

      // 5. Send new celebration to parent
      onCelebrationAdded(data)

      // 6. Reset form
      setTitle("")
      setDescription("")
      setImage(null)

      // Reset file input
      e.target.reset()
    } catch (err) {
      console.error("Error adding celebration:", err)
      setError(err.message || "Failed to add celebration.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Add Celebration
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Add a celebration or company event photo.
          </p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-900"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Celebration Photo
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="block w-full text-sm text-gray-600"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Example: New Year Celebration 2026"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description about the celebration..."
            rows="4"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
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
            {loading ? "Saving..." : "Add Celebration"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  )
}

export default AddCelebration