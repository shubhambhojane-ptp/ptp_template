import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import InfoSection from "../components/InfoSection";
import SearchBar from "../components/SearchBar";
import Map from "../components/Map";
import Card from "../components/Card";
import EventCard from "../components/EventCard";
import NewsCard from "../components/NewsCard";
import PollCard from "../components/PollCard";
import DealCard from "../components/DealCard";
import ListingCard from "../components/ListingCard";
import Activity from "../components/Activity";
import alertIcon from "../assets/alert.svg";
import coneIcon from "../assets/cone.svg";
import calendarIcon from "../assets/calendar.svg";
import { dealData, formatExpiryLabel } from "../../utils/deals";
import {
  eventData,
  formatEventDateLabel,
  formatSeatsLabel,
  formatGoingLabel,
} from "../../utils/events";
import {
  listingData,
  formatListingPriceLabel,
  formatWatchersLabel,
} from "../../utils/listings";
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

const categoryIconByType: Record<string, string> = {
  civic: coneIcon,
  alert: alertIcon,
  event: calendarIcon,
};

// FeedRow index map: [0]id [1]authorInitial [2]authorName [3]authorRole [4]cardState [5]statusLabel
// [6]claim [7]categoryType [8]categoryValue [9]categoryDetail [10]metaOne [11]metaTwo [12]metaThree
// [13]showActions [14]imageUrl [15]primaryLabel [16]secondaryLabel
// np

function formatRelativeTime(dateStr: string): string | undefined {
  const date = new Date(dateStr.replace(" ", "T"));
  if (Number.isNaN(date.getTime())) return undefined;

  const diffMinutes = Math.round((Date.now() - date.getTime()) / 60000);
  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes} min ago`;

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24)
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;

  const diffDays = Math.round(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
}

function getCivicVoteLabels(
  verificationFor: number | null,
  verificationAgainst: number | null,
) {
  const yesVotes = verificationFor ?? 0;
  const noVotes = verificationAgainst ?? 0;
  const totalVotes = yesVotes + noVotes;

  if (totalVotes === 0) return { yesLabel: "Yes", noLabel: "No", totalVotes };

  const yesPercent = Math.round((yesVotes / totalVotes) * 100);
  return {
    yesLabel: `Yes ${yesPercent}%`,
    noLabel: `No ${100 - yesPercent}%`,
    totalVotes,
  };
}

interface ActivityItem {
  key: string;
  type: "civic" | "listing" | "deal";
  actionLabel: string;
  category: string;
  location: string;
  distance?: string | null;
  createdAt: string;
}

const recentActivities: ActivityItem[] = [
  ...civicData.map((post) => ({
    key: post[0],
    type: "civic" as const,
    actionLabel: "Pin raised",
    category: post[2],
    location: post[8],
    distance: post[20],
    createdAt: post[13],
  })),
  ...listingData.map((listing) => ({
    key: listing[0],
    type: "listing" as const,
    actionLabel: "Item listed",
    category: listing[2],
    location: listing[10],
    createdAt: listing[15],
  })),
  ...dealData.map((deal) => ({
    key: deal[0],
    type: "deal" as const,
    actionLabel: "Deal live",
    category: deal[2],
    location: deal[11],
    createdAt: deal[16],
  })),
]
  .sort(
    (a, b) =>
      new Date(b.createdAt.replace(" ", "T")).getTime() -
      new Date(a.createdAt.replace(" ", "T")).getTime(),
  )
  .slice(0, 3);

function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (trimmed) navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="pt-16 sm:pt-20">
      <Navbar />
      <div className="mx-auto w-full max-w-3xl  lg:max-w-5xl">
        <InfoSection />
      </div>
      <div className="mx-auto w-full max-w-3xl p-3">
        <form onSubmit={handleSearchSubmit}>
          <SearchBar
            placeholder=" Search pins, streets, deals..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </form>
      </div>
      <div className="mx-auto flex w-full max-w-3xl flex-col p-3 border-t pt-4 border-gray-300 sm:p-5 lg:max-w-5xl">
        <h1 className="mb-2 px-1 font-medium">Watch · Activity nearby</h1>
        {recentActivities.map((activity) => {
          const activityHref =
            activity.type === "listing"
              ? `/listings?highlight=${activity.key}`
              : activity.type === "deal"
                ? `/deals?highlight=${activity.key}`
                : `/civic?highlight=${activity.key}`;

          return (
            <Activity
              key={activity.key}
              actionLabel={activity.actionLabel}
              category={activity.category}
              location={activity.location}
              distance={activity.distance}
              timeAgo={formatRelativeTime(activity.createdAt)}
              className={activityHref ? "cursor-pointer hover:bg-gray-50" : undefined}
              onClick={activityHref ? () => navigate(activityHref) : undefined}
            />
          );
        })}
      </div>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 p-3 border-t pt-4 border-gray-300 sm:gap-4 sm:p-5 lg:max-w-5xl">
        <h1 className="font-medium px-1">Around the street</h1>
        {civicData.slice(3,7).map((post) => (
          <NewsCard
            key={post[0]}
            claim={post[3]}
            metaOne={formatRelativeTime(post[13])}
            metaTwo={post[1]}
            metaThree={formatCivicStatusLabel(post[12], post[22])}
            upvoteCount={post[18] ?? 0}
            onUpvoteClick={() => console.log("upvote:", post[0])}
          />
        ))}
      </div>
      <div className="mx-auto w-full max-w-3xl p-3 lg:max-w-5xl">
        <Map />
      </div>
      <div className="mx-auto px-4 w-full max-w-3xl py-3  border-t border-gray-300 pt-4 lg:max-w-5xl">
        <div className="flex justify-between mb-2">
          <h1 className="font-medium">Events</h1>
          <Link to="/events" className="text-gray-400 hover:text-gray-600">
            browse {`>`}
          </Link>
        </div>
        <div className="scrollbar-none flex snap-x snap-mandatory items-start gap-3 overflow-x-auto px-3 pb-1 sm:gap-4 sm:px-5">
          {eventData.slice(0,3).map((event) => (
            <EventCard
              key={event[0]}
              imageUrl={event[4] ?? undefined}
              timingLabel={event[15] ?? undefined}
              title={event[3]}
              dateLabel={formatEventDateLabel(event[5])}
              metaOne={formatSeatsLabel(event[16])}
              metaTwo={formatGoingLabel(event[17])}
              onPrimaryClick={() => console.log("interested:", event[0])}
            />
          ))}
        </div>
      </div>
      <div className="mx-auto grid w-full max-w-3xl grid-cols-1 items-start gap-4 p-3 border-t border-gray-300 pt-4 sm:grid-cols-2 sm:gap-5 sm:p-5 lg:max-w-5xl md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-full flex justify-between">
          <h1 className="font-medium">Around You</h1>
          <Link to="/civic" className="text-gray-400 hover:text-gray-600">
            browse {`>`}
          </Link>
        </div>
        {civicData.slice(0,5).map((post) => (
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
            showActions={true}
            primaryLabel="Still there"
            secondaryLabel="It's fixed"
            onPrimaryClick={() => console.log(post[0], "Still there")}
            onSecondaryClick={() => console.log(post[0], "It's fixed")}
          />
        ))}
      </div>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 p-3 border-t pt-4 border-gray-300 sm:gap-4 sm:p-5 lg:max-w-5xl">
        <h1 className="text-gray-400">TAP TO WEIGH IN · NEARBY</h1>
        {civicData.slice(0, 3).map((post) => {
          const { yesLabel, noLabel, totalVotes } = getCivicVoteLabels(
            post[18],
            post[19],
          );
          return (
            <PollCard
              key={post[0]}
              metaOne={post[1]}
              metaTwo={post[2]}
              metaThree={post[9]}
              title={post[3]}
              metaFour={post[20]}
              metaFive={
                post[21] != null ? `${post[21]} days open` : undefined
              }
              footerLabel={`${totalVotes} votes`}
              primaryLabel={yesLabel}
              secondaryLabel={noLabel}
              onPrimaryClick={() => console.log("vote yes:", post[0])}
              onSecondaryClick={() => console.log("vote no:", post[0])}
            />
          );
        })}
      </div>
      <div className="mx-auto w-full max-w-3xl px-4 py-3 border-t pt-4 border-gray-300 lg:max-w-5xl">
        <div className="flex justify-between mb-2">
          <h1 className="font-medium">Deals nearby </h1>
          <Link to="/deals" className="text-gray-400 hover:text-gray-600">
            browse {`>`}
          </Link>
        </div>
        <div className="scrollbar-none flex snap-x snap-mandatory items-start gap-3 overflow-x-auto px-3 pb-1 sm:gap-4 sm:px-5">
          {dealData.slice(0,3).map((deal) => (
            <DealCard
              key={deal[0]}
              imageUrl={deal[3] ?? undefined}
              offerText={deal[2]}
              businessName={deal[10]}
              metaOne={deal[6]}
              metaTwo={deal[7]}
              metaThree={formatExpiryLabel(deal[18])}
              layout="horizontal"
            />
          ))}
        </div>
      </div>
      <div className="mx-auto w-full max-w-3xl px-4 py-3 pb-24 border-t pt-4 border-gray-300 sm:pb-28 lg:max-w-5xl">
        <div className="flex justify-between mb-2">
          <h1 className="font-medium">Listings nearby</h1>
          <Link to="/listings" className="text-gray-400 hover:text-gray-600">
            browse {`>`}
          </Link>
        </div>
        <div className="scrollbar-none flex snap-x snap-mandatory items-start gap-3 overflow-x-auto px-3 pb-1 sm:gap-4 sm:px-5">
          {listingData.slice(0,3).map((listing) => (
            <ListingCard
              key={listing[0]}
              imageUrl={listing[6] ?? undefined}
              itemName={listing[2]}
              priceLabel={formatListingPriceLabel(listing[3], listing[4])}
              metaOne={listing[5]}
              metaTwo={listing[10]}
              metaThree={formatWatchersLabel(listing[18])}
              layout="horizontal"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
