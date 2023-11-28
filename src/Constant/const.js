const TASK_TYPE = { BUG: "bug", NEW: "new task" };

const TASK_PRIORITY = {
  BACKLOG: "backlog",
  SELECTED: "selected",
  INPROGRESS: "inprogress",
  DONE: "done",
};
const TASK_STATUS = {
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
  LOWEST: "lowest",
};

export { TASK_TYPE, TASK_PRIORITY, TASK_STATUS };

export const ROUTES = [
  { path: "/" },
  { path: "/create-project" },
  { path: "/project-detail/:projectId" },
  { path: "/profile" },
  { path: "/admin/userManagement" },
];


