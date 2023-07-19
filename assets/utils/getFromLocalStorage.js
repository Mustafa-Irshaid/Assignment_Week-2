export const getFavouriteCountriesFromLocalStorage = () => {
  const favouriteCountries = localStorage.getItem("favouriteCountries");
  if (favouriteCountries == null || favouriteCountries == undefined) {
    localStorage.setItem("favouriteCountries", JSON.stringify({}));
  } else {
    return JSON.parse(localStorage.getItem("favouriteCountries"));
  }
};
