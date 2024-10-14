// nav
function toggleNav() {
  var sideNav = document.querySelector('.sideNav');
  sideNav.classList.toggle('open');
}


// Popups
document.addEventListener('DOMContentLoaded', function (event) {
  const openPopupBtns = document.querySelectorAll('.openPopupBtn');
  const closeBtns = document.querySelectorAll('.closeBtn');
  const popups = document.querySelectorAll('.popup');

  openPopupBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const popupId = btn.getAttribute('data-popup');
      const popup = document.getElementById(popupId);
      if (popup) {
        popup.style.display = 'block';
      }
    });
  });

  closeBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const popup = btn.closest('.popup');
      if (popup) {
        popup.style.display = 'none';
      }
    });
  });

  window.addEventListener('click', function (event) {
    popups.forEach(function (popup) {
      if (event.target == popup) {
        popup.style.display = 'none';
      }
    });
  });

  closeBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const popup = btn.closest('.popup');
      if (popup) {
        popup.style.display = 'none';
      }
    });
  });
});

// settings
document.addEventListener("DOMContentLoaded", function (event) {
  const rootElement = document.documentElement;
  const resetButtons = document.querySelectorAll(".resetBtn");
  const newColors = document.querySelectorAll(".colorPalette");
  const themeSwitches = document.querySelector(".theme_switch");
  const saveButtons = document.querySelectorAll(".saveButton");

  window.applySettings = function () {
    getSettings().then(function (request) {

      // Apply secondary color
      const color = request.colorpalette;
      rootElement.style.setProperty("--color-secondary", color);

      // Apply theme (light or dark)
      const darkTheme = request.darkTheme;
      if (darkTheme === false) {
        // Set opacity of slideshow to 1 if we are on nutrition page
        if (window.location.pathname.includes("nutrition")) {
          const foodImg = document.getElementById("slideshow");
          if (foodImg) {
            foodImg.style.opacity = 1;
          } else {
            console.error("No food image found")
          }
        }
        
        rootElement.style.setProperty("--color-primary", "rgb(15, 15, 15)")
        rootElement.style.setProperty("--color-bac-primary", "rgb(255, 255, 255)")
        rootElement.style.setProperty("--color-bac-secondary", "rgb(201, 201, 201)")
        rootElement.style.setProperty("--color-bac-tertiary", "rgb(119, 112, 136")
      } else {
        rootElement.style.setProperty("--color-primary", "rgb(255, 255, 255)");
        rootElement.style.setProperty("--color-bac-primary", "rgb(15, 15, 15)");
        rootElement.style.setProperty("--color-bac-secondary", "rgb(26, 26, 27)");
        rootElement.style.setProperty("--color-bac-tertiary", "rgb(119, 122, 136)");
      }
    });
  };
  applySettings();

  resetButtons.forEach((resetBtn) => {
    resetBtn.addEventListener("click", () => {
      rootElement.style.setProperty("--color-primary", "rgb(255, 255, 255)");
      rootElement.style.setProperty("--color-secondary", "rgb(237, 86, 59)");
      rootElement.style.setProperty("--color-bac-primary", "rgb(15, 15, 15)");
      rootElement.style.setProperty("--color-bac-secondary", "rgb(26, 26, 27)");
      rootElement.style.setProperty("--color-bac-tertiary", "rgb(119, 122, 136)");

      // Give switch button to checked when reset button clicked
      themeSwitches.checked = true;

      const settings = {
        id: 1,
        darkTheme: true,
        colorpalette: "rgb(237, 86, 59)",
        language: "en",
      };

      saveSettings(settings).then(() => {
        applySettings();
      });
    });
  });

  saveButtons.forEach((saveBtn, index) => {
    saveBtn.addEventListener("click", () => {
      let newColor = newColors[index].value;
      let dark;
      console.log(themeSwitches)
      // control if dark theme is checked
      if (themeSwitches.checked) {
        dark = true;
      } else {
        dark = false;
      }

      // say what should settings be based on the user input
      let settings = {
        id: 1,
        darkTheme: dark,
        colorpalette: newColor,
        language: "en",
      };

      saveSettings(settings).then(() => {
        applySettings();
      });
    });
  });
});

function cs() {
  alert("We are sorry, but this feature is not available yet. \nCZ: Omlouváme se, ale tato funkce zatím není dostupná.");
}