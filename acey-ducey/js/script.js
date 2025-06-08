// preload card images so they aren't slow
let images = new Array();
let files = new Array(
  "img/cards/AC.jpg", "img/cards/AD.jpg", "img/cards/AH.jpg", "img/cards/AS.jpg",
  "img/cards/2C.jpg", "img/cards/2D.jpg", "img/cards/2H.jpg", "img/cards/2S.jpg",
  "img/cards/3C.jpg", "img/cards/3D.jpg", "img/cards/3H.jpg", "img/cards/3S.jpg",
  "img/cards/4C.jpg", "img/cards/4D.jpg", "img/cards/4H.jpg", "img/cards/4S.jpg",
  "img/cards/5C.jpg", "img/cards/5D.jpg", "img/cards/5H.jpg", "img/cards/5S.jpg",
  "img/cards/6C.jpg", "img/cards/6D.jpg", "img/cards/6H.jpg", "img/cards/6S.jpg",
  "img/cards/7C.jpg", "img/cards/7D.jpg", "img/cards/7H.jpg", "img/cards/7S.jpg",
  "img/cards/8C.jpg", "img/cards/8D.jpg", "img/cards/8H.jpg", "img/cards/8S.jpg",
  "img/cards/9C.jpg", "img/cards/9D.jpg", "img/cards/9H.jpg", "img/cards/9S.jpg",
  "img/cards/10C.jpg", "img/cards/10D.jpg", "img/cards/10H.jpg", "img/cards/10S.jpg",
  "img/cards/JC.jpg", "img/cards/JD.jpg", "img/cards/JH.jpg", "img/cards/JS.jpg",
  "img/cards/QC.jpg", "img/cards/QD.jpg", "img/cards/QH.jpg", "img/cards/QS.jpg",
  "img/cards/KC.jpg", "img/cards/KD.jpg", "img/cards/KH.jpg", "img/cards/KS.jpg"
);

for (let i = 0; i < files.length; i++) {
  images[i] = new Image();
  images[i].src = files[i];
}

// strings
let mockingStrings = new Array("What's the matter - afraid of a little risk?",
  "No bet? I didn't know we were playing Go Fish.",
  "Bold strategy...standing still.",
  "Come on, even the cards are judging you.",
  "This is Acey Ducey, not nap time!");

let badBetStrings = new Array("High roller on a low budget, huh?",
  "You can't bet dreams - try something in your price range.",
  "That's a bold bet for someone with empty pockets.",
  "This isn't a credit casino. Try again.",
  "Nice try, Rockefeller. Check your balance.");

let rulesStrings = new Array(
  "How to play Acey Ducey: You'll be shown two cards face up. Bet any amount up to your bank balance, guessing the next card will fall between them in value.",
  "If the third card is between the first two - you win your bet! If it's outside the range or matches either card - you lose your bet.",
  "Keep playing until you run out of money...or get rich! (Aces are low, Kings are high.)");

let aiStrings = new Array(
  "For the no-bet mocking strings, Tanya prompted ChatGPT with:",
  "I am coding up an old game called Acey Ducey where two playing cards are shown to the user and they have to bet on if a third card will be...",
  "between the first two cards. I need five short, gently mocking messages for if the user doesn't enter a bet. For example, \"Are you chicken?\"",

  "For the overly-large-bet mocking strings, Tanya prompted ChatGPT with:",
  "I am coding up an old game called Acey Ducey where two playing cards are shown to the user and they have to bet on if a third card will be...",
  "between the first two cards. I need five short messages for if the user tries to enter a bet that is larger than their bank to tell them that they need to...",
  "enter a value within their budget. They can be slightly mocking like the previous set.",

  "For the rules, Tanya prompted ChatGPT with:",
  "Could you please write me up a short, succinct set of rules for Acey Ducey that I can show the player if they click a help button?"

);

let cassieStrings = new Array(
  "Welcome to Acey Ducey! I'm Cassie. I'll be your dealer today.",
  "How much would you like to bet that your card is between these two cards?",
  "You lost this round. Bummer. Play again?",
  "Oof, you lost this round and now you're all out of dough. Scrounge some up and come back soon (or press the reset button to play again).",
  "You won this round. Lucky! Play again?",
  "Wow, you won this round and it pushed you over $500. You win the game! Now get out of here while the getting's good (or press the reset button to play again).");

// elements
let bankAmount = document.getElementById("bank-amount");
let cheatMode = document.getElementById("cheat-mode-input");
let bubbleText = document.getElementById("bubble-text");
let okButton = document.getElementById("talk-ok");
let betButton = document.getElementById("place-bet");
let betAmount = document.getElementById("bet-amount");
let newCardsButton = document.getElementById("new-cards");
let nextRulesButton = document.getElementById("talk-rules");
let nextAIButton = document.getElementById("talk-ai");
let aiButton = document.getElementById("ai-button");
let helpButton = document.getElementById("help-button");
let card1 = document.getElementById("card1");
let card2 = document.getElementById("card2");
let card3 = document.getElementById("card3");

// variables
let faceValue1, faceValue2, faceValue3; // used to store face values 
let suit1, suit2; // used to store suits 
let bt = ""; // used to store what the user was seeing before the rules
let nb, bb, ba, na, nc, nr; // used to store what the user saw before the rules

// restrict anything but a whole number in the bet amount field
let allowedKeys = [..."0123456789", "Backspace"];
betAmount.addEventListener("keydown", e => {
  if (!allowedKeys.includes(e.key)) e.preventDefault();
});
betAmount.addEventListener("paste", e => e.preventDefault());


// functions
function showRules(n) {
  let len = rulesStrings.length;
  if (n == 0 && bt == "") { // store what the player was seeing before help
    storeState();
  }

  if (n < len) { // show the rules
    bubbleText.textContent = rulesStrings[n];
    nextRulesButton.style.display = "block";
    nextRulesButton.setAttribute("onclick", "showRules(" + (n + 1) + ")");
    if (n == len - 1) nextRulesButton.textContent = "Got it";
    else nextRulesButton.textContent = "Next";
  }
  else { // return to what was showing before the rules were shown
    restoreState();
  }
}

function showAI(n) {
  let len = aiStrings.length;
  if (n == 0 && bt == "") { // store what the player was seeing before help
    storeState();
  }

  if (n < len) { // show the rules
    bubbleText.textContent = aiStrings[n];
    nextAIButton.style.display = "block";
    nextAIButton.setAttribute("onclick", "showAI(" + (n + 1) + ")");
    if (n == len - 1) nextAIButton.textContent = "Got it";
    else nextAIButton.textContent = "Next";
  }
  else { // return to what was showing before the rules were shown
    restoreState();
  }
}

function restoreState() {
  bubbleText.textContent = bt;
  okButton.style.display = nb;
  betButton.style.display = bb;
  betAmount.style.display = ba;
  nextAIButton.style.display = na;
  nextRulesButton.style.display = nr;
  newCardsButton.style.display = nc;
  bt = "";

  helpButton.removeAttribute("disabled");
  aiButton.removeAttribute("disabled");
}

function storeState() {
  bt = bubbleText.textContent;
  nb = okButton.style.display;
  bb = betButton.style.display;
  ba = betAmount.style.display;
  na = nextAIButton.style.display;
  nr = nextRulesButton.style.display;
  nc = newCardsButton.style.display;
  helloButton.style.display = "none";
  okButton.style.display = "none";
  betButton.style.display = "none";
  betAmount.style.display = "none";
  nextAIButton.style.display = "none";
  nextRulesButton.style.display = "none";
  newCardsButton.style.display = "none";

  helpButton.setAttribute("disabled", "");
  aiButton.setAttribute("disabled", "");
}

function processBet() {
  newCardsButton.style.display = "none";

  // no bet
  if (betAmount.value == 0) {
    bubbleText.textContent = mockingStrings[Math.floor(Math.random() * 5)];
    newCardsButton.style.display = "inline-block";
  }
  // too large bet
  else if (betAmount.value > Number(bankAmount.textContent)) {
    bubbleText.textContent = badBetStrings[Math.floor(Math.random() * 5)];
    newCardsButton.style.display = "inline-block";
  }
  // valid bet
  else {
    setPlayerCard();

    // win the round
    if (faceValue3 > faceValue1 && faceValue3 < faceValue2) {
      bankAmount.textContent = Number(bankAmount.textContent) + Number(betAmount.value);
      checkForGameWin();
    }
    // lose the round
    else {
      bankAmount.textContent -= betAmount.value;
      checkForGameLoss();
    }
  }

  betAmount.value = "";
}

function checkForGameWin() {
  if (bankAmount.textContent >= 500) {
    bubbleText.textContent = cassieStrings[5];
    betButton.style.display = "none";
    betAmount.style.display = "none";
  }
  else {
    bubbleText.textContent = cassieStrings[4];
    okButton.style.display = "block";
    betButton.style.display = "none";
    betAmount.style.display = "none";
  }
}

function checkForGameLoss() {
  if (bankAmount.textContent == 0) {
    bubbleText.textContent = cassieStrings[3];
    betButton.style.display = "none";
    betAmount.style.display = "none";
  }
  else {
    bubbleText.textContent = cassieStrings[2];
    okButton.style.display = "block";
    betButton.style.display = "none";
    betAmount.style.display = "none";
  }
}

function promptForBet() {
  hideCards();
  bubbleText.textContent = cassieStrings[1];
  newCardsButton.style.display = "none";
  okButton.style.display = "none";
  betButton.style.display = "inline-block";
  betAmount.style.display = "block";
  setNewStartingCards();
}

function hideCards() {
  card1.style.backgroundImage = "url('img/back.jpg')";
  card2.style.backgroundImage = "url('img/back.jpg')";
  card3.style.backgroundImage = "url('img/back.jpg')";
}

function setPlayerCard() {
  let fv;
  let s;

  do { // check to make sure it's not the same as a previous card
    fv = Math.floor(Math.random() * 13 + 1);
    fv = setFVforSpecialCards(fv);
    s = setSuit(Math.floor(Math.random() * 4));
  } while ((fv == faceValue1 && s == suit1) || (fv == faceValue2 && s == suit2));

  faceValue3 = fv; // store for later comparison

  card3.style.backgroundImage = "url('img/cards/" + fv + s + ".jpg')";
  card3Back.classList.toggle("shrunk");
  card3.classList.toggle("slow-shrunk");
}

function setNewStartingCards() {
  let fv1, fv2;

  // get face values
  if (cheatMode.checked) {
    fv1 = 1;
    fv2 = 13;
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
  }

  // store for later comparison
  faceValue1 = fv1;
  faceValue2 = fv2;

  fv1 = setFVforSpecialCards(fv1);
  fv2 = setFVforSpecialCards(fv2);

  // get suits
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

function getNumericalFV(fv) {
  switch (fv) {
    case "A": return 1;
    case "J": return 11;
    case "Q": return 12;
    case "K": return 13;
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

function resetGame() {
  bankAmount.textContent = "100";
  bubbleText.textContent = cassieStrings[0];
  okButton.style.display = "block";
  betButton.style.display = "none";
  betAmount.style.display = "none";
  nextRulesButton.style.display = "none";
  nextAIButton.style.display = "none";
  newCardsButton.style.display = "none";
  bt = "";
  helpButton.removeAttribute("disabled");
  aiButton.removeAttribute("disabled");
  hideCards();
}