import React from "react";
import Input from "./Input";
import Section from "./Section";

const ContactInformation = ({ formik }) => (
  <Section title="Contact Information">
    <Input name="contact" placeholder="Contact Number" value={formik.values.contact} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.contact && formik.errors.contact} />
    <Input name="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.email && formik.errors.email} />
    <Input name="address" placeholder="Address" value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.address && formik.errors.address} />
    <div className="grid grid-cols-2 gap-4">
      <Input name="city" placeholder="City" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.city && formik.errors.city} />
      <Input name="region" placeholder="Region / Province" value={formik.values.region} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.region && formik.errors.region} />
    </div>
  </Section>
);

export default ContactInformation;