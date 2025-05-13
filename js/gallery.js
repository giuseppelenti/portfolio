/**
 * Gallery.js - Handles project filtering and gallery functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize project filters
    initProjectFilters();
});

/**
 * Project Filtering Functionality
 */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (!filterButtons.length || !projectItems.length) return;
    
    // Add click event to each filter button
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get the filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Filter the projects
            filterProjects(filterValue, projectItems);
        });
    });
}

/**
 * Filter projects based on the selected category
 * @param {string} filter - The filter category
 * @param {NodeList} projects - The project items to filter
 */
function filterProjects(filter, projects) {
    projects.forEach(project => {
        // Get project categories
        const categories = project.getAttribute('data-category').split(' ');
        
        // Show/hide based on filter
        if (filter === 'all' || categories.includes(filter)) {
            project.style.display = 'block';
            
            // Add fade-in animation
            project.classList.add('animate-fadeIn');
            setTimeout(() => {
                project.classList.remove('animate-fadeIn');
            }, 500);
        } else {
            project.style.display = 'none';
        }
    });
}
