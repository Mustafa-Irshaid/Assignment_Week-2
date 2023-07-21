import { searchForCountry } from "../api/countryServices.js";
import { renderCardDetails } from "../render/cardDetails.js";
import { isDarkModeCheckedInLocalStorage } from "../utils/getFromLocalStorage.js";

const urlParams = new URLSearchParams(window.location.search);
const country = urlParams.get("card");
const cardContent = document.getElementById("cardContent");

const isLoading = document.querySelector(
  'link[href="/assets/css/cardDetails_Loader.css"]'
);

const darkModeBtn = document.getElementById("darkMode");

darkModeBtn.addEventListener("change", () => {
  localStorage.setItem("darkModeState", darkModeBtn.checked);
});

// Window onload bring all of the data from API

window.addEventListener("load", async (event) => {
  // taking the state of dark mode from local storage
  isDarkModeCheckedInLocalStorage(darkModeBtn);

  renderCardDetails(await searchForCountry(country), cardContent);

  isLoading.remove();
});
