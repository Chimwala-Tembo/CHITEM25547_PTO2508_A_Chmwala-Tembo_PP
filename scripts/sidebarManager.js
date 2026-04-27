/**
 * Manages the sidebar UI: desktop hide/show, mobile slide-in with overlay,
 * persisted hidden/visible state, and resize behaviour.
 */
export function setupSidebar() {
  const sidebar = document.querySelector(".side-bar");
  const layout = document.getElementById("layout");
  const hideBtn = document.getElementById("hide-sidebar-btn");
  const showBtn = document.getElementById("show-sidebar-btn");
  const closeBtn = document.getElementById("close-sidebar-btn");
  const mobileLogo = document.querySelector(".logo-mobile");
  const overlay = document.getElementById("sidebar-overlay");

  if (!sidebar || !layout) return;

  const STORAGE_KEY = "sidebarState";
  const MOBILE_BREAKPOINT = 768;

  const isMobile = () => window.innerWidth <= MOBILE_BREAKPOINT;

  function hideSidebar() {
    sidebar.classList.add("hidden");
    sidebar.classList.remove("show-sidebar");
    layout.classList.remove("with-sidebar");

    if (overlay) overlay.classList.remove("active");

    if (showBtn) {
      showBtn.style.display = isMobile() ? "none" : "block";
    }

    localStorage.setItem(STORAGE_KEY, "hidden");
  }

  function showSidebar() {
    sidebar.classList.remove("hidden");

    if (showBtn) showBtn.style.display = "none";

    if (isMobile()) {
      sidebar.classList.add("show-sidebar");
      if (overlay) overlay.classList.add("active");
    } else {
      layout.classList.add("with-sidebar");
    }

    localStorage.setItem(STORAGE_KEY, "visible");
  }

  function toggleSidebarMobile() {
    if (sidebar.classList.contains("show-sidebar")) {
      hideSidebar();
    } else {
      showSidebar();
    }
  }

  // Initial state: only auto-show on desktop unless user previously hid it.
  // On mobile, sidebar stays closed until the logo is tapped.
  const savedState = localStorage.getItem(STORAGE_KEY);
  if (!isMobile()) {
    if (savedState === "hidden") {
      hideSidebar();
    } else {
      showSidebar();
    }
  }

  // Event listeners
  if (hideBtn) hideBtn.addEventListener("click", hideSidebar);
  if (showBtn) showBtn.addEventListener("click", showSidebar);
  if (closeBtn) closeBtn.addEventListener("click", hideSidebar);
  if (mobileLogo) mobileLogo.addEventListener("click", toggleSidebarMobile);
  if (overlay) overlay.addEventListener("click", hideSidebar);

  // Handle window resize between desktop and mobile breakpoints.
  window.addEventListener("resize", () => {
    if (!isMobile()) {
      // Desktop: clean up mobile-only classes
      if (overlay) overlay.classList.remove("active");
      sidebar.classList.remove("show-sidebar");

      if (sidebar.classList.contains("hidden")) {
        if (showBtn) showBtn.style.display = "block";
        layout.classList.remove("with-sidebar");
      } else {
        if (showBtn) showBtn.style.display = "none";
        layout.classList.add("with-sidebar");
      }
    } else {
      // Mobile: layout always full-width, show button hidden
      layout.classList.remove("with-sidebar");
      if (showBtn) showBtn.style.display = "none";

      if (!sidebar.classList.contains("hidden")) {
        sidebar.classList.add("show-sidebar");
        if (overlay) overlay.classList.add("active");
      }
    }
  });
}
