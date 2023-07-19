export const getFavouriteCountriesFromLocalStorage = () => {
  const favouriteCountries = localStorage.getItem("favouriteCountries");
  if (favouriteCountries == null || favouriteCountries == undefined) {
    localStorage.setItem("favouriteCountries", JSON.stringify({}));
  } else {
    return JSON.parse(localStorage.getItem("favouriteCountries"));
  }
};


export const isDarkModeCheckedInLocalStorage = (darkModeBtn) => {
  if (JSON.parse(localStorage.getItem("darkModeState")) == null) {
    localStorage.setItem("darkModeState", false);
  } else {
    darkModeBtn.checked = JSON.parse(localStorage.getItem("darkModeState"));
  }
};
