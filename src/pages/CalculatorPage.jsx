import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SliderInput from "../components/SliderInput";
import axios from "axios";
import { InlineSpinner } from "../components/LoadingSpinner";

function CalculatorPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { id: idParam } = useParams();
  const [id, setId] = useState(idParam);

  useEffect(() => {
    setId(idParam);
  }, [idParam]);

  const [formData, setFormData] = useState({
    currentAge: 25,
    retirementAge: 60,
    monthlyExpense: 50000,
  });

  const handleSliderChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProceed = async () => {
    setLoading(true);

    const data = {
      age: formData.currentAge,
      retirementAge: formData.retirementAge,
      monthlyExpense: formData.monthlyExpense,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/add-quiz?id=${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate(`/result/${response.data._id}`);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Top Header Section with Orange Gradient */}

      <div className="w-full">
        <img src="/images/HeaderBg.png" style={{ width: "100%" }} alt="" />

        <div className="flex px-[44px] py-[10px] -mt-[24px] items-center gap-2 justify-between">
          <div
            className="cursor-pointer h-[30px] pt-0.5 w-[30px] flex items-center justify-center"
            onClick={() => navigate(-1)}
          >
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.292892 8.70711C-0.0976315 8.31658 -0.0976315 7.68342 0.292892 7.29289L6.65685 0.928932C7.04738 0.538408 7.68054 0.538408 8.07107 0.928932C8.46159 1.31946 8.46159 1.95262 8.07107 2.34315L2.41421 8L8.07107 13.6569C8.46159 14.0474 8.46159 14.6805 8.07107 15.0711C7.68054 15.4616 7.04738 15.4616 6.65685 15.0711L0.292892 8.70711ZM17 8V9H1V8V7H17V8Z"
                fill="#878787"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-[20px] font-[900] text-[#606263]">
              Fire Score Calculator
            </h1>
          </div>
          <div />
        </div>
      </div>

      {/* Form Section */}
      <div className="relative z-10 px-[60px] pt-[14px]">
        <div className="w-full space-y-[50px]">
          {/* Current Age Slider */}
          <SliderInput
            label="1. Your current age (years)?"
            value={formData.currentAge}
            min={18}
            max={80}
            onChange={(value) => handleSliderChange("currentAge", value)}
          />

          {/* Retirement Age Slider */}
          <SliderInput
            label="2. Your planned retirement age (years)?"
            value={formData.retirementAge}
            min={40}
            max={80}
            onChange={(value) => handleSliderChange("retirementAge", value)}
          />

          {/* Monthly Expense Slider */}
          <SliderInput
            label="3. Your monthly expense?"
            value={formData.monthlyExpense}
            min={10000}
            max={200000}
            step={5000}
            prefix="₹"
            formatNumber={true}
            onChange={(value) => handleSliderChange("monthlyExpense", value)}
          />

          {/* Proceed Button */}
          <div className="px-6 pt-4">
            <div className="relative h-[44px] w-full">
              <button
                disabled={loading}
                onClick={handleProceed}
                className={`absolute cursor-pointer z-10 top-0 right-1 left-0 bottom-1 border-[2px] border-[#FFFFFF] text-[#FFFFFF] font-[900] text-[20px] rounded-[4px] outline-none ${
                  loading ? 'bg-gray-400' : 'bg-[#F67F36]'
                }`}
              >
                {loading ? (
                  <InlineSpinner size="sm" />
                ) : (
                  "Proceed"
                )}
              </button>
              <div className="absolute top-1 right-0 left-1 bottom-0 bg-[#A4CE4E] rounded-[4px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Background with Illustrations */}

      <div className="relative">
        <div className="absolute -top-18 left-0 right-0">
          <img src="/images/TreesBg.png" style={{ width: "100%" }} alt="" />
        </div>

        <div className="absolute top-0 left-0 w-full h-full">
          <img src="/images/Trees.png" style={{ width: "100%" }} alt="" />
        </div>
      </div>

      <div className="absolute -bottom-6 right-0">
        <img src="/images/fotterBg.png" style={{ width: "100%" }} alt="" />
      </div>
    </div>
  );
}

export default CalculatorPage;
