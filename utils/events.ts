import { eventData as eventStubData } from "./stub";

// EventRow index map (matches utils/stub.tsx eventData):
// [0]id [1]category [2]venue [3]title [4]photoUrl [5]startsAt [6]endsAt [7]recurrence [8]price
// [9]capacity [10]street [11]landmark [12]organiser [13]status [14]createdAt [15]timeToStart
// [16]seatsLeft [17]goingCount [18]latitude [19]longitude
export type EventRow = [
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

export const eventData = eventStubData as unknown as EventRow[];

export function formatEventDateLabel(startsAt: string): string | undefined {
  const date = new Date(startsAt.replace(" ", "T"));
  if (Number.isNaN(date.getTime())) return undefined;

  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = date.getDate();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const meridiem = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;
  const time =
    minutes === 0
      ? `${hours}${meridiem}`
      : `${hours}:${String(minutes).padStart(2, "0")}${meridiem}`;

  return `${weekday}, ${month} ${day} · ${time}`;
}

export function formatSeatsLabel(seatsLeft: number | null): string | undefined {
  return seatsLeft != null ? `${seatsLeft} seats left` : undefined;
}

export function formatGoingLabel(goingCount: number | null): string | undefined {
  return goingCount != null ? `${goingCount} going` : undefined;
}
