import { numberFormat } from "../utils/numberFormat.js";

// Renders HTML Content : Cards Details Content
// 
// params : data - {object} => Card Details Data
//          cardDetailsContent - {object} => HTML Element

export const renderFlagDetails = (data, cardDetailsContent) => {

  // Error Handling if API Call is Not Found or Data is null

  if (data.message == "Not Found" || data.length == 0) {
    cardDetailsContent.innerHTML = `<span>No results Found</span>`;
    return;
  }

  let innerHTMLData = ``;

  // Object Of HTML Content

  let content = {
    borderCountries: ``,
    cardImage: ``,
    cardBody: ``,
    currencies: ``,
    languages: ``,
  };

  // Collect Currencies Data

  let currenciesArr = Object.values(data[0].currencies);

  currenciesArr.forEach((val, index) => {
    content.currencies += `${val.name}`;

    if (index != currenciesArr.length - 1) {
      content.currencies += " , ";
    }
  });

  // Collect Languages Data

  let languagesArr = Object.values(data[0].languages);

  languagesArr.forEach((val, index) => {
    content.languages += `${val}`;

    if (index != languagesArr.length - 1) {
      content.languages += " , ";
    }
  });

  // Collect Border Data

  if (typeof data[0].borders !== "undefined") {
    data[0].borders.map((border) => {
      content.borderCountries += `
        <li class="col-3 col-lg-3 px-0 shadow-sm rounded-2"><a class="d-inline-block rounded-1 w-100" href="#">${border}</a></li>
      `;
    });
  } else {
    content.borderCountries = `Not Found...`;
  }

  // Card Image Component

  content.cardImage = `<!-- Card Image -->

  <div class="card-image col-md-5 p-0 overflow-hidden text-center me-3 shadow-sm">
      <img class="card-image--cover w-100" src="${data[0].flags.svg}" alt="image not found">
  </div>`;

  // Card Body Component

  content.cardBody = `
  <!-- Card Body -->

  <div class="card-body col-md-5 d-flex flex-column justify-content-evenly">
      
      <!-- Card Title -->

      <h5 class="card-title fw-bold fs-4 pb-4 pt-3">${
        data[0].name.official
      }</h5>

      <!-- Card Details -->

      <ul class="card-body-details d-flex flex-column flex-md-row gap-4 justify-content-start align-items-start p-0 pb-3">
          <div class="col">
              <li class="py-2">Population: <span>${numberFormat(
                data[0].population
              )}</span></li>
              <li class="py-2">Region: <span>${data[0].region}</span></li>
              <li class="py-2">Sub Region: <span>${
                data[0].subregion
              }</span></li>
              <li class="py-2">Capital: <span>${data[0].capital}</span></li>
          </div>
          <div class="col-md-6">
              <li class="py-2">Top Level Domain: <span>${
                data[0].tld[0]
              }</span></li>
              <li class="py-2">Currencies: <span>${
                content.currencies
              }</span></li>
              <li class="py-2">Languages: <span>${content.languages}</span></li>
          </div>
      </ul>

      <!-- Border Countries -->

      <aside class="border-countries d-flex flex-column flex-md-row justify-content-start align-items-md-center">
          <h5 class="m-0 me-2 d-inline-block">Border Countries:</h5>
          <ul class="border-countries-links col-md row gap-2 justify-content-between justify-content-md-start align-items-center p-0 my-4 text-center">
              ${content.borderCountries}
          </ul>
      </aside>
      
  </div>

  <!-- Card Body -->
  `;

  // Card inner HTML information = Card Img + Card Body

  innerHTMLData = content.cardImage + content.cardBody;

  // Set Inner HTML for Card Details Content

  cardDetailsContent.innerHTML = innerHTMLData;
};
