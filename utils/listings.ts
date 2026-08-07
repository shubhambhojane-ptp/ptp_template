import { listingData as listingStubData } from "./stub";

// ListingRow index map (matches utils/stub.tsx listingData):
// [0]id [1]category [2]itemName [3]price [4]priceType [5]condition [6]photoUrl [7]pickupTerms
// [8]title [9]description [10]street [11]ward [12]sellerName [13]sellerTrustTier [14]status
// [15]createdAt [16]updatedAt [17]daysListed [18]watchers [19]soldPrice [20]latitude [21]longitude
export type ListingRow = [
  string,
  string,
  string,
  number,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  number,
  number,
  number | null,
  number,
  number,
];

export const listingData = listingStubData as unknown as ListingRow[];

export function formatListingPriceLabel(price: number, priceType: string): string {
  const priceText = `₹${price.toLocaleString("en-IN")}`;
  return priceType ? `${priceText} · ${priceType}` : priceText;
}

export function formatWatchersLabel(watchers: number | null): string | undefined {
  return watchers != null ? `${watchers} watching` : undefined;
}
