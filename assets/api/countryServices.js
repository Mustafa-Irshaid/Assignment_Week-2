// Caching all countries data

export let allCountriesData = [];

// Global Variables

const MAIN_URL = "https://restcountries.com/v3.1";
let url = ``;

// API Get Method

const getAPI = async (url)=>{
  try{
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

    return await response.json();
  }
  catch(error){
    console.log("Error:", error);
  }
}

// Get All Countries

export const getAllCountries = async () => {
  
    // If Search Bar is empty and Data already exists => show the existing data

    if (allCountriesData.length != 0) {
      return allCountriesData;
    }

    // If Data Does not Exist bring all the data

    url = `${MAIN_URL}/all?fields=true&fields=name,flags,region,capital,population`;

    const data = await getAPI(url)
    
    // caching all countries data

    if (allCountriesData.length === 0) {
      allCountriesData = data;
    }

    // return Data
    return data;
};

// Search For a country

export const searchForCountry = async (searchTerm) => {

    // Append search term as query parameter if provided

    if (searchTerm != "") {
      url = `${MAIN_URL}/name/${searchTerm}`;
    } else {
      return allCountriesData;
    }

    // API Call

    const data = await getAPI(url)

    // return Data

    return data;
};
