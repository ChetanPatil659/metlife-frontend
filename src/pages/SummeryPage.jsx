import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  formatIndianCurrency,
  formatYearlyInvestment,
} from "../utils/formatters";
import { FullScreenLoader } from "../components/LoadingSpinner";

const recommendationImages = [
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
  },
];

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
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/get-recommendation?id=${id}`
      );
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
              <span className="text-[18px] font-light text-black leading-[30px]">
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
          <div className="space-y-5">
            <h3 className="text-[20px] font-[400] text-black text-left">
              Suggested plans for you
            </h3>

            <div className="grid grid-cols-2 gap-4 items-center">
              {recommendation?.map((item, index) => (
                <div key={index}>
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

      {/* Bottom Illustration Section */}
      <div className="-mt-10">
        <img src="/images/Hero.png" style={{ width: "100%" }} alt="" />
      </div>

      {/* Disclaimer Section */}
      <div className="px-[23px] py-4 text-[8px] text-gray-600">
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
        Mumbai-400062, Maharashtra. Document Reference: AD-F/2025-26/444
      </div>

      {/* Warning Section */}
      <div className="mx-6 mb-3 p-3 border border-black">
        <div className="text-center">
          <h3 className="text-[10px] font-bold text-gray-600 mb-2">
            BEWARE OF SPURIOUS PHONE CALLS AND FICTITOUS/FRAUDULENT OFFERS!
          </h3>
          <p className="text-[8px] text-black">
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
