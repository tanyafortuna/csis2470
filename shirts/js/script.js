// Elements
let introSection = document.getElementById("intro");
let inputsSection = document.getElementById("inputs");
let previewSection = document.getElementById("preview");
let addressSection = document.getElementById("cart-address");
let contentsSection = document.getElementById("cart-contents");

let previewSectionH2 = document.querySelector("#preview h2");
let shirtDiv = document.getElementById("shirt");
let cartTargetDiv = document.getElementById("cart-target");
let cartCountP = document.getElementById("cart-count");

let colorPicker = document.getElementById("color");
let sizePickerXS = document.getElementById("size-xs");
let sizePickerS = document.getElementById("size-s");
let sizePickerM = document.getElementById("size-m");
let sizePickerL = document.getElementById("size-l");
let sizePickerXL = document.getElementById("size-xl");
let pocketPickerNo = document.getElementById("pocket-no");
let pocketPickerL = document.getElementById("pocket-l");
let pocketPickerR = document.getElementById("pocket-r");
let logoPicker1 = document.getElementById("logo1");
let logoPicker2 = document.getElementById("logo2");
let logoPicker3 = document.getElementById("logo3");
let logoPicker4 = document.getElementById("logo4");
let logoPickerImg1 = document.querySelector("#logo1 + label img");
let logoPickerImg2 = document.querySelector("#logo2 + label img");
let logoPickerImg3 = document.querySelector("#logo3 + label img");
let logoPickerImg4 = document.querySelector("#logo4 + label img");
let textPicker1 = document.getElementById("text1");
let textPicker2 = document.getElementById("text2");
let textPicker3 = document.getElementById("text3");

let shirtBodyDivs = document.querySelectorAll(".shirt");
let shirtLPocketDiv = document.querySelector(".shirt.l.pocket");
let shirtRPocketDiv = document.querySelector(".shirt.r.pocket");

let shirtDesignDiv = document.getElementById("shirt-design");
let textShirtDiv1 = document.querySelector(".text.one");
let textShirtDiv2 = document.querySelector(".text.two");
let textShirtDiv3 = document.querySelector(".text.three");
let logoShirtImgG = document.querySelector("img.g");
let logoShirtImgH = document.querySelector("img.h");
let logoShirtImgR = document.querySelector("img.r");
let logoShirtImgS = document.querySelector("img.s");


// Shirt class
class Shirt {
  #s;
  #p;
  #c;
  #l;
  #t1;
  #t2;
  #t3;
  #cartQty;

  constructor() {
    this.size = "medium";
    this.pocket = "no";
    this.color = colorPicker.value;
    this.logo = "";
    this.text1 = "";
    this.text2 = "";
    this.text3 = "";
    this.cartQty = 0;
  }

  // Setters
  set size(x) { this.#s = x; }
  set pocket(x) { this.#p = x; }
  set color(x) { this.#c = x; }
  set logo(x) { this.#l = x; }
  set text1(x) { this.#t1 = x; }
  set text2(x) { this.#t2 = x; }
  set text3(x) { this.#t3 = x; }
  set cartQty(x) { this.resetCartQty(); }

  // Getters
  get size() { return this.#s; }
  get pocket() { return this.#p; }
  get color() { return this.#c; }
  get logo() { return this.#l; }
  get text1() { return this.#t1; }
  get text2() { return this.#t2; }
  get text3() { return this.#t3; }
  get cartQty() { return this.#cartQty; }

  incCartQty() { this.#cartQty++; }
  resetCartQty() { this.#cartQty = 0; }

  toString() {
    return `s: ${this.#s}; p: ${this.#p}; c: ${this.#c}; l: ${this.#l}; t1: ${this.#t1}; t2: ${this.#t2}; t3: ${this.#t3}`;
  }
}


// Helper variables
let predesign = true;
let shirtInProgress;
let cartContents = [];


// Event listeners
colorPicker.addEventListener("change", changeShirtColor);
sizePickerXS.addEventListener("change", changeShirtSize);
sizePickerS.addEventListener("change", changeShirtSize);
sizePickerM.addEventListener("change", changeShirtSize);
sizePickerL.addEventListener("change", changeShirtSize);
sizePickerXL.addEventListener("change", changeShirtSize);
pocketPickerNo.addEventListener("change", changeShirtPocket);
pocketPickerL.addEventListener("change", changeShirtPocket);
pocketPickerR.addEventListener("change", changeShirtPocket);
logoPicker1.addEventListener("change", changeShirtLogo);
logoPicker2.addEventListener("change", changeShirtLogo);
logoPicker3.addEventListener("change", changeShirtLogo);
logoPicker4.addEventListener("change", changeShirtLogo);
textPicker1.addEventListener("input", changeShirtText);
textPicker2.addEventListener("input", changeShirtText);
textPicker3.addEventListener("input", changeShirtText);


// Dragging functions
function drop() {
  // check if item is dupe of one in the cart already
  let dupe = false;
  for (let item of cartContents) {
    if (item.toString() == shirtInProgress.toString()) {
      item.incCartQty();
      dupe = true;
      break;
    }
  }

  // add it to the cart if it's not a dupe
  if (!dupe) {
    shirtInProgress.incCartQty();
    cartContents.push(shirtInProgress);

    // clone shirt otherwise the array has a reference to the shirtInProgress
    let newShirt = new Shirt();
    newShirt.size = shirtInProgress.size;
    newShirt.pocket = shirtInProgress.pocket;
    newShirt.color = shirtInProgress.color;
    newShirt.logo = shirtInProgress.logo;
    newShirt.text1 = shirtInProgress.text1;
    newShirt.text2 = shirtInProgress.text2;
    newShirt.text3 = shirtInProgress.text3;
    shirtInProgress = newShirt;
  }

  // update cart total number
  let sum = 0;
  for (let item of cartContents) sum += item.cartQty;
  cartCountP.textContent = sum;
}


// Event listener functions
function changeShirtColor() {
  for (let div of shirtBodyDivs) { div.style.backgroundColor = colorPicker.value; }

  shirtInProgress.color = colorPicker.value;
}

function changeShirtSize() {
  for (let div of shirtBodyDivs) {
    div.classList.remove("xsmall", "small", "medium", "large", "xlarge");
  }

  if (sizePickerXS.checked) {
    for (let div of shirtBodyDivs) { div.classList.add("xsmall"); }
    shirtInProgress.size = "xsmall";
  }
  else if (sizePickerS.checked) {
    for (let div of shirtBodyDivs) { div.classList.add("small"); }
    shirtInProgress.size = "small";
  }
  else if (sizePickerM.checked) {
    for (let div of shirtBodyDivs) { div.classList.add("medium"); }
    shirtInProgress.size = "medium";
  }
  else if (sizePickerL.checked) {
    for (let div of shirtBodyDivs) { div.classList.add("large"); }
    shirtInProgress.size = "large";
  }
  else if (sizePickerXL.checked) {
    for (let div of shirtBodyDivs) { div.classList.add("xlarge"); }
    shirtInProgress.size = "xlarge";
  }
}

function changeShirtPocket() {
  shirtLPocketDiv.style.display = "none";
  shirtRPocketDiv.style.display = "none";

  if (pocketPickerL.checked) {
    shirtLPocketDiv.style.display = "block";
    shirtInProgress.pocket = "l";
  }
  else if (pocketPickerR.checked) {
    shirtRPocketDiv.style.display = "block";
    shirtInProgress.pocket = "r";
  }
  else shirtInProgress.pocket = "no";

}

function changeShirtLogo() {
  removeShirtText();
  logoPickerImg1.classList.remove("opaque");
  logoPickerImg2.classList.remove("opaque");
  logoPickerImg3.classList.remove("opaque");
  logoPickerImg4.classList.remove("opaque");
  logoShirtImgG.classList.remove("active");
  logoShirtImgH.classList.remove("active");
  logoShirtImgR.classList.remove("active");
  logoShirtImgS.classList.remove("active");

  if (logoPicker1.checked) {
    shirtInProgress.logo = "Gryffindor";
    if (predesign) logoShirtImgG.classList.add("active");
    else setTimeout(() => { logoShirtImgG.classList.add("active"); }, 750);
  }
  if (logoPicker2.checked) {
    shirtInProgress.logo = "Hufflepuff";
    if (predesign) logoShirtImgH.classList.add("active");
    else setTimeout(() => { logoShirtImgH.classList.add("active"); }, 750);
  }
  if (logoPicker3.checked) {
    shirtInProgress.logo = "Ravenclaw";
    if (predesign) logoShirtImgR.classList.add("active");
    else setTimeout(() => { logoShirtImgR.classList.add("active"); }, 750);
  }
  if (logoPicker4.checked) {
    shirtInProgress.logo = "Slytherin";
    if (predesign) logoShirtImgS.classList.add("active");
    else setTimeout(() => { logoShirtImgS.classList.add("active"); }, 750);
  }

  predesign = false;
}

function removeShirtLogo() {
  shirtInProgress.logo = "";

  shirtDesignDiv.style.backgroundImage = "";
  logoShirtImgG.classList.remove("active");
  logoShirtImgH.classList.remove("active");
  logoShirtImgR.classList.remove("active");
  logoShirtImgS.classList.remove("active");
}

function changeShirtLogoOpacity(on) {
  if (on) {
    logoPickerImg1.classList.add("opaque");
    logoPickerImg2.classList.add("opaque");
    logoPickerImg3.classList.add("opaque");
    logoPickerImg4.classList.add("opaque");
  }
  else {
    logoPickerImg1.classList.remove("opaque");
    logoPickerImg2.classList.remove("opaque");
    logoPickerImg3.classList.remove("opaque");
    logoPickerImg4.classList.remove("opaque");
  }
}

function changeShirtText(e) {
  removeShirtLogo();
  changeShirtLogoOpacity(true);
  logoPicker1.checked = false;
  logoPicker2.checked = false;
  logoPicker3.checked = false;
  logoPicker4.checked = false;

  switch (e.srcElement) {
    case textPicker1:
      shirtInProgress.text1 = textPicker1.value;
      setTimeout(() => { textShirtDiv1.classList.remove("inactive"); }, 500);
      textShirtDiv1.textContent = textPicker1.value;
      break;
    case textPicker2:
      shirtInProgress.text2 = textPicker2.value;
      setTimeout(() => { textShirtDiv2.classList.remove("inactive"); }, 500);
      textShirtDiv2.textContent = textPicker2.value;
      break;
    case textPicker3:
      shirtInProgress.text3 = textPicker3.value;
      setTimeout(() => { textShirtDiv3.classList.remove("inactive"); }, 500);
      textShirtDiv3.textContent = textPicker3.value;
      break;
  }

  predesign = true;
}

function removeShirtText() {
  shirtInProgress.text1 = "";
  shirtInProgress.text2 = "";
  shirtInProgress.text3 = "";

  textShirtDiv1.classList.add("inactive");
  textShirtDiv2.classList.add("inactive");
  textShirtDiv3.classList.add("inactive");
  setTimeout(() => {
    textShirtDiv1.textContent = "";
    textShirtDiv2.textContent = "";
    textShirtDiv3.textContent = "";
  }, 500);
  textPicker1.value = "";
  textPicker2.value = "";
  textPicker3.value = "";
}


// Other functions
function startOver() {
  shirtInProgress = new Shirt();

  sizePickerM.checked = true;
  changeShirtSize();

  pocketPickerNo.checked = true;
  changeShirtPocket();

  colorPicker.value = "#ffffff";
  changeShirtColor();

  removeShirtLogo();
  changeShirtLogoOpacity(false);

  removeShirtText();
}

function buildShirt() {
  shirtInProgress = new Shirt();
  introSection.style.display = "none";
  addressSection.style.display = "none";
  contentsSection.style.display = "none";
  previewSection.style.display = "block";
  inputsSection.style.display = "grid";
  previewSectionH2.style.opacity = "1";

  // allow shirt to be draggable and cart to be the target
  cartTargetDiv.addEventListener('dragover', function(e) { e.preventDefault(); });
  cartTargetDiv.addEventListener('drop', drop);
  cartTargetDiv.style.cursor = "pointer";
  cartTargetDiv.setAttribute("onclick", "showCart();");
  shirtDiv.setAttribute("draggable", "true");
}

function showCart() {
  inputsSection.style.display = "none";
  previewSection.style.display = "none";
  addressSection.style.display = "block";
  contentsSection.style.display = "block";
  createCartSummary();
  createCartCards();
}

function createCartSummary() {
  let totalItems = 0;
  for (let item of cartContents) totalItems += item.cartQty;

  let plural = (totalItems > 1 ? "s" : "");
  let html = '<p><span class="fancy">Order Summary</span></p>';
  html += `<p>You're buying ${totalItems} shirt${plural}.</p>`;
  document.querySelector(".summary").innerHTML = html;

  html = '<p><span class="fancy">Total</span>:</p>';
  html += `<p>$${totalItems * 24}.00</p>`;
  document.querySelector("#summary .right-align").innerHTML = html;
}

function createCartCards() {
  let html = "";
  for (let item of cartContents) {
    html += '<div class="cart-item">';
    html += '<div class="left">';
    html += `<p><span class="fancy">Size</span>: ${item.size}</p>`;

    let color = (item.color).replace("#", "");
    getColor(color);
    html += `<p><span class="fancy">Color</span>: <span class="C${color}">Finding...</span></p>`;

    if (item.logo != "")
      html += `<p class="logo"><span class="fancy">Logo</span>: ${item.logo}</p>`;
    else if (item.text1 != "" || item.text2 != "" || item.text3 != "")
      html += `<p class="text"><span class="fancy">Text</span>: ${item.text1} / ${item.text2} / ${item.text3}</p>`;

    html += '</div>';
    html += '<div class="right-align">';
    html += '<p><span class="fancy">Qty</span>:</p>';
    html += `<p>${item.cartQty}</p>`;
    html += '</div>';
    html += '<div class="right-align">';
    html += '<p><span class="fancy">Cost</span>:</p>';
    html += '<p>$24.00</p>';
    html += '</div>';
    html += '<div class="right-align">';
    html += '<p><span class="fancy">Total</span>:</p>';
    html += `<p>$${item.cartQty * 24}.00</p>`;
    html += '</div>';
    html += '</div>';
  }

  document.getElementById("items").innerHTML = html;
}

function getColor(hex) {
  let x = new XMLHttpRequest();
  x.open('GET', `https://api.color.pizza/v1/?values=${hex}`);
  x.send();
  x.addEventListener('readystatechange', () => {
    if (x.readyState === 4 && x.status === 200) {
      for (let span of document.querySelectorAll(`.C${hex}`))
        span.innerHTML = JSON.parse(x.responseText).paletteTitle;
    }
  });
}

function placeOrder() {

}