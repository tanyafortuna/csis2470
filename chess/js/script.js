// Helper vars
let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let numbers = ['1', '2', '3', '4', '5', '6', '7', '8'];
let tempHTML = "";
let bgColorMarker = 0;
let themeMarker = 0;
let themes = ["blue", "browns", "greens", "pinks"];

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

    if (bgColorMarker % 2 == 0) { tempHTML += " class='light blue'"; }
    else { tempHTML += " class='dark blue'"; }
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
  let divs = document.querySelectorAll("div.light, div.dark");

  for (let div of divs) {
    div.classList.remove(themes[themeMarker]);
    div.classList.add(themes[(themeMarker + 1) % 4]);
  }

  themeMarker++;
  if (themeMarker > 3) themeMarker = 0;
}
