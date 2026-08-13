import { momentData as momentStubData } from "./stub";

// MomentRow index map: [0]id [1]category [2]photoUrl [3]caption [4]street [5]ward [6]status
// [7]createdAt [8]updatedAt [9]latitude [10]longitude
export type MomentRow = [
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
];

export const momentData = momentStubData as unknown as MomentRow[];
