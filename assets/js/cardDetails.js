import { searchForCountry } from "../api/countryServices.js";
import { displayCardDetailsHTMLContent } from "../display/displayCardDetails.js";
import { isDarkModeCheckedInLocalStorage } from "../utils/darkModeState.js";

const urlParams = new URLSearchParams(window.location.search);
const country = urlParams.get("card");
const cardContent = document.getElementById("cardContent");

const darkModeBtn = document.getElementById("darkMode");

darkModeBtn.addEventListener("change", () => {
  localStorage.setItem("darkModeState", darkModeBtn.checked);
});

// Window onload bring all of the data from API

window.addEventListener("load", async (event) => {
  // taking the state of dark mode from local storage
  isDarkModeCheckedInLocalStorage(darkModeBtn);

  displayCardDetailsHTMLContent(await searchForCountry(country), cardContent);
});
