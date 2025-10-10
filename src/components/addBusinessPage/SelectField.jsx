import React from "react";

const SelectField = ({ name, value, onChange, onBlur, options, error }) => (
  <div className="w-full">
    <select
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={`w-full px-3 py-2 rounded-md border bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400 outline-none transition
        ${error ? "border-red-500" : "border-gray-300"}`}
    >
      {options.map((opt, index) => (
        <option key={index} value={opt.value}>{opt.label}</option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default SelectField;