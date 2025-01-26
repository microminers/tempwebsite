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

function isElementInView(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

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

// Listen for scroll events
window.addEventListener('scroll', checkScroll);

// Check immediately on page load
checkScroll();


const phrases = ["Explore", "Innovate", "Discover", "Develop", "Inspire", "Empower", "Create"];
let currentIndex = 0;
const textElement = document.getElementById("animatedText");

// Set the initial text to the first phrase
textElement.textContent = phrases[currentIndex];

function changeText() {
    // Increment the index
    currentIndex = (currentIndex + 1) % phrases.length;

    // Set the new text content
    textElement.textContent = phrases[currentIndex];

    // Reset the animation
    textElement.style.animation = 'none'; // Remove the animation
    textElement.offsetHeight; // Trigger a reflow
    textElement.style.animation = ''; // Reapply the animation
}
setInterval(changeText, 4000); 

window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.classList.remove('loading-active');
        document.getElementById('loading').style.display = 'none';
    }, 3000);
});

const glow = document.querySelector('.glow');

function updateGlowPosition(e) {
    const x = e.pageX;
    const y = e.pageY;
    glow.style.left = `${x}px`;
    glow.style.top = `${y}px`;
}

document.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => {
        updateGlowPosition(e);
    });
});

function typeText(elementId, text, delay = 100, callback) {
    const element = document.getElementById(elementId);
    let index = 0;
    const textContainer = document.createElement("span");
    element.appendChild(textContainer);
    const cursor = document.createElement("span");
    cursor.classList.add("cursor");
    element.appendChild(cursor);
    const interval = setInterval(() => {
        if (index < text.length) {
            textContainer.textContent += text[index];
            index++;
        } else {
            clearInterval(interval);
            cursor.remove();
            if (callback) callback();
        }
    }, delay);
}

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            typeText("auto-typing-paragraph", "Leave a message or schedule a call!!", 65);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

typeText("auto-typing-heading", "Know more about us!", 65, () => {
    const paragraph = document.getElementById("auto-typing-paragraph");
    paragraph.style.visibility = "visible";
    observer.observe(paragraph);
});
