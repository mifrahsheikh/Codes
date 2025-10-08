import React from "react";
import Section from "./Section";

const SocialLinks = ({ formik }) => (
  <Section title="Social Media Links">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block font-semibold">Instagram</label>
        <input
          type="url"
          name="instagram"
          placeholder="https://instagram.com/yourpage"
          value={formik.values.instagram}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block font-semibold">Facebook</label>
        <input
          type="url"
          name="facebook"
          placeholder="https://facebook.com/yourpage"
          value={formik.values.facebook}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block font-semibold">TikTok</label>
        <input
          type="url"
          name="tiktok"
          placeholder="https://tiktok.com/@yourpage"
          value={formik.values.tiktok}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  </Section>
);

export default SocialLinks;