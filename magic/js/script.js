// Helper variables
let timer = 0;
let delay = 200;
let prevent = false;
let deckID = getDeckID();


// Elements
let cardsContainerDiv = document.getElementById("cards");
let showButton = document.getElementById("show-cards");
let shuffleButton = document.getElementById("shuffle-cards");


// Put card divs on the page
let cardsHTML = "";
for (let i = 0; i < 52; i++) {
  cardsHTML += `<div class="card hoverable" style="left: ${i * 25}px"></div>`;
}
cardsContainerDiv.innerHTML = cardsHTML;


// Add event listeners for cards being clicked
let cardDivs = document.querySelectorAll(".card");
for (card of cardDivs) {
  card.addEventListener("click", singleClick);
}

// Event listeners
function singleClick(e) {
  timer = setTimeout(function() {
    if (!prevent) { doClickAction(e); }
    prevent = false;
  }, delay);
}

function doubleClick(e) {
  clearTimeout(timer);
  prevent = true;
  doDoubleClickAction(e);
}

function doClickAction(e) {
  let source = e.srcElement;
  source.classList.toggle("hoverable");
  source.classList.toggle("clicked");
  if (source.classList.contains("clicked"))
    source.addEventListener("dblclick", doubleClick);
  else
    source.removeEventListener("dblclick", doubleClick);
}

function doDoubleClickAction(e) {
  let source = e.srcElement;
  source.removeEventListener("click", singleClick);
  source.removeEventListener("dblclick", doubleClick);
  drawCard(source);
}


// Card-related functions
function getDeckID() {
  let x = new XMLHttpRequest();
  x.open('GET', `https://www.deckofcardsapi.com/api/deck/new/shuffle/`);
  x.send();
  x.addEventListener('readystatechange', () => {
    if (x.readyState === 4 && x.status === 200) {
      deckID = JSON.parse(x.responseText).deck_id;
      // preloadImages(deckID);
    }
  });
}

function drawCard(el) {
  let cardImg;
  let x = new XMLHttpRequest();
  x.open('GET', `https://www.deckofcardsapi.com/api/deck/${deckID}/draw/`);
  x.send();
  x.addEventListener('readystatechange', () => {
    if (x.readyState === 4 && x.status === 200)
      setBGImage(el, JSON.parse(x.responseText).cards[0].image);
  });
}

function shuffleAndShowCards() {
  showButton.setAttribute("disabled", true);
  shuffleButton.removeAttribute("disabled");
  for (card of cardDivs) {
    card.classList.remove("hoverable", "clicked");
    card.removeEventListener("click", singleClick);
    card.removeEventListener("dblclick", doubleClick);
  }

  let cardImg;

  let x = new XMLHttpRequest();
  x.open('GET', `https://www.deckofcardsapi.com/api/deck/${deckID}/shuffle/`);
  x.send();
  x.addEventListener('readystatechange', () => {
    if (x.readyState === 4 && x.status === 200) {
      let y = new XMLHttpRequest();
      y.open('GET', `https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=52`);
      y.send();
      y.addEventListener('readystatechange', () => {
        if (y.readyState === 4 && y.status === 200) {
          for (let i = 0; i < 52; i++)
            setBGImage(cardDivs[i], JSON.parse(y.responseText).cards[i].image);
        }
      });
    }
  });
}

function setBGImage(el, img) {
  el.style.backgroundImage = `url("${img}")`;
}
