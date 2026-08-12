import { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import Navbar from "../components/Navbar";
import DealList from "../components/DealList";
import { dealData } from "../../utils/deals";

function DealsPage() {
  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get("highlight");

  useEffect(() => {
    if (!highlightId) return;
    document
      .getElementById(`deal-${highlightId}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [highlightId]);

  return (
    <div className="pt-16 pb-24 sm:pt-20 sm:pb-28">
      <Navbar />
      <div className="mx-auto w-full max-w-3xl px-4 py-3 lg:max-w-5xl">
        <Link to="/" className="text-gray-400 hover:text-gray-600">
          {`<`} back
        </Link>
        <h1 className="mt-2 mb-4 font-medium">Deals nearby</h1>
        <DealList deals={dealData} highlightId={highlightId} />
      </div>
    </div>
  );
}

export default DealsPage;
