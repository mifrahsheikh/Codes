import React from "react";
import Input from "./Input";
import Section from "./Section";

const OperatingHours = ({ formik }) => (
  <Section title="Operating Hours">
    <div className="grid grid-cols-2 gap-4">
      <Input type="time" name="open_time" value={formik.values.open_time} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.open_time && formik.errors.open_time} />
      <Input type="time" name="close_time" value={formik.values.close_time} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.close_time && formik.errors.close_time} />
    </div>
  </Section>
);

export default OperatingHours;