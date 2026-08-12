import { twMerge } from "tailwind-merge";
import ListingCard from "./ListingCard";
import {
  formatListingPriceLabel,
  formatWatchersLabel,
  type ListingRow,
} from "../../utils/listings";

interface ListingListProps {
  listings: ListingRow[];
  className?: string;
  highlightId?: string | null;
}

const ListingList = ({ listings, className = "grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3", highlightId }: ListingListProps) => {
  return (
    <div className={className}>
      {listings.map((listing) => (
        <ListingCard
          key={listing[0]}
          id={`listing-${listing[0]}`}
          imageUrl={listing[6] ?? undefined}
          itemName={listing[2]}
          priceLabel={formatListingPriceLabel(listing[3], listing[4])}
          metaOne={listing[5]}
          metaTwo={listing[10]}
          metaThree={formatWatchersLabel(listing[18])}
          layout="vertical"
          className={twMerge(listing[0] === highlightId && "ring-2 ring-blue-400")}
        />
      ))}
    </div>
  );
};

export default ListingList;
