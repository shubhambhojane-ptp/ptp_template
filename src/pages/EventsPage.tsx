import { Link } from "react-router";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import {
  eventData,
  formatEventDateLabel,
  formatSeatsLabel,
  formatGoingLabel,
} from "../../utils/events";

function EventsPage() {
  return (
    <div className="pt-16 pb-24 sm:pt-20 sm:pb-28">
      <Navbar />
      <div className="mx-auto w-full max-w-3xl px-4 py-3 lg:max-w-5xl">
        <Link to="/" className="text-gray-400 hover:text-gray-600">
          {`<`} back
        </Link>
        <h1 className="mt-2 mb-4 font-medium">Events nearby</h1>
        <div className="flex flex-col gap-3 sm:gap-4">
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
              layout="vertical"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventsPage;
