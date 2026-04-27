# Kanban Task Management

A simple kanban board for managing tasks across **TODO**, **DOING**, and **DONE** columns. Tasks are persisted in the browser's localStorage, with a fallback to a public API and seed data on first load. Supports light/dark themes, task priority, and a responsive layout for desktop, tablet, and mobile.

## Live demo

🔗 **Netlify:** [https://chimwala-kanban.netlify.app/](https://your-site-name.netlify.app)

🎥 **Loom walkthrough:** [https://www.loom.com/share/508c9714a0324959ab6638fafcc0f623](https://www.loom.com/share/your-video-id)

## Features

- Add, edit, and delete tasks
- Move tasks between TODO / DOING / DONE
- Set task priority (low / medium / high) — shown as a coloured dot on each card
- Light and dark theme toggle, persisted across sessions
- Collapsible sidebar on desktop, slide-in sidebar with overlay on mobile
- Tasks saved to localStorage so they survive page refreshes
- Initial tasks pulled from a public API on first load, with a built-in fallback if the API is unavailable

## Tech stack

- HTML, CSS, vanilla JavaScript (ES modules)
- No build tools, no frameworks
- localStorage for persistence
- Public Kanban API for initial seed data
