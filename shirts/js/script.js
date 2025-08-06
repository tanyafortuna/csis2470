// Elements
let shirtDesignDiv = document.getElementById("shirt-design");
let shirtBodyDivs = document.querySelectorAll(".shirt");
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
}