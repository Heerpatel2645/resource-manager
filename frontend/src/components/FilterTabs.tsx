import { useState, useRef, useEffect } from "react";
import { FaFilter, FaBook, FaVideo, FaGraduationCap, FaSearch } from "react-icons/fa";
import type { Resource } from "../types/Resource";

type Props = {
  active: string;
  onChange: (value: string) => void;
  resources: Resource[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
};

function FilterTabs({
  active,
  onChange,
  resources,
  searchQuery,
  onSearchChange,
}: Props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function getCount(type: string) {
    if (type === "All") return resources.length;
    return resources.filter((r) => r.type === type).length;
  }

  const filterOptions = [
    { label: "Articles", icon: FaBook, value: "Article" },
    { label: "Videos", icon: FaVideo, value: "Video" },
    { label: "Tutorials", icon: FaGraduationCap, value: "Tutorial" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  function getActiveLabel() {
    if (active === "All") return "All";
    const option = filterOptions.find((opt) => opt.value === active);
    return option ? option.label : "All";
  }

  return (
    <div className="flex gap-3 items-center flex-wrap">
      <button
        onClick={() => onChange("All")}
        className={`px-3.5 py-1.5 rounded-2xl cursor-pointer flex items-center gap-1.5 text-sm ${
          active === "All"
            ? "bg-teal-500 text-white border-none"
            : "bg-white text-gray-700 border border-gray-200"
        }`}
      >
        <span>All</span>
        <span className="text-xs opacity-70">{getCount("All")}</span>
      </button>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown((prev) => !prev)}
          className={`px-3.5 py-1.5 rounded-2xl flex items-center gap-1.5 text-sm cursor-pointer ${
            active === "All"
              ? "bg-white text-gray-700 border border-gray-200"
              : "bg-teal-500 text-white border-none"
          }`}
        >
          <FaFilter size={14} />
          <span>{getActiveLabel()}</span>
          {active !== "All" && (
            <span className="text-xs opacity-70">
              {getCount(active)}
            </span>
          )}
        </button>

        {showDropdown && (
          <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-[10px] min-w-[160px] z-[1000]">
            {filterOptions.map((option) => {
              const Icon = option.icon;
              const isActive = active === option.value;
              const count = getCount(option.value);

              return (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setShowDropdown(false);
                  }}
                  className={`w-full py-2.5 px-3.5 flex items-center gap-2 border-none text-sm cursor-pointer text-left ${
                    isActive
                      ? "bg-gray-100 text-teal-500"
                      : "bg-transparent text-gray-700"
                  }`}
                >
                  <Icon size={14} />
                  <span className="flex-1">{option.label}</span>
                  <span className="text-xs opacity-70">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="ml-auto relative">
        <FaSearch
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 pr-3.5 py-1.5 rounded-2xl border border-gray-200 text-sm w-[200px] outline-none"
        />
      </div>
    </div>
  );
}

export default FilterTabs;
