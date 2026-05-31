/**
 * Online Exam Platform - Shared System Core Scripts
 * Coordinates theme switching, ticking clocks, mobile responsive menus, and page shells.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Themes
  initThemeSystem();

  // 2. Initialize Realtime Clock & Date
  initHeaderClock();

  // 3. Initialize Mobile Navigation Menus
  initMobileMenu();

  // 4. Connect Universal Navigation Event Listeners
  initGlobalNavigation();

  // 5. Update Profile Avatars in Headers
  updateHeaderProfile();
});

/* ==========================================
   THEME SYSTEM TRANSITIONS
   ========================================== */
function initThemeSystem() {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("selectedTheme") || "day";
  
  // Apply saved theme
  applyTheme(savedTheme);

  // Wire up theme selector triggers if they exist
  // Supporting both a cycle toggle or standard individual mode selectors
  const themeTogglers = document.querySelectorAll("[data-theme-select]");
  themeTogglers.forEach(btn => {
    btn.addEventListener("click", () => {
      const selected = btn.getAttribute("data-theme-select");
      applyTheme(selected);
    });
  });
}

function applyTheme(themeName) {
  const root = document.documentElement;
  
  // Remove all theme classes
  root.classList.remove("theme-day", "theme-night", "theme-warm");
  
  // Apply specific theme class
  if (themeName !== "day") {
    root.classList.add(`theme-${themeName}`);
  }
  
  // Store preference
  localStorage.setItem("selectedTheme", themeName);

  // Sync active states on theme UI indicators
  document.querySelectorAll("[data-theme-select]").forEach(btn => {
    const val = btn.getAttribute("data-theme-select");
    if (val === themeName) {
      btn.classList.add("border-theme-primary", "text-theme-primary", "bg-theme-surface-hover");
      btn.classList.remove("border-transparent");
    } else {
      btn.classList.remove("border-theme-primary", "text-theme-primary", "bg-theme-surface-hover");
      btn.classList.add("border-transparent");
    }
  });
}

/* ==========================================
   LIVE REALTIME TICKING HUD
   ========================================== */
function initHeaderClock() {
  const timeEl = document.getElementById("header-time");
  const dateEl = document.getElementById("header-date");

  if (!timeEl && !dateEl) return;

  function tick() {
    const now = new Date();
    
    // Time format: HH:MM:SS AM/PM
    if (timeEl) {
      timeEl.textContent = now.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      });
    }

    // Date format: Day, Month Date, Year (e.g. Sunday, May 31, 2026)
    if (dateEl) {
      dateEl.textContent = now.toLocaleDateString(undefined, {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    }
  }

  tick(); // Execute instantly
  setInterval(tick, 1000); // Tick every second
}

/* ==========================================
   MOBILE MENU DRAWER ANIMATIONS
   ========================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu-container");

  if (!toggleBtn || !mobileMenu) return;

  toggleBtn.addEventListener("click", () => {
    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
    toggleBtn.setAttribute("aria-expanded", !isExpanded);
    
    if (isExpanded) {
      // Collapse
      mobileMenu.classList.add("hidden");
    } else {
      // Expand
      mobileMenu.classList.remove("hidden");
    }
  });

  // Close mobile menu if window is resized past mobile threshold
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768 && !mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden");
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  });
}

/* ==========================================
   NAVIGATION BACK BUTTON ACTIONS
   ========================================== */
function initGlobalNavigation() {
  // Bind actions to back buttons
  const backButtons = document.querySelectorAll(".btn-back");
  backButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      
      // Check if referrer is inside the same site, otherwise fallback to index or dashboard
      if (document.referrer && document.referrer.includes(window.location.host)) {
        window.history.back();
      } else {
        // Fallback to dashboard or index
        const loc = window.location.pathname;
        if (loc.includes("index") || loc === "/" || loc.endsWith("/")) {
          // Already home
        } else {
          window.location.href = "dashboard.html";
        }
      }
    });
  });
}

/* ==========================================
   HEADER AVATAR RENDERING
   ========================================== */
function updateHeaderProfile() {
  const avatarEl = document.getElementById("header-avatar");
  const userNameEl = document.getElementById("header-username");
  const avatarMob = document.getElementById("header-avatar-mobile");
  const userNameMob = document.getElementById("header-username-mobile");

  if (!avatarEl && !userNameEl && !avatarMob && !userNameMob) return;

  if (window.ExamDB) {
    const profile = window.ExamDB.getUserProfile();
    
    // Set text label
    if (userNameEl) {
      userNameEl.textContent = profile.name.split(" ")[0]; // First name only
    }
    if (userNameMob) {
      userNameMob.textContent = profile.name; // Full name for mobile drawer
    }

    // SVG shapes mapping
    if (avatarEl) {
      const avatarSvg = getAvatarSvg(profile.avatar);
      avatarEl.innerHTML = avatarSvg;
    }
    if (avatarMob) {
      const avatarSvg = getAvatarSvg(profile.avatar);
      avatarMob.innerHTML = avatarSvg;
    }
  }
}

// Global Avatar SVGs helper mapping for neat client usage
function getAvatarSvg(avatarId) {
  const colors = {
    "avatar-1": ["#3b82f6", "#1d4ed8"], // Blue
    "avatar-2": ["#ec4899", "#be185d"], // Pink
    "avatar-3": ["#10b981", "#047857"], // Emerald
    "avatar-4": ["#f59e0b", "#b45309"], // Amber
    "avatar-5": ["#8b5cf6", "#6d28d9"]  // Purple
  };

  const activeColor = colors[avatarId] || colors["avatar-3"];

  return `
    <svg class="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-${avatarId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${activeColor[0]}" />
          <stop offset="100%" stop-color="${activeColor[1]}" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="url(#grad-${avatarId})" />
      <!-- Head -->
      <circle cx="50" cy="40" r="18" fill="white" fill-opacity="0.9" />
      <!-- Torso -->
      <path d="M22 80 C22 62, 34 58, 50 58 C66 58, 78 62, 78 80" fill="white" fill-opacity="0.9" />
    </svg>
  `;
}

// Expose globally
window.getAvatarSvg = getAvatarSvg;
