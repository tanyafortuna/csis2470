// Element definitions
// Inputs
let inputFields = [
  document.getElementById("fname-input"),
  document.getElementById("lname-input"),
  document.getElementById("planet-input"),
  document.getElementById("ship-input"),
  document.getElementById("robot-input")];
// Waiting messages 
let waitingMsgs = [
  document.querySelector("#fname-msg p.waiting"),
  document.querySelector("#lname-msg p.waiting"),
  document.querySelector("#planet-msg p.waiting"),
  document.querySelector("#ship-msg p.waiting"),
  document.querySelector("#robot-msg p.waiting")];
// Error messages 
let errorMsgs = [
  document.querySelector("#fname-msg p.error"),
  document.querySelector("#lname-msg p.error"),
  document.querySelector("#planet-msg p.error"),
  document.querySelector("#ship-msg p.error"),
  document.querySelector("#robot-msg p.error")];
// Accepted messages 
let acceptedMsgs = [
  document.querySelector("#fname-msg p.accepted"),
  document.querySelector("#lname-msg p.accepted"),
  document.querySelector("#planet-msg p.accepted"),
  document.querySelector("#ship-msg p.accepted"),
  document.querySelector("#robot-msg p.accepted")];

let helperDiv = document.querySelector(".helper");
let submitButton = document.getElementById("submit");
let tripSection = document.querySelector(".trip-planner");

// Event listeners
for (let i = 0; i < 5; i++) {
  inputFields[i].addEventListener("input", fieldChecker);
}
submitButton.addEventListener("click", submitForm);

// Regex 
let nameRegex1 = /^[a-z]{5,}$/i;
let nameRegex2 = /^.*[xz].*$/i;
let robotRegex1 = /^[a-z][0-9]-[a-z][0-9]$/i;
let robotRegex2 = /^[a-z][a-z]-[0-9]$/i;
let robotRegex3 = /^[a-z]-[0-9][a-z][a-z]$/i;
let shipRegex1 = /^[a-z]{4,} [i]?[vx]?$/i;
let shipRegex2 = /^[a-z]{4,} [v]?[i]{0,3}$/i;
let shipRegex3 = /^[a-z]{4,} [i]{1,3}$/i;

// Error responses
let errorResponses = [
  "First names can only use letter characters, must be at least 5 letters long, and should contain either an x or z.",
  "Last names can only use letter characters, must be at least 5 letters long, and should contain either an x or z.",
  "Planet names can only use letter characterss and must be at least 5 letters long. Disallowed names include: Earth, Mars, Venus, Saturn, Neptune, Uranus, Mercury, Jupiter, and Pluto.",
  "Ship names must contain at least 4 letters, followed by a space, followed by a Roman numeral from 1 to 10. Disallowed names include: Hunter IV, Icarus I, Icarus II, Zero X, and Terra V.",
  "Robot names must follow one of 3 patterns, where L is a letter and N is a number: LN-LN, LL-N, L-NLL. Disallowed names include: BB-8, C-3PO, and R2-D2."
];

// Disallowed entries
badPlanets = ["earth", "mars", "venus", "saturn", "neptune", "uranus", "mercury", "jupiter", "pluto"];
badShips = ["hunter iv", "icarus i", "icarus ii", "zero x", "terra v"];
badRobots = ["bb-8", "c-3po", "r2-d2"];

// Functions
function fieldChecker(e) {
  // Get which element is being checked
  let index;
  for (let i = 0; i < 5; i++) {
    if (e.target == inputFields[i]) { index = i; break; }
  }

  // Figure out if the new input is valid
  let val = inputFields[index].value;
  let valid;
  switch (index) {
    case 0:
    case 1:
      valid = nameRegex1.test(val) && nameRegex2.test(val);
      break;
    case 2:
      valid = nameRegex1.test(val);
      valid = valid && !badPlanets.includes(val.toLowerCase());
      break;
    case 3:
      valid = shipRegex1.test(val) || shipRegex2.test(val) || shipRegex3.test(val);
      valid = valid && !badShips.includes(val.toLowerCase());
      break;
    case 4:
      valid = robotRegex1.test(val) || robotRegex2.test(val) || robotRegex3.test(val);
      valid = valid && !badRobots.includes(val.toLowerCase());
      break;
  }

  // Take action based on the new input's validity
  if (valid) {
    // Change which messages are showing
    waitingMsgs[index].style.display = "none";
    errorMsgs[index].style.display = "none";
    acceptedMsgs[index].style.display = "block";
    // Change styling of input field
    inputFields[index].classList.remove("red");
    inputFields[index].classList.add("green");
  }
  else {
    // Display error message
    errorMsgs[index].innerHTML = errorResponses[index];
    // Change which messages are showing
    waitingMsgs[index].style.display = "none";
    errorMsgs[index].style.display = "block";
    acceptedMsgs[index].style.display = "none";
    // Change styling of input field
    inputFields[index].classList.add("red");
    inputFields[index].classList.remove("green");
  }

  // Change button if the form is complete
  if (isFormComplete()) unlockForm();
  else lockForm();
}

function isFormComplete() {
  let count = 0;
  for (let i = 0; i < 5; i++) {
    if (inputFields[i].classList.contains("green")) count++;
  }

  return count == 5;
}

function unlockForm() {
  submitButton.removeAttribute("disabled");
  submitButton.classList.add("jiggle");
  submitButton.value = "Ready for blastoff!";
}

function lockForm() {
  submitButton.setAttribute("disabled", "");
  submitButton.classList.remove("jiggle");
  submitButton.value = "Preparing for launch...";
}

function submitForm() {
  tripSection.style.display = "none";

  confirmationString = "<p>Buckle up! It's going to be a bumpy ride!</p>";
  confirmationString += "<p>This is a one-way journey, so I hope you packed extra underwear.</p>";
  confirmationString += "<p>What's that? You didn't know you weren't coming back? Huh. I'm sure we had that in the pamphlet somewhere.</p>";
  confirmationString += "<p>Anyway, we have you down as " + inputFields[0].value + " " + inputFields[1].value + ". If that's not your name, well, it is now.</p>";
  confirmationString += "<p>You're headed to a planet called " + inputFields[2].value + ". I think you could have been more creative with the name, but that's just me. You're the one who has to write that on all your mail from now on.</p>";
  confirmationString += "<p>You're riding on a ship you named " + inputFields[3].value + ". " + inputFields[3].value + ", really? Alright, well, at least your ship is leaving and I won't have to say that name again.</p>";
  confirmationString += "<p>You'll be taking a trusty robot with you to operate the ship since you conveniently slept through all those trainings. Its name is " + inputFields[4].value + ". If you could just leave it alone that would be best.</p>";
  confirmationString += "<p>Bon voyage!</p>";

  helperDiv.innerHTML = confirmationString;
}