import { fetchData, allData } from "../utils/fetchData.js";
import { displayHTMLContent } from "../utils/displayData.js";
import { filterData } from "../utils/filterData.js";

const searchInput = document.getElementById("searchInput");
const dropdownMenu = document.getElementById("dropdownMenu");
const dropdownItemBtns = document.querySelectorAll(".dropdown-item");
const cardsContent = document.getElementById("cardsContent");
const darkModeBtn = document.getElementById("darkMode");

let timeoutId;

// Handle Dark Mode State

const isDarkModeCheckedInLocalStorage = () => {
  if (JSON.parse(localStorage.getItem("darkModeState")) == null) {
    localStorage.setItem("darkModeState", false);
  } else {
    darkModeBtn.checked = JSON.parse(localStorage.getItem("darkModeState"));
  }
};

darkModeBtn.addEventListener("change", () => {
  localStorage.setItem("darkModeState", darkModeBtn.checked );
});

// Handle Search bar Listener on keyup

searchInput.addEventListener("keyup", (event) => {
  event.preventDefault();
  clearTimeout(timeoutId);
  timeoutId = setTimeout(async () => {
    displayHTMLContent(await fetchData(event.target.value), cardsContent );
  }, 200);
});

// Filter on dropdown list

dropdownItemBtns.forEach((button) => {
  button.addEventListener("click", async (event) => {
    dropdownMenu.innerHTML = button.innerHTML;
    displayHTMLContent(
      await filterData(button.innerHTML, searchInput.value, allData),
      cardsContent
    );
  });
});

// Window onload bring all of the data from API

window.addEventListener("load", async (event) => {
  // taking the state of dark mode from local storage
  isDarkModeCheckedInLocalStorage();

  // calling API to fetch all of the data onload
  displayHTMLContent(await fetchData(""), cardsContent );
});
