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
import { renderFavouriteFlags } from "../views/favouriteFlags.js";
import { renderFlagDetails } from "../views/FlagDetails.js";
import { filterDataByRegion } from "../utils/filterDataByRegion.js";
import { searchForCountry } from "../api/countryServices.js";

let selectedCard = null;
let regionValue = "";
let timeoutId;

export function allowDrop(ev) {
  ev.preventDefault();
}

export async function drop(ev) {
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

  favContainer.appendChild(tempElement.firstElementChild);
}

export function drag(ev) {
  const card = ev.target.closest(".card");

  if (card) selectedCard = card.parentNode;

  ev.dataTransfer.setData("text/html", card.outerHTML);
}

export function updateCardStar(card) {
  const cardStar = card.querySelector(".fa-star");
  cardStar.classList.toggle("color-favourite");
}

export function deleteFavFlag(event) {
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

export async function sendFavouriteCardToLocalStorage(event,favouriteContent) {
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

    renderFavouriteFlags(
      await getFavouriteCountriesFromLocalStorage(),
      favouriteContent
    );
  }
}

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

export const handleToggleDarkModeState = (darkModeBtn) => {
  setDarkModeStateInLocalStorage(darkModeBtn.checked);
};

export const renderIndex = async (favouriteContent,darkModeBtn) => {
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

export const renderCardDetails = async (country, cardContent, darkModeBtn) => {
  // taking the state of dark mode from local storage
  isDarkModeCheckedInLocalStorage(darkModeBtn);

  renderFlagDetails(await searchForCountry(country), cardContent);
};
