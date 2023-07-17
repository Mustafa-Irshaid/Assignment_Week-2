// Handle Dark Mode State

export const isDarkModeCheckedInLocalStorage = (darkModeBtn) => {
  if (JSON.parse(localStorage.getItem("darkModeState")) == null) {
    localStorage.setItem("darkModeState", false);
  } else {
    darkModeBtn.checked = JSON.parse(localStorage.getItem("darkModeState"));
  }
};
