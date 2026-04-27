// Persistence layer for the kanban board.
// Centralises every read/write so the storage key is owned in one place
// and consumers never have to know how the data is encoded.

const TASKS_KEY = "kanban_tasks";

/**
 * Serialise the given list of tasks as JSON and write it to localStorage,
 * replacing whatever was previously held under the tasks key.
 *
 * @param {Array<Object>} tasks - the complete task list to persist
 */
export const saveTasksToStorage = (tasks) => {
  const payload = JSON.stringify(tasks);
  window.localStorage.setItem(TASKS_KEY, payload);
};

/**
 * Pull the persisted task list back out of localStorage.
 *
 * Returns an empty array in two cases:
 *   1. Nothing has been saved yet on this origin.
 *   2. The stored value is no longer valid JSON — for example, if it was
 *      hand-edited via DevTools. Failing soft here keeps the app usable
 *      instead of throwing on the very first call at startup.
 *
 * @returns {Array<Object>}
 */
export const loadTasksFromStorage = () => {
  const raw = window.localStorage.getItem(TASKS_KEY);

  if (raw === null) return [];

  try {
    return JSON.parse(raw);
  } catch {
    console.warn("Stored tasks were corrupted; starting with an empty list.");
    return [];
  }
};
