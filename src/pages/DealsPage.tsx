import { Link } from "react-router";
import Navbar from "../components/Navbar";
import DealCard from "../components/DealCard";
import { dealData, formatExpiryLabel } from "../../utils/deals";

function DealsPage() {
  return (
    <div className="pt-16 pb-24 sm:pt-20 sm:pb-28">
      <Navbar />
      <div className="mx-auto w-full max-w-3xl px-4 py-3 lg:max-w-5xl">
        <Link to="/" className="text-gray-400 hover:text-gray-600">
          {`<`} back
        </Link>
        <h1 className="mt-2 mb-4 font-medium">Deals nearby</h1>
        <div className="flex flex-col gap-3 sm:gap-4">
          {dealData.map((deal) => (
            <DealCard
              key={deal[0]}
              imageUrl={deal[3] ?? undefined}
              offerText={deal[2]}
              businessName={deal[10]}
              metaOne={deal[6]}
              metaTwo={deal[7]}
              metaThree={formatExpiryLabel(deal[18])}
              layout="vertical"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DealsPage;
