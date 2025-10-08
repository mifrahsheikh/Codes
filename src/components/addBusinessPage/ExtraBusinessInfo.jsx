import React from "react";
import Section from "./Section";

const ExtraBusinessInfo = ({ formik }) => (
  <Section title="Additional Business Information">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="col-span-2">
        <label className="block font-semibold">Promotions</label>
        <input
          type="text"
          name="promotions"
          placeholder="e.g., 20% off on weekends"
          value={formik.values.promotions}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="col-span-2">
        <label className="block font-semibold">About / Background</label>
        <textarea
          name="about"
          placeholder="Tell customers more about your business..."
          value={formik.values.about}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded min-h-[100px]"
        />
      </div>
    </div>
  </Section>
);

export default ExtraBusinessInfo;