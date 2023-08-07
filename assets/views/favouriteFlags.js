// This View has Favourite Flag Data
//
// params => FlagSource for Image and
//           FlagTitle for Country
//           selector for the HTML element

export const favoriteFlagContent = (flagSource, flagTitle, selector) => {
  let newContent = `
    <div class="flag-content me-1 rounded-2 d-flex justify-content-between align-items-center">
      <div class="col-9 d-flex align-items-center justify-content-start gap-2">
        <img class="rounded-2" src="${flagSource}" height="35px" width="53px" alt="notfound" />
        <h5 class="fs-6 mb-0">${flagTitle}</h5>
      </div>
      <div class="col-2 d-flex justify-content-center">
        <a href="#" class="delete-btn d-flex justify-content-center align-items-center rounded-circle position-relative">
        </a>
      </div>
    </div>
  `;

  if (typeof selector === "string") {
    return newContent;
  } else {
    selector.innerHTML = newContent;
  }
};

// A Function Renders all Favourite Flags

export const renderFavouriteFlags = (obj, element) => {
  let innerHTMLContent = ``;
  obj &&
    Object.entries(obj)?.forEach(([key, value]) => {
      innerHTMLContent += favoriteFlagContent(value, key, innerHTMLContent);
    });

  element.innerHTML = innerHTMLContent;
};
