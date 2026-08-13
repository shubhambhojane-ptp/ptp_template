import { Link } from "react-router";
import Navbar from "../components/Navbar";
import EventList from "../components/EventList";
import { eventData } from "../../utils/events";
import useInfiniteList from "../hooks/useInfiniteList";

const PAGE_SIZE = 3;

function EventsPage() {
  const { visibleItems, hasMore, isLoadingMore, sentinelRef } = useInfiniteList(
    eventData,
    PAGE_SIZE,
  );

  return (
    <div className="pt-16 pb-24 sm:pt-20 sm:pb-28">
      <Navbar />
      <div className="mx-auto w-full max-w-3xl px-4 py-3 lg:max-w-5xl">
        <Link to="/" className="text-gray-400 hover:text-gray-600">
          {`<`} back
        </Link>
        <h1 className="mt-2 mb-4 font-medium">Events nearby</h1>
        <EventList events={visibleItems} />
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

export default EventsPage;
