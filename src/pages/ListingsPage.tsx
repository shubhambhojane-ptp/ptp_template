import { Link } from "react-router";
import Navbar from "../components/Navbar";
import ListingList from "../components/ListingList";
import { listingData } from "../../utils/listings";

function ListingsPage() {
  return (
    <div className="pt-16 pb-24 sm:pt-20 sm:pb-28">
      <Navbar />
      <div className="mx-auto w-full max-w-3xl px-4 py-3 lg:max-w-5xl">
        <Link to="/" className="text-gray-400 hover:text-gray-600">
          {`<`} back
        </Link>
        <h1 className="mt-2 mb-4 font-medium">Listings nearby</h1>
        <ListingList listings={listingData} />
      </div>
    </div>
  );
}

export default ListingsPage;
