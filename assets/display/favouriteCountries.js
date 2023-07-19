
export const displayFavouriteFlagsHTMLContent = (obj , element) => {
    let innerHTMLContent=``
    Object.entries(obj).forEach(([key, value]) => {
        innerHTMLContent+=`<div
        class="flag-content me-1 rounded-2 d-flex justify-content-between align-items-center">
        <div
          class="col-9 d-flex align-items-center justify-content-start gap-2">
          <img
            class="rounded-2"
            src="${value}"
            height="35px"
            width="53px"
            alt="notfound" />
          <h5 class="fs-6 mb-0">${key}</h5>
        </div>
        <div class="col-2 d-flex justify-content-center">
          <a
            href="#"
            class="delete-btn d-flex justify-content-center align-items-center rounded-circle position-relative">
          </a>
        </div>
      </div>
    `
    });

    element.innerHTML = innerHTMLContent;
};
