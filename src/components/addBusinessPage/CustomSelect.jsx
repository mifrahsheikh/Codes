import { useState, useEffect, useRef } from "react";

const CustomSelect = ({ label, name, value, onChange, options, onBlur, error }) => {
  const [open, setOpen] = useState(false);
  const selectRef = useRef(null);

  const handleSelect = (val) => {
    onChange({ target: { name, value: val } });
    setOpen(false);
  };

  const selectedLabel = options.find((a) => a.value === value)?.label || "Select";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={selectRef}>
      <label className="block mb-1 text-gray-700 font-medium">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        onBlur={onBlur}
        className={`w-full bg-white border rounded-md px-3 py-2 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-emerald-400
          ${error ? "border-red-500" : "border-gray-300"}`}
      >
        {selectedLabel}
        <span className="ml-2">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto shadow-lg">
          {options.map((a) => (
            <li
              key={a.value}
              onClick={() => handleSelect(a.value)}
              className="px-3 py-2 hover:bg-emerald-100 cursor-pointer"
            >
              {a.label}
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default CustomSelect;