document.addEventListener("DOMContentLoaded", function () {
    const viewProjectLinks = document.querySelectorAll(".view-project");
    const modals = document.querySelectorAll(".case-study-modal");
    const closeButtons = document.querySelectorAll(".close-modal");

    // Open modal when clicking "View Project"
    viewProjectLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const modalId = this.getAttribute("href");
            const modal = document.querySelector(modalId);

            if (modal) {
                modal.classList.add("show"); // Add 'show' class to display modal
                document.body.style.overflow = "hidden"; // Prevent scrolling
            }
        });
    });

    // Close modal when clicking the close button
    closeButtons.forEach(button => {
        button.addEventListener("click", function () {
            const modal = this.closest(".case-study-modal");
            modal.classList.remove("show"); // Remove 'show' class to hide modal
            document.body.style.overflow = ""; // Restore scrolling
        });
    });

    // Close modal when clicking outside the content
    modals.forEach(modal => {
        modal.addEventListener("click", function (e) {
            if (e.target === this) {
                this.classList.remove("show"); // Remove 'show' class to hide modal
                document.body.style.overflow = ""; // Restore scrolling
            }
        });
    });

    // Close modal with escape key
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            modals.forEach(modal => {
                if (modal.classList.contains("show")) {
                    modal.classList.remove("show"); // Remove 'show' class to hide modal
                    document.body.style.overflow = ""; // Restore scrolling
                }
            });
        }
    });
});
