import type { Resource } from "../types/Resource";

type Props = {
  resources: Resource[];
  onDelete: (id: string) => void;
  onEdit: (resource: Resource) => void;
};

function ResourceList({ resources, onDelete, onEdit }: Props) {
  return (
    <div style={{ marginTop: "24px" }}>
      {resources.map((r) => (
        <div
          key={r.id}
          style={{
            background: "#fff",
            padding: "16px",
            borderRadius: "8px",
            marginBottom: "12px",
            border: "1px solid #e5e7eb",
          }}
        >
          <h4>{r.title}</h4>
          <p>{r.description}</p>
          <small>{r.type}</small>

          <div style={{ marginTop: "8px" }}>
            <strong>Link:</strong>{" "}
            {r.link ? (
              <a
                href={r.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#2563eb", textDecoration: "underline" }}
              >
                {r.link}
              </a>
            ) : (
              <span style={{ color: "#9ca3af" }}>Not provided</span>
            )}
          </div>


          {/* EDIT & DELETE BUTTONS */}
          <div style={{ marginTop: "8px", display: "flex", gap: "12px" }}>
            <button
              style={{ color: "#2563eb", background: "none", border: "none", cursor: "pointer" }}
              onClick={() => onEdit(r)}
            >
              Edit
            </button>

            <button
              style={{ color: "#dc2626", background: "none", border: "none", cursor: "pointer" }}
              onClick={() => {
                if (confirm("Are you sure you want to delete this resource?")) {
                  onDelete(r.id);
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResourceList;
