import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Toggle from "../components/Toggle";
import axios from "axios";
import { InlineSpinner } from "../components/LoadingSpinner";
import ConsentPopup from "../components/ConsentPopup";

const channelConfig = {
  agency: {
    fields: ["name", "mobile", "businessCode", "employeeCode", "consent"],
    validation: {
      businessCode: { length: 8 },
      employeeCode: { length: 7 },
      mobile: { length: 10 },
    },
  },
  pnb: {
    fields: ["name", "mobile", "employeeCode", "consent"],
    validation: { employeeCode: { length: 7 }, mobile: { length: 10 } },
  },
  jkb: {
    fields: ["name", "mobile", "employeeCode", "consent"],
    validation: { employeeCode: { length: 7 }, mobile: { length: 10 } },
  },
  kbl: {
    fields: ["name", "mobile", "employeeCode", "consent"],
    validation: { employeeCode: { length: 7 }, mobile: { length: 10 } },
  },
  psf: {
    fields: ["name", "mobile", "employeeCode", "consent"],
    validation: { employeeCode: { length: 7 }, mobile: { length: 10 } },
  },
  social_media: {
    fields: ["name", "mobile", "city", "consent"],
    validation: {
      city: {
        list: [
          "Delhi",
          "Mumbai",
          "Bangalore",
          "Chennai",
          "Hyderabad",
          "consent",
        ],
      },
      mobile: { length: 10 },
    },
  },
};

const defaultFields = ["name", "mobile", "city", "consent"];

const cityOptions = [
  "Durgapur",
  "Asansol",
  "Howrah",
  "Berhampore",
  "New Town",
  "North Dumdum",
  "Kolkata",
  "Kharagpur",
  "Haora",
  "Jamshedpur",
  "Ghaziabad",
  "Noida",
  "Sahibzada Ajit Singh Nagar",
  "Baddi",
  "Panchkula",
  "Chandigarh",
  "Delhi",
  "New Delhi",
  "Rayadurgam",
  "Secunderabad",
  "Chennai",
  "Hyderabad",
  "Coimbatore",
  "Tiruchirappalli",
  "Visakhapatnam",
  "Erode",
  "Madurai",
  "Guntur",
  "Trichy",
  "Eluru",
  "Vijayawada",
  "Rajahmundry",
  "Ibrahimpatnam",
  "Telangana",
  "Bangalore",
  "Mangalore",
  "Mysore",
  "Hubli",
  "Pimpri-Chinchwad",
  "Nashik",
  "Nagpur",
  "Jabalpur",
  "Mumbai",
  "Pune",
  "Kochi",
  "Warangal",
  "Kannur",
  "Kottayam",
  "Thrissur",
  "Kozhikode",
  "Thiruvananthapuram",
  "Kollam",
  "Alappuzha",
  "Aluva",
  "Kasargod",
  "Thiruvalla",
  "Palakkad",
  "Mavelikkara",
  "Kannamangalam Alappuzha District",
  "Alleppey",
  "Krishna",
  "Faridabad",
  "Gurgaon",
  "Gurugram",
  "Bengaluru",
  "Hubballi",
  "Mysuru",
  "Kakinada",
  "Thane",
  "Navi Mumbai",
  "Ambala",
  "Hamirpur",
  "Trivandrum",
  "Ahmedabad",
  "Indore",
  "Bhopal",
  "Rajkot",
  "Panaji",
  "Kolhapur",
  "Gwalior",
  "Baroda",
  "Gandhinagar",
  "Surat",
  "Panjim",
  "Gujarat",
  "Madhya Pradesh",
  "Patna",
  "Bihar",
  "Bhubaneshwar",
  "East Singhbhum",
  "Ranchi",
  "Contai",
  "Raipur",
  "Guwahati",
  "Gaya",
  "Deoghar",
  "Siliguri",
  "Jorhat",
  "Sambalpur",
  "Dhekorgorha",
  "Chapra",
  "Bhubaneswar",
  "Odisha",
  "Dahali",
  "Silchar",
  "Manipur",
  "Agartala",
  "Garacharma",
  "Bakultala",
  "Kamorta",
  "Baharampur",
  "Cuttack",
  "Rourkela",
  "Sonipat",
  "Prayagraj",
  "Panipat",
  "Bareilly",
  "Hisar",
  "Lucknow",
  "Karnal",
  "Gorakhpur",
  "AYODHAYA",
  "Varanasi",
  "Uttar Pradesh",
  "Kota",
  "Jaipur",
  "Agra",
  "Udaipur",
  "Jodhpur",
  "Alwar",
  "Banswara",
  "Rohtak",
  "Amritsar",
  "Anantnag",
  "Ananthnag",
  "Dehradun",
  "Himachal Pradesh",
  "Hoshiarpur",
  "Jalandhar",
  "Jammu",
  "Kanpur",
  "Kanpur Dehat",
  "Kathua",
  "Sopore",
  "Srinagar",
  "Shimla",
  "Saharanpur",
  "Kailashpur",
  "Bungal",
  "Meerut",
  "Ludhiana",
  "Pathankot",
  "Moradabad",
  "Aligarh",
  "Mathura",
  "Muzaffarnagar",
  "Allahabad",
];

function HomePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const refParam = searchParams.get("ref");
  const [referral, setReferral] = useState(refParam);
  const [selectedType, setSelectedType] = useState("businessCode");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showConsentPopup, setShowConsentPopup] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [citySearchTerm, setCitySearchTerm] = useState("");
  const [dropdownPosition, setDropdownPosition] = useState("below");
  const cityDropdownRef = useRef(null);

  useEffect(() => {
    if (refParam) {
      setReferral(refParam);
    }
  }, [refParam]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cityDropdownRef.current &&
        !cityDropdownRef.current.contains(event.target)
      ) {
        setShowCityDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    businessCode: "",
    employeeCode: "",
    city: "",
    consent: false,
  });

  const isKnownChannel = channelConfig.hasOwnProperty(referral);
  const currentChannel = isKnownChannel ? channelConfig[referral] : {};
  const fields = isKnownChannel ? currentChannel.fields : defaultFields;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }

    // Real-time validation for business code and employee code
    if (name === "businessCode" && value.length > 0) {
      if (value.length !== 8) {
        setErrors((prev) => ({
          ...prev,
          businessCode: "Business Code must be 8 digits",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          businessCode: null,
        }));
      }
    }

    if (name === "employeeCode" && value.length > 0) {
      if (value.length !== 7) {
        setErrors((prev) => ({
          ...prev,
          employeeCode: "Employee Code must be 7 digits",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          employeeCode: null,
        }));
      }
    }

    if (name === "mobile" && value.length > 0) {
      if (value.length !== 10) {
        setErrors((prev) => ({
          ...prev,
          mobile: "Mobile must be 10 digits",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          mobile: null,
        }));
      }
    }
  };

  const handleConsentClick = () => {
    setShowConsentPopup(true);
  };

  const handleConsentAccept = () => {
    setFormData((prev) => ({
      ...prev,
      consent: true,
    }));
    setShowConsentPopup(false);
  };

  const handleConsentDecline = () => {
    setFormData((prev) => ({
      ...prev,
      consent: false,
    }));
    setShowConsentPopup(false);
  };

  const handleConsentClose = () => {
    setShowConsentPopup(false);
  };

  const handleConsentChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      consent: e.target.checked,
    }));
  };

  const handleCityChange = (event) => {
    const { value } = event.target;
    setCitySearchTerm(value);
    setFormData((prevData) => ({
      ...prevData,
      city: value,
    }));
    setShowCityDropdown(true);

    // Clear error for city when user starts typing
    if (errors.city) {
      setErrors((prev) => ({
        ...prev,
        city: null,
      }));
    }
  };

  const checkDropdownPosition = () => {
    if (cityDropdownRef.current) {
      const rect = cityDropdownRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - rect.bottom;
      const spaceAbove = rect.top;

      // If there's less than 240px below (max height of dropdown), show above
      if (spaceBelow < 240 && spaceAbove > 240) {
        setDropdownPosition("above");
      } else {
        setDropdownPosition("below");
      }
    }
  };

  const handleCitySelect = (city) => {
    setFormData((prevData) => ({
      ...prevData,
      city: city,
    }));
    setCitySearchTerm(city);
    setShowCityDropdown(false);
  };

  const filteredCities = cityOptions.filter((city) =>
    city.toLowerCase().includes(citySearchTerm.toLowerCase())
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const config = isKnownChannel ? channelConfig[referral] : null;

    // Clear previous errors
    setErrors({});

    // Check required fields for current channel
    const newErrors = {};
    let hasErrors = false;

    for (const field of fields) {
      console.log(formData[field])
      if (
        // formData[field] === "" ||
        formData[field] === undefined ||
        (field === "consent" && !formData[field] || (field === "buisnessCode" && formData[field] === "" && field === "employeeCode" && formData[field] === ""))
      ) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
        hasErrors = true;
      }
    }

    console.log(hasErrors)

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    // Create clean form data by removing blank/unavailable fields
    const cleanFormData = {};

    // Only include fields that are required for current channel
    fields.forEach((field) => {
      if (formData[field] && formData[field] !== "") {
        cleanFormData[field] = formData[field];
      }
    });

    // Add channel-specific fields based on toggle state
    if (referral === "agency") {
      if (selectedType === "businessCode" && formData.businessCode) {
        cleanFormData.businessCode = formData.businessCode;
      } else if (selectedType === "employeeCode" && formData.employeeCode) {
        cleanFormData.employeeCode = formData.employeeCode;
      }
    }

    // Validation for agency with toggle
    if (referral === "agency") {
      if (
        selectedType === "businessCode" &&
        cleanFormData.businessCode &&
        cleanFormData.businessCode.length !==
          config.validation.businessCode.length
      ) {
        newErrors.businessCode = "Business Code must be 8 digits";
        hasErrors = true;
      }

      if (
        selectedType === "employeeCode" &&
        cleanFormData.employeeCode &&
        cleanFormData.employeeCode.length !==
          config.validation.employeeCode.length
      ) {
        newErrors.employeeCode = "Employee Code must be 7 digits";
        hasErrors = true;
      }

      if (
        selectedType === "mobile" &&
        cleanFormData.mobile &&
        cleanFormData.mobile.length !==
          config.validation.mobile.length
      ) {
        newErrors.mobile = "Mobile must be 10 digits";
        hasErrors = true;
      }
    } else {
      // Default validation
      if (
        config?.validation?.businessCode &&
        cleanFormData.businessCode &&
        cleanFormData.businessCode.length !==
          config.validation.businessCode.length
      ) {
        newErrors.businessCode = "Business Code must be 8 digits";
        hasErrors = true;
      }

      if (
        config?.validation?.employeeCode &&
        cleanFormData.employeeCode &&
        cleanFormData.employeeCode.length !==
          config.validation.employeeCode.length
      ) {
        newErrors.employeeCode = "Employee Code must be 7 digits";
        hasErrors = true;
      }

      if (
        config?.validation?.city &&
        cleanFormData.city &&
        !config.validation.city.list.includes(cleanFormData.city)
      ) {
        newErrors.city = "Invalid city selected";
        hasErrors = true;
      }
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    // Add metadata to clean form data
    const finalFormData = {
      ...cleanFormData,
      channel: referral,
      timestamp: new Date().toISOString(),
      selectedType: referral === "agency" ? selectedType : undefined,
    };

    setLoading(true);

    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_API_URL
        }/add-info?ref=${referral}&type=${selectedType}`,
        finalFormData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.data?._id) {
        navigate(`/calculator/${response.data._id}`);
      } else {
        setErrors({
          consent: "Please accept the terms and conditions",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      
      <div>
        <img src="/images/Hero2.png" alt="" />
      </div>

      <div className="p-[30px] pt-4">
        <div className="text-center">
          <p className="text-[20px] font-[900] text-[#6F6F6F]">
            Participate in the quiz and check how close you are to Financial
            Freedom
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-[24px] space-y-[24px]">
          {fields.includes("name") && (
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                className={`w-full px-4 py-[10px] border rounded-[4px] outline-none placeholder:text-[#8E8E8E] text-sm ${
                  errors.name ? "border-red-500" : "border-[#B9B9B9]"
                }`}
                required
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
          )}

          {fields.includes("mobile") && (
            <div>
              <input
                type="number"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="Mobile Number"
                maxLength={10}
                className={`w-full px-4 py-[10px] border rounded-[4px] outline-none placeholder:text-[#8E8E8E] text-sm ${
                  errors.mobile ? "border-red-500" : "border-[#B9B9B9]"
                }`}
                required
              />
              {errors.mobile && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.mobile}
                </p>
              )}
            </div>
          )}

          {/*Toggle shown only for agency */}
          {referral === "agency" && (
            <div className="mb-4 flex items-center">
              <label className="block text-[12px] font-medium">
                Use Employee Code
              </label>
              <Toggle
                value={selectedType === "employeeCode"}
                onChange={(isEmployeeCode) =>
                  setSelectedType(
                    isEmployeeCode ? "employeeCode" : "businessCode"
                  )
                }
                className="ml-2"
              />
            </div>
          )}

          {/* Conditional inputs for agency */}
          {referral === "agency" && selectedType === "businessCode" && (
            <div>
              <input
                type="text"
                name="businessCode"
                value={formData.businessCode}
                onChange={handleInputChange}
                placeholder="Business Code (8 digits)"
                className={`w-full px-4 py-[10px] border rounded-[4px] outline-none placeholder:text-[#8E8E8E] text-sm ${
                  errors.businessCode ? "border-red-500" : "border-[#B9B9B9]"
                }`}
                required
              />
              {errors.businessCode && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.businessCode}
                </p>
              )}
            </div>
          )}

          {referral === "agency" && selectedType === "employeeCode" && (
            <div>
              <input
                type="text"
                name="employeeCode"
                value={formData.employeeCode}
                onChange={handleInputChange}
                placeholder="Employee Code (7 digits)"
                className={`w-full px-4 py-[10px] border rounded-[4px] outline-none placeholder:text-[#8E8E8E] text-sm ${
                  errors.employeeCode ? "border-red-500" : "border-[#B9B9B9]"
                }`}
                required
              />
              {errors.employeeCode && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.employeeCode}
                </p>
              )}
            </div>
          )}

          {/* For non-agency referrals */}
          {referral !== "agency" && fields.includes("businessCode") && (
            <div>
              <input
                type="text"
                name="businessCode"
                value={formData.businessCode}
                onChange={handleInputChange}
                placeholder="Business Code (8 digits)"
                className={`w-full px-4 py-[10px] border rounded-[4px] outline-none placeholder:text-[#8E8E8E] text-sm ${
                  errors.businessCode ? "border-red-500" : "border-[#B9B9B9]"
                }`}
                required
              />
              {errors.businessCode && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.businessCode}
                </p>
              )}
            </div>
          )}

          {referral !== "agency" && fields.includes("employeeCode") && (
            <div>
              <input
                type="text"
                name="employeeCode"
                value={formData.employeeCode}
                onChange={handleInputChange}
                placeholder="Employee Code (7 digits)"
                className={`w-full px-4 py-[10px] border rounded-[4px] outline-none placeholder:text-[#8E8E8E] text-sm ${
                  errors.employeeCode ? "border-red-500" : "border-[#B9B9B9]"
                }`}
                required
              />
              {errors.employeeCode && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.employeeCode}
                </p>
              )}
            </div>
          )}

          {fields.includes("city") && (
            <div ref={cityDropdownRef} className="relative">
              <input
                type="text"
                name="city"
                value={citySearchTerm}
                onChange={handleCityChange}
                onFocus={() => {
                  setShowCityDropdown(true);
                  setTimeout(checkDropdownPosition, 0);
                }}
                placeholder="Select City"
                className={`w-full px-4 py-[10px] border rounded-[4px] outline-none placeholder:text-[#8E8E8E] text-sm ${
                  errors.city ? "border-red-500" : "border-[#B9B9B9]"
                }`}
                required
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
              )}
              {showCityDropdown && filteredCities.length > 0 && (
                <div
                  className={`absolute z-50 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto ${
                    dropdownPosition === "above"
                      ? "bottom-full mb-1"
                      : "top-full mt-1"
                  }`}
                >
                  {filteredCities.map((city) => (
                    <div
                      key={city}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleCitySelect(city)}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {fields.includes("consent") && (
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-700 flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleConsentChange}
                  required
                />
              </label>
              {errors.consent && (
                <p className="text-red-500 text-xs mt-1">{errors.consent}</p>
              )}
              <span className="mb-0.5">
                I consent to the{" "}
                <span
                  className="text-blue-400 cursor-pointer underline"
                  onClick={handleConsentClick}
                >
                  Terms and Conditions.
                </span>
              </span>
            </div>
          )}

          <div className="relative h-[44px] w-full">
            <button
              disabled={loading}
              type="submit"
              className={`absolute cursor-pointer z-10 top-0 right-1 left-0 bottom-1 border-[2px] border-[#FFFFFF] text-[#FFFFFF] font-[900] text-[20px] rounded-[4px] outline-none ${
                loading ? "bg-gray-400" : "bg-[#F67F36]"
              }`}
            >
              {loading ? <InlineSpinner size="sm" /> : "Let's get started"}
            </button>
            <div className="absolute top-1 right-0 left-1 bottom-0 bg-[#A4CE4E] rounded-[4px]" />
          </div>
        </form>
      </div>

      {/* Consent Popup */}
      <ConsentPopup
        isOpen={showConsentPopup}
        onClose={handleConsentClose}
        onAccept={handleConsentAccept}
        onDecline={handleConsentDecline}
      />
    </div>
  );
}

export default HomePage;
