// Clock
function updateClock() {
  const el = document.querySelector(".top-clock");
  if (!el) return;
  const now = new Date();
  const options = { hour: "2-digit", minute: "2-digit" };
  el.textContent = now.toLocaleTimeString([], options);
}
setInterval(updateClock, 1000);
updateClock();

// Single active window loader (Hybrid H2)
const appMap = {
  home: "home",
  about: "about.html",
  socials: "socials.html",
  blog: "blog-external"
};

async function loadApp(appKey) {
  const shell = document.querySelector(".window-shell");
  const frame = document.querySelector(".window-inner");
  const titleEl = document.querySelector(".window-title");
  const badgeEl = document.querySelector(".window-badge");

  if (!shell || !frame) return;

  // Active state on dock
  document.querySelectorAll(".dock-item").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.app === appKey);
  });

  // Home is built-in
  if (appKey === "home") {
    titleEl.textContent = "KatnissOS · Desktop overview";
    badgeEl.textContent = "Kat · she/her · Quantum Drift";
    frame.innerHTML = document.querySelector("#home-template").innerHTML;
    shell.classList.remove("glow-pulse");
    void shell.offsetWidth;
    shell.classList.add("glow-pulse");
    return;
  }

  // Blog external
  if (appKey === "blog") {
    window.open("http://blog.katnissxd.xyz", "_blank");
    return;
  }

  const url = appMap[appKey];
  if (!url) return;

  try {
    const res = await fetch(url);
    const html = await res.text();
    frame.innerHTML = html;
    titleEl.textContent =
      appKey === "about"
        ? "KatnissOS · About Kat"
        : appKey === "socials"
        ? "KatnissOS · Socials & presence"
        : "KatnissOS";

    badgeEl.textContent =
      appKey === "about"
        ? "Profile · she/her"
        : appKey === "socials"
        ? "Live presence · Discord"
        : "KatnissOS";

    shell.classList.remove("glow-pulse");
    void shell.offsetWidth;
    shell.classList.add("glow-pulse");

    if (appKey === "socials") {
      initLanyard();
    }
  } catch (err) {
    frame.innerHTML = `
      <div class="page-fragment">
        <h1>Something glitched.</h1>
        <p class="muted">I couldn’t load that window just now. Try again in a moment.</p>
      </div>
    `;
  }
}

// Dock click handling
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".dock-item");
  if (!btn) return;
  const appKey = btn.dataset.app;
  if (!appKey) return;
  loadApp(appKey);
});

// Lanyard presence
async function initLanyard() {
  const statusDot = document.querySelector(".presence-status");
  const activityEl = document.querySelector("[data-lanyard-activity]");
  const usernameEl = document.querySelector("[data-lanyard-username]");
  if (!statusDot || !activityEl) return;

  const DISCORD_ID = "1454841600974000159";
  const url = `https://api.lanyard.rest/v1/users/${1454841600974000159}`;

  if (usernameEl) {
    usernameEl.textContent = "@katnissxd";
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!data.success) {
      activityEl.textContent = "Presence unavailable right now.";
      statusDot.style.background = "#6b7280";
      return;
    }

    const { discord_status, activities } = data.data;

    const statusColors = {
      online: "#22c55e",
      idle: "#facc15",
      dnd: "#ef4444",
      offline: "#6b7280"
    };
    statusDot.style.background = statusColors[discord_status] || "#6b7280";

    const activity = activities.find(a => a.type === 0) || activities[0];
    if (activity) {
      activityEl.textContent = `${activity.name}${activity.state ? " — " + activity.state : ""}`;
    } else {
      activityEl.textContent = "Just vibing in the background.";
    }
  } catch (err) {
    activityEl.textContent = "Presence unavailable right now.";
    statusDot.style.background = "#6b7280";
  }
}

// Initial load
document.addEventListener("DOMContentLoaded", () => {
  loadApp("home");
});
