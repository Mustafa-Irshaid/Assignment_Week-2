// Filtering based on dropDownMenu

export const filterData = (filterTerm, searchValue, allData) => {
  searchValue = searchValue.toLowerCase();

  const filteredByRegion = allData.filter((data) => {
    return data.region == filterTerm;
  });

  const filteredByCountry = filteredByRegion.filter((data) => {
    return data.name.common.toLowerCase().includes(searchValue);
  });

  return filteredByCountry;
};
