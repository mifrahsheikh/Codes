import React from "react";
import Section from "./Section";

const UploadImages = ({ formik, previewImages, setPreviewImages, handleImagesChange }) => (
  <Section title="Upload Images">
    <input
      type="file"
      multiple
      accept="image/*"
      onChange={handleImagesChange}
      className="border p-2 rounded"
    />
    <div className="flex gap-4 mt-4 flex-wrap">
      {previewImages.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`Preview ${idx}`}
          className="w-24 h-24 object-cover rounded border"
        />
      ))}
    </div>
  </Section>
);

export default UploadImages;