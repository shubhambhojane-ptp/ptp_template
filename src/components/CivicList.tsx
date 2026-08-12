import { twMerge } from "tailwind-merge";
import Card from "./Card";
import coneIcon from "../assets/cone.svg";
import alertIcon from "../assets/alert.svg";
import calendarIcon from "../assets/calendar.svg";
import {
  formatCivicStatusLabel,
  getCivicAuthorInitial,
  getCivicCardState,
  formatCivicCategoryValue,
  formatCivicCategoryDetail,
  formatCivicDistanceLabel,
  formatCivicDaysOpenLabel,
  formatCivicConfirmingLabel,
  type CivicRow,
} from "../../utils/civic";

const categoryIconByType: Record<string, string> = {
  civic: coneIcon,
  alert: alertIcon,
  event: calendarIcon,
};

interface CivicListProps {
  civicPosts: CivicRow[];
  className?: string;
  highlightId?: string | null;
}

const CivicList = ({
  civicPosts,
  className = "grid grid-cols-1 gap-4 sm:grid-cols-2",
  highlightId,
}: CivicListProps) => {
  return (
    <div className={className}>
      {civicPosts.map((post) => (
        <Card
          key={post[0]}
          id={`civic-${post[0]}`}
          authorInitial={getCivicAuthorInitial(post[16])}
          authorName={post[16]}
          authorRole={post[17]}
          statusLabel={formatCivicStatusLabel(post[12], post[22]) ?? post[12]}
          cardState={getCivicCardState(post[12])}
          claim={post[3]}
          description={post[4]}
          categoryIcon={categoryIconByType[post[1].toLowerCase()]}
          categoryValue={formatCivicCategoryValue(post[21], post[11])}
          categoryDetail={formatCivicCategoryDetail(post[10], post[11])}
          imageUrl={post[5] ?? undefined}
          metaOne={formatCivicDistanceLabel(post[20])}
          metaTwo={formatCivicDaysOpenLabel(post[21])}
          metaThree={formatCivicConfirmingLabel(post[18])}
          className={twMerge(post[0] === highlightId && "ring-2 ring-blue-400")}
        />
      ))}
    </div>
  );
};

export default CivicList;
