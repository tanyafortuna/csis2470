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
  #colorName;

  constructor() {
    this.size = "medium";
    this.pocket = "no";
    this.color = colorPicker.value;
    this.logo = "";
    this.text1 = "";
    this.text2 = "";
    this.text3 = "";
    this.cartQty = 0;
    this.colorName = "";
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
  set colorName(x) { this.#colorName = x; }

  // Getters
  get size() { return this.#s; }
  get pocket() { return this.#p; }
  get color() { return this.#c; }
  get logo() { return this.#l; }
  get text1() { return this.#t1; }
  get text2() { return this.#t2; }
  get text3() { return this.#t3; }
  get cartQty() { return this.#cartQty; }
  get colorName() { return this.#colorName; }

  incCartQty() { this.#cartQty++; }
  resetCartQty() { this.#cartQty = 0; }

  toString() {
    return `s: ${this.#s}; p: ${this.#p}; c: ${this.#c}; l: ${this.#l}; t1: ${this.#t1}; t2: ${this.#t2}; t3: ${this.#t3}`;
  }
}


// Elements
let introSection = document.getElementById("intro");
let inputsSection = document.getElementById("inputs");
let previewSection = document.getElementById("preview");
let addressSection = document.getElementById("cart-address");
let contentsSection = document.getElementById("cart-contents");
let thanksSection = document.getElementById("thanks");

let previewSectionH2 = document.querySelector("#preview h2");
let shirtDiv = document.getElementById("shirt");
let shirtShapeDiv = document.getElementById("shirt-shape");
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
let textMeasurer = document.getElementById("measurer");

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

let fnameField = document.getElementById("fname");
let lnameField = document.getElementById("lname");
let phoneField = document.getElementById("phone");
let addrField = document.getElementById("addr");
let aptField = document.getElementById("apt");
let cityField = document.getElementById("city");
let stateField = document.getElementById("state");
let zipField = document.getElementById("zip");

let fnameFieldMsg = document.querySelector("#fname + p");
let lnameFieldMsg = document.querySelector("#lname + p");
let phoneFieldMsg = document.querySelector("#phone + p");
let addrFieldMsg = document.querySelector("#addr + p");
let aptFieldMsg = document.querySelector("#apt + p");
let cityFieldMsg = document.querySelector("#city + p");
let stateFieldMsg = document.querySelector("#state + p");
let zipFieldMsg = document.querySelector("#zip + p");


// Helper variables
let predesign = true;
let shirtInProgress;
let cartContents = [];
const stateCodes = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];
let shipFields = [fnameField, lnameField, phoneField, addrField,
  aptField, cityField, stateField, zipField];



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
textPicker1.addEventListener("beforeinput", checkTextLength);
textPicker2.addEventListener("beforeinput", checkTextLength);
textPicker3.addEventListener("beforeinput", checkTextLength);

fnameField.addEventListener("input", processFnameField);
lnameField.addEventListener("input", processLnameField);
phoneField.addEventListener("input", processPhoneField);
addrField.addEventListener("input", processAddrField);
aptField.addEventListener("input", processAptField);
cityField.addEventListener("input", processCityField);
stateField.addEventListener("input", processStateField);
zipField.addEventListener("input", processZipField);

fnameField.addEventListener("input", isFormComplete);
lnameField.addEventListener("input", isFormComplete);
phoneField.addEventListener("input", isFormComplete);
addrField.addEventListener("input", isFormComplete);
aptField.addEventListener("input", isFormComplete);
cityField.addEventListener("input", isFormComplete);
stateField.addEventListener("input", isFormComplete);
zipField.addEventListener("input", isFormComplete);


// Regex
let lettersOnlyRegex = /^[a-z]+$/i;
let fiveNumbersOnlyRegex = /^\d{5}$/;
let upToThreeAlphanumericRegex = /^[a-z0-9]{1,3}$/i;
let phoneNumberRegex = /^\d{3}-\d{3}-\d{4}$/;
let addressRegex = /^\d{1,5} [a-z]+ [a-z0-9]+(?: [a-z]+)?$/i;
let cityRegex = /^[a-z]+(?: [a-z]+)?$/i;


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
  changeShirtLogoOpacity(false);
  changeShirtTextOpacity(true);
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

function changeShirtTextOpacity(on) {
  if (on) {
    textPicker1.classList.add("opaque");
    textPicker2.classList.add("opaque");
    textPicker3.classList.add("opaque");
  }
  else {
    textPicker1.classList.remove("opaque");
    textPicker2.classList.remove("opaque");
    textPicker3.classList.remove("opaque");
  }
}

function changeShirtText(e) {
  removeShirtLogo();
  changeShirtLogoOpacity(true);
  changeShirtTextOpacity(false);
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

function checkTextLength(e) {
  let input, id;
  switch (e.srcElement) {
    case textPicker1: input = textPicker1; id = "text1"; break;
    case textPicker2: input = textPicker2; id = "text2"; break;
    case textPicker3: input = textPicker3; id = "text3"; break;
  }

  // get out of here if it's a deletion
  let isDeletion = e.inputType && e.inputType.startsWith('delete');
  if (isDeletion) return;

  // covers pasted text
  let insertText = '';
  if (e.inputType === 'insertFromPaste' && e.dataTransfer)
    insertText = e.dataTransfer.getData('text');
  else
    insertText = e.data ?? '';

  // in case users enter text in the middle rather than end
  let start = input.selectionStart ?? input.value.length;
  let end = input.selectionEnd ?? input.value.length;
  let next = input.value.slice(0, start) + insertText + input.value.slice(end);

  // check it
  textMeasurer.textContent = next;
  if (textMeasurer.offsetWidth > 300) {
    // don’t accept the input
    e.preventDefault();

    // visual feedback
    input.animate([{ opacity: 1 }, { opacity: 0.5 }, { opacity: 1 }], { duration: 200 });
    document.querySelector(`#${id} + p`).animate([{ opacity: 0 }, { opacity: 1 }, { opacity: 0 }], { duration: 1000 });
  }
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

  if (cartContents.length === 0) {
    shirtDiv.setAttribute("draggable", "true");
    shirtDiv.addEventListener("dragstart", setDragImage);

    cartTargetDiv.setAttribute("onclick", "showCart();");
    cartTargetDiv.style.cursor = "pointer";

    cartTargetDiv.addEventListener('dragover', function(e) { e.preventDefault(); });
    cartTargetDiv.addEventListener('dragenter',
      function(e) { cartTargetDiv.classList.add('hover'); });
    cartTargetDiv.addEventListener('dragleave',
      function(e) { cartTargetDiv.classList.remove('hover'); });
    cartTargetDiv.addEventListener('drop', addToCart);
  }
}

function buildShirt() {
  startOver();
  introSection.style.display = "none";
  addressSection.style.display = "none";
  contentsSection.style.display = "none";
  thanksSection.style.display = "none";
  previewSection.style.display = "block";
  inputsSection.style.display = "grid";
  previewSectionH2.style.opacity = "1";
}

function showCart() {
  inputsSection.style.display = "none";
  previewSection.style.display = "none";
  thanksSection.style.display = "none";
  addressSection.style.display = "block";
  contentsSection.style.display = "block";
  createCartSummary();
  createCartCards();
}

function createCartSummary() {
  let totalItems = 0;
  for (let item of cartContents) totalItems += item.cartQty;

  let html;
  if (totalItems == 0) {
    html = "<p>You've got to create some shirts before you check out!</p>";
    document.querySelector(".summary").innerHTML = html;
    document.querySelector("#summary .right-align").innerHTML = "";
  }
  else {
    let plural = (totalItems > 1 ? "s" : "");
    html = '<p><span class="fancy">Order Summary</span></p>';
    html += `<p>You're buying ${totalItems} shirt${plural}.</p>`;
    document.querySelector(".summary").innerHTML = html;

    html = '<p><span class="fancy">Total</span>:</p>';
    html += `<p>$${totalItems * 24}.00</p>`;
    document.querySelector("#summary .right-align").innerHTML = html;
  }

}

function createCartCards() {
  let html = "";
  for (let item of cartContents) {
    html += '<div class="cart-item">';
    html += '<div class="left">';
    html += `<p><span class="fancy">Size</span>: ${item.size}</p>`;

    let color = (item.color).replace("#", "");
    html += `<p><span class="fancy">Color</span>: <span class="C${color}">`;
    if (item.colorName == "") {
      getColor(color);
      html += 'Finding...</span></p>';
    }
    else html += `${item.colorName}</span></p>`;

    if (item.logo != "")
      html += `<p class="logo"><span class="fancy">Logo</span>: ${item.logo}</p>`;
    else if (item.text1 != "" || item.text2 != "" || item.text3 != "")
      html += `<p class="text"><span class="fancy">Text</span>: ${createString(item)}</p>`;

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
      for (let item of cartContents) {
        if (item.color == `#${hex}`)
          item.colorName = JSON.parse(x.responseText).paletteTitle;
      }
    }
  });
}

function placeOrder() {
  addressSection.style.display = "none";
  contentsSection.style.display = "none";
  thanksSection.style.display = "block";
  createOrderSummary();
  createShippingSummary();
  console.log("Objects in order:");
  console.log(cartContents);
  cartContents = [];
  cartCountP.textContent = "";
  for (let field of shipFields) field.value = "";
  document.getElementById("place-order").setAttribute("disabled", true);
}

function createString(obj) {
  let str = "";

  if (obj.text1 != "") {
    str += `${obj.text1}`;
    if (obj.text2 != "" || obj.text3 != "") str += " ";
  }
  if (obj.text2 != "") {
    str += `${obj.text2}`;
    if (obj.text3 != "") str += " ";
  }
  if (obj.text3 != "")
    str += `${obj.text3}`;

  return str;
}

function createOrderSummary() {
  let html = "";

  for (let i = 0; i < cartContents.length; i++) {
    html += `<p><span class="fancy">Design ${i + 1}</span>: `;
    html += `A ${cartContents[i].colorName} shirt`;
    html += `, size ${cartContents[i].size}`;

    if (cartContents[i].pocket == "l")
      html += ", having a left-side pocket";
    else if (cartContents[i].pocket == "r")
      html += ", having a right-side pocket";

    if (cartContents[i].logo != "")
      html += `, with the ${cartContents[i].logo} logo`;
    else if (cartContents[i].text1 != "" || cartContents[i].text2 != "" || cartContents[i].text3 != "") {
      html += `, with text saying "${createString(cartContents[i])}"`;
    }

    html += `. (qty ${cartContents[i].cartQty})</p>`;
  }

  document.querySelector("div.order-info").innerHTML = html;
}

function createShippingSummary() {
  let html = `<p>${fnameField.value} ${lnameField.value}</p>`;
  html += `<p>${addrField.value}`;
  if (aptField.value != "") html += `, apt ${aptField.value}`;
  html += "</p>";
  html += `<p>${cityField.value}, ${stateField.value} ${zipField.value}</p>`;
  html += `<p>${phoneField.value}</p>`;

  document.querySelector("div.shipping-info").innerHTML = html;
}


// Dragging functions
function addToCart() {
  cartTargetDiv.classList.remove('hover');

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

function setDragImage(e) {
  let wrapper = document.createElement("div");
  wrapper.style.width = "75px";
  wrapper.style.height = "75px";
  wrapper.style.position = "absolute";
  wrapper.style.top = "-9999px";

  let dragGhost = shirtShapeDiv.cloneNode(true);

  // Scale it down to 100x100 visually
  const scaleX = 75 / shirtShapeDiv.offsetWidth;
  const scaleY = 75 / shirtShapeDiv.offsetHeight;
  const scale = Math.min(scaleX, scaleY);

  dragGhost.style.transform = `scale(${scale})`;
  dragGhost.style.transformOrigin = "top left";

  // Remove margins to avoid offset shifts
  dragGhost.style.margin = "0";

  // Put it offscreen so it doesn't show up in the layout
  wrapper.appendChild(dragGhost);
  document.body.appendChild(wrapper);
  void wrapper.offsetWidth;

  // Set the smaller ghost as the drag image
  e.dataTransfer.setDragImage(wrapper, 37, 37);
}


// Input validation functions
function processFnameField() {
  if (fnameField.value == "") {
    fnameField.classList.remove("error");
    fnameFieldMsg.textContent = "Only letters are allowed";
  }
  else if (isFnameFieldValid()) {
    fnameField.classList.remove("error");
    fnameFieldMsg.textContent = "";
  }
  else {
    fnameField.classList.add("error");
    fnameFieldMsg.textContent = "Only letters are allowed";
  }
}
function isFnameFieldValid() {
  return isLettersOnly(fnameField.value);
}

function processLnameField() {
  if (lnameField.value == "") {
    lnameField.classList.remove("error");
    lnameFieldMsg.textContent = "Only letters are allowed";
  }
  else if (isLnameFieldValid()) {
    lnameField.classList.remove("error");
    lnameFieldMsg.textContent = "";
  }
  else {
    lnameField.classList.add("error");
    lnameFieldMsg.textContent = "Only letters are allowed";
  }
}
function isLnameFieldValid() {
  return isLettersOnly(lnameField.value);
}

function processPhoneField() {
  if (phoneField.value == "") {
    phoneField.classList.remove("error");
    phoneFieldMsg.textContent = "Format: xxx-xxx-xxxx";
  }
  else if (isPhoneFieldValid()) {
    phoneField.classList.remove("error");
    phoneFieldMsg.textContent = "";
  }
  else {
    phoneField.classList.add("error");
    phoneFieldMsg.textContent = "Format: xxx-xxx-xxxx";
  }
}
function isPhoneFieldValid() {
  return isPhoneNumber(phoneField.value);
}

function processAddrField() {
  if (addrField.value == "") {
    addrField.classList.remove("error");
    addrFieldMsg.textContent = 'Format: "123 Main Street"';
  }
  else if (isAddrFieldValid()) {
    addrField.classList.remove("error");
    addrFieldMsg.textContent = "";
  }
  else {
    addrField.classList.add("error");
    addrFieldMsg.textContent = 'Format: "123 Main Street"';
  }
}
function isAddrFieldValid() {
  return isAddress(addrField.value);
}

function processAptField() {
  if (aptField.value == "") {
    aptField.classList.remove("error");
    aptFieldMsg.textContent = "Up to 3 letters or numbers";
  }
  else if (isAptFieldValid()) {
    aptField.classList.remove("error");
    aptFieldMsg.textContent = "";
  }
  else {
    aptField.classList.add("error");
    aptFieldMsg.textContent = "Up to 3 letters or numbers";
  }
}
function isAptFieldValid() {
  return isUpToThreeAlphanumeric(aptField.value);
}

function processCityField() {
  if (cityField.value == "") {
    cityField.classList.remove("error");
    cityFieldMsg.textContent = "Only letters are allowed";
  }
  else if (isCityFieldValid()) {
    cityField.classList.remove("error");
    cityFieldMsg.textContent = "";
  }
  else {
    cityField.classList.add("error");
    cityFieldMsg.textContent = "Only letters are allowed";
  }
}
function isCityFieldValid() {
  return isCity(cityField.value);
}

function processStateField() {
  if (stateField.value == "") {
    stateField.classList.remove("error");
    stateFieldMsg.textContent = "Use the 2-letter code";
  }
  else if (isStateFieldValid()) {
    stateField.classList.remove("error");
    stateFieldMsg.textContent = "";
  }
  else {
    stateField.classList.add("error");
    stateFieldMsg.textContent = "Use the 2-letter code";
  }
}
function isStateFieldValid() {
  return isState(stateField.value);
}

function processZipField() {
  if (zipField.value == "") {
    zipField.classList.remove("error");
    zipFieldMsg.textContent = "Must be 5 numbers";
  }
  else if (isZipFieldValid()) {
    zipField.classList.remove("error");
    zipFieldMsg.textContent = "";
  }
  else {
    zipField.classList.add("error");
    zipFieldMsg.textContent = "Must be 5 numbers";
  }
}
function isZipFieldValid() {
  return isFiveNumbersOnly(zipField.value);
}

function isFormComplete() {
  let numItems = 0;
  for (let item of cartContents) numItems += item.cartQty;

  if (isFnameFieldValid() && isLnameFieldValid() &&
    isPhoneFieldValid() && isAddrFieldValid() &&
    (isAptFieldValid() || aptField.value == "") &&
    isCityFieldValid() && isStateFieldValid() &&
    isZipFieldValid() && numItems > 0
  ) {
    document.getElementById("place-order").removeAttribute("disabled");
  }
  else
    document.getElementById("place-order").setAttribute("disabled", true);
}


// Regex functions
function isLettersOnly(x) {
  return lettersOnlyRegex.test(x);
}

function isFiveNumbersOnly(x) {
  return fiveNumbersOnlyRegex.test(x);
}

function isUpToThreeAlphanumeric(x) {
  return upToThreeAlphanumericRegex.test(x);
}

function isPhoneNumber(x) {
  return phoneNumberRegex.test(x);
}

function isAddress(x) {
  return addressRegex.test(x);
}

function isCity(x) {
  return cityRegex.test(x);
}

function isState(x) {
  return stateCodes.includes(x.toUpperCase());
}