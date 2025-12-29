import { useEffect, useState } from "react";
import Header from "../components/Header";
import ResourceList from "../components/ResourceList";
import AddResourceModal from "../components/modals/AddResourceModal";
import { fetchResources, deleteResource } from "../services/resourceApi";
import type { Resource } from "../types/Resource";

function Home() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  async function loadResources() {
    const data = await fetchResources();
    setResources(Array.isArray(data) ? data : []);
  }

  async function handleDelete(id: string) {
    await deleteResource(id);
    await loadResources();
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

  return (
    <>
      <Header />

      <div style={{ padding: "24px" }}>
        <button onClick={handleAddClick}>+ Add Resource</button>

        <ResourceList
          resources={resources}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
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
    </>
  );
}

export default Home;
