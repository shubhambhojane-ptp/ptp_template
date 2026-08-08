import ListingCard from "./ListingCard";
import {
  formatListingPriceLabel,
  formatWatchersLabel,
  type ListingRow,
} from "../../utils/listings";

interface ListingListProps {
  listings: ListingRow[];
  className?: string;
}

const ListingList = ({ listings, className = "grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3" }: ListingListProps) => {
  return (
    <div className={className}>
      {listings.map((listing) => (
        <ListingCard
          key={listing[0]}
          imageUrl={listing[6] ?? undefined}
          itemName={listing[2]}
          priceLabel={formatListingPriceLabel(listing[3], listing[4])}
          metaOne={listing[5]}
          metaTwo={listing[10]}
          metaThree={formatWatchersLabel(listing[18])}
          layout="vertical"
        />
      ))}
    </div>
  );
};

export default ListingList;
