import { civicData as civicStubData } from "./stub";
import type { CardState } from "../src/components/Card";

// CivicRow index map (matches utils/stub.tsx civicData):
// [0]id [1]category [2]subcategory [3]title [4]description [5]photoUrl [6]latitude [7]longitude
// [8]street [9]ward [10]authorityReference [11]statutoryWindowDays [12]status [13]createdAt
// [14]updatedAt [15]closedAt [16]reporterName [17]reporterRole [18]verificationFor
// [19]verificationAgainst [20]distance [21]daysElapsed [22]breachDays
export type CivicRow = [
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

export const civicData = civicStubData as unknown as CivicRow[];

export function formatCivicStatusLabel(
  status: string,
  breachDays: number | null,
): string | undefined {
  if (breachDays != null && breachDays > 0)
    return `${breachDays} days past deadline`;
  return status || undefined;
}

export function getCivicAuthorInitial(reporterName: string): string {
  return reporterName ? reporterName[0].toUpperCase() : "";
}

export function getCivicCardState(status: string): CardState {
  if (status === "Resolved") return "settled";
  if (status === "Reported") return "pending";
  return "live";
}

export function formatCivicCategoryValue(
  daysElapsed: number | null,
  statutoryWindowDays: number,
): string {
  return daysElapsed != null
    ? `Day ${daysElapsed} of a ${statutoryWindowDays} day window`
    : `${statutoryWindowDays} day window`;
}

export function formatCivicCategoryDetail(
  authorityReference: string,
  statutoryWindowDays: number,
): string {
  return `${authorityReference} • the rule is ${statutoryWindowDays} working days`;
}

export function formatCivicDistanceLabel(distance: string | null): string | undefined {
  return distance ? `${distance} away` : undefined;
}

export function formatCivicDaysOpenLabel(daysElapsed: number | null): string | undefined {
  return daysElapsed != null ? `${daysElapsed} days open` : undefined;
}

export function formatCivicConfirmingLabel(
  verificationFor: number | null,
): string | undefined {
  return verificationFor != null ? `${verificationFor} confirming` : undefined;
}
