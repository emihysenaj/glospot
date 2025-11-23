// Import translations
import { translations } from './translations.js';

// Grab the language selector
const langSelector = document.getElementById('language-selector');

// Listen for changes
langSelector.addEventListener('change', () => {
  const lang = langSelector.value;
  localStorage.setItem('lang', lang); // Save preference
  applyLanguage(lang);
});

// Check if user has a saved language
const savedLang = localStorage.getItem('lang') || 'en';
langSelector.value = savedLang;
applyLanguage(savedLang);

// Function to update page text
function applyLanguage(lang) {
  // Navigation links
  document.querySelector('#main-nav a[href="index.html"]').textContent = translations[lang].home;
  document.querySelector('#main-nav a[href="hotels.html"]').textContent = translations[lang].hotels;
  document.querySelector('#main-nav a[href="guides.html"]').textContent = translations[lang].guides;
  document.querySelector('#main-nav a[href="transportation.html"]').textContent = translations[lang].transportation;
  document.querySelector('#signup-link').textContent = translations[lang].signup;
  document.querySelector('#signin-link').textContent = translations[lang].signin;

  // Hero section
  const heroTitle = document.querySelector('.hero-content h2');
  const heroText = document.querySelector('.hero-content p');
  if(heroTitle) heroTitle.textContent = translations[lang].heroTitle;
  if(heroText) heroText.textContent = translations[lang].heroText;

  // Buttons (optional)
  const buttons = document.querySelectorAll('.hero-content .buttons button');
  if(buttons[0]) buttons[0].textContent = translations[lang].signupButton;
  if(buttons[1]) buttons[1].textContent = translations[lang].signinButton;

  // Contact section
  const contactHeader = document.querySelector('#contact-us h2');
  const contactEmail = document.querySelector('#contact-us p:nth-of-type(1)');
  const contactPhone = document.querySelector('#contact-us p:nth-of-type(2)');
  if(contactHeader) contactHeader.textContent = translations[lang].contactUs;
  if(contactEmail) contactEmail.textContent = translations[lang].email;
  if(contactPhone) contactPhone.textContent = translations[lang].phone;
}
