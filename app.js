

// Debounce function to limit the number of calls
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Check if an element is in view
function isElementInView(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Apply animation class when elements are in view
function checkScroll() {
    const elements = document.querySelectorAll('.team-title, .project-title'); // Combine both classes
    elements.forEach((el) => {
        if (isElementInView(el)) {
            el.classList.add('animate'); // Add the animation class
        } else {
            el.classList.remove('animate'); // Remove the animation class when out of view
        }
    });
}

// Listen for scroll events with debouncing
window.addEventListener('scroll', debounce(checkScroll, 100)); // Limit to 100ms delay

// Check immediately on page load
document.addEventListener('DOMContentLoaded', () => {
    checkScroll();
});

// Also listen for resize events in case of mobile view changes
window.addEventListener('resize', debounce(() => {
    checkScroll();
}, 100)); // Limit to 100ms delay for resize



// for animated text in home page

const textElement = document.getElementById('text');
const messages = ["We Develop", "We Discover", "We Create", "We Inspire", "We Empower"];
let index = 0;

// Function to change the text
function changeText() {
    // Change the text content at 75% of the animation duration (4.5 seconds)
    setTimeout(() => {
        index = (index + 1) % messages.length; // Move to the next message
        textElement.textContent = messages[index];
    }, 3700); // 75% of 6 seconds
}

// Call changeText every 6 seconds
setInterval(changeText, 6000);

// Initial load
changeText();







// Remove loading screen after animations
window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.classList.remove('loading-active');
        document.getElementById('loading').style.display = 'none';
    }, 3000); // Matches animation duration
});













    const glow = document.querySelector('.glow');

// Function to update the glow position
    function updateGlowPosition(e) {
        const x = e.pageX;
        const y = e.pageY;

        // Update the position of the glow
        glow.style.left = `${x}px`;
        glow.style.top = `${y}px`;
    }

    // Use requestAnimationFrame to ensure smooth updates
    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            updateGlowPosition(e);
        });
    });






    // Function to start the typewriter effect in contact
function typeText(elementId, text, delay = 100, callback) {
    const element = document.getElementById(elementId);
    let index = 0;

    // Create a container to hold text and cursor
    const textContainer = document.createElement("span");
    element.appendChild(textContainer);

    // Create a cursor element
    const cursor = document.createElement("span");
    cursor.classList.add("cursor");
    element.appendChild(cursor);

    // Typing effect
    const interval = setInterval(() => {
        if (index < text.length) {
            textContainer.textContent += text[index];
            index++;
        } else {
            clearInterval(interval);
            cursor.remove(); // Remove cursor after typing
            if (callback) callback(); // Trigger the callback for the next typing effect
        }
    }, delay);
}

// IntersectionObserver to trigger typewriter effect on scroll
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Element has come into view, start the typing effect
            typeText("auto-typing-paragraph", "Leave a message or schedule a call!!", 65);
            observer.unobserve(entry.target); // Stop observing once the effect is triggered
        }
    });
}, { threshold: 0.5 }); // Trigger when 50% of the element is visible

// Start the first typewriter effect immediately
typeText("auto-typing-heading", "Know more about us!", 65, () => {
    const paragraph = document.getElementById("auto-typing-paragraph");
    paragraph.style.visibility = "visible"; // Make paragraph visible after first effect
    observer.observe(paragraph); // Observe the paragraph element for scroll effect
});
