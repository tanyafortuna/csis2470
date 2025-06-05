// strings
let mocking1 = "mocking message";
let mocking2 = "mocking message";
let mocking3 = "mocking message";
let mocking4 = "mocking message";
let mocking5 = "mocking message";

let overbet1 = "too large bet message";
let overbet2 = "too large bet message";
let overbet3 = "too large bet message";
let overbet4 = "too large bet message";
let overbet5 = "too large bet message";

let string1 = "Welcome to Acey Ducey! I'm Cassie. I'll be your dealer today.";
let string2 = "How much would you like to bet that your card is between these two cards?";

// elements
let bankAmount = document.getElementById("bank-amount");
let cheatMode = document.getElementById("cheat-mode-input");
let bubbleText = document.getElementById("bubble-text");
let nextButton = document.getElementById("talk-next");
let betButton = document.getElementById("place-bet");
let betAmount = document.getElementById("bet-amount");
let card1 = document.getElementById("card1");
let card2 = document.getElementById("card2");
let card3 = document.getElementById("card3");

// restrict anything but a whole number in the bet amount field
let allowedKeys = [..."0123456789", "Backspace"];
betAmount.addEventListener("keydown", e => {
  if (!allowedKeys.includes(e.key)) e.preventDefault();
});
betAmount.addEventListener("paste", e => e.preventDefault());


// functions
function processBet() {
  // if (betAmount.value )
}

function nextPrompt() {
  if (bubbleText.textContent == string1) {
    bubbleText.textContent = string2;
    nextButton.style.display = "none";
    betButton.style.display = "block";
    betAmount.style.display = "block";
    setNewCards();
  }
}

function setNewCards() {
  let fv1, fv2;

  // get face value
  if (cheatMode.checked) {
    fv1 = "A";
    fv2 = "K";
  }
  else {
    fv1 = Math.floor(Math.random() * 13 + 1);
    do { fv2 = Math.floor(Math.random() * 13 + 1); }
    while (fv1 == fv2);

    if (fv1 > fv2) {
      let temp = fv1;
      fv1 = fv2;
      fv2 = temp;
    }

    fv1 = setFVforSpecialCards(fv1);
    fv2 = setFVforSpecialCards(fv2);
  }

  // get suit
  let s1 = setSuit(Math.floor(Math.random() * 4));
  let s2 = setSuit(Math.floor(Math.random() * 4));

  // set cards in dom
  card1.style.backgroundImage = "url('img/cards/" + fv1 + s1 + ".jpg')";
  card2.style.backgroundImage = "url('img/cards/" + fv2 + s2 + ".jpg')";
}

function setFVforSpecialCards(fv) {
  switch (fv) {
    case 1: return "A";
    case 11: return "J";
    case 12: return "Q";
    case 13: return "K";
    default: return fv;
  }
}

function setSuit(s) {
  switch (s) {
    case 0: return "S";
    case 1: return "H";
    case 2: return "C";
    case 3: return "D";
  }
}

function resetBank() {
  bankAmount.textContent = "100";
}