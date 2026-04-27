import { fetchTasksFromApi } from "./utils/taskApi.js";
import {
  loadTasksFromStorage,
  saveTasksToStorage,
} from "./utils/localStorage.js";
import { initialTasks } from "./utils/initialData.js";
import { setupTheme } from "./utils/themeManager.js";
import { renderTasks, clearExistingTasks } from "./ui/render.js";
import {
  setupModalCloseHandler,
  setupNewTaskModalHandler,
} from "./ui/modalHandlers.js";
import { setupSidebar } from "./sidebarManager.js";

const statusEl = document.getElementById("status-message");

/**
 * Show a loading message in the status area.
 */
function showLoading() {
  statusEl.textContent = "Loading tasks";
  statusEl.classList.remove("error");
  statusEl.classList.add("loading");
}

/**
 * Show an error message in the status area.
 * @param {string} message
 */
function showError(message) {
  statusEl.textContent = message;
  statusEl.classList.remove("loading");
  statusEl.classList.add("error");
}

/**
 * Hide the status area.
 */
function hideStatus() {
  statusEl.classList.remove("loading", "error");
  statusEl.textContent = "";
}

/**
 * Initialise the task board.
 * Tries localStorage first, then API, falls back to initial data.
 */
async function initTaskBoard() {
  // Wire UI handlers first so even if data loading fails, modals/sidebar work.
  setupSidebar();
  setupTheme();
  setupModalCloseHandler();
  setupNewTaskModalHandler();

  let tasks = loadTasksFromStorage();

  if (!tasks || tasks.length === 0) {
    showLoading();
    try {
      const apiTasks = await fetchTasksFromApi();
      tasks = apiTasks.length > 0 ? apiTasks : initialTasks;
    } catch (error) {
      console.error("API fetch failed, using initial data:", error);
      tasks = initialTasks;
    }
    saveTasksToStorage(tasks);
  }

  try {
    clearExistingTasks();
    renderTasks(tasks);
    hideStatus();
  } catch (error) {
    console.error("Failed to render tasks:", error);
    showError("Failed to load tasks. Please refresh the page.");
  }
}

document.addEventListener("DOMContentLoaded", initTaskBoard);
