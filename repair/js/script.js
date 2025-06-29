let partsImages = [
  "<img src='img/robot-body.png' data-part='body' draggable='true'>",
  "<img src='img/robot-fastener.png' data-part='wheel' draggable='true'>",
  "<img src='img/robot-head.png' data-part='head' draggable='true'>",
  "<img src='img/robot-left-arm.png' data-part='left-arm' draggable='true'>",
  "<img src='img/robot-right-arm.png' data-part='right-arm' draggable='true'>",
  ""
]

let robotParts = document.querySelectorAll(".parts");
let robotTargets = document.querySelectorAll(".targets");

let assemblyGrid = document.getElementById("assembly");
let successMessage = document.getElementById("success-p");
let pageHeader = document.querySelector("h1");
let helperArea = document.querySelector(".helper");
let rulesMessage = document.getElementById("rules-p");
let timeMessage = document.getElementById("time-p");
let infinityButton = document.getElementById("infinity-button");
let tenButton = document.getElementById("ten-button");
let fiveButton = document.getElementById("five-button");

let item;
let placedItems = 0;
let robotTimer;
let intervalID;



// Event listeners
for (part of robotParts) {
  part.addEventListener('dragstart', function(e) { item = e.srcElement; });
}

for (target of robotTargets) {
  target.addEventListener('dragover', function(e) { e.preventDefault(); });
  target.addEventListener('drop', drop);
  target.addEventListener('dragenter',
    function(e) { e.srcElement.classList.toggle('hover'); });
  target.addEventListener('dragleave',
    function(e) { e.srcElement.classList.toggle('hover'); });
}

// Functions
function showPieces(timer) {
  timeMessage.style.display = "none";
  infinityButton.style.display = "none";
  tenButton.style.display = "none";
  fiveButton.style.display = "none";

  // Randomly place robot parts in parts area
  let tempImages = partsImages;

  for (let i = 0; i < 6; i++) {
    let ind = Math.floor(Math.random() * tempImages.length);
    robotParts[i].innerHTML = tempImages[ind];
    tempImages.splice(ind, 1);
  }

  if (timer == 10 || timer == 5) {
    robotTimer = timer;
    timeMessage.textContent = robotTimer;
    timeMessage.style.fontSize = "60px";
    timeMessage.style.display = "block";
    intervalID = setInterval(countdown, 1000);
  }
}

function countdown() {
  robotTimer--;
  timeMessage.textContent = robotTimer;
  if (robotTimer <= 0) {
    for (part of robotParts) { part.style.display = "none"; }
    clearInterval(intervalID);

    timeMessage.style.fontSize = "23px";
    timeMessage.textContent = "Aw, you didn't complete me in time."
    rulesMessage.textContent = "";
  }
}

function drop(e) {
  let itemPart = item.attributes['data-part'].nodeValue;
  let targetPart = e.srcElement.attributes['data-part'].nodeValue;

  if (itemPart == targetPart) {
    placedItems++;
    e.srcElement.textContent = "";
    e.srcElement.appendChild(item);
    item.attributes['draggable'].nodeValue = false;
  }

  e.srcElement.classList.remove('hover');

  processIfDone();
}

function processIfDone() {
  if (placedItems == 5) {
    for (target of robotTargets) {
      target.style.border = "none";
      target.style.marginTop = "0";
      target.style.padding = "0";
      target.classList.add("jiggle");

      assemblyGrid.style.columnGap = "0";
      assemblyGrid.style.rowGap = "105px";
    }

    for (part of robotParts) { part.style.display = "none"; }
    successMessage.style.display = "block";

    pageHeader.textContent = "Ah, what a relief!";
    helperArea.innerHTML = "";
  }

}