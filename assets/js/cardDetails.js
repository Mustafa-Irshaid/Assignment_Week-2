import { handleToggleDarkModeState, renderCardDetails } from "./controller.js";

const urlParams = new URLSearchParams(window.location.search);
const country = urlParams.get("card");
const cardContent = document.getElementById("cardContent");
const isLoading = document.querySelector(
  'link[href="/assets/css/cardDetails_Loader.css"]'
);
const darkModeBtn = document.getElementById("darkMode");

const handleEventListeners = () => {
  darkModeBtn.addEventListener("change", (ev) =>
    handleToggleDarkModeState(darkModeBtn)
  );
};

// Window onload bring all of the data from API

window.addEventListener("load", async (event) => {
  // Add Event Listener on Document For Drag and Drop
  handleEventListeners();

  renderCardDetails(country, cardContent, darkModeBtn);

  isLoading.remove();
});
