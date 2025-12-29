import { useEffect, useState } from "react";
import type { Resource } from "../../types/Resource";
import { createResource, updateResource } from "../../services/resourceApi";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Resource;
};

function AddResourceModal({ onClose, onSuccess, initialData }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Article");
  const [link, setLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Populate form when editing, reset when adding
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setType(initialData.type);
      setLink(initialData.link || "");
      setFile(null);
    } else {
      // Reset form for new resource
      setTitle("");
      setDescription("");
      setType("Article");
      setLink("");
      setFile(null);
      setError(null);
    }
  }, [initialData]);

  async function handleSubmit() {
    if (!title.trim() || !description.trim()) {
      setError("Title and description are required");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const payload = {
        title: title.trim(),
        description: description.trim(),
        type,
        link: link.trim() ? link.trim() : undefined,
        file: file || undefined,
      };

      if (initialData) {
        await updateResource(initialData.id, payload);
      } else {
        await createResource(payload);
      }

      // Refresh resources and close modal only after successful update/create
      onSuccess();
      onClose();
    } catch (err: any) {
      const errorMessage = err?.message || (initialData ? "Failed to update resource" : "Failed to create resource");
      setError(errorMessage);
      console.error("Error submitting form:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          width: "400px",
          borderRadius: "12px",
          padding: "20px",
        }}
      >
        <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px" }}>
          {initialData ? "Edit Resource" : "Add Resource"}
        </h3>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded mb-3 text-sm">
            {error}
          </div>
        )}

        <div style={{ marginBottom: "12px" }}>
          <label style={{ fontSize: "14px" }}>Title</label>
          <input
            style={{ width: "100%", padding: "8px", border: "1px solid #d1d5db", borderRadius: "6px" }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label style={{ fontSize: "14px" }}>Description</label>
          <textarea
            rows={3}
            style={{ width: "100%", padding: "8px", border: "1px solid #d1d5db", borderRadius: "6px" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label style={{ fontSize: "14px" }}>Type</label>
          <select
            style={{ width: "100%", padding: "8px", border: "1px solid #d1d5db", borderRadius: "6px" }}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>Article</option>
            <option>Video</option>
            <option>Tutorial</option>
          </select>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label style={{ fontSize: "14px" }}>Link (optional)</label>
          <input
            style={{ width: "100%", padding: "8px", border: "1px solid #d1d5db", borderRadius: "6px" }}
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label style={{ fontSize: "14px" }}>File (optional)</label>
          <input
            type="file"
            onChange={(e) =>
              setFile(e.target.files ? e.target.files[0] : null)
            }
          />
          {initialData?.fileName && !file && (
            <p style={{ fontSize: "12px", color: "#6b7280" }}>
              Current file: {initialData.fileName}
            </p>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
          <button
            onClick={onClose}
            disabled={loading}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-3 py-1.5 bg-teal-500 text-white rounded-md text-sm hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : initialData ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddResourceModal;
