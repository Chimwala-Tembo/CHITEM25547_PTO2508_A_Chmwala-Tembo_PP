import { openTaskModal } from "./modalHandlers.js";

/**
 * Create one task card element with a priority dot and title.
 * @param {Object} task
 * @returns {HTMLDivElement}
 */
export function createTaskElement(task) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task-div");

  const priority = task.priority || "medium";
  const dot = document.createElement("span");
  dot.classList.add("priority-dot", `priority-${priority}`);
  dot.setAttribute("aria-label", `${priority} priority`);
  taskDiv.appendChild(dot);

  const titleSpan = document.createElement("span");
  titleSpan.textContent = task.title;
  taskDiv.appendChild(titleSpan);

  taskDiv.addEventListener("click", () => {
    openTaskModal(task);
  });

  return taskDiv;
}
