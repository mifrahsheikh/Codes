import React from "react";
import Section from "./Section";

const PaymentAndDelivery = ({ formik }) => (
  <Section title="Payment & Delivery">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block font-semibold">Payment Methods</label>
        <input
          type="text"
          name="payment_methods"
          placeholder="e.g., Cash, Credit Card, JazzCash"
          value={formik.values.payment_methods}
          onChange={(e) =>
            formik.setFieldValue(
              "payment_methods",
              e.target.value.split(",").map((m) => m.trim())
            )
          }
          className="w-full p-2 border rounded"
        />
        <small className="text-gray-500">Separate methods by commas.</small>
      </div>

      <div>
        <label className="block font-semibold">Delivery Fee (PKR)</label>
        <input
          type="number"
          name="delivery_fee"
          value={formik.values.delivery_fee}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block font-semibold">Delivery Radius (km)</label>
        <input
          type="number"
          name="delivery_radius_km"
          value={formik.values.delivery_radius_km}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  </Section>
);

export default PaymentAndDelivery;