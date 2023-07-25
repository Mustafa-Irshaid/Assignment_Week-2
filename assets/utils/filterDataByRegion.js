// Filtering based on dropDownMenu

export const filterDataByRegion = (region, country, data) => {
  country = country.toLowerCase();

  let filteredByRegion = data;

  if (region) {
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

  return filteredByCountry;
};
