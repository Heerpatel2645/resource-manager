type Props = {
  active: string;
  onChange: (value: string) => void;
};

function FilterTabs({ active, onChange }: Props) {
  const tabs = ["All", "Article", "Video", "Tutorial"];

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          style={{
            padding: "8px 14px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            background: active === tab ? "#14b8a6" : "#fff",
            color: active === tab ? "#fff" : "#000",
            cursor: "pointer",
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default FilterTabs;
