/**
 * Task API module — fetches tasks from the backend.
 */
const API_BASE_URL = "https://jsl-kanban-api.vercel.app/";

/**
 * Fetch all tasks from the backend API.
 * Maps to the local task shape and defaults priority to "medium"
 * since the public API doesn't return that field.
 * @returns {Promise<Array>}
 */
export async function fetchTasksFromApi() {
  try {
    const response = await fetch(API_BASE_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch tasks. Status: ${response.status}`);
    }

    const apiTasks = await response.json();

    return apiTasks.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority || "medium",
    }));
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
}
