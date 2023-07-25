import { handleToggleDarkModeState, renderCardDetails } from "./controller.js";

// Get Params "country" to fetch the country data from API

const urlParams = new URLSearchParams(window.location.search);
const country = urlParams.get("card");

// HTML Selectors

const cardContent = document.getElementById("cardContent");
const isLoading = document.querySelector(
  'link[href="/assets/css/cardDetails_Loader.css"]'
);
const darkModeBtn = document.getElementById("darkMode");

// These Event Listeners are handeled by the controller

const handleEventListeners = () => {
  darkModeBtn.addEventListener("change", (ev) =>
    handleToggleDarkModeState(darkModeBtn)
  );
};

// Window onload bring all of the data from API

window.addEventListener("load", async (event) => {
  // call the handing event listeners to send data to controller

  handleEventListeners();

  // Rendering Card Details Page

  renderCardDetails(country, cardContent, darkModeBtn);

  // Unlink Loading CSS File

  isLoading.remove();
});
