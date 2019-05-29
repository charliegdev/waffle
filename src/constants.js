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
    description: "Review the newest flagship iPhone.",
    dragging: false,
    id: 1,
    status: status.TO_DO.title,
    title: "Review iPhone XS Max"
  },
  {
    description: 'Review the newest "budget-friendly" iPhone.',
    dragging: false,
    id: 2,
    status: status.TO_DO.title,
    title: "Review iPhone XR"
  },
  {
    description: "Review the newest Samsung flagship",
    dragging: false,
    id: 3,
    status: status.IN_PROGRESS.title,
    title: "Review Samsung Galaxy S10 Plus"
  },
  {
    description: "Can the Google's flagship compete with Apple and Samsung?",
    dragging: false,
    id: 4,
    status: status.IN_PROGRESS.title,
    title: "Review Google Pixel 3 XL"
  },
  {
    id: 5,
    dragging: false,
    title: "Review OnePlus 6T",
    description: 'How much are we giving up for a "flagship killer"?',
    status: status.COMPLETED.title
  },
  {
    id: 6,
    dragging: false,
    title: "Review BlackBerry KEY2",
    description: "Are physical keyboards still relevant, and worth the tradeoffs?",
    status: status.COMPLETED.title
  }
];
