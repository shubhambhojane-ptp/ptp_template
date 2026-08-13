import { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import Navbar from "../components/Navbar";
import ListingList from "../components/ListingList";
import { listingData } from "../../utils/listings";
import useInfiniteList from "../hooks/useInfiniteList";

const PAGE_SIZE = 3;

function ListingsPage() {
  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get("highlight");

  // If we came here from an Activity click (?highlight=<id>), the target card
  // must already be rendered for the scrollIntoView effect below to find it —
  // so the first batch has to reach past that card's index, not just PAGE_SIZE.
  const highlightIndex = highlightId
    ? listingData.findIndex((listing) => listing[0] === highlightId)
    : -1;
  const initialCount =
    highlightIndex >= 0 ? highlightIndex + 1 + PAGE_SIZE : PAGE_SIZE;

  const { visibleItems, hasMore, isLoadingMore, sentinelRef } = useInfiniteList(
    listingData,
    PAGE_SIZE,
    initialCount,
  );

  useEffect(() => {
    if (!highlightId) return;
    document
      .getElementById(`listing-${highlightId}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [highlightId]);

  return (
    <div className="pt-16 pb-24 sm:pt-20 sm:pb-28">
      <Navbar />
      <div className="mx-auto w-full max-w-3xl px-4 py-3 lg:max-w-5xl">
        <Link to="/" className="text-gray-400 hover:text-gray-600">
          {`<`} back
        </Link>
        <h1 className="mt-2 mb-4 font-medium">Listings nearby</h1>
        <ListingList listings={visibleItems} highlightId={highlightId} />
        {/* Scrolling this row into view triggers the next batch (see useInfiniteList) */}
        {hasMore && (
          <div ref={sentinelRef} className="py-4 text-center text-sm text-gray-400">
            {isLoadingMore && "Loading more..."}
          </div>
        )}
      </div>
    </div>
  );
}

export default ListingsPage;
