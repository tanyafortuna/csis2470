let robot = document.getElementById("robot");
let againButton = document.getElementById("again-button");
let rulesButton = document.getElementById("rules-button");
let rulesP = document.getElementById("rules-p");

function reset() {
  robotLoc = 33;
  robot.style.top = 0;
  robot.style.left = 0;
  robot.classList.remove("winner");
  againButton.style.display = "none";
  rulesP.style.display = "none";
  rulesButton.style.display = "none";
  window.addEventListener('keydown', operateRobot);
}

function operateRobot(e) {
  let parent = document.querySelector('div[data-loc="' + robotLoc + '"]');

  switch (e.key) {
    case "ArrowUp":
      if (!parent.classList.contains('top')) { robotLoc -= 10; } break;
    case "ArrowRight":
      if (!parent.classList.contains('right')) { robotLoc++; } break;
    case "ArrowDown":
      if (!parent.classList.contains('bottom')) { robotLoc += 10; } break;
    case "ArrowLeft":
      if (!parent.classList.contains('left')) { robotLoc--; } break;
  }

  let shiftTop = (Math.trunc(robotLoc / 10) - 3) * 70;
  let shiftLeft = (Math.trunc(robotLoc % 10) - 3) * 120;

  if (checkForEscape()) {
    switch (robotLoc) {
      case 3: shiftTop -= 30; break;
      case 30: shiftLeft -= 15; break;
      case 36: shiftLeft += 15; break;
      case 63: shiftTop += 30; break;
    }
  }

  robot.style.top = shiftTop + "px";
  robot.style.left = shiftLeft + "px";
}

function checkForEscape() {
  if (robotLoc == 3 || robotLoc == 30 || robotLoc == 36 || robotLoc == 63) {
    window.removeEventListener('keydown', operateRobot);
    robot.classList.add("winner");
    document.querySelector("h1").textContent = "Thank you for saving me!";
    againButton.style.display = "inline-block";
    return true;
  }
  else { return false; }
}