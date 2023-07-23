import { getAllCountries } from "../api/countryServices.js";
import { allCountriesData } from "../api/countryServices.js";
import {
  setFavouriteCountryInLocalStorage,
  setDarkModeStateInLocalStorage,
  deleteFavouriteCountryFromLocalStorage,
  getFavouriteCountriesFromLocalStorage,
  isDarkModeCheckedInLocalStorage,
} from "../utils/localStorage.js";
import { renderCardsFlags } from "../views/cardsFlags.js";
import {
  renderFavouriteFlags,
  favoriteFlagContent,
} from "../views/favouriteFlags.js";
import { renderFlagDetails } from "../views/FlagDetails.js";
import { filterDataByRegion } from "../utils/filterDataByRegion.js";
import { searchForCountry } from "../api/countryServices.js";

let selectedCard = null;
let regionValue = "";
let timeoutId;

// Allows Drop on Favourite Flags Section

export function allowDropOnFavouriteFlags(ev) {
  ev.preventDefault();
}

// Drop Funtionallity on Favourite FLags Section

export async function dropOnFavouriteFlags(ev) {
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

  favoriteFlagContent(flagSource, flagTitle, tempElement);

  // Start adding data to container

  const favContainer = ev.target.closest(".content");

  favContainer.appendChild(tempElement.firstElementChild);
}

// Drag Flags From Cards To Favourite Flags Section

export function dragFromFlagsCards(ev) {
  const card = ev.target.closest(".card");

  if (card) selectedCard = card.parentNode;

  ev.dataTransfer.setData("text/html", card.outerHTML);
}

// Toggle The Flags Card by the Star on Mobile Screens

export function updateCardStar(card) {
  const cardStar = card.querySelector(".fa-star");
  cardStar.classList.toggle("color-favourite");
}

// Delete Favourite Flags from its Section

export function deleteFavFlag(event) {
  const { tagName } = event.target;

  if (tagName === "A") {
    const favCard = event.target.closest(".flag-content");

    const favTitle = favCard.querySelector("h5").innerText;

    const card = cardsContent.querySelector(
      `#${favTitle.split(" ").join("-")}`
    );

    if(card.parentNode==null){
      return;
    }
    updateCardStar(card.parentNode);

    deleteFavouriteCountryFromLocalStorage(favTitle);

    favCard.parentElement.removeChild(favCard);
  }
}

// Set Favourite Flag in local storage after it Dragged to it

export async function sendFavouriteCardToLocalStorage(event, favouriteContent) {
  const { tagName } = event.target;

  if (tagName === "I") {
    const card = event.target.parentNode;
    const flagTitle = card.querySelector("h5").innerHTML;
    const flagSource = card.querySelector("img").getAttribute("src");

    if (!setFavouriteCountryInLocalStorage(flagTitle, flagSource)) {
      deleteFavouriteCountryFromLocalStorage(flagTitle);
    }

    updateCardStar(card);

    renderFavouriteFlags(
      await getFavouriteCountriesFromLocalStorage(),
      favouriteContent
    );
  }
}

// Handle DropDown Filter for filtering flags Cards

export const handleCountriesFilter = async (
  ev,
  cardsContent,
  searchForCountryInput
) => {
  const dropDown = ev.target.closest(".dropdown");

  const button = ev.target.closest(".dropdown-item");

  if (dropDown) {
    // Get the first child of the .dropdown element
    const firstChild = dropDown.firstElementChild;

    if (button) {
      firstChild.innerText = ev.target.innerText;
      regionValue = ev.target.value;

      renderCardsFlags(
        await filterDataByRegion(
          regionValue,
          searchForCountryInput.value,
          allCountriesData
        ),
        await getFavouriteCountriesFromLocalStorage(),
        cardsContent
      );
    }
  }
};

// Handle Search Countries onKeyUp Change

export const handleSearchCountriesChange = async (ev, cardsContent) => {
  clearTimeout(timeoutId);

  timeoutId = setTimeout(async () => {
    let data = await searchForCountry(ev.target.value);

    if (!regionValue) {
      renderCardsFlags(
        data,
        await getFavouriteCountriesFromLocalStorage(),
        cardsContent
      );
    } else {
      renderCardsFlags(
        await filterDataByRegion(regionValue, "", data),
        await getFavouriteCountriesFromLocalStorage(),
        cardsContent
      );
    }
  }, 200);
};

// Handle The State Of DarkMode Btn in localStorage

export const handleToggleDarkModeState = (darkModeBtn) => {
  setDarkModeStateInLocalStorage(darkModeBtn.checked);
};

// Rendering Flags Cards and Favourite Cards sections in index page

export const renderIndex = async (favouriteContent, darkModeBtn) => {
  // taking the state of dark mode from local storage
  isDarkModeCheckedInLocalStorage(darkModeBtn);

  renderCardsFlags(
    await getAllCountries(),
    await getFavouriteCountriesFromLocalStorage(),
    cardsContent
  );

  // Display Favourite Countries after it fetching it from local storage
  renderFavouriteFlags(
    await getFavouriteCountriesFromLocalStorage(),
    favouriteContent
  );
};

// Rendering card Details Section in cardDetails Page

export const renderCardDetails = async (country, cardContent, darkModeBtn) => {
  // taking the state of dark mode from local storage
  isDarkModeCheckedInLocalStorage(darkModeBtn);

  renderFlagDetails(await searchForCountry(country), cardContent);
};
