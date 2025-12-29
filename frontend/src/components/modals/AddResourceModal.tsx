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

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setType(initialData.type);
      setLink(initialData.link || "");
    }
  }, [initialData]);

  async function handleSubmit() {
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    if (initialData) {
      await updateResource(initialData.id, {
        title,
        description,
        type,
        link: link.trim() ? link : undefined,
      });

    } else {
      await createResource({
        title,
        description,
        type,
        link: link.trim() ? link : undefined,
      });
    }

    onSuccess();
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[400px] rounded-lg p-5">
        <h3 className="text-lg font-semibold mb-4">
          {initialData ? "Edit Resource" : "Add New Resource"}
        </h3>

        <div className="mb-3">
          <label className="block text-sm mb-1">Title</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm mb-1">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Type</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>Article</option>
            <option>Video</option>
            <option>Tutorial</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="block text-sm mb-1">
            Resource Link (optional)
          </label>
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="https://example.com"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 border rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-teal-500 text-white rounded"
            onClick={handleSubmit}
          >
            {initialData ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddResourceModal;
