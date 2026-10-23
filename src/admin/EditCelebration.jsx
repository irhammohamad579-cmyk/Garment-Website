import { useState } from "react"
import { supabase } from "../lib/supabaseClient"

function EditCelebration({
  celebration,
  onCelebrationUpdated,
  onCancel,
}) {
  const [title, setTitle] = useState(celebration.title || "")
  const [description, setDescription] = useState(
    celebration.description || ""
  )
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

    setLoading(true)

    try {
      let imageUrl = celebration.image_url

      // Upload new image only if selected
      if (image) {
        const fileExt = image.name.split(".").pop()
        const fileName = `${crypto.randomUUID()}.${fileExt}`

        const { error: uploadError } = await supabase.storage
          .from("celebration-images")
          .upload(fileName, image)

        if (uploadError) {
          throw uploadError
        }

        const {
          data: { publicUrl },
        } = supabase.storage
          .from("celebration-images")
          .getPublicUrl(fileName)

        imageUrl = publicUrl
      }

      // Update database
      const { data, error: updateError } = await supabase
        .from("celebrations")
        .update({
          title: title.trim(),
          description: description.trim(),
          image_url: imageUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", celebration.id)
        .select()
        .single()

      if (updateError) {
        throw updateError
      }

      onCelebrationUpdated(data)
    } catch (err) {
      console.error("Error updating celebration:", err)
      setError(err.message || "Failed to update celebration.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Edit Celebration
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Update celebration information.
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

        {/* Current Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Photo
          </label>

          <img
            src={celebration.image_url}
            alt={celebration.title}
            className="w-48 h-32 object-cover rounded-lg border"
          />
        </div>

        {/* New Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Replace Photo
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="block w-full text-sm text-gray-600"
          />

          <p className="text-xs text-gray-500 mt-1">
            Leave empty if you want to keep the current photo.
          </p>
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
            {loading ? "Saving..." : "Save Changes"}
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

export default EditCelebration