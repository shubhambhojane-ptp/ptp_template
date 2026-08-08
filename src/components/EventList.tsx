import EventCard from "./EventCard";
import {
  formatEventDateLabel,
  formatSeatsLabel,
  formatGoingLabel,
  type EventRow,
} from "../../utils/events";

interface EventListProps {
  events: EventRow[];
  className?: string;
}

const EventList = ({ events, className = "grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3" }: EventListProps) => {
  return (
    <div className={className}>
      {events.map((event) => (
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
  );
};

export default EventList;
