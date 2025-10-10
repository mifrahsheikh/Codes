import React from "react";

const Section = ({ title, children }) => (
  <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm space-y-4">
    <h3 className="text-xl font-semibold text-emerald-700 border-b border-gray-200 pb-2">{title}</h3>
    {children}
  </div>
);

export default Section;