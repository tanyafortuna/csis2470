// Elements
let colorPicker = document.getElementById("color");
let sizePickerXS = document.getElementById("size-xs");
let sizePickerS = document.getElementById("size-s");
let sizePickerM = document.getElementById("size-m");
let sizePickerL = document.getElementById("size-l");
let sizePickerXL = document.getElementById("size-xl");
let logoPicker1 = document.getElementById("logo1");
let logoPicker2 = document.getElementById("logo2");
let logoPicker3 = document.getElementById("logo3");
let logoPicker4 = document.getElementById("logo4");
let textPicker1 = document.getElementById("text1");
let textPicker2 = document.getElementById("text2");
let textPicker3 = document.getElementById("text3");

let logoImg1 = document.querySelector("#logo1 + label img");
let logoImg2 = document.querySelector("#logo2 + label img");
let logoImg3 = document.querySelector("#logo3 + label img");
let logoImg4 = document.querySelector("#logo4 + label img");

let shirtBodyDivs = document.querySelectorAll(".shirt");
let shirtDesignDiv = document.getElementById("shirt-design");
let textShirtDiv1 = document.querySelector(".text.one");
let textShirtDiv2 = document.querySelector(".text.two");
let textShirtDiv3 = document.querySelector(".text.three");


// Event listeners
colorPicker.addEventListener("change", changeShirtColor);
sizePickerXS.addEventListener("change", changeShirtSize);
sizePickerS.addEventListener("change", changeShirtSize);
sizePickerM.addEventListener("change", changeShirtSize);
sizePickerL.addEventListener("change", changeShirtSize);
sizePickerXL.addEventListener("change", changeShirtSize);
logoPicker1.addEventListener("change", changeShirtLogo);
logoPicker2.addEventListener("change", changeShirtLogo);
logoPicker3.addEventListener("change", changeShirtLogo);
logoPicker4.addEventListener("change", changeShirtLogo);
textPicker1.addEventListener("input", changeShirtText);
textPicker2.addEventListener("input", changeShirtText);
textPicker3.addEventListener("input", changeShirtText);


// Event listener functions
function changeShirtColor() {
  for (let div of shirtBodyDivs) { div.style.backgroundColor = colorPicker.value; }
}

function changeShirtSize(e) {
  for (let div of shirtBodyDivs) {
    div.classList.remove("xsmall", "small", "medium", "large", "xlarge");
  }
  switch (e.srcElement) {
    case sizePickerXS:
      for (let div of shirtBodyDivs) { div.classList.add("xsmall"); }
      break;
    case sizePickerS:
      for (let div of shirtBodyDivs) { div.classList.add("small"); }
      break;
    case sizePickerM:
      for (let div of shirtBodyDivs) { div.classList.add("medium"); }
      break;
    case sizePickerL:
      for (let div of shirtBodyDivs) { div.classList.add("large"); }
      break;
    case sizePickerXL:
      for (let div of shirtBodyDivs) { div.classList.add("xlarge"); }
      break;
  }
}

function changeShirtLogo(e) {
  removeShirtText();
  logoImg1.classList.remove("opaque");
  logoImg2.classList.remove("opaque");
  logoImg3.classList.remove("opaque");
  logoImg4.classList.remove("opaque");

  switch (e.srcElement) {
    case logoPicker1:
      shirtDesignDiv.style.backgroundImage = 'url("img/gryffindor.png")';
      break;
    case logoPicker2:
      shirtDesignDiv.style.backgroundImage = 'url("img/hufflepuff.png")';
      break;
    case logoPicker3:
      shirtDesignDiv.style.backgroundImage = 'url("img/ravenclaw.png")';
      break;
    case logoPicker4:
      shirtDesignDiv.style.backgroundImage = 'url("img/slytherin.png")';
      break;
  }
}

function removeShirtLogo() {
  shirtDesignDiv.style.backgroundImage = "";
  logoImg1.classList.add("opaque");
  logoImg2.classList.add("opaque");
  logoImg3.classList.add("opaque");
  logoImg4.classList.add("opaque");
}

function changeShirtText(e) {
  removeShirtLogo();

  switch (e.srcElement) {
    case textPicker1:
      textShirtDiv1.textContent = textPicker1.value;
      break;
    case textPicker2:
      textShirtDiv2.textContent = textPicker2.value;
      break;
    case textPicker3:
      textShirtDiv3.textContent = textPicker3.value;
      break;
  }
}

function removeShirtText() {
  textPicker1.value = "";
  textPicker2.value = "";
  textPicker3.value = "";
  textShirtDiv1.textContent = "";
  textShirtDiv2.textContent = "";
  textShirtDiv3.textContent = "";
}