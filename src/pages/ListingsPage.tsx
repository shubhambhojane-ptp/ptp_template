import { Link } from "react-router";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import {
  listingData,
  formatListingPriceLabel,
  formatWatchersLabel,
} from "../../utils/listings";

function ListingsPage() {
  return (
    <div className="pt-16 pb-24 sm:pt-20 sm:pb-28">
      <Navbar />
      <div className="mx-auto w-full max-w-3xl px-4 py-3 lg:max-w-5xl">
        <Link to="/" className="text-gray-400 hover:text-gray-600">
          {`<`} back
        </Link>
        <h1 className="mt-2 mb-4 font-medium">Listings nearby</h1>
        <div className="flex flex-col gap-3 sm:gap-4">
          {listingData.map((listing) => (
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
      </div>
    </div>
  );
}

export default ListingsPage;
