const tabButtons = Array.from(document.querySelectorAll("[data-tab]"));
const tabPanels = Array.from(document.querySelectorAll("[data-panel]"));
const rail = document.querySelector("[data-rail]");
const railButtons = Array.from(document.querySelectorAll("[data-rail-dir]"));
const scrollTargetButton = document.querySelector("[data-scroll-target]");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const activeTab = button.dataset.tab;

    tabButtons.forEach((tab) => {
      const isActive = tab === button;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });

    tabPanels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.panel === activeTab);
    });
  });
});

railButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!rail) return;

    const direction = Number(button.dataset.railDir || 1);
    const distance = Math.min(rail.clientWidth * 0.9, 420) * direction;

    rail.scrollBy({ left: distance, behavior: "smooth" });
  });
});

scrollTargetButton?.addEventListener("click", () => {
  const targetId = scrollTargetButton.dataset.scrollTarget;
  const target = targetId ? document.getElementById(targetId) : null;

  target?.scrollIntoView({ behavior: "smooth", block: "start" });
});
