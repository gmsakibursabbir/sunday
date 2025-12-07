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
        const isOpen =
          content.style.maxHeight && content.style.maxHeight !== "0px";

        // 1. Close ALL other items first (Accordion behavior)
        document.querySelectorAll(".faq-item").forEach((otherItem) => {
          if (otherItem !== item) {
            const otherContent = otherItem.querySelector(".faq-content");
            const otherButton = otherItem.querySelector("button");
            const otherIcon = otherButton.querySelector("svg");

            // Reset styles for closed state
            otherContent.style.maxHeight = "0px";
            otherContent.style.opacity = "0";
            otherItem.classList.remove("bg-[#008bd2]", "text-white");
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
          item.classList.add("bg-[#008bd2]", "text-white");
          button.classList.remove("text-gray-900");
          button.classList.add("text-white");
          icon.classList.remove("text-gray-900");
          icon.classList.add("rotate-180", "text-white");
          content.style.maxHeight = content.scrollHeight + "px";
          content.style.opacity = "1";
        } else {
          // Close (if clicking the already open one)
          item.classList.remove("bg-[#008bd2]", "text-white");
          item.classList.add("bg-white");
          button.classList.remove("text-white");
          button.classList.add("text-gray-900");
          icon.classList.remove("rotate-180", "text-white");
          icon.classList.add("text-gray-900");
          content.style.maxHeight = "0px";
          content.style.opacity = "0";
        }
      }
