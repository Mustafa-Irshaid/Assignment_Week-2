import { numberFormat } from "../utils/numberFormat.js";

// Display HTML Content : Cards Content

export const displayCardsHTMLContent = (data, cardsContent) => {
  if (data.message == "Not Found" || data.length == 0) {
    cardsContent.innerHTML = `<span>No results Found</span>`;
    return;
  }

  let innerHTMLData = ``;
  let cardHTMLData = ``;

  // Card inner HTML information

  data.map((country, index) => {
    cardHTMLData += `<div class="col-10 col-md-5 col-lg-3 mb-5">
    <a href="card-details.html?card=${
      country.name.official
    }" class="card card-hover--scale-down overflow-hidden shadow-sm border-0 rounded-2">

        <!-- Card Image -->

        <img class="img-fluid w-100" src="
        ${country.flags.svg}
        " alt="image not found">

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
</div>`;
  });

  innerHTMLData += cardHTMLData;

  cardsContent.innerHTML = innerHTMLData;
};
