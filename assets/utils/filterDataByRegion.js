import { getFavouriteCountriesFromLocalStorage } from "./getFromLocalStorage.js";

// Filtering based on dropDownMenu

export const filterDataByRegion = (region, country, data) => {
  country = country.toLowerCase();

  let filteredByRegion = data || [];

  if (region == "Favourites") {
    let ob = getFavouriteCountriesFromLocalStorage();

    filteredByRegion = filteredByRegion.filter((country) => {
      return ob.hasOwnProperty(country.name.common);
    });
  } else if (region) {
    filteredByRegion = filteredByRegion.filter((data) => {
      return data.region == region;
    });
  }

  if (!country.length) {
    return filteredByRegion;
  }

  let filteredByCountry = filteredByRegion.filter((data) => {
    return data.name.common.toLowerCase().includes(country);
  });

  console.log(filteredByCountry);
  return filteredByCountry;
};
