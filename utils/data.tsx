

const feedData = [
  {
    id: "post_001",
    authorInitial: "A",
    authorName: "Anjali D",
    authorRole: "Resident • verified number",
    cardState: "live",
    statusLabel: "Open",
    claim: "Waroda Road drain has been open since 22 June",
    categoryType: "civic", 
    categoryValue: "Day 34 of a 7 day window",
    categoryDetail: "BMC 4471 • the rule is 7 working days",
    metaOne: "400 m away",
    metaTwo: "34 days open",
    metaThree: "6 confirming",
    showActions: true,
    imageUrl: "https://images.squarespace-cdn.com/content/v1/573365789f726693272dc91a/1704992146415-CI272VYXPALWT52IGLUB/AdobeStock_201419293.jpeg?format=1500w",
    primaryLabel: "Still there",
    secondaryLabel: "It's fixed"
  },
  {
    id: "post_002",
    authorInitial: "", 
    authorName: "Push The Pin",
    authorRole: "System • from the BMC feed",
    cardState: "contested",
    statusLabel: "Residents disagree",
    claim: "BMC closed the Chapel Road pothole. Four neighbours say otherwise",
    categoryType: "alert",
    categoryValue: "27 days past the 7 day deadline",
    categoryDetail: "BMC 4471 • the rule is 7 working days",
    metaOne: "On your lane",
    metaTwo: "Closed 9 days ago",
    metaThree: "4 against 1",
    showActions: true,
    imageUrl: null, 
    primaryLabel: "Still there",
    secondaryLabel: "It's fixed"
  },
  {
    id: "post_003",
    authorInitial: "B",
    authorName: "Bandra Collective",
    authorRole: "Community • verified venue",
    cardState: "live",
    statusLabel: "This Sunday",
    claim: "Sunday sketch walk starts at Ranwar Cross",
    categoryType: "event", 
    categoryValue: "Sunday, 7:30 am",
    categoryDetail: "Ranwar Cross • free entry",
    metaOne: "On your lane",
    metaTwo: "Sun, 7:30 am",
    metaThree: "9 going",
    showActions: false,
    imageUrl: null
  },
  {
    id: "post_004",
    authorInitial: "S",
    authorName: "Sameer K",
    authorRole: "Resident • new report",
    cardState: "pending",
    statusLabel: "Awaiting verification",
    claim: "Streetlight outside Carter Road park has been dark for 3 nights",
    categoryType: "civic",
    categoryValue: "Reported today",
    categoryDetail: "BMC 4471 • verification pending",
    metaOne: "150 m away",
    metaTwo: "Reported today",
    metaThree: "1 confirming",
    showActions: true,
    imageUrl: null,
    primaryLabel: "Still there",
    secondaryLabel: "It's fixed"
  },
  {
    id: "post_005",
    authorInitial: "A",
    authorName: "Amit R",
    authorRole: "Resident • verified number",
    cardState: "closing",
    statusLabel: "Closing soon",
    claim: "Garbage pile near Turner Road due for pickup tomorrow",
    categoryType: "civic",
    categoryValue: "Day 6 of a 7 day window",
    categoryDetail: "BMC 4471 • the rule is 7 working days",
    metaOne: "600 m away",
    metaTwo: "1 day left",
    metaThree: "3 confirming",
    showActions: true,
    imageUrl: null,
    primaryLabel: "Still there",
    secondaryLabel: "It's fixed"
  },
  {
    id: "post_006",
    authorInitial: "",
    authorName: "Push The Pin",
    authorRole: "System • from the BMC feed",
    cardState: "settled",
    statusLabel: "Resolved",
    claim: "Perry Cross Road pothole was repaired as reported",
    categoryType: "civic",
    categoryValue: "Closed within window",
    categoryDetail: "BMC 4471 • resolved in 5 working days",
    metaOne: "On your lane",
    metaTwo: "Closed 2 days ago",
    metaThree: "5 confirming",
    showActions: false,
    imageUrl: null
  },
  {
    id: "post_007",
    authorInitial: "K",
    authorName: "Kabir S",
    authorRole: "Resident • verified number",
    cardState: "dead",
    statusLabel: "Expired",
    claim: "B negative needed at Lilavati — request expired",
    categoryType: "alert",
    categoryValue: "Posted 4 days ago",
    categoryDetail: "Response window has closed",
    metaOne: "1.2 km away",
    metaTwo: "Expired 2 days ago",
    metaThree: null,
    showActions: false,
    imageUrl: null
  }
];


const eventData = [
  {
    id: "event_001",
    imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300&q=80",
    timingLabel: "this week",
    title: "Live jazz at Bonobo",
    dateLabel: "Fri 9pm",
    metaOne: "0.6 km",
    metaTwo: "34 interested"
  },
  {
    id: "event_002",
    imageUrl: undefined,
    timingLabel: "this week",
    title: "Sunday sketch walk at Ranwar Cross",
    dateLabel: "Sun 7:30am",
    metaOne: "On your lane",
    metaTwo: "9 going"
  },
  {
    id: "event_003",
    imageUrl: undefined,
    timingLabel: "this weekend",
    event_venue: "Farmers market at Turner Road",
    event_StartsEnds: "Sat 10am",
    metaOne: "1.1 km",
    metaTwo: "52 interested"
  }
];




const newsData = [
  {
    id: "news_001",
    claim: "BMC approves ₹40 crore budget for Bandra storm drain overhaul",
    metaOne: "2 hours ago",
    metaTwo: "Civic",
    metaThree: "Sent to BMC",
    upvoteCount: 128
  },
  {
    id: "news_002",
    claim: "New pedestrian signal installed at Turner Road junction",
    metaOne: "Yesterday",
    metaTwo: "Civic",
    metaThree: "BMC responded",
    upvoteCount: 46
  },
  {
    id: "news_003",
    claim: "Bandra Bandstand promenade repairs to begin next week",
    metaOne: "2 days ago",
    metaTwo: "Civic",
    metaThree: "Awaiting BMC action",
    upvoteCount: 89
  }
];