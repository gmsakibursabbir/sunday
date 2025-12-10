// FAQ
// Initialize the first item as open (to match the design)
document.addEventListener("DOMContentLoaded", () => {
  const firstItem = document.querySelector(".faq-item");
  if (firstItem) toggleFAQ(firstItem);

  // Attach event listeners to all FAQ items (not just buttons)
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.addEventListener("click", () => {
      toggleFAQ(item);
    });
  });
});

function toggleFAQ(item) {
  // 'item' is the .faq-item div
  const content = item.querySelector(".faq-content");
  const button = item.querySelector("button");
  const icon = button.querySelector("svg");

  // Check if this item is currently open
  const isOpen = content.style.maxHeight && content.style.maxHeight !== "0px";

  // 1. Close ALL other items first (Accordion behavior)
  document.querySelectorAll(".faq-item").forEach((otherItem) => {
    if (otherItem !== item) {
      const otherContent = otherItem.querySelector(".faq-content");
      const otherButton = otherItem.querySelector("button");
      const otherIcon = otherButton.querySelector("svg");

      // Reset styles for closed state
      otherContent.style.maxHeight = "0px";
      otherContent.style.opacity = "0";
      otherItem.classList.remove("faq-active");
      otherItem.classList.add("bg-white");
      otherButton.classList.remove("text-white");
      otherButton.classList.add("text-gray-900");
      otherIcon.classList.remove("rotate-180", "text-white");
      otherIcon.classList.add("text-gray-900");
    }
  });

  // 2. Toggle the clicked item
  if (!isOpen) {
    // Open
    item.classList.remove("bg-white");
    item.classList.add("faq-active");
    button.classList.remove("text-gray-900");
    button.classList.add("text-white");
    icon.classList.remove("text-gray-900");
    icon.classList.add("rotate-180", "text-white");
    content.style.maxHeight = content.scrollHeight + "px";
    content.style.opacity = "1";
  } else {
    // Close (if clicking the already open one)
    item.classList.remove("faq-active");
    item.classList.add("bg-white");
    button.classList.remove("text-white");
    button.classList.add("text-gray-900");
    icon.classList.remove("rotate-180", "text-white");
    icon.classList.add("text-gray-900");
    content.style.maxHeight = "0px";
    content.style.opacity = "0";
  }
}

// slider
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Splide
  var splide = new Splide("#eventSplide", {
    type: "slide", // Use 'loop' if you want infinite scrolling
    perPage: 3, // Default, but 'autoWidth' overrides this usually
    gap: "24px", // Matches your Tailwind gap-6
    arrows: false, // Hide default arrows (we use custom ones)
    pagination: false, // Hide dots
    autoWidth: true, // IMPORTANT: Respects your Tailwind max-w-[354px] classes
    drag: "free", // Allows smooth free dragging
    snap: true, // Snaps to slide on release
  });

  splide.mount();

  // Attach Custom Buttons
  var prevBtn = document.getElementById("customPrevBtn");
  var nextBtn = document.getElementById("customNextBtn");

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", function () {
      splide.go("<"); // Move one slide left
    });

    nextBtn.addEventListener("click", function () {
      splide.go(">"); // Move one slide right
    });
  }
});

// Mobile Menu
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuOpen = document.getElementById("mobile-menu-open");
  const mobileMenuClose = document.getElementById("mobile-menu-close");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");

  function openMobileMenu() {
    mobileMenu.classList.add("active");
    mobileMenuOverlay.classList.add("active");
    document.body.classList.add("mobile-menu-open");
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove("active");
    mobileMenuOverlay.classList.remove("active");
    document.body.classList.remove("mobile-menu-open");
  }

  if (mobileMenuOpen) {
    mobileMenuOpen.addEventListener("click", openMobileMenu);
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener("click", closeMobileMenu);
  }

  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener("click", closeMobileMenu);
  }

  // Close menu on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
      closeMobileMenu();
    }
  });

  // Close menu when clicking a link
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu-link");
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      closeMobileMenu();
    });
  });
});

// Flatpickr Integration
// Imports removed in favor of CDN for browser compatibility
// import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.min.css";
// import { French } from "flatpickr/dist/l10n/fr.js";

document.addEventListener("DOMContentLoaded", function () {
  const dateContainer = document.getElementById("date-picker-container");
  const dateText = document.getElementById("date-text");

  if (dateContainer && typeof flatpickr !== "undefined") {
    flatpickr(dateContainer, {
      locale: "fr", // Use the locale string since script is loaded
      dateFormat: "d F", // e.g., 08 Août
      disableMobile: "true",
      onChange: function (selectedDates, dateStr, instance) {
        if (dateText) {
          dateText.textContent = dateStr;
          dateText.classList.remove("text-[#828282]");
          dateText.classList.add("text-[#101010]");
        }
      },
    });
  }
});

// Read More Functionality
document.addEventListener("DOMContentLoaded", function () {
  const readMoreBtn = document.getElementById("read-more-btn");
  const eventDescription = document.getElementById("event-description");

  if (readMoreBtn && eventDescription) {
    readMoreBtn.addEventListener("click", function () {
      eventDescription.classList.toggle("line-clamp-4");

      if (eventDescription.classList.contains("line-clamp-4")) {
        readMoreBtn.textContent = "Lire plus";
      } else {
        readMoreBtn.textContent = "Lire moins";
      }
    });
  }
});

// Generic Accordion
document.addEventListener("DOMContentLoaded", function () {
  const triggers = document.querySelectorAll(".accordion-trigger");

  // Initialize default active items
  triggers.forEach((trigger) => {
    if (trigger.classList.contains("default-active")) {
      const targetId = trigger.getAttribute("data-target");
      const content = document.querySelector(targetId);
      const icon = trigger.querySelector(".accordion-icon");

      if (content) {
        content.classList.remove("hidden");
      }
      if (icon) {
        icon.classList.add("rotate-180");
        // Ensure icon has transition class if not present in HTML, though we added it there.
        icon.classList.add("transition-transform", "duration-300");
      }
    }
  });

  // Event Delegation for Accordion Triggers
  document.addEventListener("click", function (e) {
    const trigger = e.target.closest(".accordion-trigger");
    if (!trigger) return;

    const targetId = trigger.getAttribute("data-target");
    const content = document.querySelector(targetId);
    if (!content) return;

    const icon = trigger.querySelector(".accordion-icon");

    // Toggle Content
    content.classList.toggle("hidden");

    // Rotate Icon
    if (icon) {
      icon.classList.toggle("rotate-180");
    }
  });
});
