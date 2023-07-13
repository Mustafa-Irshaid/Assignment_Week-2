export let allData = [];
export let currentData = [];

// fetch data from api

export const fetchData = async (searchTerm) => {
  try {
    let url = ``;

    // If Search Bar is empty and Data already exists => show the existing data

    if (searchTerm === "" && allData.length != 0) {
      currentData = allData;
      return allData;
    }

    // If Data Does not Exist bring all the data

    if (allData.length === 0) {
      url = `https://restcountries.com/v3.1/all?fields=true&fields=name,flags,region,capital,population`;
    }

    // Append search term as query parameter if provided

    if (searchTerm) {
      url = `https://restcountries.com/v3.1/name/${searchTerm}`;
    }

    // API Call

    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "default",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    // Set all of the data if does not exist in allData variable

    if (allData.length === 0) {
      allData = data;
    }

    // return Data
    return data;
    
  } catch (error) {
    console.log("Error:", error);
  }
  return [];
};
