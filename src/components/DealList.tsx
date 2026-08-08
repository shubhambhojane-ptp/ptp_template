import DealCard from "./DealCard";
import { formatExpiryLabel, type DealRow } from "../../utils/deals";

interface DealListProps {
  deals: DealRow[];
  className?: string;
}

const DealList = ({ deals, className = "flex flex-col gap-3 sm:gap-4" }: DealListProps) => {
  return (
    <div className={className}>
      {deals.map((deal) => (
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
  );
};

export default DealList;
