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
