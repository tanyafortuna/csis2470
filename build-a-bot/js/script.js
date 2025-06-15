// Get controls elements
let safetyYes = document.getElementById("safety-rounded");
let safetyNo = document.getElementById("safety-sharp");
let evilYes = document.getElementById("evil-yes");
let evilNo = document.getElementById("evil-no");
let headSquare = document.getElementById("head-square");
let headRound = document.getElementById("head-round");
let eyeSquare = document.getElementById("eye-square");
let eyeRound = document.getElementById("eye-round");
let eyeColor = document.getElementById("eye-color");
let bodyColor = document.getElementById("body-color");

// Get robot elements
let robotHead = document.querySelector(".head");
let robotEyes = document.querySelectorAll(".eye");
let robotEyeballs = document.querySelectorAll(".eyeball");
let robotMouth = document.querySelector(".mouth");
let robotArms = document.querySelectorAll(".arm");
let robotTorso = document.querySelector(".torso");
let robotLegs = document.querySelectorAll(".leg");

// Add event listeners
safetyYes.addEventListener("change", addSafetyEdges);
safetyNo.addEventListener("change", removeSafetyEdges);
evilYes.addEventListener("change", addEvilEyes);
evilNo.addEventListener("change", removeEvilEyes);
headSquare.addEventListener("change", makeHeadSquare);
headRound.addEventListener("change", makeHeadRound);
eyeSquare.addEventListener("change", makeEyesSquare);
eyeRound.addEventListener("change", makeEyesRound);
eyeColor.addEventListener("change", changeEyeColor);
bodyColor.addEventListener("change", changeBodyColor);


//Functions
function reset() {
  safetyNo.checked = true;
  evilNo.checked = true;
  headSquare.checked = true;
  eyeSquare.checked = true;
  eyeColor.value = "#FFFFFF";
  bodyColor.value = "#C0C0C0";
  removeSafetyEdges();
  removeEvilEyes();
  makeHeadSquare();
  makeEyesSquare();
  changeEyeColor();
  changeBodyColor();
}

function randomize() {
  if (Math.floor(Math.random() * 2)) {
    safetyYes.checked = true;
    addSafetyEdges();
  }
  else {
    safetyNo.checked = true;
    removeSafetyEdges();
  }

  if (Math.floor(Math.random() * 2)) {
    evilYes.checked = true;
    addEvilEyes();
  }
  else {
    evilNo.checked = true;
    removeEvilEyes();
  }

  if (Math.floor(Math.random() * 2)) {
    headSquare.checked = true;
    makeHeadSquare();
  }
  else {
    headRound.checked = true;
    makeHeadRound();
  }

  if (Math.floor(Math.random() * 2)) {
    eyeSquare.checked = true;
    makeEyesSquare();
  }
  else {
    eyeRound.checked = true;
    makeEyesRound();
  }

  eyeColor.value = getRandomHex();
  changeEyeColor();

  bodyColor.value = getRandomHex();
  changeBodyColor();
}

function getRandomHex() {
  let code = "#";
  let hexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
  for (let i = 0; i < 6; i++) { code += hexes[Math.floor(Math.random() * 16)]; }
  return code;
}

function addSafetyEdges() {
  robotHead.style.borderRadius = "15px";
  robotArms[0].style.borderRadius = "15px";
  robotArms[1].style.borderRadius = "15px";
  robotTorso.style.borderRadius = "15px";
  robotLegs[0].style.borderRadius = "15px";
  robotLegs[1].style.borderRadius = "15px";
}

function removeSafetyEdges() {
  robotHead.style.borderRadius = "0px";
  robotArms[0].style.borderRadius = "0px";
  robotArms[1].style.borderRadius = "0px";
  robotTorso.style.borderRadius = "0px";
  robotLegs[0].style.borderRadius = "0px";
  robotLegs[1].style.borderRadius = "0px";
}

function addEvilEyes() {
  robotEyeballs[0].style.backgroundColor = "red";
  robotEyeballs[1].style.backgroundColor = "red";
}

function removeEvilEyes() {
  robotEyeballs[0].style.backgroundColor = "black";
  robotEyeballs[1].style.backgroundColor = "black";
}

function makeHeadSquare() {
  robotHead.style.borderRadius = "0";
  robotEyes[0].style.height = "56px";
  robotEyes[0].style.width = "56px";
  robotEyes[1].style.height = "56px";
  robotEyes[1].style.width = "56px";
  robotMouth.style.width = "118px";
}

function makeHeadRound() {
  robotHead.style.borderRadius = "50%";
  robotEyes[0].style.height = "46px";
  robotEyes[0].style.width = "46px";
  robotEyes[1].style.height = "46px";
  robotEyes[1].style.width = "46px";
  robotMouth.style.height = "34px";
  robotMouth.style.width = "98px";
}

function makeEyesSquare() {
  robotEyes[0].style.borderRadius = "0";
  robotEyes[1].style.borderRadius = "0";
}

function makeEyesRound() {
  robotEyes[0].style.borderRadius = "50%";
  robotEyes[1].style.borderRadius = "50%";
}

function changeEyeColor() {
  robotEyes[0].style.backgroundColor = eyeColor.value;
  robotEyes[1].style.backgroundColor = eyeColor.value;
}

function changeBodyColor() {
  robotHead.style.backgroundColor = bodyColor.value;
  robotArms[0].style.backgroundColor = bodyColor.value;
  robotArms[1].style.backgroundColor = bodyColor.value;
  robotTorso.style.backgroundColor = bodyColor.value;
  robotLegs[0].style.backgroundColor = bodyColor.value;
  robotLegs[1].style.backgroundColor = bodyColor.value;
}