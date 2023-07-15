export let allData = [];
export let currentData = [];

let mainURL = "https://restcountries.com/v3.1";

// Service 1

export const getAllCountries = async () => {
  try {
    let url = ``;

    // If Search Bar is empty and Data already exists => show the existing data

    if (allData.length != 0) {
      currentData = allData;
      return allData;
    }

    // If Data Does not Exist bring all the data

    url = `${mainURL}/all?fields=true&fields=name,flags,region,capital,population`;

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

// Service 2

export const searchForCountry = async (searchTerm) => {
  try {
    let url = ``;
    // Append search term as query parameter if provided

    if (searchTerm != "") {
      url = `${mainURL}/name/${searchTerm}`;
    } else {
      return allData;
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

    // return Data
    return data;
  } catch (error) {
    console.log("Error:", error);
  }
  return [];
};
