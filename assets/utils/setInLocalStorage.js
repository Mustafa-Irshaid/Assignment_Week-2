export const setDarkModeStateInLocalStorage = (value) => {
  localStorage.setItem("darkModeState", value);
};

export const setFavouriteCountryInLocalStorage = (key,value) => {
  const existingData =
    JSON.parse(localStorage.getItem("favouriteCountries"));
  if (existingData.hasOwnProperty(key)) {
    return false;
  } else {
    existingData[key] = value;
    localStorage.setItem("favouriteCountries", JSON.stringify(existingData));
    return true;
  }
};
