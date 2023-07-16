import { numberFormat } from "../utils/numberFormat.js";

// Display HTML Content : Cards Content

export const displayCardDetailsHTMLContent = (
  data,
  cardContent,
  cardDetailsLoaderCSSLink
) => {
  // Check if the <link> Loader element exists
  if (cardDetailsLoaderCSSLink) {
    // Remove the <link> Loader from the document
    cardDetailsLoaderCSSLink.remove();
  }

  if (data.message == "Not Found" || data.length == 0) {
    cardContent.innerHTML = `<span>No results Found</span>`;
    return;
  }

  let innerHTMLData = ``;

  let content={
    borderCountries:``,
    cardImage:``,
    cardBody:``,
    currencies:``,
    languages:``
  }

  let currenciesArr=Object.values(data[0].currencies);

  currenciesArr.forEach((val,index) =>{ 
    content.currencies+=`${val.name}`

    if(index != currenciesArr.length-1){
      content.currencies+=' , '
    }
  });

  let languagesArr=Object.values(data[0].languages);

  languagesArr.forEach((val,index) =>{ 
    content.languages+=`${val}`

    if(index != languagesArr.length-1){
      content.languages+=' , '
    }
  });

  if (typeof data[0].borders !== "undefined") {
    data[0].borders.map((border) => {
      content.borderCountries += `
        <li class="col-3 col-lg-3 px-0 shadow-sm rounded-2"><a class="d-inline-block rounded-1 w-100" href="#">${border}</a></li>
      `;
    });
  } else {
    content.borderCountries = `Not Found...`;
  }


  content.cardImage = `<!-- Card Image -->

  <div class="card-image col-md-5 p-0 overflow-hidden text-center me-3 shadow-sm">
      <img class="card-image--cover w-100" src="${data[0].flags.svg}" alt="image not found">
  </div>`;

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

  // Card inner HTML information

  innerHTMLData = content.cardImage + content.cardBody;

  cardContent.innerHTML = innerHTMLData;
};
