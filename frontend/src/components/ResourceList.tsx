import { useState } from "react";
import { FaBook, FaVideo, FaGraduationCap } from "react-icons/fa";
import ResourceDetailModal from "./modals/ResourceDetailModal";
import type { Resource } from "../types/Resource";

type Props = {
  resources: Resource[];
  onDelete: (id: string) => void;
  onEdit: (resource: Resource) => void;
};

function ResourceList({ resources, onDelete, onEdit }: Props) {
  const [selectedResource, setSelectedResource] =
    useState<Resource | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  function renderIcon(type: string) {
    if (type === "Article") return <FaBook size={22} />;
    if (type === "Video") return <FaVideo size={22} />;
    if (type === "Tutorial") return <FaGraduationCap size={22} />;

    return <FaBook size={22} />;
  }

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5 mt-6">
        {resources.map((resource) => {
          const isHovered = hoveredId === resource.id;

          return (
            <div
              key={resource.id}
              onMouseEnter={() => setHoveredId(resource.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`bg-white p-5 rounded-xl border border-gray-200 flex flex-col cursor-pointer transition-all duration-300 ${
                isHovered
                  ? "scale-105 shadow-[0_8px_16px_rgba(0,0,0,0.15)]"
                  : "scale-100 shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
              }`}
            >
              <div className="text-center flex-1">
                <div className="w-14 h-14 mx-auto mb-3 bg-gray-100 rounded-lg flex items-center justify-center text-teal-500">
                  {renderIcon(resource.type)}
                </div>

                <h4 className="text-base font-semibold mb-1.5 text-gray-900">
                  {resource.title}
                </h4>

                <p className="text-xs text-gray-500 m-0">
                  {resource.type}
                </p>
              </div>

              <button
                onClick={() => setSelectedResource(resource)}
                className="mt-4 px-3.5 py-2 bg-teal-500 text-white border-none rounded-lg text-sm cursor-pointer w-full"
              >
                Read More
              </button>
            </div>
          );
        })}
      </div>

      {selectedResource && (
        <ResourceDetailModal
          resource={selectedResource}
          onClose={() => setSelectedResource(null)}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </>
  );
}

export default ResourceList;
