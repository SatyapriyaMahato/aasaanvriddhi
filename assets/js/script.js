
//---------- Header Scroll Hide on Scroll Down ----------//
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > lastScrollY) {
        header.style.top = '-60px'; // Hide header on scroll down
    } else {
        header.style.top = '0'; // Show header on scroll up
    }
    lastScrollY = window.scrollY;
});

//---------- Mobile Menu Toggle ----------//
function attachMenuEvents() {
    const menuToggle = document.getElementById("menu-toggle"); // Checkbox for menu
    const menu = document.querySelector(".menu"); // Menu list
    const navLinks = document.querySelectorAll(".nav-link"); // Navigation links

    if (menuToggle && menu && navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                menuToggle.checked = false; // Uncheck checkbox
                menu.classList.remove("open"); // Ensure menu hides
            });
        });
    } else {
        console.error("Menu toggle or links not found!");
    }
}

document.addEventListener("DOMContentLoaded", attachMenuEvents);


//---------- FAQ Section Accordion ----------//
const qs = [...document.querySelectorAll(".questions")];
const arrowIcons = [...document.querySelectorAll(".faq-arrow")];

qs.forEach(function (q) {
    q.querySelector(".q-head").addEventListener("click", function () {
        q.querySelector(".faq-arrow").classList.toggle("rotate");
        let content = q.querySelector(".answer");
        faqAnimation(content);
    });
});
arrowIcons.forEach(function (a) {
    a.addEventListener("click", function () {
        a.classList.toggle("rotate");
        let content = a.nextElementSibling.nextElementSibling;
        faqAnimation(content);
    });
});

function faqAnimation(content) {
    if (content.style.maxHeight) {
        content.style.maxHeight = null; // Collapse
    } else {
        content.style.maxHeight = content.scrollHeight + "px"; // Expand
    }
}

//---------- Form Submission Handling ----------//
const form = document.getElementById('form');
const result = document.getElementById('result');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        result.innerHTML = "Please wait...";

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    result.innerHTML = json.message;
                } else {
                    result.innerHTML = json.message;
                }
            })
            .catch(error => {
                console.log(error);
                result.innerHTML = "Something went wrong!";
            })
            .then(function () {
                form.reset();
                setTimeout(() => {
                    result.style.display = "none";
                }, 3000);
            });
    });
}
