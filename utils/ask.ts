import { askData as askStubData } from "./stub";

// AskRow index map: [0]id [1]category [2]needType [3]urgency [4]deadline [5]contactMethod
// [6]title [7]description [8]street [9]ward [10]entryState [11]unitsNeeded [12]responders
// [13]fulfilled [14]timeRemaining [15]latitude [16]longitude [17]createdAt [18]createdBy [19]status
export type AskRow = [
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
  string,
  string,
  number,
  number,
  string,
  string,
  string,
];

export const askData = askStubData as unknown as AskRow[];
