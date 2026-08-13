import { placeData as placeStubData } from "./stub";

// PlaceRow index map: [0]id [1]category [2]placeName [3]placeType [4]openingHours [5]street
// [6]landmark [7]openingDate [8]closingDate [9]ownerVerified [10]openNow [11]daysToOpening
// [12]interestCount [13]latitude [14]longitude [15]createdAt [16]updatedAt [17]status
export type PlaceRow = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string | null,
  string,
  string,
  number,
  number,
  number,
  number,
  string,
  string,
  string,
];

export const placeData = placeStubData as unknown as PlaceRow[];
