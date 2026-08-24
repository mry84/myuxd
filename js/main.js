/* ==========================================================================
   myuxd.work — Main Script
   Vanilla JS. No dependencies.
   Handles: theme toggle, nav dropdown, mobile menu, scroll reveal,
            image lightbox.
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

  /* ------------------------------------------------------------------
     Image lightbox

     Any [data-lightbox] trigger opens its full-size image over the page.
     The trigger carries data-full (WebP) and data-full-fallback (PNG) so
     the overlay shows a higher-resolution file than the inline thumbnail.
     A trigger wrapping a .placeholder frame instead of an image expands the
     frame and its label, so pending screenshots behave like shipped ones.
     Closes on the X button, on a click outside the image, and on Escape.
     ------------------------------------------------------------------ */
  const lightboxTriggers = document.querySelectorAll("[data-lightbox]");

  if (lightboxTriggers.length) {
    let overlay = null;
    let overlayPicture = null;
    let overlaySource = null;
    let overlayImg = null;
    let overlayPlaceholder = null;
    let closeBtn = null;
    let lastFocused = null;

    // Built once, on first open — no cost to pages without images.
    function buildOverlay() {
      overlay = document.createElement("div");
      overlay.className = "lightbox";
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-modal", "true");
      overlay.setAttribute("aria-label", "Expanded image");
      overlay.hidden = true;

      closeBtn = document.createElement("button");
      closeBtn.type = "button";
      closeBtn.className = "lightbox__close";
      closeBtn.setAttribute("aria-label", "Close image");
      closeBtn.innerHTML = "&times;";

      const figure = document.createElement("div");
      figure.className = "lightbox__figure";

      overlayPicture = document.createElement("picture");
      overlaySource = document.createElement("source");
      overlaySource.type = "image/webp";
      overlayImg = document.createElement("img");
      overlayImg.className = "lightbox__img";

      overlayPlaceholder = document.createElement("div");
      overlayPlaceholder.className = "lightbox__placeholder";
      overlayPlaceholder.hidden = true;

      overlayPicture.appendChild(overlaySource);
      overlayPicture.appendChild(overlayImg);
      figure.appendChild(overlayPicture);
      figure.appendChild(overlayPlaceholder);
      overlay.appendChild(closeBtn);
      overlay.appendChild(figure);
      document.body.appendChild(overlay);

      closeBtn.addEventListener("click", closeLightbox);

      // Anything outside the image itself dismisses — the backdrop is the
      // overlay, so only clicks landing inside .lightbox__figure survive.
      overlay.addEventListener("click", function (e) {
        if (!e.target.closest(".lightbox__figure")) closeLightbox();
      });

      // Only the close button is focusable in here, so a Tab trap is just
      // "keep focus on it".
      overlay.addEventListener("keydown", function (e) {
        if (e.key === "Tab") {
          e.preventDefault();
          closeBtn.focus();
        }
      });
    }

    function openLightbox(trigger) {
      if (!overlay) buildOverlay();

      const inlinePlaceholder = trigger.querySelector(".placeholder");

      if (inlinePlaceholder) {
        overlayPlaceholder.textContent = inlinePlaceholder.textContent.trim();
        overlayPlaceholder.hidden = false;
        overlayPicture.hidden = true;
        overlay.setAttribute("aria-label", "Expanded placeholder");
      } else {
        const inlineImg = trigger.querySelector("img");
        const webp = trigger.getAttribute("data-full");
        const fallback =
          trigger.getAttribute("data-full-fallback") ||
          (inlineImg ? inlineImg.getAttribute("src") : "");

        overlaySource.srcset = webp || "";
        overlayImg.src = fallback;
        overlayImg.alt = inlineImg ? inlineImg.getAttribute("alt") || "" : "";
        overlayPicture.hidden = false;
        overlayPlaceholder.hidden = true;
        overlay.setAttribute("aria-label", "Expanded image");
      }

      lastFocused = document.activeElement;
      overlay.hidden = false;
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    }

    function closeLightbox() {
      if (!overlay || overlay.hidden) return;
      overlay.hidden = true;
      document.body.style.overflow = "";
      // Release the image so it isn't decoded in the background.
      overlaySource.srcset = "";
      overlayImg.removeAttribute("src");
      if (lastFocused && typeof lastFocused.focus === "function") {
        lastFocused.focus();
      }
    }

    lightboxTriggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        openLightbox(trigger);
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLightbox();
    });
  }
})();
