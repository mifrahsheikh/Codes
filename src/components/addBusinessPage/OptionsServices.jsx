import React from "react";
import Section from "./Section";
import Input from "./Input";

const OptionsServices = ({ formik }) => {
  const ToggleField = ({ name, label }) => (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        name={name}
        checked={formik.values[name]}
        onChange={formik.handleChange}
        className="w-5 h-5 rounded-full accent-emerald-600"
      />
      <span className="text-gray-700">{label}</span>
    </label>
  );

  return (
    <Section title="Options & Services">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ToggleField name="eco_friendly" label="Eco-Friendly" />
        <ToggleField name="bookings" label="Bookings Available" />
        <ToggleField name="delivery_available" label="Delivery Available" />
        <ToggleField name="home_service" label="Home Service" />
        <ToggleField name="pickup_available" label="Pickup Available" />
        <ToggleField name="online_ordering" label="Online Ordering" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Input
          label="Delivery Fee (PKR)"
          name="delivery_fee"
          type="number"
          placeholder="e.g. 150"
          formik={formik}
        />
        <Input
          label="Delivery Radius (km)"
          name="delivery_radius_km"
          type="number"
          placeholder="e.g. 5"
          formik={formik}
        />
      </div>
      <div className="mt-6">
        <label className="block text-gray-700 font-semibold mb-2">
          Payment Methods
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {["Cash", "Credit Card", "Bank Transfer", "EasyPaisa", "JazzCash", "PayPal"].map((method) => (
            <label key={method} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="payment_methods"
                value={method}
                checked={formik.values.payment_methods?.includes(method) || false}
                onChange={(e) => {
                  const { checked, value } = e.target;
                  const newMethods = checked
                    ? [...(formik.values.payment_methods || []), value]
                    : formik.values.payment_methods.filter((m) => m !== value);
                  formik.setFieldValue("payment_methods", newMethods);
                }}
                className="w-5 h-5 accent-emerald-600 rounded"
              />
              <span className="text-gray-700">{method}</span>
            </label>
          ))}
        </div>
      </div>

    </Section>
  );
};

export default OptionsServices;