import {
  allowDropOnFavouriteFlags,
  dropOnFavouriteFlags,
  dragFromFlagsCards,
  deleteFavFlag,
  sendFavouriteCardToLocalStorage,
  handleCountriesFilter,
  handleSearchCountriesChange,
  handleToggleDarkModeState,
  renderIndex,
} from "./controller.js";

// HTML Selectors

const searchForCountryInput = document.getElementById("searchForCountryInput");
const cardsContent = document.getElementById("cardsContent");
const darkModeBtn = document.getElementById("darkMode");
const favouriteContent = document.getElementById("favContent");
const dropDownMenu = document.getElementById("dropDownMenu");

// These Event Listeners are handeled by the controller

const handleEventListeners = () => {
  favouriteContent.addEventListener("drop", dropOnFavouriteFlags);
  favouriteContent.addEventListener("dragover", allowDropOnFavouriteFlags);
  favouriteContent.addEventListener("click", deleteFavFlag);
  cardsContent.addEventListener("dragstart", dragFromFlagsCards);
  cardsContent.addEventListener("click", (ev) =>
    sendFavouriteCardToLocalStorage(ev, favouriteContent)
  );
  dropDownMenu.addEventListener("click", (ev) =>
    handleCountriesFilter(ev, cardsContent, searchForCountryInput)
  );
  searchForCountryInput.addEventListener("keyup", (ev) =>
    handleSearchCountriesChange(ev, cardsContent)
  );
  darkModeBtn.addEventListener("change", (ev) =>
    handleToggleDarkModeState(darkModeBtn)
  );
};

// Window onload bring all of the data from API

window.addEventListener("load", async (event) => {
  // Add Event Listener on Document For Drag and Drop
  handleEventListeners();

  // rendering Index Page
  renderIndex(favouriteContent, darkModeBtn);
});
