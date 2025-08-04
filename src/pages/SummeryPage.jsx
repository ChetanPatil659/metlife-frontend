import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  formatIndianCurrency,
  formatYearlyInvestment,
} from "../utils/formatters";
import { FullScreenLoader, InlineSpinner } from "../components/LoadingSpinner";

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
          <div className="text-center -mt-2">
            <div className="text-[86px] font-[900] text-[#1362A4] flex items-center justify-center gap-1">
              {formatIndianCurrency(data?.retirementCorpus)}
              <svg width="30" className="-mt-2" height="80" viewBox="0 0 20 20" fill="currentColor">
                <text x="0" y="15" fontSize="30" fontFamily="serif">
                  ”
                </text>
              </svg>
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
      <div className="px-[23px] py-2 pt-4 text-[8px] text-gray-600">
        *The Linked Insurance Product does not offer any liquidity during the
        first five years of the contract. The policyholder will not be able to
        surrender or withdraw the monies invested in linked insurance products
        completely or partially till the end of the fifth year. PNB MetLife
        Hybrid is a combination of two individual products: (1) PNB MetLife
        Grand Assured Income Plan - An Individual, Non-Linked,
        Non-Participating, Deferred Annuity Product (UIN: 117N134V06) and (2)
        PNB MetLife Smart Platinum Plus - An Individual, Unit Linked,
        Non-Participating, Life Insurance Plan (UIN: 117L125V06). These products
        can also be purchased individually. Customer is advised to refer to the
        detailed sales brochure of respective individual products before
        concluding a sale. PNB MetLife Grand Assured Income Plan (UIN:
        117N134V06). Product recommendations are part of our campaign based on
        assumed 6% inflation and average life expectancy of 75 years. These are
        for illustration purposes and financial awareness only and should not be
        construed as investment advice or substitute for financial planning. PNB
        MetLife India Insurance does not guarantee any returns under any of its
        products. For detailed information on products and benefits, please
        visit www.pnbmetlife.com i.Linked insurance products differ from
        traditional insurance products and are subject to risk factors. ii.
        Premiums in linked insurance policies are subject to investment risks
        associated with capital markets and publicly available indices. The Net
        Asset Values (NAVs) of units may fluctuate based on fund performance and
        market factors, and the insured is responsible for their decisions. iii.
        "PNB MetLife India Insurance Company Ltd" is the name of the Life
        Insurance Company, and "PNB MetLife Smart Platinum Plus Plan" is the
        name of the linked insurance contract. These names do not indicate the
        quality, future prospects, or returns of the contract. iv. Customers
        should be aware of associated risks and applicable charges, obtainable
        from their insurance agent, intermediary, or the policy document. v. The
        names of the various funds offered under the contract do not indicate
        the quality, future prospects, or returns of these plans. Past
        performance of the funds is not indicative of future performance.
        Registered Office Address: Unit No. 701, 702 & 703, 7th Floor, West
        Wing, Raheja Towers, 26/27 MG Road, Bangalore-560001, Karnataka. IRDAI
        Registration Number: 117 CIN No: U66010KA2001PLC028883 The marks "PNB"
        and "MetLife" are registered trademarks of Punjab National Bank and
        Metropolitan Life Insurance Company, respectively. PNB MetLife India
        Insurance Company Limited is a licensed user of these marks. Toll-free
        Number: 1-800-425-6969 Website: www.pnbmetlife.com Email:
        indiaservice@pnbmetlife.co.in Postal Address: 1st Floor, Techniplex -1,
        Techniplex Complex, Opp Veer Savarkar Flyover, Goregaon (West),
        Mumbai-400062, Maharashtra. Document Reference: AD-F/2025-26/{adf}
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
