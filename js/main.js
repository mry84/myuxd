/* ==========================================================================
   myuxd.work — Main Script
   Vanilla JS. No dependencies.
   Handles: theme toggle, nav dropdown, mobile menu, scroll reveal.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------
     Theme toggle (persisted via localStorage)
     Initial theme is set pre-paint by an inline script in <head>.
     ------------------------------------------------------------------ */
  const root = document.documentElement;
  const themeToggle = document.querySelector("[data-theme-toggle]");

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      /* storage unavailable — fail silently */
    }
    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      setTheme(current === "dark" ? "light" : "dark");
    });
  }

  /* ------------------------------------------------------------------
     Work dropdown (desktop hover + click, keyboard accessible)
     ------------------------------------------------------------------ */
  const dropdown = document.querySelector("[data-dropdown]");
  if (dropdown) {
    const toggle = dropdown.querySelector("[data-dropdown-toggle]");
    const menu = dropdown.querySelector("[data-dropdown-menu]");

    function openDropdown() {
      toggle.setAttribute("aria-expanded", "true");
      menu.setAttribute("data-open", "true");
    }
    function closeDropdown() {
      toggle.setAttribute("aria-expanded", "false");
      menu.setAttribute("data-open", "false");
    }

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      isOpen ? closeDropdown() : openDropdown();
    });

    // Hover intent on desktop (pointer: fine)
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      dropdown.addEventListener("mouseenter", openDropdown);
      dropdown.addEventListener("mouseleave", closeDropdown);
    }

    // Close on outside click / Escape
    document.addEventListener("click", function (e) {
      if (!dropdown.contains(e.target)) closeDropdown();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeDropdown();
    });
  }

  /* ------------------------------------------------------------------
     Mobile menu toggle
     ------------------------------------------------------------------ */
  const hamburger = document.querySelector("[data-nav-toggle]");
  const navMenu = document.querySelector("[data-nav-menu]");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      const isOpen = navMenu.getAttribute("data-open") === "true";
      navMenu.setAttribute("data-open", String(!isOpen));
      hamburger.setAttribute("aria-expanded", String(!isOpen));
    });

    // Close mobile menu when a link is tapped
    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.setAttribute("data-open", "false");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ------------------------------------------------------------------
     Scroll-triggered reveal via Intersection Observer
     Respects prefers-reduced-motion (elements shown immediately).
     ------------------------------------------------------------------ */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealEls = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }
})();
