let currPage = window.location.href;
currPage = currPage.substring(currPage.lastIndexOf("/") + 1);
if (currPage == "") currPage = "index.html";

// Regex
let lettersRegex = /^[a-z]*$/i;
let oneNumRegex = /^.*\d.*$/;
let oneCapRegex = /^.*[A-Z].*$/;

// Common fields and listeners
let unField = document.getElementById("name");
let pwField = document.getElementById("pass");
let submitButton = document.getElementById("submit-button");
let sdFields;
let vpwField;
let unError1, unError2;
let pwError1, pwError2, pwError3, pwError4;
let unCheck1, unCheck2;
let pwCheck1, pwCheck2, pwCheck3, pwCheck4;

// index.html
if (currPage == "index.html") {
  unField.addEventListener("input", enableLoginIfDone);
  pwField.addEventListener("input", enableLoginIfDone);
  sdFields = document.querySelectorAll("input[name='which-secret']");

  for (radio of sdFields) { radio.addEventListener("change", enableLoginIfDone); }
}

// create.html
if (currPage == "create.html") {
  vpwField = document.getElementById("verify");

  unError1 = document.getElementById("un-err-1");
  unError2 = document.getElementById("un-err-2");
  pwError1 = document.getElementById("pw-err-1");
  pwError2 = document.getElementById("pw-err-2");
  pwError3 = document.getElementById("pw-err-3");
  pwError4 = document.getElementById("pw-err-4");

  unCheck1 = document.getElementById("un-chk-1");
  unCheck2 = document.getElementById("un-chk-2");
  pwCheck1 = document.getElementById("pw-chk-1");
  pwCheck2 = document.getElementById("pw-chk-2");
  pwCheck3 = document.getElementById("pw-chk-3");
  pwCheck4 = document.getElementById("pw-chk-4");

  unField.addEventListener("input", enableCreateIfDone);
  pwField.addEventListener("input", enableCreateIfDone);
  vpwField.addEventListener("input", enableCreateIfDone);
  unField.addEventListener("input", processUsernameField);
  pwField.addEventListener("input", processPasswordField);
  vpwField.addEventListener("input", processPasswordField);
}

// Functions
function processUsernameField() {
  let val = unField.value;

  if (lettersRegex.test(val)) {
    unError1.classList.remove("reqs-error");
    unCheck1.style.display = "inline-block";
  }
  else {
    unError1.classList.add("reqs-error");
    unCheck1.style.display = "none";
  }

  if (val.length >= 6) {
    unError2.classList.remove("reqs-error");
    unCheck2.style.display = "inline-block";
  }
  else {
    unError2.classList.add("reqs-error");
    unCheck2.style.display = "none";
  }
}

function processPasswordField() {
  let val1 = pwField.value;
  let val2 = vpwField.value;

  if (oneNumRegex.test(val1)) {
    pwError1.classList.remove("reqs-error");
    pwCheck1.style.display = "inline-block";
  }
  else {
    pwError1.classList.add("reqs-error");
    pwCheck1.style.display = "none";
  }

  if (oneCapRegex.test(val1)) {
    pwError2.classList.remove("reqs-error");
    pwCheck2.style.display = "inline-block";
  }
  else {
    pwError2.classList.add("reqs-error");
    pwCheck2.style.display = "none";
  }

  if (val1.length >= 7) {
    pwError3.classList.remove("reqs-error");
    pwCheck3.style.display = "inline-block";
  }
  else {
    pwError3.classList.add("reqs-error");
    pwCheck3.style.display = "none";
  }

  if (val1 == val2) {
    pwError4.classList.remove("reqs-error");
    pwCheck4.style.display = "inline-block";
  }
  else {
    pwError4.classList.add("reqs-error");
    pwCheck4.style.display = "none";
  }
}

function enableCreateIfDone() {
  if (isUsernameValid() && isPasswordValid()) { submitButton.removeAttribute("disabled"); }
  else { submitButton.setAttribute("disabled", ""); }
}

function isUsernameValid() {
  let val = unField.value;

  if (lettersRegex.test(val) && val.length >= 6) { return true; }
  else { return false; }
}

function isPasswordValid() {
  let val1 = pwField.value;
  let val2 = vpwField.value;

  if (oneNumRegex.test(val1) && oneCapRegex.test(val1) && val1.length >= 7 && (val1 == val2)) { return true; }
  else { return false; }
}

function enableLoginIfDone() {
  if (unField.value.length != 0 && pwField.value.length != 0 && isSomeRadioChecked()) {
    submitButton.removeAttribute("disabled");
  }
  else { submitButton.setAttribute("disabled", ""); }
}

function isSomeRadioChecked() {
  for (radio of sdFields) { if (radio.checked) return true; }
  return false;
}