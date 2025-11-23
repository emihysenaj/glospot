import { translations } from "./translations.js";

const selector = document.getElementById("language-selector");

// Apply selected language
function applyLanguage(lang) {
  document.querySelector('#main-nav a[href="index.html"]').textContent = translations[lang].home;
  document.querySelector('#main-nav a[href="hotels.html"]').textContent = translations[lang].hotels;
  document.querySelector('#main-nav a[href="guides.html"]').textContent = translations[lang].guides;
  document.querySelector('#main-nav a[href="transportation.html"]').textContent = translations[lang].transportation;
  document.querySelector('#signup-link').textContent = translations[lang].signup;
  document.querySelector('#signin-link').textContent = translations[lang].signin;

  const heroTitle = document.querySelector('.hero-content h2');
  const heroText = document.querySelector('.hero-content p');
  const buttons = document.querySelectorAll('.hero-content .buttons button');
  const contactHeader = document.querySelector('#contact-us h2');
  const contactEmail = document.querySelector('#contact-us p:nth-of-type(1)');
  const contactPhone = document.querySelector('#contact-us p:nth-of-type(2)');

  if(heroTitle) heroTitle.textContent = translations[lang].heroTitle;
  if(heroText) heroText.textContent = translations[lang].heroText;
  if(buttons[0]) buttons[0].textContent = translations[lang].signupButton;
  if(buttons[1]) buttons[1].textContent = translations[lang].signinButton;
  if(contactHeader) contactHeader.textContent = translations[lang].contactUs;
  if(contactEmail) contactEmail.textContent = translations[lang].email;
  if(contactPhone) contactPhone.textContent = translations[lang].phone;

  localStorage.setItem("language", lang); // Save choice
}

// On language change
selector.addEventListener("change", () => applyLanguage(selector.value));

// Apply saved language on page load
const savedLang = localStorage.getItem("language") || "en";
selector.value = savedLang;
applyLanguage(savedLang);
