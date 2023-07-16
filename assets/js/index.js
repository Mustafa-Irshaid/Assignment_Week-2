import {
  getAllCountries,
  searchForCountry,
  allData,
} from "../api/countryServices.js";
import { displayCardsHTMLContent } from "../display/cardsData.js";
import { filterDataByRegion } from "../utils/filterDataByRegion.js";
import { isDarkModeCheckedInLocalStorage } from "../utils/darkModeState.js";

const searchForCountryInput = document.getElementById("searchForCountryInput");
const regionsDropdownMenu = document.getElementById("dropdown-menu");
const regionsDropdownButtons = document.querySelectorAll(".dropdown-item");
const cardsContent = document.getElementById("cardsContent");
const darkModeBtn = document.getElementById("darkMode");
let regionValue = "";

let timeoutId;

darkModeBtn.addEventListener("change", () => {
  localStorage.setItem("darkModeState", darkModeBtn.checked);
});

// Handle Search bar Listener on keyup

searchForCountryInput.addEventListener("keyup", (event) => {
  clearTimeout(timeoutId);
  
  timeoutId = setTimeout(async () => {

    let data = await searchForCountry(event.target.value)

    if(!regionValue){
      displayCardsHTMLContent(data, cardsContent);
    }
    else{
      displayCardsHTMLContent( await filterDataByRegion(regionValue,"", data) ,cardsContent)
    }
    
  }, 200);
});

// Filter on dropdown list

regionsDropdownButtons.forEach((button) => {
  button.addEventListener("click", async (event) => {
    regionsDropdownMenu.innerHTML = button.innerHTML;
    regionValue = button.value;
    
    displayCardsHTMLContent(
      await filterDataByRegion(regionValue, searchForCountryInput.value, allData),
      cardsContent
    );
  });
});

// Window onload bring all of the data from API

window.addEventListener("load", async (event) => {
  // taking the state of dark mode from local storage
  isDarkModeCheckedInLocalStorage(darkModeBtn);

  // calling API to fetch all of the data onload
  displayCardsHTMLContent(await getAllCountries(), cardsContent);
});
