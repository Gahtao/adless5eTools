// Define an array of class names to be removed
var classesToRemove = [
    ".cancer__wrp-leaderboard.cancer__anchor",
    ".w-100.no-shrink"
    // Add more class names here as needed
];

// Function to remove elements matching the specified class names
function removeElements() {
    classesToRemove.forEach(function(className) {
        var elements = document.querySelectorAll(className);
        elements.forEach(function(element) {
            element.parentNode.removeChild(element);
        });
    });
}

// Function to continuously check for the presence of elements
function checkForElements() {
    // Check if elements are present
    if (document.body) {
        removeElements(); // Remove elements initially present on the page
        
        // Create a MutationObserver to monitor DOM changes
        var observer = new MutationObserver(function(mutationsList, observer) {
            // Iterate through the mutations
            for(var mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    // If new elements are added to the DOM, remove them
                    removeElements();
                }
            }
        });

        // Start observing changes in the DOM
        observer.observe(document.body, { subtree: true, childList: true });
    } else {
        // Elements not found, retry after a short delay
        setTimeout(checkForElements, 100); // Retry after 100 milliseconds
    }
}

// Start checking for elements
checkForElements();
