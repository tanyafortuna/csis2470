// Helper vars
let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let numbers = ['1', '2', '3', '4', '5', '6', '7', '8'];
let tempHTML = "";
let bgColorMarker = 0;
let themeMarker = 0;

// Elements
let boardDiv = document.getElementById("chessboard");



// Populate chess board
//
// Add top row of board (letters)
tempHTML += "<div></div>";
for (let i = 0; i < letters.length; i++) {
  tempHTML += "<div class='top border'>" + letters[i] + "</div>";
}
tempHTML += "<div></div>";
// Add main part of board
for (let i = 0; i < letters.length; i++) {
  tempHTML += "<div class='left border'>" + numbers[7 - i] + "</div>";

  for (let n = 0; n < numbers.length; n++) {
    tempHTML += "<div id='" + letters[i] + numbers[n] + "'";

    if (bgColorMarker % 2 == 0) { tempHTML += " class='light'"; }
    else { tempHTML += " class='dark'"; }
    bgColorMarker++;

    tempHTML += "></div>";
  }

  tempHTML += "<div class='right border'>" + numbers[7 - i] + "</div>";
  bgColorMarker++;
}
// Add bottom row of board (letters)
tempHTML += "<div></div>";
for (let i = 0; i < letters.length; i++) {
  tempHTML += "<div class='bottom border'>" + letters[i] + "</div>";
}
tempHTML += "<div></div>";
// Drop it in
boardDiv.innerHTML = tempHTML;


// Functions
function rotateBoard() {
  boardDiv.classList.toggle("rotate");
}

function changeTheme() {
  let lightDivs = document.querySelectorAll("div.light");
  let darkDivs = document.querySelectorAll("div.dark");

  switch (themeMarker) {
    case 0:
      for (let div of lightDivs) { div.classList.add("browns"); }
      for (let div of darkDivs) { div.classList.add("browns"); }
      themeMarker++;
      break;
    case 1:
      for (let div of lightDivs) {
        div.classList.remove("browns");
        div.classList.add("greens");
      }
      for (let div of darkDivs) {
        div.classList.remove("browns");
        div.classList.add("greens");
      }
      themeMarker++;
      break;
    case 2:
      for (let div of lightDivs) {
        div.classList.remove("greens");
        div.classList.add("pinks");
      }
      for (let div of darkDivs) {
        div.classList.remove("greens");
        div.classList.add("pinks");
      }
      themeMarker++;
      break;
    case 3:
      for (let div of lightDivs) { div.classList.remove("pinks"); }
      for (let div of darkDivs) { div.classList.remove("pinks"); }
      themeMarker = 0;
      break;
  }
}
