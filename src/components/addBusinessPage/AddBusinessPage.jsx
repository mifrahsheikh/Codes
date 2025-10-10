import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddBusinessMutation } from "../../api/BusinessAPI";
import Navbar from "../Navbar";
import { useFormik } from "formik";
import * as Yup from "yup";
import GeneralInformation from "./GeneralInformation";
import ContactInformation from "./ContactInformation";
import OperatingHours from "./OperatingHours";
import UploadImages from "./UploadImages";
import OptionsServices from "./OptionsServices";
import PaymentAndDelivery from "./PaymentAndDelivery";
import SocialLinks from "./SocialLinks";
import ExtraBusinessInfo from "./ExtraBusinessInfo";

const validationSchema = Yup.object({
  business_type: Yup.string().required("Business type is required"),
  industry: Yup.string().required("Industry is required"),
  custom_industry: Yup.string().when("industry", {
    is: "other",
    then: Yup.string().required("Please specify your industry"),
  }),
  name: Yup.string().required("Business name is required"),
  category: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),
  contact: Yup.string().required("Contact number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  region: Yup.string().required("Region is required"),
  open_time: Yup.string().required("Opening time is required"),
  close_time: Yup.string().required("Closing time is required"),
  images: Yup.array().min(1, "one image is required"),
});

const AddBusinessPage = () => {
  const navigate = useNavigate();
  const [addBusiness] = useAddBusinessMutation();
  const [previewImages, setPreviewImages] = useState([]);
  const [showWelcome, setShowWelcome] = useState(true);

  const formik = useFormik({
    initialValues: {
      business_type: "",
      industry: "",
      custom_industry: "",
      name: "",
      category: "",
      description: "",
      about: "",
      contact: "",
      email: "",
      website: "",
      address: "",
      city: "",
      region: "",
      open_time: "",
      close_time: "",
      promotions: "",
      eco_friendly: false,
      bookings: false,
      delivery_available: false,
      home_service: false,
      pickup_available: true,
      online_ordering: false,
      images: [],
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          if (key === "images") value.forEach((file) => formData.append("images", file));
          else if (key === "industry" && value === "other" && values.custom_industry)
            formData.append("industry", values.custom_industry);
          else if (value !== "" && value !== null && value !== undefined) formData.append(key, value);
        });
        await addBusiness(formData).unwrap();
        alert("Business added successfully!");
        navigate("/businessuser");
      } catch (err) {
        console.error(err);
        alert("Failed to add business.");
      }
    },
  });

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const newPrev = files.map((file) => URL.createObjectURL(file));
    formik.setFieldValue("images", [...(formik.values.images || []),...files,
    ]);
    setPreviewImages((prev) => [...prev, ...newPrev]);
  };
  return (
    <>
      <Navbar showSearch={false} />
      {showWelcome && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4">
          <div className="bg-emerald-50 max-w-md w-full rounded-xl p-6 shadow-lg text-center relative">
            <button className="absolute top-3 right-3 text-gray-600 font-bold text-xl" onClick={() => setShowWelcome(false)}>&times;</button>
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">Welcome, Business Owner!</h2>
            <p className="text-gray-700 mb-4">Add your business details to get listed on our platform. Include images, contact info, and a short description to make your business stand out.</p>
            <button onClick={() => setShowWelcome(false)} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded font-semibold">OK</button>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-100 pt-28 pb-12 px-6">
        <div className="max-w-7xl mx-auto bg-emerald-50 rounded-xl shadow-lg p-8 space-y-6">
          <h2 className="text-3xl font-bold text-emerald-700 text-center">Add New Business</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-10">
            <GeneralInformation formik={formik} />
            <ContactInformation formik={formik} />
            <OperatingHours formik={formik} />
            <OptionsServices formik={formik} />
            <PaymentAndDelivery formik={formik} />
            <SocialLinks formik={formik} />
            <ExtraBusinessInfo formik={formik} />
            <UploadImages formik={formik} previewImages={previewImages} handleImagesChange={handleImagesChange} />
            <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
              <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded text-white font-semibold">Save Business</button>
              <button type="button" onClick={() => navigate("/businessuser")} className="bg-gray-500 hover:bg-gray-600 px-6 py-2 rounded text-white font-semibold">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBusinessPage;