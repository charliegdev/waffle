export const status = {
  TO_DO: {
    color: "#269898",
    icon: "lightbulb",
    lighterColor: "#30BFBF",
    title: "To Do"
  },
  IN_PROGRESS: {
    color: "#0088CC",
    icon: "pulse",
    lighterColor: "#00AAFF",
    title: "In Progress"
  },
  READY_FOR_TEST: {
    color: "#CC7F15",
    icon: "circle",
    lighterColor: "#FF9F1A",
    title: "Ready for Test"
  },
  COMPLETED: {
    color: "#7265B8",
    icon: "confirm",
    lighterColor: "#8F7EE6",
    title: "Completed"
  }
};

export const mockTasks = [
  {
    id: 1,
    title: "Review iPhone XS Max",
    description: "Review the newest flagship iPhone.",
    status: status.TO_DO.title
  },
  {
    id: 2,
    title: "Review iPhone XR",
    description: 'Review the newest "budget-friendly" iPhone.',
    status: status.TO_DO.title
  },
  {
    id: 3,
    title: "Review Samsung Galaxy S10 Plus",
    description: "Review the newest Samsung flagship",
    status: status.IN_PROGRESS.title
  },
  {
    id: 4,
    title: "Review Google Pixel 3 XL",
    description: "Can the Google's flagship compete with Apple and Samsung?",
    status: status.IN_PROGRESS.title
  },
  {
    id: 5,
    title: "Review OnePlus 6T",
    description: 'How much are we giving up for a "flagship killer"?',
    status: status.COMPLETED.title
  },
  {
    id: 6,
    title: "Review BlackBerry KEY2",
    description: "Are physical keyboards still relevant, and worth the tradeoffs?",
    status: status.COMPLETED.title
  }
];
