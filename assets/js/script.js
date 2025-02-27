// menu section
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const menuLinks = document.querySelectorAll(".menu a");

    menuLinks.forEach(link => {
        link.addEventListener("click", function () {
            menuToggle.checked = false; // Uncheck the checkbox to close the menu
        });
    });
});


// feature section
const featureLinks = [...document.querySelectorAll(".feature-link")];
const featureImages = [...document.querySelectorAll(".feature-img")];
const featureH1 = [...document.querySelectorAll(".feature-h1")];
const featurePara = [...document.querySelectorAll(".feature-p")];


featureLinks.forEach(function (link, index) {
    link.addEventListener("click", function () {

        featureImages.forEach(function (image) {
            image.style.display = "none";
        });

        featureImages[index].style.display = "block";

        featureH1.forEach(function (x) {
            x.style.display = "none";
        });

        featureH1[index].style.display = "block";

        featurePara.forEach(function (x) {
            x.style.display = "none";
        });

        featurePara[index].style.display = "block";
    });
});


// faq section

const qs = [...document.querySelectorAll(".questions")];
const arrowIcons = [...document.querySelectorAll(".faq-arrow")];

qs.forEach(function (q, i) {
    q.querySelector(".q-head").addEventListener("click", function () {
        q.querySelector(".faq-arrow").classList.toggle("rotate");
        let content = q.querySelector(".answer");
        faqAnimation(content);
    })
})
arrowIcons.forEach(function (a, i) {
    a.addEventListener("click", function () {
        a.classList.toggle("rotate");
        let content = a.nextElementSibling.nextElementSibling;
        faqAnimation(content);
    })
})

function faqAnimation(content) {
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }
}


// form sectio



const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    result.innerHTML = "Please wait..."

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
                console.log(response);
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


