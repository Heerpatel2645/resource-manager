import { FaFolderOpen } from "react-icons/fa";

function EmptyState() {
  return (
    <div className="text-center mt-[100px] py-8 px-4">
      <div className="w-24 h-24 mx-auto mb-5 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
        <FaFolderOpen size={48} color="#9ca3af" />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-1.5">
        No resources yet
      </h3>

      <p className="text-sm text-gray-500 max-w-[360px] mx-auto">
        Start building your learning library by adding your first article,
        video, or tutorial.
      </p>
    </div>
  );
}

export default EmptyState;
