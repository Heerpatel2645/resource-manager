import { FaBars } from "react-icons/fa";

function Header() {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center gap-3">
      <div className="w-9 h-9 bg-teal-500 rounded-md flex items-center justify-center text-white">
        <FaBars size={18} />
      </div>

      <div>
        <h2 className="text-lg font-semibold m-0 text-gray-900">
          Resource Manager
        </h2>
        <p className="text-[13px] text-gray-500 m-0">
          Organize your learning resources
        </p>
      </div>
    </header>
  );
}

export default Header;
