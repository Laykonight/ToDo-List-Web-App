//---------------------------------------------------------------------
export const getMonthName = (monthValue) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return monthNames[monthValue - 1];
};
//---------------------------------------------------------------------
export const isDeadlinePast = (task) => {
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-based
  const currentYear = currentDate.getFullYear();

  return (
    task.deadline.year < currentYear ||
    (task.deadline.year === currentYear &&
      task.deadline.month < currentMonth) ||
    (task.deadline.year === currentYear &&
      task.deadline.month === currentMonth &&
      task.deadline.day < currentDay)
  );
};
//---------------------------------------------------------------------
export const getPriorityValue = (priority) => {
  switch (priority) {
    case "HIGH":
      return 2;
    case "MID":
      return 1;
    case "LOW":
      return 0;
    default:
      return 0;
  }
};
//---------------------------------------------------------------------
export const currentDate = new Date();
//---------------------------------------------------------------------
export const sortByDeadline = (list) => {
  return list.sort((a, b) => {
    const deadlineA = a.deadline
      ? new Date(
          a.deadline.year,
          a.deadline.month - 1,
          a.deadline.day
        ).getTime()
      : null;
    const deadlineB = b.deadline
      ? new Date(
          b.deadline.year,
          b.deadline.month - 1,
          b.deadline.day
        ).getTime()
      : null;

    // Tasks with no deadline should come last
    if (!deadlineA && !deadlineB) {
      return 0;
    } else if (!deadlineA) {
      return 1;
    } else if (!deadlineB) {
      return -1;
    }

    // Sort by deadline ascending
    return deadlineA - deadlineB;
  });
};
//---------------------------------------------------------------------
export const list1 = [];
export const list2 = [];
export const list3 = [];
export const list4 = [];
//---------------------------------------------------------------------
export const findListByPriority = (priority) => {
  switch (priority) {
    case "HIGH":
      return list2;
    case "MID":
      return list3;
    case "LOW":
      return list4;
    default:
      return null;
  }
};
//---------------------------------------------------------------------
export const findIndexForTaskInList = (task, list) => {
  // Find the correct position in the list based on the deadline
  const taskDeadline = task.deadline ? new Date(task.deadline).getTime() : null;

  for (let i = 0; i < list.length; i++) {
    const currentTaskDeadline = list[i].deadline
      ? new Date(list[i].deadline).getTime()
      : null;

    if (
      !currentTaskDeadline ||
      (taskDeadline && taskDeadline < currentTaskDeadline)
    ) {
      return i;
    }
  }

  return list.length;
};
//---------------------------------------------------------------------
export const emptyLists = () => {
  list1.length = 0;
  list2.length = 0;
  list3.length = 0;
  list4.length = 0;

  return null;
};
//---------------------------------------------------------------------
export const sortAndCombineLists = () => {
  sortByDeadline(list1);
  sortByDeadline(list2);
  sortByDeadline(list3);
  sortByDeadline(list4);

  const sortedTasks = [...list1, ...list2, ...list3, ...list4];

  return sortedTasks;
};
//---------------------------------------------------------------------
export const removeTaskFromList = (taskToRemove) => {
  const oldPriorityList = findListByPriority(taskToRemove.priority);

  const taskIndexInOldList = oldPriorityList.findIndex(
    (task) => task.id === taskToRemove.id
  );
  if (taskIndexInOldList !== -1) {
    oldPriorityList.splice(taskIndexInOldList, 1);
  }

  return null;
};
//---------------------------------------------------------------------
export const addTaskToSortedList = (task, priority) => {
  const list = findListByPriority(priority);

  // Find the correct position in the new list based on the deadline
  const index = findIndexForTaskInList(task, list);

  // Insert the task at the correct position in the new list
  list.splice(index, 0, task);

  return null;
};
//---------------------------------------------------------------------
export const isInThePast = (day, month, year) => {
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  return (
    year < currentYear ||
    (year === currentYear && month < currentMonth) ||
    (year === currentYear && month === currentMonth && day < currentDay)
  );
};
//---------------------------------------------------------------------
export const hasDeadline = (tasks, day, month, year) => {
  return tasks.some(
    (task) =>
      task.deadline &&
      task.deadline.day === day &&
      task.deadline.month === month + 1 &&
      task.deadline.year === year
  );
};
//---------------------------------------------------------------------
export const colorDipDarkBlue = "#2d3250";
export const colorBoneWhite = "#f5e8c7";
export const colorBlue = "#0a58ca";
export const colorLightBlue = "#6ea8fe";
export const colorRed = "#b02a37";
export const colorLightRed = "#ea868f";
export const colorGreen = "#146c43";
export const colorLightGreen = "#75b798";
//---------------------------------------------------------------------
