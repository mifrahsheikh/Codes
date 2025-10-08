import React from 'react'

const Input = ({ name, type = "text", value, onChange, onBlur, placeholder, error }) => (
  <div className="w-full">
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      className={`w-full px-3 py-2 rounded-md border focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400 outline-none transition
        ${error ? "border-red-500" : "border-gray-300"}`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default Input;