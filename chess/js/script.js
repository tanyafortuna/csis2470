// Helper vars
let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let numbers = ['1', '2', '3', '4', '5', '6', '7', '8'];
let tempHTML = "";
let bgColorMarker = 0;
let themeMarker = 0;
let themes = ["blue", "browns", "greens", "pinks"];
let validImages = [
  "bishop-b.png", "bishop-w.png",
  "king-b.png", "king-w.png",
  "knight-b.png", "knight-w.png",
  "pawn-b.png", "pawn-w.png",
  "queen-b.png", "queen-w.png",
  "rook-b.png", "rook-w.png"
];
let validPositions = [
  "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8",
  "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8",
  "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8",
  "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8",
  "E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8",
  "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8",
  "G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8",
  "H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8"
];

// Elements
let boardDiv = document.getElementById("chessboard");
let setBoardButton = document.getElementById("set-board");



// Populate chess board

// Add top row of board (letters)
tempHTML += "<div></div>";
for (let i = 0; i < letters.length; i++) {
  tempHTML += "<div class='top border'>" + letters[i] + "</div>";
}
tempHTML += "<div></div>";

// Add main part of board
for (let n = 0; n < numbers.length; n++) {
  // for (let i = 0; i < letters.length; i++) {
  tempHTML += "<div class='left border'>" + numbers[7 - n] + "</div>";

  for (let i = 0; i < letters.length; i++) {
    // for (let n = 0; n < numbers.length; n++) {
    tempHTML += "<div id='" + letters[i] + numbers[n] + "'";

    if (bgColorMarker % 2 == 0) { tempHTML += " class='light blue'"; }
    else { tempHTML += " class='dark blue'"; }
    bgColorMarker++;

    tempHTML += "></div>";
  }

  tempHTML += "<div class='right border'>" + numbers[7 - n] + "</div>";
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




// Piece class
class Piece {
  #color;
  #name;
  #position;
  #image;

  constructor(n, c, p, i) {
    this.name = n;
    this.color = c;
    this.position = p;
    this.image = i;
  }

  // Getters
  get name() { return this.#name; }
  get color() { return this.#color; }
  get position() { return this.#position; }
  get image() { return this.#image; }

  // Setters
  set name(n) { this.#name = n; }
  set color(c) {
    if (c == "light" || c == "dark") this.#color = c;
    else console.log("Invalid color!");
  }
  set position(p) {
    if (validPositions.includes(p)) this.#position = p;
    else console.log("Invalid position!");
  }
  set image(i) {
    if (validImages.includes(i)) this.#image = i;
    else console.log("Invalid image!");
  }
}




// Functions
function setBoard() {
  let pieces = [
    new Piece("LIGHT ROOK A", "light", "A8", "rook-w.png"),
    new Piece("LIGHT KNIGHT B", "light", "B8", "knight-w.png"),
    new Piece("LIGHT BISHOP C", "light", "C8", "bishop-w.png"),
    new Piece("LIGHT QUEEN", "light", "D8", "queen-w.png"),
    new Piece("LIGHT KING", "light", "E8", "king-w.png"),
    new Piece("LIGHT BISHOP F", "light", "F8", "bishop-w.png"),
    new Piece("LIGHT KNIGHT G", "light", "G8", "knight-w.png"),
    new Piece("LIGHT ROOK H", "light", "H8", "rook-w.png"),
    new Piece("LIGHT PAWN A7", "light", "A7", "pawn-w.png"),
    new Piece("LIGHT PAWN B7", "light", "B7", "pawn-w.png"),
    new Piece("LIGHT PAWN C7", "light", "C7", "pawn-w.png"),
    new Piece("LIGHT PAWN D7", "light", "D7", "pawn-w.png"),
    new Piece("LIGHT PAWN E7", "light", "E7", "pawn-w.png"),
    new Piece("LIGHT PAWN F7", "light", "F7", "pawn-w.png"),
    new Piece("LIGHT PAWN G7", "light", "G7", "pawn-w.png"),
    new Piece("LIGHT PAWN H7", "light", "H7", "pawn-w.png"),

    new Piece("DARK ROOK A", "dark", "A1", "rook-b.png"),
    new Piece("DARK KNIGHT B", "dark", "B1", "knight-b.png"),
    new Piece("DARK BISHOP C", "dark", "C1", "bishop-b.png"),
    new Piece("DARK QUEEN", "dark", "D1", "queen-b.png"),
    new Piece("DARK KING", "dark", "E1", "king-b.png"),
    new Piece("DARK BISHOP F", "dark", "F1", "bishop-b.png"),
    new Piece("DARK KNIGHT G", "dark", "G1", "knight-b.png"),
    new Piece("DARK ROOK H", "dark", "H1", "rook-b.png"),
    new Piece("DARK PAWN A2", "dark", "A2", "pawn-b.png"),
    new Piece("DARK PAWN B2", "dark", "B2", "pawn-b.png"),
    new Piece("DARK PAWN C2", "dark", "C2", "pawn-b.png"),
    new Piece("DARK PAWN D2", "dark", "D2", "pawn-b.png"),
    new Piece("DARK PAWN E2", "dark", "E2", "pawn-b.png"),
    new Piece("DARK PAWN F2", "dark", "F2", "pawn-b.png"),
    new Piece("DARK PAWN G2", "dark", "G2", "pawn-b.png"),
    new Piece("DARK PAWN H2", "dark", "H2", "pawn-b.png")
  ];
  console.log(pieces);

  let imgCode;
  for (let piece of pieces) {
    imgCode = "<img src='img/" + piece.image + "'";
    if (piece.color == "dark") imgCode += " class='rotate";
    imgCode += "'> ";

    document.getElementById(piece.position).innerHTML = imgCode;
  }

  setBoardButton.setAttribute("disabled", "");
  setBoardButton.removeAttribute("onclick");
}

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