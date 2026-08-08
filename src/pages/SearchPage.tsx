import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import DealList from "../components/DealList";
import EventList from "../components/EventList";
import ListingList from "../components/ListingList";
import coneIcon from "../assets/cone.svg";
import alertIcon from "../assets/alert.svg";
import calendarIcon from "../assets/calendar.svg";
import {
  civicData,
  formatCivicStatusLabel,
  getCivicAuthorInitial,
  getCivicCardState,
  formatCivicCategoryValue,
  formatCivicCategoryDetail,
  formatCivicDistanceLabel,
  formatCivicDaysOpenLabel,
  formatCivicConfirmingLabel,
} from "../../utils/civic";
import { dealData } from "../../utils/deals";
import { eventData } from "../../utils/events";
import { listingData } from "../../utils/listings";

const categoryIconByType: Record<string, string> = {
  civic: coneIcon,
  alert: alertIcon,
  event: calendarIcon,
};

function matches(query: string, ...fields: (string | null | undefined)[]): boolean {
  const lowerQuery = query.toLowerCase();
  return fields.some((field) => {
    if (!field) return false;
    const lowerField = field.toLowerCase();
    return lowerField.includes(lowerQuery) || lowerQuery.includes(lowerField);
  });
}

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [inputValue, setInputValue] = useState(query);
  const navigate = useNavigate();

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed) navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const civicResults = query
    ? civicData.filter((post) => matches(query, post[3], post[8], post[1]))
    : [];
  const dealResults = query
    ? dealData.filter((deal) => matches(query, deal[2], deal[10], deal[1]))
    : [];
  const eventResults = query
    ? eventData.filter((event) => matches(query, event[3], event[2], event[1]))
    : [];
  const listingResults = query
    ? listingData.filter((listing) => matches(query, listing[2], listing[1]))
    : [];

  const hasResults =
    civicResults.length > 0 ||
    dealResults.length > 0 ||
    eventResults.length > 0 ||
    listingResults.length > 0;

  return (
    <div className="pt-16 pb-24 sm:pt-20 sm:pb-28">
      <Navbar />
      <div className="mx-auto w-full max-w-3xl px-4 py-3 lg:max-w-5xl">
        <Link to="/" className="text-gray-400 hover:text-gray-600">
          {`<`} back
        </Link>
        <form onSubmit={handleSearchSubmit} className="mt-2 mb-4">
          <SearchBar
            placeholder=" Search pins, streets, deals..."
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
        </form>

        {!query && <p className="text-gray-400">Search for pins, deals, events, or listings.</p>}

        {query && !hasResults && (
          <p className="text-gray-400">No results for "{query}".</p>
        )}

        {civicResults.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-2 font-medium">Pins</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {civicResults.map((post) => (
                <Card
                  key={post[0]}
                  authorInitial={getCivicAuthorInitial(post[16])}
                  authorName={post[16]}
                  authorRole={post[17]}
                  statusLabel={formatCivicStatusLabel(post[12], post[22]) ?? post[12]}
                  cardState={getCivicCardState(post[12])}
                  claim={post[3]}
                  description={post[4]}
                  categoryIcon={categoryIconByType[post[1].toLowerCase()]}
                  categoryValue={formatCivicCategoryValue(post[21], post[11])}
                  categoryDetail={formatCivicCategoryDetail(post[10], post[11])}
                  imageUrl={post[5] ?? undefined}
                  metaOne={formatCivicDistanceLabel(post[20])}
                  metaTwo={formatCivicDaysOpenLabel(post[21])}
                  metaThree={formatCivicConfirmingLabel(post[18])}
                />
              ))}
            </div>
          </div>
        )}

        {dealResults.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-2 font-medium">Deals</h2>
            <DealList deals={dealResults} />
          </div>
        )}

        {eventResults.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-2 font-medium">Events</h2>
            <EventList events={eventResults} />
          </div>
        )}

        {listingResults.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-2 font-medium">Listings</h2>
            <ListingList listings={listingResults} />
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
