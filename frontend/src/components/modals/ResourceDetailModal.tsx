import {
    FaBook,
    FaVideo,
    FaGraduationCap,
    FaTimes,
    FaEye,
  } from "react-icons/fa";
  import type { Resource } from "../../types/Resource";
  
  type Props = {
    resource: Resource;
    onClose: () => void;
    onEdit: (resource: Resource) => void;
    onDelete: (id: string) => void;
  };
  
  function ResourceDetailModal({
    resource,
    onClose,
    onEdit,
    onDelete,
  }: Props) {
    function getIcon(type: string) {
      if (type === "Article") return <FaBook size={28} />;
      if (type === "Video") return <FaVideo size={28} />;
      if (type === "Tutorial") return <FaGraduationCap size={28} />;
  
      return <FaBook size={28} />;
    }
  
    return (
      <>
        <div
        onClick={onClose}
        style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            zIndex: 1000,
        }}
        >
        <div
            onClick={(e) => e.stopPropagation()}
            style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "20px",
            width: "100%",
            maxWidth: "600px",
            maxHeight: "90vh",
            overflowY: "auto",
            }}
        >

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#6b7280",
            }}
          >
            <FaTimes size={18} />
          </button>
  
          {/* Header */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                margin: "0 auto 12px",
                backgroundColor: "#f3f4f6",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#14b8a6",
              }}
            >
              {getIcon(resource.type)}
            </div>

            <h2
              style={{
                fontSize: "22px",
                fontWeight: 600,
                marginBottom: "6px",
              }}
            >
              {resource.title}
            </h2>

            <span
              style={{
                fontSize: "13px",
                color: "#6b7280",
              }}
            >
              {resource.type}
            </span>
          </div>

          {/* Description */}
          <div style={{ marginBottom: "20px" }}>
            <h4
              style={{
                fontSize: "15px",
                fontWeight: 600,
                marginBottom: "6px",
              }}
            >
              Description
            </h4>

            <p
              style={{
                fontSize: "14px",
                color: "#374151",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {resource.description}
            </p>
          </div>

          {/* Link */}
          {resource.link && (
            <div style={{ marginBottom: "16px" }}>
              <h4
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  marginBottom: "6px",
                }}
              >
                Link
              </h4>

              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "14px",
                  color: "#2563eb",
                  wordBreak: "break-all",
                }}
              >
                {resource.link}
              </a>
            </div>
          )}
  
          {/* File */}
          {resource.fileName && (
            <div style={{ marginBottom: "20px" }}>
              <h4
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  marginBottom: "10px",
                }}
              >
                File
              </h4>

              <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    backgroundColor: "#f9fafb",
                }}
                >
                <span
                    title={resource.fileName}
                    style={{
                    fontSize: "14px",
                    color: "#374151",
                    flex: 1,
                    }}
                >
                    {(() => {
                      const words = resource.fileName.split(/\s+/);
                      if (words.length > 3) {
                        return words.slice(0, 3).join(" ") + "...";
                      }
                      return resource.fileName;
                    })()}
                </span>

                <button
                    onClick={() =>
                    window.open(
                        `http://localhost:5000/uploads/${resource.fileName}`,
                        "_blank"
                    )
                    }
                    style={{
                    padding: "6px 10px",
                    backgroundColor: "#14b8a6",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "13px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    }}
                >
                    <FaEye size={12} />
                    Preview
                </button>
                </div>
            </div>
          )}
  
          {/* Actions */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "24px",
              borderTop: "1px solid #e5e7eb",
              paddingTop: "16px",
            }}
          >
            <button
              onClick={() => {
                onEdit(resource);
                onClose();
              }}
              style={{
                flex: 1,
                padding: "10px",
                backgroundColor: "#14b8a6",
                color: "#ffffff",
                border: "none",
                borderRadius: "12px",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Edit
            </button>

            <button
              onClick={() => {
                if (
                  confirm("Are you sure you want to delete this resource?")
                ) {
                  onDelete(resource.id);
                  onClose();
                }
              }}
              style={{
                flex: 1,
                padding: "10px",
                backgroundColor: "#ef4444",
                color: "#ffffff",
                border: "none",
                borderRadius: "12px",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      </>
    );
  }
  
  export default ResourceDetailModal;
  