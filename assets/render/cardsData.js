import { numberFormat } from "../utils/numberFormat.js";
import { isKeyExistInObject } from "../utils/verifyKeyExistence.js";

// Display HTML Content : Cards Content

// Display HTML Content: Cards Content
export const displayCardsHTMLContent = (
  data,
  favouriteCountries,
  cardsContent
) => {
  if (data.message == "Not Found" || data.length == 0) {
    cardsContent.innerHTML = `<span>No results Found</span>`;
    return;
  }

  let innerHTMLData = ``;
  let cardHTMLData = ``;

  // Card inner HTML information
  data.forEach((country, index) => {
    cardHTMLData += `<div class="col-10 col-md-4 mb-5 position-relative">
      <a aria-label="${index}" href="card-details.html?card=${
      country.name.official
    }" class="card card-hover--scale-down overflow-hidden shadow-sm border-0 rounded-2" draggable="true" id=${country.name.common
      .split(" ")
      .join("-")}>

          <!-- Card Image -->
          <img class="flag-img img-fluid w-100" src="${
            country.flags.svg
          }" alt="image not found">

          <!-- Card Body -->
          <div class="card-body--bg p-4">
            <h5 class="card-title">${country.name.common}</h5>
            <ul class="p-0 pt-2">
              <li>Population: <span>${numberFormat(
                country.population
              )}</span></li>
              <li>Region: <span>${country.region}</span></li>
              <li>Capital: <span>${country.capital}</span></li>
            </ul>
          </div>
      </a>
      ${
        isKeyExistInObject(favouriteCountries, country.name.common)
          ? `<i class="fa-solid fa-star color-favourite"></i>`
          : `<i class="fa-solid fa-star"></i>`
      }
      
  </div>`;
  });

  innerHTMLData += cardHTMLData;

  cardsContent.innerHTML = innerHTMLData;

  return cardsContent;
};
