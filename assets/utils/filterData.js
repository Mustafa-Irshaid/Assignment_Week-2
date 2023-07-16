// Filtering based on dropDownMenu

export const filterData = (region, country, allData) => {
  country = country.toLowerCase();

  const filteredByRegion = allData.filter((data) => {
    return data.region == region;
  });

  const filteredByCountry = filteredByRegion.filter((data) => {
    return data.name.common.toLowerCase().includes(country);
  });

  return filteredByCountry;
};
