import Input from "./Input";
import SelectField from "./SelectField";
import CustomSelect from "./CustomSelect";

const INDUSTRY_OPTIONS = [
    { value: "", label: "Select Industry" },
    { value: "restaurant", label: "Restaurant" },
    { value: "cafe", label: "Cafe" },
    { value: "bakery", label: "Bakery" },
    { value: "fast_food", label: "Fast Food" },
    { value: "clothing_store", label: "Clothing / Retail" },
    { value: "grocery", label: "Grocery" },
    { value: "electronics", label: "Electronics" },
    { value: "bookstore", label: "Bookstore" },
    { value: "salon_spa", label: "Salon / Spa" },
    { value: "consulting", label: "Consulting" },
    { value: "accounting", label: "Accounting" },
    { value: "marketing", label: "Marketing" },
    { value: "real_estate", label: "Real Estate" },
    { value: "gym", label: "Gym / Fitness" },
    { value: "yoga_studio", label: "Yoga Studio" },
    { value: "clinic", label: "Clinic" },
    { value: "pharmacy", label: "Pharmacy" },
    { value: "art_gallery", label: "Art Gallery" },
    { value: "music_school", label: "Music School" },
    { value: "cinema", label: "Cinema" },
    { value: "online_course", label: "Online Course Provider" },
    { value: "startup", label: "Startup" },
    { value: "software_company", label: "Software Company" },
    { value: "other", label: "Other" },
];

const Textarea = ({ name, value, onChange, onBlur, placeholder, error }) => (
    <div className="w-full">
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            className={`w-full px-3 py-2 rounded-md border focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400 outline-none h-28 resize-none transition
        ${error ? "border-red-500" : "border-gray-300"}`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);

const GeneralInformation = ({ formik }) => (
    <div className="p-6 rounded-xl bg-white border-gray-200 shadow-sm space-y-4">
        <h3 className="text-xl font-semibold text-emerald-700 border-b border-gray-200 pb-2">General Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField
                name="business_type"
                value={formik.values.business_type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                options={[
                    { value: "", label: "Select Type" },
                    { value: "home", label: "Home Based" },
                    { value: "online", label: "Online" },
                    { value: "main", label: "Main Store" },
                    { value: "local", label: "Local Business" },
                    { value: "franchise", label: "Franchise" },
                    { value: "pop_up", label: "Pop-Up Shop" },
                ]}
                error={formik.touched.business_type && formik.errors.business_type}
            />
            <Input
                name="name"
                placeholder="Business Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && formik.errors.name}
            />
            <Input
                name="category"
                placeholder="Category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.category && formik.errors.category}
            />
            <Input
                name="website"
                placeholder="Website (optional)"
                value={formik.values.website}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
        </div>

        <CustomSelect
            label="Industry"
            name="industry"
            value={formik.values.industry}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            options={INDUSTRY_OPTIONS}
            error={formik.touched.industry && formik.errors.industry}
        />

        {formik.values.industry === "other" && (
            <Input
                name="custom_industry"
                placeholder="Please specify your industry"
                value={formik.values.custom_industry}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.custom_industry && formik.errors.custom_industry}
            />
        )}

        <Textarea
            name="description"
            placeholder="Short Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && formik.errors.description}
        />

        <Textarea
            name="about"
            placeholder="About the Business"
            value={formik.values.about}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
        />
    </div>
);

export default GeneralInformation;