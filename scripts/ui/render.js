import { createTaskElement } from "./taskElement.js";

// Lookup table mapping each task status to the heading element that
// displays its count and the prefix shown next to that count.
// Adding a fourth column later means adding one entry here, nothing else.
const COLUMN_HEADINGS = {
  todo: { id: "toDoText", label: "TODO" },
  doing: { id: "doingText", label: "DOING" },
  done: { id: "doneText", label: "DONE" },
};

/**
 * Empty every task column on the board.
 * Uses replaceChildren() rather than setting innerHTML to "" so that
 * the browser does not have to invoke the HTML parser on a blank string.
 */
export function clearExistingTasks() {
  for (const container of document.querySelectorAll(".tasks-container")) {
    container.replaceChildren();
  }
}

/**
 * Bucket an array of tasks into groups keyed by status.
 * Doing this once up front means we avoid running .filter() three
 * separate times to count and render each column.
 *
 * @param {Array<Object>} tasks
 * @returns {Object<string, Array<Object>>}
 */
function groupTasksByStatus(tasks) {
  return tasks.reduce((buckets, task) => {
    (buckets[task.status] ||= []).push(task);
    return buckets;
  }, {});
}

/**
 * Update the "TODO (n)", "DOING (n)", "DONE (n)" headings using the
 * pre-grouped task buckets. Headings that are missing from the DOM
 * are skipped silently rather than throwing.
 *
 * @param {Object<string, Array<Object>>} grouped
 */
function refreshColumnCounts(grouped) {
  for (const [status, { id, label }] of Object.entries(COLUMN_HEADINGS)) {
    const heading = document.getElementById(id);
    if (!heading) continue;

    const count = (grouped[status] || []).length;
    heading.textContent = `${label} (${count})`;
  }
}

/**
 * Wipe the board and repaint it from a list of tasks.
 * Each task is dropped into the column whose data-status attribute
 * matches its own status. Tasks with an unknown status are ignored.
 *
 * @param {Array<Object>} tasks
 */
export function renderTasks(tasks) {
  clearExistingTasks();

  const grouped = groupTasksByStatus(tasks);

  for (const [status, statusTasks] of Object.entries(grouped)) {
    const column = document.querySelector(
      `.column-div[data-status="${status}"] .tasks-container`,
    );
    if (!column) continue;

    for (const task of statusTasks) {
      column.appendChild(createTaskElement(task));
    }
  }

  refreshColumnCounts(grouped);
}
