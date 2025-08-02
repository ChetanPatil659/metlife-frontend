import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formatIndianCurrency, formatYearlyInvestment } from "../utils/formatters";
import { FullScreenLoader } from "../components/LoadingSpinner";



const recommendationImages=[
  {
    name: "CENTURY",
    image: "/images/recommendation/CENTURY.png",
  },
  {
    name: "FUTURE",
    image: "/images/recommendation/FUTURE.png",
  },
  {
    name: "GAIN",
    image: "/images/recommendation/GAIN.png",
  },
  {
    name: "HYBRID",
    image: "/images/recommendation/HYBRID.png",
  }
]

function SummeryPage() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);


  const fetchData = async () => {
    setLoading(true);
    try { 
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/get-recommendation?id=${id}`);
    setData(response.data.user);
    setRecommendation(response.data.recommendedPlan);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    setLoading(false);
  }
  };

  if (loading) {
    return <FullScreenLoader text="Calculating your financial freedom..." />;
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Top Header Section with Orange Gradient */}
      <div>
        <img src="/images/HeaderBg.png" style={{ width: "100%" }} alt="" />
      </div>

      {/* Main Content Area */}
      <div className="relative px-[23px]">
        <div className="w-full">
          {/* Personalized Message */}
          <div className="text-center">
            <h1 className="text-[29px] font-[900] text-black flex flex-col items-center">
              Dear {data?.name},
              <span className="text-[22px] font-light text-black leading-[30px]">
                Your goal to become Financially Independent and Retire Early
                (FIRE) is achievable with a corpus of
              </span>
            </h1>
          </div>

          {/* Financial Goal Figure */}
          <div className="text-center -mt-2">
            <div className="text-[86px] font-[900] text-[#1362A4]">
              {formatIndianCurrency(data?.retirementCorpus)}
            </div>
          </div>

          {/* Savings Requirement */}
          <div className="text-center">
            <p className="text-[17px] font-[400] text-black">
              You need to save <span className="font-[700]">{formatYearlyInvestment(data?.yearlyInvestment)}</span> per
              year to be financially independent.
            </p>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-4">
            <p className="text-[17px] font-[400] text-black">
              PNB MetLife can help you build the corpus – start today and move
              closer to your dream.
            </p>
          </div>

          {/* Separator */}
          <div className="flex justify-center my-5">
            <div className="w-[263px] h-px bg-[#1362A4]"></div>
          </div>

          {/* Suggested Plans Section */}
          <div className="space-y-2">
            <h3 className="text-[20px] font-[400] text-black text-left">
              Suggested plans for you
            </h3>

            <div className="grid grid-cols-2 gap-4 items-center">
              {
                recommendation?.map((item, index) => (
                  <div key={index}>
                    <img src={recommendationImages.find(image => image.name == item)?.image} alt="" className="w-full" />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Illustration Section */}
      <div className="-mt-10">
        <img src="/images/Hero.png" style={{ width: "100%" }} alt="" />
      </div>
    </div>
  );
}

export default SummeryPage;
