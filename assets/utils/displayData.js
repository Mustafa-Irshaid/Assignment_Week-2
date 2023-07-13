// Display HTML Content : Cards Content

export const displayHTMLContent = (data, cardsContent) => {
  if(data==""){
    cardsContent.innerHTML = `<div class="d-flex justify-content-center align-items-center"><p>theres no results...</p></div>`;
  }

  let innerHTMLData = "";

  for (var i = 0; i < data.length; i++) {
    if (i % 4 == 0) {
      innerHTMLData += `
      <!-- Block ${i / 4} -->
      <div class="row justify-content-center justify-content-md-between justify-content-lg-start m-0">`;
    }

    innerHTMLData += `
            <!-- Card ${i}-->

            <a href="" class="card card-hover--scale-down shadow-sm col-10 col-md-5 col-lg ${
              !(i % 4 === 3 || i === data.length - 1) ? "me-lg-5" : ""
            }
            mb-5 p-0 border-0 overflow-hidden rounded-2">
        
                <!-- Card Image -->
        
                <img class="img-fluid w-100" src="
                ${data[i].flags.svg}
                " alt="image not found">
        
                <!-- Card Body -->
        
                <div class="card-body--bg p-4">
                  <h5 class="card-title">${data[i].name.common}</h5>
                  <ul class="p-0 pt-2">
                    <li>Population: <span>${new Intl.NumberFormat(
                      "en-IN"
                    ).format(data[i].population)}</span></li>
                    <li>Region: <span>${data[i].region}</span></li>
                    <li>Capital: <span>${data[i].capital}</span></li>
                  </ul>
                </div>
        
            </a>`;

    if (i % 4 === 3 || i === data.length - 1) {
      innerHTMLData += `</div>`;
    }
  }

  cardsContent.innerHTML = innerHTMLData;
};




