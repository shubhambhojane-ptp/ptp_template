import { useState } from "react";
import Navbar from "./components/Navbar";
import InfoSection from "./components/InfoSection";
import SearchBar from "./components/SearchBar";
import Map from "./components/Map";
import Card, { type CardState } from "./components/Card";
import EventCard from "./components/EventCard";
import NewsCard from "./components/NewsCard";
import PollCard from "./components/PollCard";
import DealCard from "./components/DealCard";
import BottomTab, { type BottomTabKey } from "./components/BottomTab";
import alertIcon from "./assets/alert.svg";
import coneIcon from "./assets/cone.svg";
import calendarIcon from "./assets/calendar.svg";
import {
  eventData as eventStubData,
  civicData as civicStubData,
  dealData as dealStubData,
} from "../utils/stub";

const categoryIconByType: Record<string, string> = {
  civic: coneIcon,
  alert: alertIcon,
  event: calendarIcon,
};

// EventRow index map (matches utils/stub.tsx eventData):
// [0]id [1]category [2]venue [3]title [4]photoUrl [5]startsAt [6]endsAt [7]recurrence [8]price
// [9]capacity [10]street [11]landmark [12]organiser [13]status [14]createdAt [15]timeToStart
// [16]seatsLeft [17]goingCount [18]latitude [19]longitude
type EventRow = [
  string,
  string,
  string,
  string,
  string | null,
  string,
  string,
  string | null,
  number | null,
  number | null,
  string,
  string | null,
  string,
  string,
  string,
  string | null,
  number | null,
  number | null,
  number,
  number,
];

const eventData = eventStubData as unknown as EventRow[];

function formatEventDateLabel(startsAt: string): string | undefined {
  const date = new Date(startsAt.replace(" ", "T"));
  if (Number.isNaN(date.getTime())) return undefined;

  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const meridiem = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;
  const time =
    minutes === 0
      ? `${hours}${meridiem}`
      : `${hours}:${String(minutes).padStart(2, "0")}${meridiem}`;

  return `${weekday} ${time}`;
}

function formatSeatsLabel(seatsLeft: number | null): string | undefined {
  return seatsLeft != null ? `${seatsLeft} seats left` : undefined;
}

function formatGoingLabel(goingCount: number | null): string | undefined {
  return goingCount != null ? `${goingCount} going` : undefined;
}

// FeedRow index map: [0]id [1]authorInitial [2]authorName [3]authorRole [4]cardState [5]statusLabel
// [6]claim [7]categoryType [8]categoryValue [9]categoryDetail [10]metaOne [11]metaTwo [12]metaThree
// [13]showActions [14]imageUrl [15]primaryLabel [16]secondaryLabel
// np

// CivicRow index map (matches utils/stub.tsx civicData):
// [0]id [1]category [2]subcategory [3]title [4]description [5]photoUrl [6]latitude [7]longitude
// [8]street [9]ward [10]authorityReference [11]statutoryWindowDays [12]status [13]createdAt
// [14]updatedAt [15]closedAt [16]reporterName [17]reporterRole [18]verificationFor
// [19]verificationAgainst [20]distance [21]daysElapsed [22]breachDays
type CivicRow = [
  string,
  string,
  string,
  string,
  string,
  string | null,
  number,
  number,
  string,
  string,
  string,
  number,
  string,
  string,
  string,
  string | null,
  string,
  string,
  number | null,
  number | null,
  string | null,
  number | null,
  number | null,
];

const civicData = civicStubData as unknown as CivicRow[];

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

function formatCivicStatusLabel(
  status: string,
  breachDays: number | null,
): string | undefined {
  if (breachDays != null && breachDays > 0)
    return `${breachDays} days past deadline`;
  return status || undefined;
}

function getCivicAuthorInitial(reporterName: string): string {
  return reporterName ? reporterName[0].toUpperCase() : "";
}

function getCivicCardState(status: string): CardState {
  if (status === "Resolved") return "settled";
  if (status === "Reported") return "pending";
  return "live";
}

function formatCivicCategoryValue(
  daysElapsed: number | null,
  statutoryWindowDays: number,
): string {
  return daysElapsed != null
    ? `Day ${daysElapsed} of a ${statutoryWindowDays} day window`
    : `${statutoryWindowDays} day window`;
}

function formatCivicCategoryDetail(
  authorityReference: string,
  statutoryWindowDays: number,
): string {
  return `${authorityReference} • the rule is ${statutoryWindowDays} working days`;
}

function formatCivicDistanceLabel(distance: string | null): string | undefined {
  return distance ? `${distance} away` : undefined;
}

function formatCivicDaysOpenLabel(daysElapsed: number | null): string | undefined {
  return daysElapsed != null ? `${daysElapsed} days open` : undefined;
}

function formatCivicConfirmingLabel(
  verificationFor: number | null,
): string | undefined {
  return verificationFor != null ? `${verificationFor} confirming` : undefined;
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

// DealRow index map (matches utils/stub.tsx dealData):
// [0]id [1]category [2]offerText [3]photoUrl [4]validFrom [5]validUntil [6]validDays [7]validHours
// [8]redemptionType [9]claimCap [10]businessName [11]street [12]landmark [13]paidPlacement
// [14]nextOccurrence [15]status [16]createdAt [17]updatedAt [18]timeToExpiry [19]claimsUsed
// [20]capReached [21]latitude [22]longitude
type DealRow = [
  string,
  string,
  string,
  string | null,
  string,
  string,
  string | null,
  string | null,
  string,
  number | null,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string | null,
  number,
  string,
  number,
  number,
];

const dealData = dealStubData as unknown as DealRow[];

function formatExpiryLabel(timeToExpiry: string | null): string | undefined {
  return timeToExpiry ? `${timeToExpiry} left` : undefined;
}

/*
const feedData: FeedRow[] = [
  [
    "post_001",
    "A",
    "Anjali D",
    "Resident • verified number",
    "live",
    "Open",
    "Waroda Road drain has been open since 22 June",
    "civic",
    "Day 34 of a 7 day window",
    "BMC 4471 • the rule is 7 working days",
    "400 m away",
    "34 days open",
    "6 confirming",
    true,
    "https://images.squarespace-cdn.com/content/v1/573365789f726693272dc91a/1704992146415-CI272VYXPALWT52IGLUB/AdobeStock_201419293.jpeg?format=1500w",
    "Still there",
    "It's fixed",
  ],
  [
    "post_002",
    "",
    "Push The Pin",
    "System • from the BMC feed",
    "contested",
    "Residents disagree",
    "BMC closed the Chapel Road pothole. Four neighbours say otherwise",
    "alert",
    "27 days past the 7 day deadline",
    "BMC 4471 • the rule is 7 working days",
    "On your lane",
    "Closed 9 days ago",
    "4 against 1",
    true,
    null,
    "Still there",
    "It's fixed",
  ],
  [
    "post_003",
    "B",
    "Bandra Collective",
    "Community • verified venue",
    "live",
    "This Sunday",
    "Sunday sketch walk starts at Ranwar Cross",
    "event",
    "Sunday, 7:30 am",
    "Ranwar Cross • free entry",
    "On your lane",
    "Sun, 7:30 am",
    "9 going",
    false,
    null,
    undefined,
    undefined,
  ],
  [
    "post_004",
    "S",
    "Sameer K",
    "Resident • new report",
    "pending",
    "Awaiting verification",
    "Streetlight outside Carter Road park has been dark for 3 nights",
    "civic",
    "Reported today",
    "BMC 4471 • verification pending",
    "150 m away",
    "Reported today",
    "1 confirming",
    true,
    null,
    "Still there",
    "It's fixed",
  ],
  [
    "post_005",
    "A",
    "Amit R",
    "Resident • verified number",
    "closing",
    "Closing soon",
    "Garbage pile near Turner Road due for pickup tomorrow",
    "civic",
    "Day 6 of a 7 day window",
    "BMC 4471 • the rule is 7 working days",
    "600 m away",
    "1 day left",
    "3 confirming",
    true,
    null,
    "Still there",
    "It's fixed",
  ],
  [
    "post_006",
    "",
    "Push The Pin",
    "System • from the BMC feed",
    "settled",
    "Resolved",
    "Perry Cross Road pothole was repaired as reported",
    "civic",
    "Closed within window",
    "BMC 4471 • resolved in 5 working days",
    "On your lane",
    "Closed 2 days ago",
    "5 confirming",
    false,
    null,
    undefined,
    undefined,
  ],
  [
    "post_007",
    "K",
    "Kabir S",
    "Resident • verified number",
    "dead",
    "Expired",
    "B negative needed at Lilavati — request expired",
    "alert",
    "Posted 4 days ago",
    "Response window has closed",
    "1.2 km away",
    "Expired 2 days ago",
    null,
    false,
    null,
    undefined,
    undefined,
  ],
];
*/

function App() {
  const [activeTab, setActiveTab] = useState<BottomTabKey>("map");

  return (
    <>
      <div className="pt-16 sm:pt-20">
        <Navbar />
        <div className="mx-auto w-full max-w-3xl  lg:max-w-5xl">
          <InfoSection />
        </div>
        <div className="mx-auto w-full max-w-3xl p-3">
          <SearchBar placeholder=" Search pins, streets, deals..." />
        </div>
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 p-3 border-t-2 pt-4 border-gray-300 sm:gap-4 sm:p-5 lg:max-w-5xl">
          <h1 className="font-medium px-1">Around the street</h1>
          {civicData.map((post) => (
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
        <div className="mx-auto px-4 w-full max-w-3xl py-3  border-t-2 border-gray-300 pt-4 lg:max-w-5xl">
          <div className="flex justify-between mb-2">
            <h1 className="font-medium">Events</h1>
            <p className="text-gray-400">browse</p>
          </div>
          <div className="scrollbar-none flex snap-x snap-mandatory items-start gap-3 overflow-x-auto px-3 pb-1 sm:gap-4 sm:px-5">
            {eventData.map((event) => (
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
        <div className="mx-auto grid w-full max-w-3xl grid-cols-1 items-start gap-4 p-3 border-t-2 border-gray-300 pt-4 sm:grid-cols-2 sm:gap-5 sm:p-5 lg:max-w-5xl md:grid-cols-2 lg:grid-cols-3">
          <h1 className="col-span-full font-medium ">Around You</h1>
          {civicData.map((post) => (
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
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 p-3 border-t-2 pt-4 border-gray-300 sm:gap-4 sm:p-5 lg:max-w-5xl">
          <h1 className="text-gray-400">TAP TO WEIGH IN · NEARBY</h1>
          {civicData.map((post) => {
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
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 p-3 pb-24 border-t-2 pt-4 border-gray-300 sm:gap-4 sm:p-5 sm:pb-28 lg:max-w-5xl">
          <div className="flex justify-between mb-2">
            <h1 className="font-medium">Deals nearby</h1>
            <p className="text-gray-400">browse {`>`} </p>
          </div>
            {dealData.map((deal) => (
              <DealCard
                key={deal[0]}
                imageUrl={deal[3] ?? undefined}
                offerText={deal[2]}
                businessName={deal[10]}
                metaOne={deal[6]}
                metaTwo={deal[7]}
                metaThree={formatExpiryLabel(deal[18])}
              />
            ))}
        </div>
      </div>
      <BottomTab
        active={activeTab}
        onMapClick={() => setActiveTab("map")}
        onBrowseClick={() => setActiveTab("browse")}
        onAddClick={() => console.log("add pin")}
      />
    </>
  );
}

export default App;
