import { getFavouriteCountriesFromLocalStorage } from "./getFromLocalStorage.js";

export const setDarkModeStateInLocalStorage = (value) => {
  localStorage.setItem("darkModeState", value);
};

export const setFavouriteCountryInLocalStorage = (key, value) => {
  const existingData = JSON.parse(localStorage.getItem("favouriteCountries"));
  if (existingData.hasOwnProperty(key)) {
    return false;
  } else {
    existingData[key] = value;
    localStorage.setItem("favouriteCountries", JSON.stringify(existingData));
    return true;
  }
};

export const deleteFavouriteCountryFromLocalStorage = (countryName) => {
  let data = getFavouriteCountriesFromLocalStorage();

  // Check if there is any data in local storage
  if (data) {
    try {
      if (data.hasOwnProperty(countryName)) {
        const updatedObj = Object.fromEntries(
          Object.entries(data).filter(([key]) => key !== countryName)
        );

        localStorage.setItem("favouriteCountries", JSON.stringify(updatedObj));
      }
    } catch (error) {
      console.error("Error parsing data from local storage:", error);
    }
  }
};
