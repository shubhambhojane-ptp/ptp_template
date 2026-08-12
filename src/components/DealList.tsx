import { twMerge } from "tailwind-merge";
import DealCard from "./DealCard";
import { formatExpiryLabel, type DealRow } from "../../utils/deals";

interface DealListProps {
  deals: DealRow[];
  className?: string;
  highlightId?: string | null;
}

const DealList = ({ deals, className = "grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3", highlightId }: DealListProps) => {
  return (
    <div className={className}>
      {deals.map((deal) => (
        <DealCard
          key={deal[0]}
          id={`deal-${deal[0]}`}
          imageUrl={deal[3] ?? undefined}
          offerText={deal[2]}
          businessName={deal[10]}
          metaOne={deal[6]}
          metaTwo={deal[7]}
          metaThree={formatExpiryLabel(deal[18])}
          layout="vertical"
          className={twMerge(deal[0] === highlightId && "ring-2 ring-blue-400")}
        />
      ))}
    </div>
  );
};

export default DealList;
