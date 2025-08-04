import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  formatIndianCurrency,
  formatYearlyInvestment,
} from "../utils/formatters";
import { FullScreenLoader, InlineSpinner } from "../components/LoadingSpinner";
import { DISCLAIMER } from "../utils/constant";

const recommendationImages = [
  {
    name: "CENTURY",
    image: "/images/recommendation/CENTURY.png",
  },
  {
    name: "MGFP",
    image: "/images/recommendation/FUTURE.png",
  },
  {
    name: "GAIN",
    image: "/images/recommendation/GAIN.png",
  },
  {
    name: "HYBRID",
    image: "/images/recommendation/HYBRID.png",
  },
];

function SummeryPage() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adf, setAdf] = useState(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/get-recommendation?id=${id}`
      );
      setData(response.data.user);
      setRecommendation(response.data.recommendedPlan);
      switch (response?.data?.user?.channel) {
        case "agency":
          setAdf(445);
          break;
        case "pnb":
        case "social_media":
        case "psf":
          setAdf(444);
          break;
        case "jkb":
        case "kbl":
          setAdf(443);
          break;
        default:
          setAdf(444);
          break;
      }
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
            <h1 className="text-[29px] font-[600] leading-[40px] text-black flex flex-col items-center">
              Dear {data?.name},
              <br />
              <span className="text-[18px] font-[400] text-black leading-[20px]">
                Your goal to become <br /> Financially Independent and Retire
                Early <br />
                (FIRE) is achievable with a corpus of
              </span>
            </h1>
          </div>

          {/* Financial Goal Figure */}
          <div className="text-center mt-1">
            <div className="font-[900] text-[#1362A4] gap-1">
              <h1 className="flex whitespace-nowrap md:text-7xl text-6xl items-center justify-center">
                {formatIndianCurrency(data?.retirementCorpus)}
                <svg
                  width="30"
                  className="-mt-2"
                  height="80"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <text x="0" y="15" fontSize="30" fontFamily="serif">
                    ”
                  </text>
                </svg>
              </h1>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-4">
            <p className="text-[18px] font-[400] text-black leading-[20px]">
              PNB MetLife can help you build the corpus <br /> start today and
              move closer to your dream.
            </p>
          </div>

          {/* Separator */}
          <div className="flex justify-center my-5 mt-3">
            <div className="w-[263px] h-px bg-[#1362A4]"></div>
          </div>

          {/* Suggested Plans Section */}
          <div className="space-y-4">
            <h3 className="text-[19px] font-[400] text-center text-black">
              Suggested Life Insurance plans for you
            </h3>

            <div className="flex gap-2 px-8 items-center justify-center">
              {recommendation?.map((item, index) => (
                <div key={index} className="mx-auto w-[150px]">
                  <img
                    src={
                      recommendationImages.find((image) => image.name == item)
                        ?.image
                    }
                    alt=""
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-[44px] w-full mt-5 max-w-[250px] mx-auto">
        <Link
          disabled={loading}
          to={"https://www.pnbmetlife.com/"}
          target="_blank"
          className={`absolute text-center cursor-pointer z-10 top-0 right-1 left-0 bottom-1 border-[2px] border-[#FFFFFF] bg-[#F67F36] text-[#FFFFFF] font-[900] text-[20px] rounded-[4px] outline-none`}
        >
          Know More
        </Link>
        <div className="absolute top-1 right-0 left-1 bottom-0 bg-[#A4CE4E] rounded-[4px]" />
      </div>

      {/* Bottom Illustration Section */}
      <div className="-mt-20">
        <img src="/images/Hero.png" style={{ width: "100%" }} alt="" />
      </div>

      {/* Disclaimer Section */}
      <div className="px-[23px] py-2 pt-4 text-[7px] text-gray-600">
        *{DISCLAIMER[data?.channel]}
      </div>

      {/* Warning Section */}
      <div className="mx-6 mb-3 p-0.5 px-1 border border-zinc-500">
        <div className="text-start">
          <h3 className="text-[8px] font-bold text-gray-600">
            BEWARE OF SPURIOUS PHONE CALLS AND FICTITOUS/FRAUDULENT OFFERS!
          </h3>
          <p className="text-[8px] text-zinc-700 leading-[10px]">
            IRDAI or its officials do not engage in activities like selling
            insurance policies, announcing bonuses, or investment of premiums.
            The public is requested to lodge a police complaint if they receive
            such phone calls.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SummeryPage;
