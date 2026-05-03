const demoData = {
  organize: {
    kicker: "Organize",
    title: "Keep prompts, versions, and app concepts in one place.",
    description:
      "Build a shared system for prompt drafts, finished screens, and launch-ready assets so everyone starts from the same source.",
    duration: "7s loop",
    video: "https://a.storyblok.com/f/338771/x/d30c7a27b0/air_ui_organize_03_medium.mp4",
  },
  approve: {
    kicker: "Approve",
    title: "Review flows quickly and decide what ships.",
    description:
      "Give teams a sharper feedback loop around app directions, copy, and launch assets without breaking momentum.",
    duration: "9s loop",
    video: "https://a.storyblok.com/f/338771/x/cd7d9a230a/air_ui_approve_04_medium.mp4",
  },
  multiply: {
    kicker: "Multiply",
    title: "Take one strong concept and adapt it everywhere.",
    description:
      "Resize, remix, and publish a winning app idea across onboarding, listings, campaigns, and new releases.",
    duration: "10s loop",
    video: "https://a.storyblok.com/f/338771/x/57c02fc95a/air_ui_muliply_04_medium.mp4",
  },
  search: {
    kicker: "Search",
    title: "Find the right concept with conversational recall.",
    description:
      "Search by intent, surface past ideas, and recover the exact build direction you want to bring back.",
    duration: "8s loop",
    video: "https://a.storyblok.com/f/338771/x/18808f9221/air_ui_convsearch_04_compress1.mp4",
  },
  analytics: {
    kicker: "Analytics",
    title: "See which app directions are actually working.",
    description:
      "Compare concepts, understand what performs, and push the ideas that deserve more distribution.",
    duration: "8s loop",
    video: "https://a.storyblok.com/f/338771/x/bec2f65751/air_ui_performance_04_compress1.mp4",
  },
  agents: {
    kicker: "Agents",
    title: "Let AI carry the boring operational work.",
    description:
      "Summaries, next steps, and concept handoffs stay attached to the build so people can keep moving.",
    duration: "8s loop",
    video: "https://a.storyblok.com/f/338771/x/09c401eb60/air_ui_agenticchat_04_compress1.mp4",
  },
};

const demoTabs = Array.from(document.querySelectorAll("[data-demo-tab]"));
const kicker = document.getElementById("demo-kicker");
const title = document.getElementById("demo-title");
const description = document.getElementById("demo-description");
const duration = document.getElementById("demo-duration");
const video = document.getElementById("demo-video");
const videoSource = document.getElementById("demo-video-source");
const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.getElementById("mobile-menu");

let activeKey = "organize";
let rotationTimer;

function renderDemo(key) {
  const item = demoData[key];

  if (!item || !video || !videoSource || !kicker || !title || !description || !duration) {
    return;
  }

  activeKey = key;
  kicker.textContent = item.kicker;
  title.textContent = item.title;
  description.textContent = item.description;
  duration.textContent = item.duration;

  if (videoSource.getAttribute("src") !== item.video) {
    videoSource.setAttribute("src", item.video);
    video.load();
    const playAttempt = video.play();

    if (playAttempt && typeof playAttempt.catch === "function") {
      playAttempt.catch(() => {});
    }
  }

  demoTabs.forEach((tab) => {
    const isActive = tab.dataset.demoTab === key;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });
}

function startRotation() {
  window.clearInterval(rotationTimer);

  rotationTimer = window.setInterval(() => {
    const keys = Object.keys(demoData);
    const currentIndex = keys.indexOf(activeKey);
    const nextKey = keys[(currentIndex + 1) % keys.length];
    renderDemo(nextKey);
  }, 7000);
}

demoTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    renderDemo(tab.dataset.demoTab || "organize");
    startRotation();
  });
});

menuButton?.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!expanded));
  mobileMenu.hidden = expanded;
});

renderDemo(activeKey);
startRotation();
