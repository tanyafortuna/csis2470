// Helper variables
let space, pencil;
let stars = new Array(), mines = new Array(), homebase, ship, startZone;
let won = false, lost = false;
let starColors = ["plum", "lightblue", "palegoldenrod", "lightsalmon", "palegreen"];
let mineColors = ["#6D6968", "grey"];
let endGameSoundPlayed = false;
let landedSound = new Audio("sounds/landed.wav");
let crashedSound = new Audio("sounds/crashed.wav");


// Classes
class Rectangle {
  constructor(p, w, h, c) {
    this.pencil = p;
    this.w = w;
    this.h = h;
    this.c = c;
    this.xspeed = .75 * (Math.random() > .5 ? 1 : -1);
    this.yspeed = .75 * (Math.random() > .5 ? 1 : -1);
    this.x = Math.floor(Math.random() * (space.width - this.w));
    this.y = Math.floor(Math.random() * (space.height - this.h));
  }

  show() {
    this.pencil.beginPath();
    this.pencil.fillStyle = this.c;
    this.pencil.rect(this.x, this.y, this.w, this.h);
    this.pencil.fill();
    this.pencil.closePath();
  };

  move() {
    // wall collision
    if (this.x < 0 || this.x > space.width - this.w) this.xspeed *= -1;
    if (this.y < 0 || this.y > space.height - this.h) this.yspeed *= -1;

    // homebase collision
    if (overlappingRect(homebase, this)) {
      let tempRect = this;
      tempRect.x -= tempRect.xspeed;
      if (!overlappingRect(homebase, tempRect)) this.xspeed *= -1;
      else this.yspeed *= -1;
    }
    // startzone collision
    if (overlappingCir(startZone, this)) {
      let tempRect = this;
      tempRect.x -= tempRect.xspeed;
      if (!overlappingCir(startZone, tempRect)) this.xspeed *= -1;
      else this.yspeed *= -1;
    }

    // finally, move
    this.x += this.xspeed;
    this.y += this.yspeed;
  }
}

class Circle {
  constructor(p, x, y, r, c, fill = true) {
    this.pencil = p;
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
    this.fill = fill;
  }

  showFill() {
    this.pencil.beginPath();
    this.pencil.fillStyle = this.c;
    this.pencil.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    this.pencil.fill();
    this.pencil.closePath();
  }

  showStroke() {
    this.pencil.beginPath();
    this.pencil.strokeStyle = this.c;
    this.pencil.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    this.pencil.stroke();
    this.pencil.closePath();
  };
}


// Main
window.addEventListener("resize", setup);
setup();
draw();


// Functions
function setup() {
  won = false;
  lost = false;
  window.addEventListener("keydown", navigate);

  space = document.querySelector('canvas');
  space.width = window.innerWidth;
  space.height = window.innerHeight;

  pencil = space.getContext('2d');

  drawStars();
  drawShip();
  drawPort();
  drawHomebase();
  drawMines();
  pencil.drawImage(ship.model, ship.x, ship.y);
}

function drawStars() {
  stars = [];
  for (let i = 0; i < 200; i++) {
    let tempx = space.width * Math.random();
    let tempy = space.height * Math.random();
    let tempr = 2 * Math.random() + .5;
    let tempc = starColors[Math.floor(starColors.length * Math.random())];

    stars.push(new Circle(pencil, tempx, tempy, tempr, tempc));
    stars[i].showFill();
  }
}

function drawShip() {
  ship = {
    x: undefined,
    y: undefined,
    h: 90,
    w: 90,
    speed: 15,
    model: document.querySelector("img"),
  }
  ship.x = space.width / 2 - ship.w / 2;
  ship.y = space.height - ship.h;
}

function drawPort() {
  startZone = new Circle(pencil, ship.x + ship.w / 2, ship.y + ship.h, 125, "white", false);
  startZone.showStroke();
}

function drawHomebase() {
  // do not overlap startzone
  do {
    homebase = new Rectangle(pencil, 300, 200, "silver");
  } while (overlappingCir(startZone, homebase));
  homebase.show();
}

function drawMines() {
  mines = [];
  for (let i = 0; i < 25; i++) {
    let tempc = mineColors[Math.floor(mineColors.length * Math.random())];
    let tempMine = new Rectangle(pencil, 50, 50, tempc);

    // do not overlap startzone or homebase
    if (overlappingCir(startZone, tempMine) || overlappingRect(homebase, tempMine)) i--;
    else {
      mines.push(tempMine);
      mines[i].show();
    }
  }
}

function draw() {
  pencil.clearRect(0, 0, space.width, space.height);
  requestAnimationFrame(draw);

  for (let star of stars) star.showFill();
  homebase.show();
  startZone.showStroke();
  pencil.drawImage(ship.model, ship.x, ship.y);

  if (isHome()) { won = true; endGame(); }
  else if (collided()) { lost = true; endGame(); }
  else {
    for (let mine of mines) {
      mine.move();
      mine.show();
    }
  }
}

function navigate(e) {
  switch (e.code) {
    case "ArrowUp":
      if (ship.y - ship.speed >= 0) {
        ship.y -= ship.speed;
        playRepeatedSound("moved");
      }
      else playRepeatedSound("denied");
      break;
    case "ArrowDown":
      if (ship.y + ship.h + ship.speed <= space.height) {
        ship.y += ship.speed;
        playRepeatedSound("moved");
      }
      else playRepeatedSound("denied");
      break;
    case "ArrowLeft":
      if (ship.x - ship.speed >= 0) {
        ship.x -= ship.speed;
        playRepeatedSound("moved");
      }
      else playRepeatedSound("denied");
      break;
    case "ArrowRight":
      if (ship.x + ship.w + ship.speed <= space.width) {
        ship.x += ship.speed;
        playRepeatedSound("moved");
      }
      else playRepeatedSound("denied");
      break;
  }
}

function isHome() {
  if (ship.x > homebase.x &&
    ship.x + ship.w < homebase.x + homebase.w &&
    ship.y > homebase.y &&
    ship.y + ship.h < homebase.y + homebase.h)
    return true;
  else return false;
}

function collided() {
  for (let mine of mines) if (overlappingRect(ship, mine)) return true;
  return false;
}

function endGame() {
  window.removeEventListener("keydown", navigate);
  window.addEventListener("keydown", replay);

  let text;
  if (won) {
    text = "Yippee! Press ESC to play again.";
    if (!endGameSoundPlayed) {
      landedSound.play();
      endGameSoundPlayed = true;
    }
  }
  if (lost) {
    text = "Whoopsies! Press ESC to play again.";
    if (!endGameSoundPlayed) {
      crashedSound.play();
      endGameSoundPlayed = true;
    }
  }

  pencil.font = "70px Tahoma";
  pencil.fillStyle = "darkturquoise";
  if (won || lost) pencil.fillText(text, (space.width - pencil.measureText(text).width) / 2, space.height / 2);
}

function replay(e) {
  if (e.code == "Escape") {
    window.removeEventListener("keydown", replay);
    setup();
  }
}

function overlappingRect(obj1, obj2) {
  return !(obj1.x + obj1.w < obj2.x ||
    obj1.x > obj2.x + obj2.w ||
    obj1.y + obj1.h < obj2.y ||
    obj1.y > obj2.y + obj2.h);
}

function overlappingCir(cir, obj) {
  // check if the object's corners are in the circle
  let corners = (
    // top left corner
    ((obj.x - cir.x) ** 2 + (obj.y - cir.y) ** 2 < cir.r ** 2) ||
    // top right corner 
    ((obj.x + obj.w - cir.x) ** 2 + (obj.y - cir.y) ** 2 < cir.r ** 2) ||
    // bottom left corner
    ((obj.x - cir.x) ** 2 + (obj.y + obj.h - cir.y) ** 2 < cir.r ** 2) ||
    // bottom right corner
    ((obj.x + obj.w - cir.x) ** 2 + (obj.y + obj.h - cir.y) ** 2 < cir.r ** 2)
  );

  // if the corners are not in the circle but the object is low enough, 
  // check all the bottom points for overlap 
  let bottom = false;
  if ((!corners) && (obj.y + obj.h > cir.y - cir.r)) {
    for (let i = 0; i < obj.w; i++) {
      if ((obj.x + i - cir.x) ** 2 + (obj.y + obj.h - cir.y) ** 2 < cir.r ** 2) {
        bottom = true;
        break;
      }
    }
  }

  return corners || bottom;
}

function playRepeatedSound(sound) {
  if (sound == "moved") {
    let s = new Audio("sounds/moved.wav");
    s.play();
  }
  else if (sound == "denied") {
    let s = new Audio("sounds/denied.wav");
    s.play();
  }
}
