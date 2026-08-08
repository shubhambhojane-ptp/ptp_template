import { Link } from "react-router";
import Navbar from "../components/Navbar";
import EventList from "../components/EventList";
import { eventData } from "../../utils/events";

function EventsPage() {
  return (
    <div className="pt-16 pb-24 sm:pt-20 sm:pb-28">
      <Navbar />
      <div className="mx-auto w-full max-w-3xl px-4 py-3 lg:max-w-5xl">
        <Link to="/" className="text-gray-400 hover:text-gray-600">
          {`<`} back
        </Link>
        <h1 className="mt-2 mb-4 font-medium">Events nearby</h1>
        <EventList events={eventData} />
      </div>
    </div>
  );
}

export default EventsPage;
