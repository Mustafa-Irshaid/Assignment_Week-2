import { getAllCountries, searchForCountry, allData } from "../api/countryServices.js";
import { displayHTMLContent } from "../utils/displayCardsData.js";
import { filterData } from "../utils/filterData.js";

const searchForCountryInput = document.getElementById("searchForCountryInput");
const regionsDropdownMenu = document.getElementById("dropdown-menu");
const regionsDropdownButtons = document.querySelectorAll(".dropdown-item");
const cardsContent = document.getElementById("cardsContent");
const darkModeBtn = document.getElementById("darkMode");

let timeoutId;

// Handle Dark Mode State

const isDarkModeCheckedInLocalStorage = () => {
  if (JSON.parse(localStorage.getItem("darkModeState")) == null) {
    localStorage.setItem("darkModeState", false);
  } else {
    darkModeBtn.checked = JSON.parse(localStorage.getItem("darkModeState"));
  }
};

darkModeBtn.addEventListener("change", () => {
  localStorage.setItem("darkModeState", darkModeBtn.checked );
});

// Handle Search bar Listener on keyup

searchForCountryInput.addEventListener("keyup", (event) => {
  event.preventDefault();
  clearTimeout(timeoutId);
  timeoutId = setTimeout(async () => {
    displayHTMLContent(await searchForCountry(event.target.value), cardsContent );
  }, 200);
});

// Filter on dropdown list

regionsDropdownButtons.forEach((button) => {
  button.addEventListener("click", async (event) => {
    regionsDropdownMenu.innerHTML = button.innerHTML;
    displayHTMLContent(
      await filterData(button.innerHTML, searchForCountryInput.value, allData),
      cardsContent
    );
  });
});

// Window onload bring all of the data from API

window.addEventListener("load", async (event) => {
  // taking the state of dark mode from local storage
  isDarkModeCheckedInLocalStorage();

  // calling API to fetch all of the data onload
  displayHTMLContent(await getAllCountries(), cardsContent );
});
