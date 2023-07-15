import { numberFormat } from "./numberFormat.js";

// Display HTML Content : Cards Content

export const displayHTMLContent = (data, cardsContent) => {
  let innerHTMLData = ``;
  let cardHTMLData = ``;

  // Card inner HTML information

  data.map( (country) => {
    cardHTMLData += `<div class="col-10 col-md-5 col-lg-3 mb-5">
    <a href="" class="card card-hover--scale-down overflow-hidden shadow-sm border-0 rounded-2">

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

  innerHTMLData += `<div class="row justify-content-center justify-content-md-between justify-content-lg-start m-0">`;

  innerHTMLData += cardHTMLData;

  innerHTMLData += `</div>`;

  cardsContent.innerHTML = innerHTMLData;
};
