import { dealData as dealStubData } from "./stub";

// DealRow index map (matches utils/stub.tsx dealData):
// [0]id [1]category [2]offerText [3]photoUrl [4]validFrom [5]validUntil [6]validDays [7]validHours
// [8]redemptionType [9]claimCap [10]businessName [11]street [12]landmark [13]paidPlacement
// [14]nextOccurrence [15]status [16]createdAt [17]updatedAt [18]timeToExpiry [19]claimsUsed
// [20]capReached [21]latitude [22]longitude
export type DealRow = [
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

export const dealData = dealStubData as unknown as DealRow[];

export function formatExpiryLabel(timeToExpiry: string | null): string | undefined {
  return timeToExpiry ? `${timeToExpiry} left` : undefined;
}
