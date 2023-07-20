import {
  getAllCountries,
  searchForCountry,
  allData,
} from "../api/countryServices.js";
import { displayCardsHTMLContent } from "../display/cardsData.js";
import { displayFavouriteFlagsHTMLContent } from "../display/favouriteCountries.js";
import { filterDataByRegion } from "../utils/filterDataByRegion.js";
import {
  getFavouriteCountriesFromLocalStorage,
  isDarkModeCheckedInLocalStorage,
} from "../utils/getFromLocalStorage.js";
import {
  setDarkModeStateInLocalStorage,
  setFavouriteCountryInLocalStorage,
  deleteFavouriteCountryFromLocalStorage,
} from "../utils/updateInLocalStorage.js";

const searchForCountryInput = document.getElementById("searchForCountryInput");
const regionsDropdownMenu = document.getElementById("dropdown-menu");
const regionsDropdownButtons = document.querySelectorAll(".dropdown-item");
const cardsContent = document.getElementById("cardsContent");
const darkModeBtn = document.getElementById("darkMode");
const favouriteContent = document.getElementById("favContent");

let regionValue = "";

let timeoutId;

let selectedCard = null;

darkModeBtn.addEventListener("change", () => {
  setDarkModeStateInLocalStorage(darkModeBtn.checked);
});

// Handle Search bar Listener on keyup

searchForCountryInput.addEventListener("keyup", (event) => {
  clearTimeout(timeoutId);

  timeoutId = setTimeout(async () => {
    let data = await searchForCountry(event.target.value);

    if (!regionValue) {
      displayCardsHTMLContent(
        data,
        await getFavouriteCountriesFromLocalStorage(),
        cardsContent
      );
    } else {
      displayCardsHTMLContent(
        await filterDataByRegion(regionValue, "", data),
        await getFavouriteCountriesFromLocalStorage(),
        cardsContent
      );
    }
  }, 200);
});

// Filter on dropdown list

regionsDropdownButtons.forEach((button) => {
  button.addEventListener("click", async (event) => {
    regionsDropdownMenu.innerHTML = button.innerHTML;
    regionValue = button.value;

    console.log(regionValue);

    displayCardsHTMLContent(
      await filterDataByRegion(
        regionValue,
        searchForCountryInput.value,
        allData
      ),
      await getFavouriteCountriesFromLocalStorage(),
      cardsContent
    );
  });
});

function allowDrop(ev) {
  ev.preventDefault();
}

async function drop(ev) {
  ev.preventDefault();

  var serializedElement = ev.dataTransfer.getData("text/html");

  const tempElement = document.createElement("div");
  tempElement.innerHTML = serializedElement;

  const flagTitle = tempElement.querySelector("h5").innerHTML;
  const flagSource = tempElement.querySelector("img").getAttribute("src");

  updateCardStar(selectedCard);

  if (!setFavouriteCountryInLocalStorage(flagTitle, flagSource)) {
    return;
  }

  // displayCardsHTMLContent(
  //   await filterDataByRegion(regionValue, searchForCountryInput.value, allData),
  //   await getFavouriteCountriesFromLocalStorage(),
  //   cardsContent
  // );

  tempElement.innerHTML = `
      <div
        class="flag-content me-1 rounded-2 d-flex justify-content-between align-items-center">
        <div
          class="col-9 d-flex align-items-center justify-content-start gap-2">
          <img
            class="rounded-2"
            src="${flagSource}"
            height="35px"
            width="53px"
            alt="notfound" />
          <h5 class="fs-6 mb-0">${flagTitle}</h5>
        </div>
        <div class="col-2 d-flex justify-content-center">
          <a
            href="#"
            class="delete-btn d-flex justify-content-center align-items-center rounded-circle position-relative">
          </a>
        </div>
      </div>
    `;

  // Start adding data to container

  const favContainer = ev.target.closest(".content");

  favContainer.appendChild(tempElement);
}

function drag(ev) {
  const card = ev.target.closest(".card");

  if (card) selectedCard = card.parentNode;

  ev.dataTransfer.setData("text/html", card.outerHTML);
}

function updateCardStar(card) {
  const cardStar = card.querySelector(".fa-star");
  cardStar.classList.toggle("color-favourite");
}

function deleteFavFlag(event) {
  const { tagName } = event.target;

  if (tagName === "A") {
    const favCard = event.target.closest(".flag-content");

    const favTitle = favCard.querySelector("h5").innerText;

    const card = cardsContent.querySelector(
      `#${favTitle.split(" ").join("-")}`
    );
    updateCardStar(card.parentNode);

    deleteFavouriteCountryFromLocalStorage(favTitle);

    favCard.parentElement.removeChild(favCard);
  }
}

async function sendFavouriteCardToLocalStorage(event) {
  const { tagName } = event.target;
  console.log(tagName);

  if (tagName === "I") {
    const card = event.target.parentNode;
    const flagTitle = card.querySelector("h5").innerHTML;
    const flagSource = card.querySelector("img").getAttribute("src");

    if (!setFavouriteCountryInLocalStorage(flagTitle, flagSource)) {
      deleteFavouriteCountryFromLocalStorage(flagTitle);
    }

    updateCardStar(card);

    displayFavouriteFlagsHTMLContent(
      await getFavouriteCountriesFromLocalStorage(),
      favouriteContent
    );
  }
}

const eventListenersForFavouriteCountriesDragAndDrop = () => {
  favouriteContent.addEventListener("drop", drop);
  favouriteContent.addEventListener("dragover", allowDrop);
  favouriteContent.addEventListener("click", deleteFavFlag);
  cardsContent.addEventListener("dragstart", drag);
  cardsContent.addEventListener("click", sendFavouriteCardToLocalStorage);
};

// Window onload bring all of the data from API

window.addEventListener("load", async (event) => {
  // taking the state of dark mode from local storage
  isDarkModeCheckedInLocalStorage(darkModeBtn);

  // calling API to fetch all of the data onload
  displayCardsHTMLContent(
    await getAllCountries(),
    await getFavouriteCountriesFromLocalStorage(),
    cardsContent
  );

  // Add Event Listener on Document For Drag and Drop
  eventListenersForFavouriteCountriesDragAndDrop();

  // Display Favourite Countries after it fetching it from local storage
  displayFavouriteFlagsHTMLContent(
    await getFavouriteCountriesFromLocalStorage(),
    favouriteContent
  );
});
