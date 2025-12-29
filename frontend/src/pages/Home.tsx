import { useEffect, useState } from "react";
import Header from "../components/Header";
import FilterTabs from "../components/FilterTabs";
import ResourceList from "../components/ResourceList";
import EmptyState from "../components/EmptyState";
import AddResourceModal from "../components/modals/AddResourceModal";
import { fetchResources, deleteResource } from "../services/resourceApi";
import type { Resource } from "../types/Resource";

function Home() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load resources from API
  async function loadResources() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchResources();
      setResources(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Failed to load resources. Please try again.");
      console.error("Error loading resources:", err);
    } finally {
      setLoading(false);
    }
  }

  // Delete resource and refresh list
  async function handleDelete(id: string) {
    try {
      await deleteResource(id);
      await loadResources();
    } catch (err) {
      setError("Failed to delete resource. Please try again.");
      console.error("Error deleting resource:", err);
      throw err; // Re-throw to let modal handle it
    }
  }

  useEffect(() => {
    loadResources();
  }, []);

  function handleAddClick() {
    setEditingResource(null);
    setShowModal(true);
  }

  function handleEdit(resource: Resource) {
    setEditingResource(resource);
    setShowModal(true);
  }

  // Filter and search logic
  let filtered = resources;

  if (filter !== "All") {
    filtered = resources.filter((resource) => {
      return resource.type === filter;
    });
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter((resource) => {
      return resource.title.toLowerCase().includes(query) ||
             resource.description.toLowerCase().includes(query) ||
             resource.type.toLowerCase().includes(query);
    });
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
  
      <div className="p-6">
        <div className="flex justify-between items-center mb-5 gap-3">
          <FilterTabs
            active={filter}
            onChange={setFilter}
            resources={resources}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
  
          <button
            onClick={handleAddClick}
            className="px-4 py-2 bg-teal-500 text-white border-none rounded-2xl text-sm cursor-pointer whitespace-nowrap"
          >
            + Add Resource
          </button>
        </div>
  
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-4 text-red-500 hover:text-red-700 underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
            <p className="mt-2 text-gray-600">Loading resources...</p>
          </div>
        )}

        {!loading && filtered.length === 0 && <EmptyState />}

        {!loading && filtered.length > 0 && (
          <ResourceList
            resources={filtered}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
  
      {showModal && (
        <AddResourceModal
          onClose={() => {
            setShowModal(false);
            setEditingResource(null);
          }}
          onSuccess={loadResources}
          initialData={editingResource || undefined}
        />
      )}
    </div>
  );
}

export default Home;
